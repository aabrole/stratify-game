import { query, mutation, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { ensureUser } from "./users";
import { Id } from "./_generated/dataModel";

/**
 * Start a new practice session
 */
export const startSession = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Ensure user exists in database
    await ensureUser(ctx);

    // Create new session
    const sessionId = await ctx.db.insert("sessions", {
      userId: identity.subject,
      startTime: Date.now(),
      totalQuestions: 0,
      correctAnswers: 0,
    });

    return sessionId;
  },
});

/**
 * Get the current active session for the user
 */
export const getCurrentSession = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    // Find the most recent session without an endTime
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    // Return the first active session (no endTime)
    return sessions.find((session) => !session.endTime) || null;
  },
});

/**
 * Record a quiz attempt and update session stats
 */
export const recordAttempt = mutation({
  args: {
    patternName: v.string(),
    isCorrect: v.boolean(),
    responseTime: v.number(),
    sessionId: v.optional(v.id("sessions")),
  },
  handler: async (ctx, { patternName, isCorrect, responseTime, sessionId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Ensure user exists
    await ensureUser(ctx);

    // Record the attempt
    const attemptId = await ctx.db.insert("attempts", {
      userId: identity.subject,
      patternName,
      isCorrect,
      responseTime,
      sessionId,
    });

    // Update session stats if sessionId provided
    if (sessionId) {
      const session = await ctx.db.get(sessionId);
      if (session && session.userId === identity.subject) {
        await ctx.db.patch(sessionId, {
          totalQuestions: session.totalQuestions + 1,
          correctAnswers: session.correctAnswers + (isCorrect ? 1 : 0),
        });
      }
    }

    // Update pattern stats
    await updatePatternStats(ctx, identity.subject, patternName, isCorrect, responseTime);

    // Update user overall stats
    await updateUserStats(ctx, identity.subject, isCorrect);

    return attemptId;
  },
});

/**
 * End the current session and calculate final score
 */
export const endSession = mutation({
  args: {
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, { sessionId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const session = await ctx.db.get(sessionId);
    if (!session) throw new Error("Session not found");
    if (session.userId !== identity.subject) throw new Error("Unauthorized");

    // Calculate final score
    const score = session.totalQuestions > 0
      ? Math.round((session.correctAnswers / session.totalQuestions) * 100)
      : 0;

    // Update session with end time and score
    await ctx.db.patch(sessionId, {
      endTime: Date.now(),
      score,
    });

    // Increment user's total sessions completed
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (user) {
      await ctx.db.patch(user._id, {
        totalSessionsCompleted: (user.totalSessionsCompleted || 0) + 1,
      });
    }

    return { sessionId, score };
  },
});

/**
 * Get attempt history for the authenticated user
 */
export const getAttemptHistory = query({
  args: {
    limit: v.optional(v.number()),
    patternName: v.optional(v.string()),
  },
  handler: async (ctx, { limit = 50, patternName }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    let query = ctx.db
      .query("attempts")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc");

    // Filter by pattern if specified
    if (patternName) {
      const allAttempts = await query.collect();
      return allAttempts
        .filter((attempt) => attempt.patternName === patternName)
        .slice(0, limit);
    }

    return await query.take(limit);
  },
});

/**
 * Get all sessions for the authenticated user
 */
export const getSessionHistory = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { limit = 20 }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .take(limit);
  },
});

/**
 * Get session details with all attempts
 */
export const getSessionDetails = query({
  args: {
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, { sessionId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const session = await ctx.db.get(sessionId);
    if (!session || session.userId !== identity.subject) return null;

    // Get all attempts for this session
    const attempts = await ctx.db
      .query("attempts")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();

    return {
      ...session,
      attempts,
    };
  },
});

// Helper function to update pattern statistics
async function updatePatternStats(
  ctx: MutationCtx,
  userId: string,
  patternName: string,
  isCorrect: boolean,
  responseTime: number
) {
  // Find existing pattern stats
  const existingStats = await ctx.db
    .query("patternStats")
    .withIndex("by_user_and_pattern", q =>
      q.eq("userId", userId).eq("patternName", patternName)
    )
    .first();

  if (existingStats) {
    // Update existing stats
    const newTotalAttempts = existingStats.totalAttempts + 1;
    const newCorrectAttempts = existingStats.correctAttempts + (isCorrect ? 1 : 0);
    const newAccuracy = Math.round((newCorrectAttempts / newTotalAttempts) * 100);

    // Calculate new average response time
    const oldTotalTime = (existingStats.averageResponseTime || 0) * existingStats.totalAttempts;
    const newAverageResponseTime = Math.round((oldTotalTime + responseTime) / newTotalAttempts);

    await ctx.db.patch(existingStats._id, {
      totalAttempts: newTotalAttempts,
      correctAttempts: newCorrectAttempts,
      accuracy: newAccuracy,
      averageResponseTime: newAverageResponseTime,
      lastAttemptTime: Date.now(),
    });
  } else {
    // Create new pattern stats
    await ctx.db.insert("patternStats", {
      userId,
      patternName,
      totalAttempts: 1,
      correctAttempts: isCorrect ? 1 : 0,
      accuracy: isCorrect ? 100 : 0,
      averageResponseTime: responseTime,
      lastAttemptTime: Date.now(),
    });
  }
}

// Helper function to update user overall statistics
async function updateUserStats(
  ctx: MutationCtx,
  userId: string,
  isCorrect: boolean
) {
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", q => q.eq("clerkId", userId))
    .first();

  if (user) {
    const newTotalAttempts = (user.totalAttempts || 0) + 1;
    const newTotalCorrect = (user.totalCorrect || 0) + (isCorrect ? 1 : 0);
    const newAccuracy = Math.round((newTotalCorrect / newTotalAttempts) * 100);

    await ctx.db.patch(user._id, {
      totalAttempts: newTotalAttempts,
      totalCorrect: newTotalCorrect,
      overallAccuracy: newAccuracy,
    });
  }
}

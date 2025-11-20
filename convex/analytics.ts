import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get overall user statistics
 */
export const getUserStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    // Get user info
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) return null;

    // Get total sessions count
    const allSessions = await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const completedSessions = allSessions.filter((s) => s.endTime);

    // Get all attempts
    const allAttempts = await ctx.db
      .query("attempts")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    // Calculate average response time
    const avgResponseTime = allAttempts.length > 0
      ? Math.round(
          allAttempts.reduce((sum, a) => sum + a.responseTime, 0) / allAttempts.length
        )
      : 0;

    // Calculate average session score
    const avgSessionScore = completedSessions.length > 0
      ? Math.round(
          completedSessions.reduce((sum, s) => sum + (s.score || 0), 0) / completedSessions.length
        )
      : 0;

    return {
      totalAttempts: user.totalAttempts || 0,
      totalCorrect: user.totalCorrect || 0,
      overallAccuracy: user.overallAccuracy || 0,
      totalSessions: allSessions.length,
      completedSessions: completedSessions.length,
      totalSessionsCompleted: user.totalSessionsCompleted || 0,
      averageResponseTime: avgResponseTime,
      averageSessionScore: avgSessionScore,
    };
  },
});

/**
 * Get performance breakdown by pattern
 */
export const getPatternBreakdown = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    // Get all pattern stats for the user
    const patternStats = await ctx.db
      .query("patternStats")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    // Sort by accuracy (ascending) to show weakest patterns first
    return patternStats.sort((a, b) => a.accuracy - b.accuracy);
  },
});

/**
 * Get weak patterns (accuracy below threshold)
 */
export const getWeakPatterns = query({
  args: {
    threshold: v.optional(v.number()), // Default 70%
  },
  handler: async (ctx, { threshold = 70 }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    // Get all pattern stats for the user
    const allPatternStats = await ctx.db
      .query("patternStats")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    // Filter patterns below threshold
    const weakPatterns = allPatternStats.filter((stat) => stat.accuracy < threshold);

    // Sort by accuracy (ascending) - weakest first
    return weakPatterns.sort((a, b) => a.accuracy - b.accuracy);
  },
});

/**
 * Get strong patterns (accuracy above threshold)
 */
export const getStrongPatterns = query({
  args: {
    threshold: v.optional(v.number()), // Default 80%
  },
  handler: async (ctx, { threshold = 80 }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const allPatternStats = await ctx.db
      .query("patternStats")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    // Filter patterns above threshold with at least 5 attempts
    const strongPatterns = allPatternStats.filter(
      (stat) => stat.accuracy >= threshold && stat.totalAttempts >= 5
    );

    // Sort by accuracy (descending) - strongest first
    return strongPatterns.sort((a, b) => b.accuracy - a.accuracy);
  },
});

/**
 * Get recent session history with stats
 */
export const getSessionHistory = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { limit = 10 }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .take(limit);

    return sessions;
  },
});

/**
 * Get pattern statistics for a specific pattern
 */
export const getPatternStats = query({
  args: {
    patternName: v.string(),
  },
  handler: async (ctx, { patternName }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const stats = await ctx.db
      .query("patternStats")
      .withIndex("by_user_and_pattern", (q) =>
        q.eq("userId", identity.subject).eq("patternName", patternName)
      )
      .first();

    if (!stats) {
      // Return default stats if no attempts yet
      return {
        patternName,
        totalAttempts: 0,
        correctAttempts: 0,
        accuracy: 0,
        averageResponseTime: 0,
        lastAttemptTime: null,
      };
    }

    return stats;
  },
});

/**
 * Get progress over time (last N days)
 */
export const getProgressOverTime = query({
  args: {
    days: v.optional(v.number()), // Default 7 days
  },
  handler: async (ctx, { days = 7 }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000;

    // Get all attempts since cutoff
    const recentAttempts = await ctx.db
      .query("attempts")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    // Filter by creation time and group by day
    const attemptsByDay: Record<string, { correct: number; total: number }> = {};

    for (const attempt of recentAttempts) {
      if (attempt._creationTime >= cutoffTime) {
        const date = new Date(attempt._creationTime).toLocaleDateString();
        if (!attemptsByDay[date]) {
          attemptsByDay[date] = { correct: 0, total: 0 };
        }
        attemptsByDay[date].total++;
        if (attempt.isCorrect) {
          attemptsByDay[date].correct++;
        }
      }
    }

    // Convert to array and calculate accuracy
    const progressData = Object.entries(attemptsByDay).map(([date, stats]) => ({
      date,
      accuracy: Math.round((stats.correct / stats.total) * 100),
      totalAttempts: stats.total,
      correctAttempts: stats.correct,
    }));

    // Sort by date
    return progressData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },
});

/**
 * Update pattern statistics manually (for admin/testing purposes)
 */
export const updatePatternStats = mutation({
  args: {
    patternName: v.string(),
    totalAttempts: v.number(),
    correctAttempts: v.number(),
  },
  handler: async (ctx, { patternName, totalAttempts, correctAttempts }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const accuracy = totalAttempts > 0
      ? Math.round((correctAttempts / totalAttempts) * 100)
      : 0;

    const existingStats = await ctx.db
      .query("patternStats")
      .withIndex("by_user_and_pattern", (q) =>
        q.eq("userId", identity.subject).eq("patternName", patternName)
      )
      .first();

    if (existingStats) {
      await ctx.db.patch(existingStats._id, {
        totalAttempts,
        correctAttempts,
        accuracy,
        lastAttemptTime: Date.now(),
      });
      return existingStats._id;
    } else {
      return await ctx.db.insert("patternStats", {
        userId: identity.subject,
        patternName,
        totalAttempts,
        correctAttempts,
        accuracy,
        lastAttemptTime: Date.now(),
      });
    }
  },
});

/**
 * Get learning recommendations based on performance
 */
export const getLearningRecommendations = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    // Get all pattern stats
    const allPatternStats = await ctx.db
      .query("patternStats")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    // Categorize patterns
    const needsPractice = allPatternStats.filter(
      (s) => s.accuracy < 70 || s.totalAttempts < 10
    );
    const mastered = allPatternStats.filter(
      (s) => s.accuracy >= 90 && s.totalAttempts >= 20
    );
    const improving = allPatternStats.filter(
      (s) => s.accuracy >= 70 && s.accuracy < 90
    );

    // Find patterns with no attempts
    const allPatterns = [
      "1-up", "1-down", "2-up", "2-down", "2-up-outside",
      "2-down-outside", "3-bullish", "3-bearish", "3-inside", "3-outside"
    ];
    const attemptedPatterns = new Set(allPatternStats.map((s) => s.patternName));
    const notAttempted = allPatterns.filter((p) => !attemptedPatterns.has(p));

    return {
      needsPractice: needsPractice.sort((a, b) => a.accuracy - b.accuracy),
      improving: improving.sort((a, b) => a.accuracy - b.accuracy),
      mastered: mastered.sort((a, b) => b.accuracy - a.accuracy),
      notAttempted,
      recommendedFocus: needsPractice.length > 0
        ? needsPractice[0].patternName
        : notAttempted.length > 0
        ? notAttempted[0]
        : null,
    };
  },
});

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get user's game progress (xp, level, streak)
export const getUserProgress = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      return {
        xp: 0,
        level: 1,
        streak: 0,
        totalRounds: 0,
        correctRounds: 0,
      };
    }

    return {
      xp: user.xp || 0,
      level: user.level || 1,
      streak: user.streak || 0,
      totalRounds: user.totalRounds || 0,
      correctRounds: user.correctRounds || 0,
    };
  },
});

// Record a game round and update user progress
export const recordRound = mutation({
  args: {
    correctPattern: v.string(), // The actual correct pattern
    userAnswer: v.string(), // What the user selected
    isCorrect: v.boolean(),
    candles: v.array(v.object({
      open: v.number(),
      close: v.number(),
      high: v.number(),
      low: v.number(),
    })), // The candle formation shown
    responseTime: v.optional(v.number()), // Time taken to answer in ms
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get or create user
    let user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      // Create user if doesn't exist
      const userId = await ctx.db.insert("users", {
        clerkId: identity.subject,
        email: identity.email,
        name: identity.name,
        xp: 0,
        level: 1,
        streak: 0,
        totalRounds: 0,
        correctRounds: 0,
      });
      user = await ctx.db.get(userId);
      if (!user) throw new Error("Failed to create user");
    }

    // Current stats
    const currentXp = user.xp || 0;
    const currentLevel = user.level || 1;
    const currentStreak = user.streak || 0;
    const totalRounds = (user.totalRounds || 0) + 1;
    const correctRounds = (user.correctRounds || 0) + (args.isCorrect ? 1 : 0);

    // Calculate new streak
    let newStreak = currentStreak;
    if (args.isCorrect) {
      newStreak = currentStreak + 1;
    } else {
      newStreak = 0;
    }

    // Calculate XP earned (100 base + streak multiplier)
    let xpEarned = 0;
    if (args.isCorrect) {
      const streakMultiplier = Math.floor(newStreak / 5) * 10; // +10 XP per 5 streak
      xpEarned = 100 + streakMultiplier;
    }

    // Calculate new XP and level
    const newXp = currentXp + xpEarned;
    const newLevel = Math.floor(newXp / 500) + 1; // 500 XP per level

    // Save round record with detailed information
    await ctx.db.insert("rounds", {
      userId: identity.subject,
      correctPattern: args.correctPattern,
      userAnswer: args.userAnswer,
      isCorrect: args.isCorrect,
      candles: args.candles,
      xpEarned,
      streakAtTime: newStreak,
      responseTime: args.responseTime,
      timestamp: Date.now(),
    });

    // Update user stats
    await ctx.db.patch(user._id, {
      xp: newXp,
      level: newLevel,
      streak: newStreak,
      totalRounds,
      correctRounds,
    });

    return {
      xp: newXp,
      level: newLevel,
      streak: newStreak,
      xpEarned,
      totalRounds,
      correctRounds,
      leveledUp: newLevel > currentLevel,
    };
  },
});

// Get recent rounds history
export const getRecentRounds = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const limit = args.limit || 10;
    const rounds = await ctx.db
      .query("rounds")
      .withIndex("by_user_and_timestamp", (q) =>
        q.eq("userId", identity.subject)
      )
      .order("desc")
      .take(limit);

    return rounds;
  },
});

// Reset progress (for testing or fresh start)
export const resetProgress = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Reset user stats
    await ctx.db.patch(user._id, {
      xp: 0,
      level: 1,
      streak: 0,
      totalRounds: 0,
      correctRounds: 0,
    });

    return { success: true, message: "Progress reset successfully" };
  },
});

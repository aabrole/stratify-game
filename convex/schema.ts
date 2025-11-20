import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Valid pattern names for the Stratify game
export const GAME_PATTERNS = [
  "2-1-2",     // 2-1-2 Reversal
  "3-1-2",     // 3-1-2 Continuation
  "outside",   // Outside Bar
  "none"       // No Pattern
] as const;

// Old pattern names for quiz (kept for backwards compatibility)
export const PATTERN_NAMES = [
  "1-up",
  "1-down",
  "2-up",
  "2-down",
  "2-up-outside",
  "2-down-outside",
  "3-bullish",
  "3-bearish",
  "3-inside",
  "3-outside"
] as const;

export default defineSchema({
  // Game rounds - tracks each round in the continuous game
  rounds: defineTable({
    userId: v.string(),
    correctPattern: v.optional(v.string()), // The actual correct pattern (one of GAME_PATTERNS)
    userAnswer: v.optional(v.string()), // What the user selected (one of GAME_PATTERNS)
    isCorrect: v.boolean(),
    candles: v.optional(v.array(v.object({
      open: v.number(),
      close: v.number(),
      high: v.number(),
      low: v.number(),
    }))), // Store the actual candle formation shown
    xpEarned: v.number(),
    streakAtTime: v.number(),
    responseTime: v.optional(v.number()), // Time taken to answer in milliseconds
    timestamp: v.number(),
    // Legacy fields (from before analytics enhancement)
    pattern: v.optional(v.string()), // Old single pattern field
  })
    .index("by_user", ["userId"])
    .index("by_user_and_timestamp", ["userId", "timestamp"])
    .index("by_pattern", ["userId", "correctPattern"]),

  // Quiz attempts - tracks each individual question answer (OLD - kept for reference)
  attempts: defineTable({
    userId: v.string(),
    patternName: v.string(), // One of PATTERN_NAMES
    isCorrect: v.boolean(),
    responseTime: v.number(), // Time in milliseconds to answer
    sessionId: v.optional(v.id("sessions")), // Link to session if part of one
  })
    .index("by_user", ["userId"])
    .index("by_user_and_pattern", ["userId", "patternName"])
    .index("by_session", ["sessionId"]),

  // Practice sessions - groups of quiz attempts (OLD - kept for reference)
  sessions: defineTable({
    userId: v.string(),
    startTime: v.number(),
    endTime: v.optional(v.number()), // Null if session is still active
    totalQuestions: v.number(),
    correctAnswers: v.number(),
    score: v.optional(v.number()), // Percentage score (0-100)
  })
    .index("by_user", ["userId"])
    .index("by_user_and_start_time", ["userId", "startTime"]),

  // Pattern statistics - aggregated performance by pattern (OLD - kept for reference)
  patternStats: defineTable({
    userId: v.string(),
    patternName: v.string(), // One of PATTERN_NAMES
    totalAttempts: v.number(),
    correctAttempts: v.number(),
    accuracy: v.number(), // Percentage (0-100)
    averageResponseTime: v.optional(v.number()), // Average time in ms
    lastAttemptTime: v.optional(v.number()), // Timestamp of last attempt
  })
    .index("by_user", ["userId"])
    .index("by_user_and_pattern", ["userId", "patternName"])
    .index("by_accuracy", ["userId", "accuracy"]), // For finding weak patterns

  // Users - enhanced with game tracking fields
  users: defineTable({
    clerkId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    // Game progress
    xp: v.optional(v.number()),
    level: v.optional(v.number()),
    streak: v.optional(v.number()),
    totalRounds: v.optional(v.number()),
    correctRounds: v.optional(v.number()),
    // Old quiz tracking (kept for backwards compatibility)
    totalAttempts: v.optional(v.number()),
    totalCorrect: v.optional(v.number()),
    overallAccuracy: v.optional(v.number()), // Percentage (0-100)
    totalSessionsCompleted: v.optional(v.number()),
  }).index("by_clerk_id", ["clerkId"]),
});
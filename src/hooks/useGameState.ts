'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { PatternType, Candle } from '@/lib/game/patternGenerator';

export interface GameProgress {
  xp: number;
  level: number;
  streak: number;
  totalRounds: number;
  correctRounds: number;
}

export interface RoundResult {
  xp: number;
  level: number;
  streak: number;
  xpEarned: number;
  totalRounds: number;
  correctRounds: number;
  leveledUp: boolean;
}

export function useGameState() {
  // Fetch user progress from Convex
  const serverProgress = useQuery(api.game.getUserProgress);
  const recordRoundMutation = useMutation(api.game.recordRound);

  // Local state synchronized with server
  const [progress, setProgress] = useState<GameProgress>({
    xp: 0,
    level: 1,
    streak: 0,
    totalRounds: 0,
    correctRounds: 0,
  });

  // Sync local state with server data
  useEffect(() => {
    if (serverProgress) {
      setProgress(serverProgress);
    }
  }, [serverProgress]);

  // Calculate XP for next level
  const getXpForNextLevel = () => {
    return progress.level * 500;
  };

  // Calculate progress percentage to next level
  const getLevelProgress = () => {
    const currentLevelXp = (progress.level - 1) * 500;
    const xpInCurrentLevel = progress.xp - currentLevelXp;
    const xpNeededForLevel = 500;
    return (xpInCurrentLevel / xpNeededForLevel) * 100;
  };

  // Calculate accuracy percentage
  const getAccuracy = () => {
    if (progress.totalRounds === 0) return 0;
    return Math.round((progress.correctRounds / progress.totalRounds) * 100);
  };

  // Record a round (win or lose)
  const recordRound = async (
    correctPattern: PatternType,
    userAnswer: PatternType,
    isCorrect: boolean,
    candles: Candle[],
    responseTime?: number
  ): Promise<RoundResult> => {
    try {
      const result = await recordRoundMutation({
        correctPattern,
        userAnswer,
        isCorrect,
        candles,
        responseTime,
      });

      // Update local state optimistically
      setProgress({
        xp: result.xp,
        level: result.level,
        streak: result.streak,
        totalRounds: result.totalRounds,
        correctRounds: result.correctRounds,
      });

      return result;
    } catch (error) {
      console.error('Failed to record round:', error);
      throw error;
    }
  };

  return {
    progress,
    recordRound,
    getXpForNextLevel,
    getLevelProgress,
    getAccuracy,
    isLoading: serverProgress === undefined,
  };
}

'use client';

import React from 'react';
import { GameProgress } from '@/hooks/useGameState';

interface GameHeaderProps {
  progress: GameProgress;
}

export function GameHeader({ progress }: GameHeaderProps) {
  return (
    <div className="game-header">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Title */}
          <h1 className="game-title">
            <span className="text-4xl">⚡</span>
            <span className="ml-2">STRAT MASTER</span>
          </h1>

          {/* Stats */}
          <div className="flex items-center gap-6">
            {/* XP */}
            <div className="stat-item">
              <div className="stat-label">XP</div>
              <div className="stat-value">{progress.xp}</div>
            </div>

            {/* Level */}
            <div className="stat-item">
              <div className="stat-label">Level</div>
              <div className="stat-value level">{progress.level}</div>
            </div>

            {/* Streak */}
            <div className="stat-item">
              <div className="stat-label">Streak</div>
              <div className="stat-value streak">
                {progress.streak > 0 && (
                  <span className="mr-1">🔥</span>
                )}
                {progress.streak}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { PatternType } from '@/lib/game/patternGenerator';

interface GameControlsProps {
  onAnswer: (pattern: PatternType) => void;
  onTutorial: () => void;
  onReplay: () => void;
  disabled?: boolean;
}

export function GameControls({
  onAnswer,
  onTutorial,
  onReplay,
  disabled = false,
}: GameControlsProps) {
  const answerButtons: Array<{ pattern: PatternType; label: string; hotkey: string; description: string }> = [
    { pattern: '2-1-2', label: '2-1-2', hotkey: '1', description: 'Reversal' },
    { pattern: '3-1-2', label: '3-1-2', hotkey: '2', description: 'Continuation' },
    { pattern: '2-2-2', label: '2-2-2', hotkey: '3', description: 'Strong Trend' },
    { pattern: '1-1-1', label: '1-1-1', hotkey: '4', description: 'Consolidation' },
    { pattern: '3-2-2', label: '3-2-2', hotkey: '5', description: 'Outside Reversal' },
    { pattern: '1-2-2', label: '1-2-2', hotkey: '6', description: 'Failed Breakout' },
    { pattern: 'outside', label: 'Outside', hotkey: '7', description: 'Bar' },
    { pattern: 'none', label: 'None', hotkey: '0', description: 'No Pattern' },
  ];

  return (
    <div className="game-controls">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Answer Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
          {answerButtons.map((btn) => (
            <button
              key={btn.pattern}
              onClick={() => onAnswer(btn.pattern)}
              disabled={disabled}
              className="answer-button"
            >
              <div className="answer-label">
                <span className="font-bold text-base md:text-lg">{btn.label}</span>
                <span className="text-xs sm:text-sm text-gray-400 ml-1">{btn.description}</span>
              </div>
              <div className="answer-hotkey">Press {btn.hotkey}</div>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 sm:gap-4">
          <div className="relative group">
            <button onClick={onReplay} className="action-button text-sm sm:text-base" disabled={disabled}>
              🔄 Reset
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-red-600 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              ⚠️ This will reset all progress (XP, Level, Streak)
            </div>
          </div>
          <button onClick={onTutorial} className="action-button text-sm sm:text-base">
            📚 Tutorial
          </button>
        </div>
      </div>
    </div>
  );
}

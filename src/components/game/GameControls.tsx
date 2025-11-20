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
  const answerButtons: Array<{ pattern: PatternType; label: string; hotkey: string }> = [
    { pattern: '2-1-2', label: '2-1-2 Reversal', hotkey: '1' },
    { pattern: '3-1-2', label: '3-1-2 Continuation', hotkey: '2' },
    { pattern: 'outside', label: 'Outside Bar', hotkey: '3' },
    { pattern: 'none', label: 'No Pattern', hotkey: '0' },
  ];

  return (
    <div className="game-controls">
      <div className="container mx-auto px-4 py-6">
        {/* Answer Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {answerButtons.map((btn) => (
            <button
              key={btn.pattern}
              onClick={() => onAnswer(btn.pattern)}
              disabled={disabled}
              className="answer-button"
            >
              <div className="answer-label">{btn.label}</div>
              <div className="answer-hotkey">Press {btn.hotkey}</div>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button onClick={onReplay} className="action-button" disabled={disabled}>
            🔄 Replay
          </button>
          <button onClick={onTutorial} className="action-button">
            📚 Tutorial
          </button>
        </div>
      </div>
    </div>
  );
}

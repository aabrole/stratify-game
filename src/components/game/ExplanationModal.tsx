'use client';

import React from 'react';
import { Overlay } from './Overlay';
import { PatternType, Candle } from '@/lib/game/patternGenerator';
import { getExplanation } from '@/lib/game/explanations';
import { StaticCandleChart } from './StaticCandleChart';

interface ExplanationModalProps {
  isOpen: boolean;
  pattern: PatternType | null;
  candles: Candle[] | null;
  xpEarned: number;
  onContinue: () => void;
}

export function ExplanationModal({
  isOpen,
  pattern,
  candles,
  xpEarned,
  onContinue,
}: ExplanationModalProps) {
  if (!pattern) return null;

  const explanation = getExplanation(pattern);

  return (
    <Overlay isOpen={isOpen} onClose={onContinue}>
      <div className="modal-card max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="modal-title">{explanation.title}</h2>
          <div className="xp-badge">+{xpEarned} XP</div>
        </div>

        <div className="modal-content">
          <p className="text-gray-300 mb-4">{explanation.description}</p>

          {/* Static candle visualization with labels */}
          {candles && candles.length > 0 && (
            <StaticCandleChart candles={candles} />
          )}

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-cyan-400">The Logic:</h3>
            <p className="text-gray-300">{explanation.logic}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-cyan-400">Why It Works:</h3>
            <p className="text-gray-300">{explanation.whyItWorks}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-cyan-400">Risk Level:</h3>
            <span className={`risk-badge risk-${explanation.riskLevel.toLowerCase()}`}>
              {explanation.riskLevel}
            </span>
          </div>

          <button onClick={onContinue} className="modal-button">
            Continue
          </button>
        </div>
      </div>
    </Overlay>
  );
}

'use client';

import React from 'react';
import { Overlay } from './Overlay';
import { PatternType } from '@/lib/game/patternGenerator';
import { getExplanation } from '@/lib/game/explanations';

interface ExplanationModalProps {
  isOpen: boolean;
  pattern: PatternType | null;
  xpEarned: number;
  onContinue: () => void;
}

export function ExplanationModal({
  isOpen,
  pattern,
  xpEarned,
  onContinue,
}: ExplanationModalProps) {
  if (!pattern) return null;

  const explanation = getExplanation(pattern);

  return (
    <Overlay isOpen={isOpen} onClose={onContinue}>
      <div className="modal-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="modal-title">{explanation.title}</h2>
          <div className="xp-badge">+{xpEarned} XP</div>
        </div>

        <div className="modal-content">
          <p className="text-gray-300 mb-4">{explanation.description}</p>

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

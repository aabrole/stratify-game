'use client';

import React from 'react';
import { Overlay } from './Overlay';

interface WelcomeModalProps {
  isOpen: boolean;
  onStart: () => void;
}

export function WelcomeModal({ isOpen, onStart }: WelcomeModalProps) {
  return (
    <Overlay isOpen={isOpen} onClose={onStart}>
      <div className="modal-card max-w-3xl">
        <h2 className="modal-title">Welcome to STRAT MASTER</h2>

        <div className="modal-content">
          <p className="mb-4 text-gray-300">
            Master The Strat patterns through continuous gameplay. Identify patterns as they form and build your streak!
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-cyan-400">How to Play:</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Watch 4 candles animate in real-time</li>
              <li>• Identify the Strat pattern (based on candle 1, 2, 3 numbering)</li>
              <li>• Earn XP and level up (100 XP base + streak bonus)</li>
              <li>• Build streaks for multiplier bonuses (up to 10x!)</li>
              <li>• Use keyboard shortcuts for faster answers</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-cyan-400">Keyboard Commands:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-300">
              <div className="flex items-center gap-1.5">
                <kbd className="kbd text-xs">1</kbd>
                <span>2-1-2 Reversal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="kbd text-xs">2</kbd>
                <span>3-1-2 Continuation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="kbd text-xs">3</kbd>
                <span>2-2-2 Strong Trend</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="kbd text-xs">4</kbd>
                <span>1-1-1 Consolidation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="kbd text-xs">5</kbd>
                <span>3-2-2 Outside Reversal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="kbd text-xs">6</kbd>
                <span>1-2-2 Failed Breakout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="kbd text-xs">7</kbd>
                <span>Outside Bar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="kbd text-xs">0</kbd>
                <span>No Pattern</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-300 mb-2">Quick Tip:</h4>
            <p className="text-sm text-gray-300">
              Remember: Each candle is numbered (1, 2, or 3) based on its relationship to the <strong>previous candle's range</strong>.
              A <code className="bg-gray-700 px-2 py-1 rounded text-cyan-300">2-1-2</code> means:
              Directional (2) → Inside Bar (1) → Reversal (2)
            </p>
          </div>

          <button onClick={onStart} className="modal-button w-full text-lg py-4">
            🎮 Start Playing
          </button>
        </div>
      </div>
    </Overlay>
  );
}

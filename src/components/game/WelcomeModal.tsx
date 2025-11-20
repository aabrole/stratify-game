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
      <div className="modal-card">
        <h2 className="modal-title">Welcome to STRAT MASTER</h2>

        <div className="modal-content">
          <p className="mb-4">
            Master The Strat patterns through continuous gameplay. Identify patterns as they form and build your streak!
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-cyan-400">How to Play:</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Watch candles animate in real-time</li>
              <li>• Identify the pattern before time runs out</li>
              <li>• Earn XP and level up (100 XP + streak bonus)</li>
              <li>• Build streaks for multiplier bonuses</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-cyan-400">Hotkeys:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <div><kbd className="kbd">1</kbd> 2-1-2 Reversal</div>
              <div><kbd className="kbd">2</kbd> 3-1-2 Continuation</div>
              <div><kbd className="kbd">3</kbd> Outside Bar</div>
              <div><kbd className="kbd">0</kbd> No Pattern</div>
            </div>
          </div>

          <button onClick={onStart} className="modal-button">
            Start Playing
          </button>
        </div>
      </div>
    </Overlay>
  );
}

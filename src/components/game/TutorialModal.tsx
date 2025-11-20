'use client';

import React, { useState } from 'react';
import { Overlay } from './Overlay';
import { TUTORIAL_TOPICS, TutorialTopic } from '@/lib/game/explanations';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const [selectedTopic, setSelectedTopic] = useState<TutorialTopic | null>(null);

  const handleBack = () => {
    setSelectedTopic(null);
  };

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className="modal-card modal-large">
        <h2 className="modal-title">
          {selectedTopic ? selectedTopic.title : 'Learning Center'}
        </h2>

        <div className="modal-content">
          {!selectedTopic ? (
            // Topic list
            <div>
              <p className="text-gray-300 mb-6">
                Deepen your understanding of The Strat methodology with these advanced topics:
              </p>

              <div className="space-y-3">
                {TUTORIAL_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className="tutorial-topic-button"
                  >
                    <span className="text-lg font-semibold">{topic.title}</span>
                    <span className="text-cyan-400">→</span>
                  </button>
                ))}
              </div>

              <button onClick={onClose} className="modal-button mt-6">
                Back to Game
              </button>
            </div>
          ) : (
            // Topic detail
            <div>
              <div className="text-gray-300 whitespace-pre-wrap mb-6">
                {selectedTopic.content}
              </div>

              <div className="flex gap-3">
                <button onClick={handleBack} className="modal-button-secondary">
                  Back to Topics
                </button>
                <button onClick={onClose} className="modal-button">
                  Back to Game
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Overlay>
  );
}

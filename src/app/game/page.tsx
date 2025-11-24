'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { AnimatedChart } from '@/components/game/AnimatedChart';
import { GameHeader } from '@/components/game/GameHeader';
import { GameControls } from '@/components/game/GameControls';
import { Toast } from '@/components/game/Toast';
import { WelcomeModal } from '@/components/game/WelcomeModal';
import { ExplanationModal } from '@/components/game/ExplanationModal';
import { TutorialModal } from '@/components/game/TutorialModal';
import { useGameState } from '@/hooks/useGameState';
import { generatePattern, PatternType, Candle } from '@/lib/game/patternGenerator';

type GameState = 'welcome' | 'animating' | 'waiting' | 'correct' | 'wrong';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

export default function GamePage() {
  const { isSignedIn } = useAuth();
  const { progress, recordRound, resetProgress, isLoading } = useGameState();

  // Game state
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [currentPattern, setCurrentPattern] = useState<{ candles: Candle[]; pattern: PatternType } | null>(null);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  const [showExplanation, setShowExplanation] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [lastXpEarned, setLastXpEarned] = useState(0);
  const [answerStartTime, setAnswerStartTime] = useState<number>(0);

  // Start new round
  const startNewRound = useCallback(() => {
    const newPattern = generatePattern();
    setCurrentPattern(newPattern);
    setGameState('animating');
  }, []);

  // Handle animation complete
  const handleAnimationComplete = () => {
    if (gameState === 'animating') {
      setGameState('waiting');
      setAnswerStartTime(Date.now()); // Start timing when user can answer
    }
  };

  // Handle answer
  const handleAnswer = useCallback(async (answer: PatternType) => {
    if (gameState !== 'waiting' || !currentPattern || !isSignedIn) return;

    const isCorrect = answer === currentPattern.pattern;
    const responseTime = answerStartTime > 0 ? Date.now() - answerStartTime : undefined;

    // Show toast with correct answer if wrong
    setToast({
      show: true,
      message: isCorrect
        ? 'Correct!'
        : `Wrong! It was ${currentPattern.pattern.toUpperCase()}`,
      type: isCorrect ? 'success' : 'error',
    });

    // Record round and update progress with detailed information
    try {
      const result = await recordRound(
        currentPattern.pattern, // correctPattern
        answer, // userAnswer
        isCorrect,
        currentPattern.candles, // candle formation
        responseTime // time taken to answer
      );
      setLastXpEarned(result.xpEarned);

      // Show explanation for both correct and wrong answers
      setGameState(isCorrect ? 'correct' : 'wrong');
      setShowExplanation(true);
    } catch (error) {
      console.error('Failed to record round:', error);
    }
  }, [gameState, currentPattern, isSignedIn, recordRound, startNewRound, answerStartTime]);

  // Handle explanation continue
  const handleExplanationContinue = () => {
    setShowExplanation(false);
    startNewRound();
  };

  // Handle reset/replay - generates new pattern AND resets progress
  const handleReset = async () => {
    try {
      await resetProgress();
      startNewRound();
    } catch (error) {
      console.error('Failed to reset progress:', error);
    }
  };

  // Handle tutorial
  const handleTutorial = () => {
    setShowTutorial(true);
  };

  // Handle welcome start
  const handleWelcomeStart = () => {
    setGameState('animating');
    startNewRound();
  };

  // Hotkey support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'waiting') return;

      const keyMap: Record<string, PatternType> = {
        '1': '2-1-2',
        '2': '3-1-2',
        '3': '2-2-2',
        '4': '1-1-1',
        '5': '3-2-2',
        '6': '1-2-2',
        '7': 'outside',
        '0': 'none',
      };

      const pattern = keyMap[e.key];
      if (pattern) {
        handleAnswer(pattern);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, handleAnswer]);

  // Dismiss toast
  const dismissToast = () => {
    setToast({ ...toast, show: false });
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-game flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">STRAT MASTER</h1>
          <p className="text-xl text-gray-300">Please sign in to play</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-game flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-game">
      {/* Header */}
      <GameHeader progress={progress} />

      {/* Main Game Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center">
          {currentPattern && (
            <AnimatedChart
              candles={currentPattern.candles}
              onAnimationComplete={handleAnimationComplete}
            />
          )}
        </div>
      </div>

      {/* Controls */}
      <GameControls
        onAnswer={handleAnswer}
        onTutorial={handleTutorial}
        onReplay={handleReset}
        disabled={gameState !== 'waiting'}
      />

      {/* Modals */}
      <WelcomeModal isOpen={gameState === 'welcome'} onStart={handleWelcomeStart} />

      <ExplanationModal
        isOpen={showExplanation}
        pattern={currentPattern?.pattern || null}
        candles={currentPattern?.candles || null}
        xpEarned={lastXpEarned}
        onContinue={handleExplanationContinue}
      />

      <TutorialModal isOpen={showTutorial} onClose={() => setShowTutorial(false)} />

      {/* Toast */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onDismiss={dismissToast} />
      )}
    </div>
  );
}

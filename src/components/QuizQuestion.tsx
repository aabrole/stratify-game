'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion as QuizQuestionType, PatternName } from '@/lib/types/candlestick';
import { CandlestickChart } from './CandlestickChart';
import { Check, X } from 'lucide-react';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (selectedAnswer: PatternName, isCorrect: boolean, responseTime: number) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

/**
 * Quiz Question Interface Component
 * Displays the candlestick chart, answer choices, feedback, and explanation
 */
export function QuizQuestion({
  question,
  onAnswer,
  onNext,
  questionNumber,
  totalQuestions,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<PatternName | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime] = useState(Date.now());

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  const handleAnswerClick = (answer: PatternName) => {
    if (isAnswered) return; // Prevent changing answer

    const responseTime = Date.now() - startTime;
    const isCorrect = answer === question.correctAnswer;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    // Notify parent component
    onAnswer(answer, isCorrect, responseTime);
  };

  const getButtonStyle = (answer: PatternName): string => {
    const baseStyle =
      'w-full px-6 py-4 rounded-lg font-medium transition-all duration-200 text-left';

    if (!isAnswered) {
      return `${baseStyle} bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-800`;
    }

    // After answering, show correct/incorrect styling
    if (answer === question.correctAnswer) {
      return `${baseStyle} bg-green-100 border-2 border-green-500 text-green-800`;
    }

    if (answer === selectedAnswer) {
      return `${baseStyle} bg-red-100 border-2 border-red-500 text-red-800`;
    }

    return `${baseStyle} bg-gray-50 border-2 border-gray-200 text-gray-500 opacity-60`;
  };

  const getAnswerIcon = (answer: PatternName) => {
    if (!isAnswered) return null;

    if (answer === question.correctAnswer) {
      return <Check className="w-5 h-5 text-green-600" />;
    }

    if (answer === selectedAnswer) {
      return <X className="w-5 h-5 text-red-600" />;
    }

    return null;
  };

  const formatPatternName = (name: PatternName): string => {
    // Format pattern names for display
    const names: Record<PatternName, string> = {
      '1-up': '1-Up (Type 1 Bullish)',
      '1-down': '1-Down (Type 1 Bearish)',
      '2-up': '2-Up (Inside Bullish)',
      '2-down': '2-Down (Inside Bearish)',
      '2-up-outside': '2-Up-Outside',
      '2-down-outside': '2-Down-Outside',
      '3-bullish': '3-Bullish (Directional)',
      '3-bearish': '3-Bearish (Directional)',
      '3-inside': '3-Inside (Consolidation)',
      '3-outside': '3-Outside (Expansion)',
    };
    return names[name] || name;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Question header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Question {questionNumber} of {totalQuestions}
        </h2>
        <div className="text-sm text-gray-500">
          {isAnswered ? (
            <span className="font-medium">
              {selectedAnswer === question.correctAnswer ? (
                <span className="text-green-600">Correct!</span>
              ) : (
                <span className="text-red-600">Incorrect</span>
              )}
            </span>
          ) : (
            <span>Select the correct pattern</span>
          )}
        </div>
      </div>

      {/* Candlestick chart */}
      <div className="flex justify-center bg-gray-50 rounded-xl p-8 border border-gray-200">
        <CandlestickChart candles={question.pattern.candles} showLabels={true} />
      </div>

      {/* Answer choices */}
      <div className="space-y-3">
        <p className="text-lg font-semibold text-gray-700 mb-4">
          What pattern is shown above?
        </p>
        {question.answers.map((answer) => (
          <button
            key={answer}
            onClick={() => handleAnswerClick(answer)}
            disabled={isAnswered}
            className={getButtonStyle(answer)}
          >
            <div className="flex items-center justify-between">
              <span>{formatPatternName(answer)}</span>
              {getAnswerIcon(answer)}
            </div>
          </button>
        ))}
      </div>

      {/* Explanation (shown after answering) */}
      {isAnswered && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Explanation:</h3>
          <p className="text-blue-800 leading-relaxed">{question.explanation}</p>
          {selectedAnswer !== question.correctAnswer && (
            <p className="mt-3 text-blue-700 font-medium">
              The correct answer was: {formatPatternName(question.correctAnswer)}
            </p>
          )}
        </div>
      )}

      {/* Next button */}
      {isAnswered && (
        <div className="flex justify-end">
          <button
            onClick={onNext}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Next Question →
          </button>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { QuizQuestion } from '@/components/QuizQuestion';
import { generateRandomQuestion } from '@/lib/quiz/questionGenerator';
import { QuizQuestion as QuizQuestionType, PatternName } from '@/lib/types/candlestick';
import { Trophy, TrendingUp, Target } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';
import Link from 'next/link';

export default function QuizPage() {
  const { isLoaded, isSignedIn } = useUser();

  // Convex mutations and queries
  const startSession = useMutation(api.quiz.startSession);
  const endSession = useMutation(api.quiz.endSession);
  const recordAttempt = useMutation(api.quiz.recordAttempt);
  const currentSession = useQuery(api.quiz.getCurrentSession);

  // Quiz state
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionId, setSessionId] = useState<Id<'sessions'> | null>(null);
  const [score, setScore] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    if (currentSession) {
      setSessionId(currentSession._id);
      setIsSessionActive(true);
      setScore(currentSession.correctAnswers);
      // Generate questions if we don't have any
      if (questions.length === 0) {
        const newQuestions = Array.from({ length: 10 }, () => generateRandomQuestion());
        setQuestions(newQuestions);
        setCurrentQuestionIndex(currentSession.totalQuestions);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSession]);

  // Start a new quiz session
  const handleStartSession = async () => {
    try {
      const newSessionId = await startSession();
      setSessionId(newSessionId);
      setIsSessionActive(true);
      setSessionComplete(false);
      setScore(0);
      setCurrentQuestionIndex(0);
      setFinalScore(null);

      // Generate 10 random questions
      const newQuestions = Array.from({ length: 10 }, () => generateRandomQuestion());
      setQuestions(newQuestions);
    } catch (error) {
      console.error('Failed to start session:', error);
      alert('Failed to start quiz session. Please try again.');
    }
  };

  // Handle answer submission
  const handleAnswer = async (
    selectedAnswer: PatternName,
    isCorrect: boolean,
    responseTime: number
  ) => {
    try {
      if (!sessionId) return;

      // Record the attempt in Convex
      await recordAttempt({
        patternName: selectedAnswer,
        isCorrect,
        responseTime,
        sessionId,
      });

      // Update local score
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Failed to record attempt:', error);
    }
  };

  // Move to next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz complete
      handleEndSession();
    }
  };

  // End the session
  const handleEndSession = async () => {
    try {
      if (!sessionId) return;

      const result = await endSession({ sessionId });
      setFinalScore(result.score);
      setSessionComplete(true);
      setIsSessionActive(false);
    } catch (error) {
      console.error('Failed to end session:', error);
      alert('Failed to end quiz session. Please try again.');
    }
  };

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-md text-center space-y-4">
          <Trophy className="w-16 h-16 text-blue-600 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-800">Quiz</h1>
          <p className="text-gray-600">Please sign in to start the quiz.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  // Session complete screen
  if (sessionComplete && finalScore !== null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
              <p className="text-gray-600">Great job on completing the quiz!</p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-blue-600">{finalScore}%</div>
                <div className="text-sm text-blue-800 font-medium">Accuracy</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-600">
                  {score}/{questions.length}
                </div>
                <div className="text-sm text-green-800 font-medium">Correct Answers</div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleStartSession}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Start New Quiz
              </button>
              <Link
                href="/"
                className="block w-full px-6 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pre-session screen (start quiz)
  if (!isSessionActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Candlestick Pattern Quiz</h1>
              <p className="text-gray-600 text-lg">
                Test your knowledge of The Strat candlestick patterns
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-blue-900 text-lg">Quiz Details:</h2>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>10 questions covering all 10 Strat patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Multiple choice with instant feedback</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Detailed explanations after each answer</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Track your progress and improve over time</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleStartSession}
              className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Start Quiz
            </button>

            <Link
              href="/"
              className="block text-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active quiz screen
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with score */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Quiz Session</h1>
            <p className="text-gray-600">Answer all questions to complete the quiz</p>
          </div>
          <div className="bg-white rounded-xl shadow-md px-6 py-4">
            <div className="text-sm text-gray-600 mb-1">Current Score</div>
            <div className="text-3xl font-bold text-blue-600">
              {score}/{currentQuestionIndex + 1}
            </div>
          </div>
        </div>

        {/* Quiz question */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentQuestion && (
            <QuizQuestion
              question={currentQuestion}
              onAnswer={handleAnswer}
              onNext={handleNext}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          )}
        </div>

        {/* End session button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleEndSession}
            className="text-gray-600 hover:text-gray-800 underline transition-colors"
          >
            End Session Early
          </button>
        </div>
      </div>
    </div>
  );
}

import { QuizQuestion, PatternName } from '../types/candlestick';
import { patternGenerators } from './patternGenerator';
import { getPatternExplanation } from './explanations';

/**
 * All available pattern names
 */
const ALL_PATTERNS: PatternName[] = [
  '1-up',
  '1-down',
  '2-up',
  '2-down',
  '2-up-outside',
  '2-down-outside',
  '3-bullish',
  '3-bearish',
  '3-inside',
  '3-outside',
];

/**
 * Get plausible wrong answers for a given correct pattern
 * Ensures answers are somewhat related to make the quiz challenging
 */
function getWrongAnswers(correctPattern: PatternName): PatternName[] {
  const wrongAnswers: PatternName[] = [];

  // Group patterns by category for plausible wrong answers
  const patternGroups: Record<string, PatternName[]> = {
    type1: ['1-up', '1-down'],
    type2Inside: ['2-up', '2-down'],
    type2Outside: ['2-up-outside', '2-down-outside'],
    type3Directional: ['3-bullish', '3-bearish'],
    type3Other: ['3-inside', '3-outside'],
  };

  // Find the group containing the correct answer
  let correctGroup: PatternName[] = [];
  for (const group of Object.values(patternGroups)) {
    if (group.includes(correctPattern)) {
      correctGroup = group;
      break;
    }
  }

  // Add the opposite from the same group if available
  for (const pattern of correctGroup) {
    if (pattern !== correctPattern && wrongAnswers.length < 3) {
      wrongAnswers.push(pattern);
    }
  }

  // Add patterns from other groups to make 3 wrong answers
  const otherPatterns = ALL_PATTERNS.filter(
    (p) => p !== correctPattern && !wrongAnswers.includes(p)
  );

  while (wrongAnswers.length < 3 && otherPatterns.length > 0) {
    const randomIndex = Math.floor(Math.random() * otherPatterns.length);
    wrongAnswers.push(otherPatterns.splice(randomIndex, 1)[0]);
  }

  return wrongAnswers;
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a quiz question with a specific pattern
 */
export function generateQuestionForPattern(patternName: PatternName): QuizQuestion {
  // Generate the pattern
  const pattern = patternGenerators[patternName]();

  // Get wrong answers
  const wrongAnswers = getWrongAnswers(patternName);

  // Combine and shuffle all answers
  const allAnswers = shuffleArray([patternName, ...wrongAnswers]);

  // Get explanation
  const explanation = getPatternExplanation(patternName);

  return {
    pattern,
    correctAnswer: patternName,
    answers: allAnswers,
    explanation,
  };
}

/**
 * Generate a random quiz question
 */
export function generateRandomQuestion(): QuizQuestion {
  const randomPattern = ALL_PATTERNS[Math.floor(Math.random() * ALL_PATTERNS.length)];
  return generateQuestionForPattern(randomPattern);
}

/**
 * Generate a batch of quiz questions
 */
export function generateQuizQuestions(count: number): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < count; i++) {
    questions.push(generateRandomQuestion());
  }

  return questions;
}

/**
 * Generate a balanced set of questions (ensures each pattern appears at least once)
 */
export function generateBalancedQuestions(count: number): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  // First, ensure each pattern appears at least once
  const shuffledPatterns = shuffleArray([...ALL_PATTERNS]);

  for (const pattern of shuffledPatterns) {
    if (questions.length < count) {
      questions.push(generateQuestionForPattern(pattern));
    }
  }

  // Fill remaining slots with random questions
  while (questions.length < count) {
    questions.push(generateRandomQuestion());
  }

  // Shuffle the final set
  return shuffleArray(questions);
}

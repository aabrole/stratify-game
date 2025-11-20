/**
 * Candlestick Type Definitions
 *
 * Type 1: New high AND new low (outside bar)
 * Type 2: Inside bar (high < previous high AND low > previous low)
 * Type 3: Neither Type 1 nor Type 2 (directional move)
 */

export type CandleType = '1' | '2-up' | '2-down' | '3';

export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  type: CandleType;
}

export type PatternName =
  | '1-up'           // Type 1 bullish (new high, new low)
  | '1-down'         // Type 1 bearish (new high, new low)
  | '2-up'           // Type 2 bullish inside (inside bar trending up)
  | '2-down'         // Type 2 bearish inside (inside bar trending down)
  | '2-up-outside'   // Type 2 bullish outside (outside bar bullish)
  | '2-down-outside' // Type 2 bearish outside (outside bar bearish)
  | '3-bullish'      // Type 3 bullish directional
  | '3-bearish'      // Type 3 bearish directional
  | '3-inside'       // Type 3 inside bar (neutral consolidation)
  | '3-outside';     // Type 3 outside bar (expansion)

export interface CandlePattern {
  candles: [Candle, Candle, Candle]; // Always 3 candles
  patternName: PatternName;
}

export interface QuizAnswer {
  patternName: PatternName;
  isCorrect: boolean;
}

export interface QuizQuestion {
  pattern: CandlePattern;
  correctAnswer: PatternName;
  answers: PatternName[]; // 4 answers total (1 correct + 3 wrong)
  explanation: string;
}

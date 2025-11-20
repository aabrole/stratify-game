import { PatternName } from '../types/candlestick';

/**
 * Detailed explanations for each Strat pattern
 */
export const patternExplanations: Record<PatternName, string> = {
  '1-up':
    'A 1-up pattern features a Type 1 candle (making both a new high AND new low relative to the previous candle) that closes bullishly near its high. This represents strong expansion and bullish momentum breaking out of the previous range.',

  '1-down':
    'A 1-down pattern features a Type 1 candle (making both a new high AND new low) that closes bearishly near its low. This represents strong expansion with bearish momentum, indicating sellers are in control despite the wide range.',

  '2-up':
    'A 2-up pattern shows a Type 2 inside candle (both high and low are contained within the previous candle\'s range) with a bullish close. This is a consolidation pattern that often precedes a bullish breakout, showing buyers stepping in during a pause.',

  '2-down':
    'A 2-down pattern shows a Type 2 inside candle (both high and low are contained within the previous candle\'s range) with a bearish close. This consolidation pattern often precedes a bearish breakdown, indicating sellers gaining control during the pause.',

  '2-up-outside':
    'A 2-up-outside pattern occurs when an inside bar (Type 2) is followed by an outside bar (Type 1) that closes bullishly. This shows consolidation followed by explosive bullish expansion, a powerful continuation signal.',

  '2-down-outside':
    'A 2-down-outside pattern occurs when an inside bar (Type 2) is followed by an outside bar (Type 1) that closes bearishly. This shows consolidation followed by explosive bearish expansion, a strong bearish continuation signal.',

  '3-bullish':
    'A 3-bullish pattern features Type 3 candles showing directional bullish movement. Type 3 candles make either a new high OR a new low (but not both), indicating a trending move with controlled momentum in the bullish direction.',

  '3-bearish':
    'A 3-bearish pattern features Type 3 candles showing directional bearish movement. Type 3 candles make either a new high OR a new low (but not both), indicating a trending move with controlled momentum in the bearish direction.',

  '3-inside':
    'A 3-inside pattern shows Type 3 candles that are consolidating within a range. Unlike Type 2 inside bars, these make partial new highs or lows but stay relatively contained, showing indecision or neutral accumulation/distribution.',

  '3-outside':
    'A 3-outside pattern shows Type 3 candles expanding the range on one side at a time. This represents gradual expansion rather than the explosive Type 1 expansion, showing methodical range extension and potential trend development.',
};

/**
 * Get explanation for a pattern
 */
export function getPatternExplanation(patternName: PatternName): string {
  return patternExplanations[patternName];
}

/**
 * Get a short hint for pattern identification
 */
export function getPatternHint(patternName: PatternName): string {
  const hints: Record<PatternName, string> = {
    '1-up': 'Look for Type 1 (new high + new low) closing bullish',
    '1-down': 'Look for Type 1 (new high + new low) closing bearish',
    '2-up': 'Look for inside bar (Type 2) closing bullish',
    '2-down': 'Look for inside bar (Type 2) closing bearish',
    '2-up-outside': 'Inside bar followed by bullish outside bar',
    '2-down-outside': 'Inside bar followed by bearish outside bar',
    '3-bullish': 'Type 3 directional move upward',
    '3-bearish': 'Type 3 directional move downward',
    '3-inside': 'Type 3 consolidation within range',
    '3-outside': 'Type 3 gradual range expansion',
  };
  return hints[patternName];
}

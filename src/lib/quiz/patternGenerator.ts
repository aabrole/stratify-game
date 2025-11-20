import { Candle, CandlePattern, PatternName, CandleType } from '../types/candlestick';

/**
 * Helper to determine candle type based on relationship with previous candle
 */
function determineCandleType(current: Omit<Candle, 'type'>, previous: Candle): CandleType {
  const isNewHigh = current.high > previous.high;
  const isNewLow = current.low < previous.low;
  const isInside = current.high < previous.high && current.low > previous.low;

  // Type 1: New high AND new low (outside bar)
  if (isNewHigh && isNewLow) {
    return '1';
  }

  // Type 2: Inside bar
  if (isInside) {
    // Determine if bullish or bearish inside
    return current.close > current.open ? '2-up' : '2-down';
  }

  // Type 3: Directional move (neither Type 1 nor Type 2)
  return '3';
}

/**
 * Helper to generate a random candle with realistic OHLC values
 */
function generateBaseCandle(basePrice: number = 100, volatility: number = 5): Omit<Candle, 'type'> {
  const open = basePrice + (Math.random() - 0.5) * volatility;
  const close = open + (Math.random() - 0.5) * volatility * 1.5;

  const highOffset = Math.random() * volatility * 0.5;
  const lowOffset = Math.random() * volatility * 0.5;

  const high = Math.max(open, close) + highOffset;
  const low = Math.min(open, close) - lowOffset;

  return { open, high, low, close };
}

/**
 * Generate a 1-up pattern (Type 1 bullish - outside bar with bullish close)
 */
export function generate1Up(): CandlePattern {
  const candle1: Candle = { ...generateBaseCandle(100, 4), type: '3' };

  // Second candle: Type 1 (outside bar) with bullish bias
  const candle2: Candle = {
    open: candle1.low - 0.5,
    high: candle1.high + 2, // New high
    low: candle1.low - 2,   // New low
    close: candle1.high + 1.5, // Bullish close near high
    type: '1'
  };

  // Third candle: Follow through
  const candle3Base = generateBaseCandle(candle2.close, 3);
  const candle3: Candle = {
    ...candle3Base,
    type: determineCandleType(candle3Base, candle2)
  };

  return {
    candles: [candle1, candle2, candle3],
    patternName: '1-up'
  };
}

/**
 * Generate a 1-down pattern (Type 1 bearish - outside bar with bearish close)
 */
export function generate1Down(): CandlePattern {
  const candle1: Candle = { ...generateBaseCandle(100, 4), type: '3' };

  // Second candle: Type 1 (outside bar) with bearish bias
  const candle2: Candle = {
    open: candle1.high + 0.5,
    high: candle1.high + 2, // New high
    low: candle1.low - 2,   // New low
    close: candle1.low - 1.5, // Bearish close near low
    type: '1'
  };

  // Third candle: Follow through
  const candle3Base = generateBaseCandle(candle2.close, 3);
  const candle3: Candle = {
    ...candle3Base,
    type: determineCandleType(candle3Base, candle2)
  };

  return {
    candles: [candle1, candle2, candle3],
    patternName: '1-down'
  };
}

/**
 * Generate a 2-up pattern (Type 2 bullish inside bar)
 */
export function generate2Up(): CandlePattern {
  const candle1: Candle = { ...generateBaseCandle(100, 5), type: '3' };

  // Second candle: Type 2 inside bar with bullish bias
  const range = candle1.high - candle1.low;
  const candle2: Candle = {
    open: candle1.low + range * 0.3,
    high: candle1.high - range * 0.1, // Inside high
    low: candle1.low + range * 0.2,   // Inside low
    close: candle1.high - range * 0.15, // Bullish close
    type: '2-up'
  };

  // Third candle: Follow through
  const candle3Base = generateBaseCandle(candle2.close, 3);
  const candle3: Candle = {
    ...candle3Base,
    type: determineCandleType(candle3Base, candle2)
  };

  return {
    candles: [candle1, candle2, candle3],
    patternName: '2-up'
  };
}

/**
 * Generate a 2-down pattern (Type 2 bearish inside bar)
 */
export function generate2Down(): CandlePattern {
  const candle1: Candle = { ...generateBaseCandle(100, 5), type: '3' };

  // Second candle: Type 2 inside bar with bearish bias
  const range = candle1.high - candle1.low;
  const candle2: Candle = {
    open: candle1.high - range * 0.3,
    high: candle1.high - range * 0.1, // Inside high
    low: candle1.low + range * 0.1,   // Inside low
    close: candle1.low + range * 0.15, // Bearish close
    type: '2-down'
  };

  // Third candle: Follow through
  const candle3Base = generateBaseCandle(candle2.close, 3);
  const candle3: Candle = {
    ...candle3Base,
    type: determineCandleType(candle3Base, candle2)
  };

  return {
    candles: [candle1, candle2, candle3],
    patternName: '2-down'
  };
}

/**
 * Generate a 2-up-outside pattern (Type 2 bullish outside bar)
 */
export function generate2UpOutside(): CandlePattern {
  const candle1: Candle = { ...generateBaseCandle(100, 3), type: '3' };

  // Second candle: Smaller inside bar
  const range = candle1.high - candle1.low;
  const candle2: Candle = {
    open: candle1.low + range * 0.4,
    high: candle1.high - range * 0.2,
    low: candle1.low + range * 0.3,
    close: candle1.high - range * 0.25,
    type: '2-up'
  };

  // Third candle: Outside bar (Type 1) engulfing previous with bullish close
  const candle3: Candle = {
    open: candle2.low - 0.3,
    high: candle2.high + 1.5,
    low: candle2.low - 1,
    close: candle2.high + 1.2,
    type: '1'
  };

  return {
    candles: [candle1, candle2, candle3],
    patternName: '2-up-outside'
  };
}

/**
 * Generate a 2-down-outside pattern (Type 2 bearish outside bar)
 */
export function generate2DownOutside(): CandlePattern {
  const candle1: Candle = { ...generateBaseCandle(100, 3), type: '3' };

  // Second candle: Smaller inside bar
  const range = candle1.high - candle1.low;
  const candle2: Candle = {
    open: candle1.high - range * 0.4,
    high: candle1.high - range * 0.2,
    low: candle1.low + range * 0.2,
    close: candle1.low + range * 0.25,
    type: '2-down'
  };

  // Third candle: Outside bar (Type 1) engulfing previous with bearish close
  const candle3: Candle = {
    open: candle2.high + 0.3,
    high: candle2.high + 1,
    low: candle2.low - 1.5,
    close: candle2.low - 1.2,
    type: '1'
  };

  return {
    candles: [candle1, candle2, candle3],
    patternName: '2-down-outside'
  };
}

/**
 * Generate a 3-bullish pattern (Type 3 bullish directional)
 */
export function generate3Bullish(): CandlePattern {
  const candle1: Candle = { ...generateBaseCandle(100, 4), type: '3' };

  // Second candle: Type 3 bullish (new high but not new low, or vice versa)
  const candle2: Candle = {
    open: candle1.close + 0.5,
    high: candle1.high + 2,   // New high
    low: candle1.low + 1,     // NOT new low (inside on low)
    close: candle1.high + 1.5, // Bullish close
    type: '3'
  };

  // Third candle: Continue bullish
  const candle3: Candle = {
    open: candle2.close,
    high: candle2.high + 1.5,
    low: candle2.low + 0.5,
    close: candle2.high + 1,
    type: '3'
  };

  return {
    candles: [candle1, candle2, candle3],
    patternName: '3-bullish'
  };
}

/**
 * Generate a 3-bearish pattern (Type 3 bearish directional)
 */
export function generate3Bearish(): CandlePattern {
  const candle1: Candle = { ...generateBaseCandle(100, 4), type: '3' };

  // Second candle: Type 3 bearish
  const candle2: Candle = {
    open: candle1.close - 0.5,
    high: candle1.high - 1,    // NOT new high
    low: candle1.low - 2,      // New low
    close: candle1.low - 1.5,  // Bearish close
    type: '3'
  };

  // Third candle: Continue bearish
  const candle3: Candle = {
    open: candle2.close,
    high: candle2.high - 0.5,
    low: candle2.low - 1.5,
    close: candle2.low - 1,
    type: '3'
  };

  return {
    candles: [candle1, candle2, candle3],
    patternName: '3-bearish'
  };
}

/**
 * Generate a 3-inside pattern (Type 3 inside consolidation)
 */
export function generate3Inside(): CandlePattern {
  const candle1: Candle = { ...generateBaseCandle(100, 5), type: '3' };

  // Second candle: Type 3 inside (consolidation)
  const range = candle1.high - candle1.low;
  const candle2: Candle = {
    open: candle1.low + range * 0.4,
    high: candle1.high - range * 0.3, // Inside but still Type 3
    low: candle1.low + range * 0.1,
    close: candle1.low + range * 0.5,
    type: '3'
  };

  // Third candle: Continue inside consolidation
  const candle3: Candle = {
    open: candle2.close,
    high: candle1.high - range * 0.25,
    low: candle1.low + range * 0.15,
    close: candle1.low + range * 0.45,
    type: '3'
  };

  return {
    candles: [candle1, candle2, candle3],
    patternName: '3-inside'
  };
}

/**
 * Generate a 3-outside pattern (Type 3 outside expansion)
 */
export function generate3Outside(): CandlePattern {
  const candle1: Candle = { ...generateBaseCandle(100, 4), type: '3' };

  // Second candle: Type 3 expansion (one side extends)
  const candle2: Candle = {
    open: candle1.close,
    high: candle1.high + 2,    // New high
    low: candle1.low + 0.5,    // NOT new low
    close: candle1.high + 1.5,
    type: '3'
  };

  // Third candle: Continue expansion
  const candle3: Candle = {
    open: candle2.close,
    high: candle2.high + 1,
    low: candle2.low - 2,      // Now new low (Type 1)
    close: candle2.high + 0.5,
    type: '1'
  };

  return {
    candles: [candle1, candle2, candle3],
    patternName: '3-outside'
  };
}

/**
 * Map of pattern generators
 */
export const patternGenerators: Record<PatternName, () => CandlePattern> = {
  '1-up': generate1Up,
  '1-down': generate1Down,
  '2-up': generate2Up,
  '2-down': generate2Down,
  '2-up-outside': generate2UpOutside,
  '2-down-outside': generate2DownOutside,
  '3-bullish': generate3Bullish,
  '3-bearish': generate3Bearish,
  '3-inside': generate3Inside,
  '3-outside': generate3Outside,
};

/**
 * Generate a random pattern
 */
export function generateRandomPattern(): CandlePattern {
  const patterns = Object.keys(patternGenerators) as PatternName[];
  const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return patternGenerators[randomPattern]();
}

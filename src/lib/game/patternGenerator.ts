export interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

export type PatternType =
  | "2-1-2"   // Reversal pattern
  | "3-1-2"   // Continuation pattern
  | "2-2-2"   // Strong trend continuation
  | "1-1-1"   // Tight consolidation
  | "3-2-2"   // Outside bar reversal
  | "1-2-2"   // Failed breakout reversal
  | "outside" // Generic outside bar
  | "none";   // No pattern

// Helper function to determine candle type based on previous candle
function getCandleType(current: Candle, previous: Candle): 1 | 2 | 3 {
  const breaksHigh = current.high > previous.high;
  const breaksLow = current.low < previous.low;

  if (breaksHigh && breaksLow) {
    return 3; // Outside bar - breaks both high and low
  } else if (breaksHigh || breaksLow) {
    return 2; // Directional bar - breaks either high or low
  } else {
    return 1; // Inside bar - contained within previous range
  }
}

// Generate a 2-1-2 reversal pattern (4 candles total)
export function make212(): { candles: Candle[]; pattern: PatternType } {
  const direction = Math.random() > 0.5 ? "bullish" : "bearish";
  const basePrice = 100 + (Math.random() - 0.5) * 20; // Random base between 90-110
  const candles: Candle[] = [];

  if (direction === "bullish") {
    // Candle 0: Reference candle (setup)
    candles.push({
      open: basePrice + 3,
      close: basePrice + 2,
      high: basePrice + 4,
      low: basePrice,
    });

    // Candle 1: Down bar (Type 2) - breaks low of candle 0
    candles.push({
      open: basePrice + 2,
      close: basePrice - 1,
      high: basePrice + 3,
      low: basePrice - 2,
    });

    // Candle 2: Inside bar (Type 1) - contained within candle 1
    candles.push({
      open: basePrice,
      close: basePrice + 1,
      high: basePrice + 2,
      low: basePrice - 1,
    });

    // Candle 3: Up bar (Type 2) - breaks high of candle 2, reversal signal
    candles.push({
      open: basePrice + 1,
      close: basePrice + 5,
      high: basePrice + 6,
      low: basePrice,
    });
  } else {
    // Candle 0: Reference candle (setup)
    candles.push({
      open: basePrice + 2,
      close: basePrice + 3,
      high: basePrice + 4,
      low: basePrice,
    });

    // Candle 1: Up bar (Type 2) - breaks high of candle 0
    candles.push({
      open: basePrice + 3,
      close: basePrice + 6,
      high: basePrice + 7,
      low: basePrice + 2,
    });

    // Candle 2: Inside bar (Type 1) - contained within candle 1
    candles.push({
      open: basePrice + 5,
      close: basePrice + 4,
      high: basePrice + 6,
      low: basePrice + 3,
    });

    // Candle 3: Down bar (Type 2) - breaks low of candle 2, reversal signal
    candles.push({
      open: basePrice + 4,
      close: basePrice,
      high: basePrice + 5,
      low: basePrice - 1,
    });
  }

  return { candles, pattern: "2-1-2" };
}

// Generate a 3-1-2 continuation pattern (4 candles total)
export function make312(): { candles: Candle[]; pattern: PatternType } {
  const direction = Math.random() > 0.5 ? "bullish" : "bearish";
  const basePrice = 100 + (Math.random() - 0.5) * 20; // Random base between 90-110
  const candles: Candle[] = [];

  if (direction === "bullish") {
    // Candle 0: Reference candle
    candles.push({
      open: basePrice + 2,
      close: basePrice + 3,
      high: basePrice + 4,
      low: basePrice,
    });

    // Candle 1: Outside bar (Type 3) - breaks both high and low of candle 0
    candles.push({
      open: basePrice + 1,
      close: basePrice + 6,
      high: basePrice + 7,
      low: basePrice - 1,
    });

    // Candle 2: Inside bar (Type 1) - contained within candle 1
    candles.push({
      open: basePrice + 4,
      close: basePrice + 5,
      high: basePrice + 6,
      low: basePrice + 3,
    });

    // Candle 3: Up bar (Type 2) - breaks high of candle 2, continuation signal
    candles.push({
      open: basePrice + 5,
      close: basePrice + 9,
      high: basePrice + 10,
      low: basePrice + 4,
    });
  } else {
    // Candle 0: Reference candle
    candles.push({
      open: basePrice + 3,
      close: basePrice + 2,
      high: basePrice + 4,
      low: basePrice,
    });

    // Candle 1: Outside bar (Type 3) - breaks both high and low of candle 0
    candles.push({
      open: basePrice + 6,
      close: basePrice - 1,
      high: basePrice + 7,
      low: basePrice - 2,
    });

    // Candle 2: Inside bar (Type 1) - contained within candle 1
    candles.push({
      open: basePrice + 1,
      close: basePrice,
      high: basePrice + 2,
      low: basePrice - 1,
    });

    // Candle 3: Down bar (Type 2) - breaks low of candle 2, continuation signal
    candles.push({
      open: basePrice,
      close: basePrice - 4,
      high: basePrice + 1,
      low: basePrice - 5,
    });
  }

  return { candles, pattern: "3-1-2" };
}

// Generate a 2-2-2 continuation pattern (strong trend) - NEW
export function make222(): { candles: Candle[]; pattern: PatternType } {
  const direction = Math.random() > 0.5 ? "bullish" : "bearish";
  const basePrice = 100 + (Math.random() - 0.5) * 20;
  const candles: Candle[] = [];

  if (direction === "bullish") {
    // Candle 0: Reference candle
    candles.push({
      open: basePrice,
      close: basePrice + 2,
      high: basePrice + 3,
      low: basePrice - 1,
    });

    // Candle 1: Type 2 - Breaks high (bullish directional)
    candles.push({
      open: basePrice + 2,
      close: basePrice + 5,
      high: basePrice + 6,
      low: basePrice + 1,
    });

    // Candle 2: Type 2 - Breaks high of candle 1 (continuation)
    candles.push({
      open: basePrice + 5,
      close: basePrice + 8,
      high: basePrice + 9,
      low: basePrice + 4,
    });

    // Candle 3: Type 2 - Breaks high of candle 2 (strong trend)
    candles.push({
      open: basePrice + 8,
      close: basePrice + 11,
      high: basePrice + 12,
      low: basePrice + 7,
    });
  } else {
    // Candle 0: Reference candle
    candles.push({
      open: basePrice + 2,
      close: basePrice,
      high: basePrice + 3,
      low: basePrice - 1,
    });

    // Candle 1: Type 2 - Breaks low (bearish directional)
    candles.push({
      open: basePrice,
      close: basePrice - 3,
      high: basePrice + 1,
      low: basePrice - 4,
    });

    // Candle 2: Type 2 - Breaks low of candle 1 (continuation)
    candles.push({
      open: basePrice - 3,
      close: basePrice - 6,
      high: basePrice - 2,
      low: basePrice - 7,
    });

    // Candle 3: Type 2 - Breaks low of candle 2 (strong trend)
    candles.push({
      open: basePrice - 6,
      close: basePrice - 9,
      high: basePrice - 5,
      low: basePrice - 10,
    });
  }

  return { candles, pattern: "2-2-2" };
}

// Generate a 1-1-1 consolidation pattern (tight compression) - NEW
export function make111(): { candles: Candle[]; pattern: PatternType } {
  const basePrice = 100 + (Math.random() - 0.5) * 20;
  const candles: Candle[] = [];

  // Candle 0: Reference candle (larger range)
  candles.push({
    open: basePrice + 1,
    close: basePrice + 5,
    high: basePrice + 6,
    low: basePrice,
  });

  // Candle 1: Type 1 - Inside bar (consolidation begins)
  candles.push({
    open: basePrice + 3,
    close: basePrice + 4,
    high: basePrice + 5,
    low: basePrice + 2,
  });

  // Candle 2: Type 1 - Inside bar within candle 1 (tighter)
  candles.push({
    open: basePrice + 3.5,
    close: basePrice + 3.8,
    high: basePrice + 4.5,
    low: basePrice + 2.5,
  });

  // Candle 3: Type 1 - Inside bar within candle 2 (very tight)
  candles.push({
    open: basePrice + 3.6,
    close: basePrice + 3.7,
    high: basePrice + 4,
    low: basePrice + 3,
  });

  return { candles, pattern: "1-1-1" };
}

// Generate a 3-2-2 reversal pattern (outside bar with reversal) - NEW
export function make322(): { candles: Candle[]; pattern: PatternType } {
  const direction = Math.random() > 0.5 ? "bullish" : "bearish";
  const basePrice = 100 + (Math.random() - 0.5) * 20;
  const candles: Candle[] = [];

  if (direction === "bullish") {
    // Candle 0: Reference candle
    candles.push({
      open: basePrice + 2,
      close: basePrice + 3,
      high: basePrice + 4,
      low: basePrice,
    });

    // Candle 1: Type 3 - Outside bar (high volatility)
    candles.push({
      open: basePrice + 1,
      close: basePrice + 5,
      high: basePrice + 6,
      low: basePrice - 1,
    });

    // Candle 2: Type 2 - Breaks low of candle 1 (bearish directional, fake)
    candles.push({
      open: basePrice + 4,
      close: basePrice,
      high: basePrice + 5,
      low: basePrice - 2,
    });

    // Candle 3: Type 2 - Breaks high of candle 2 (bullish reversal)
    candles.push({
      open: basePrice + 1,
      close: basePrice + 7,
      high: basePrice + 8,
      low: basePrice,
    });
  } else {
    // Candle 0: Reference candle
    candles.push({
      open: basePrice + 3,
      close: basePrice + 2,
      high: basePrice + 4,
      low: basePrice,
    });

    // Candle 1: Type 3 - Outside bar (high volatility)
    candles.push({
      open: basePrice + 5,
      close: basePrice - 1,
      high: basePrice + 6,
      low: basePrice - 2,
    });

    // Candle 2: Type 2 - Breaks high of candle 1 (bullish directional, fake)
    candles.push({
      open: basePrice,
      close: basePrice + 4,
      high: basePrice + 7,
      low: basePrice - 1,
    });

    // Candle 3: Type 2 - Breaks low of candle 2 (bearish reversal)
    candles.push({
      open: basePrice + 3,
      close: basePrice - 3,
      high: basePrice + 4,
      low: basePrice - 4,
    });
  }

  return { candles, pattern: "3-2-2" };
}

// Generate a 1-2-2 reversal pattern (failed breakout) - NEW
export function make122(): { candles: Candle[]; pattern: PatternType } {
  const direction = Math.random() > 0.5 ? "bullish" : "bearish";
  const basePrice = 100 + (Math.random() - 0.5) * 20;
  const candles: Candle[] = [];

  if (direction === "bullish") {
    // Candle 0: Reference candle (larger range)
    candles.push({
      open: basePrice + 1,
      close: basePrice + 5,
      high: basePrice + 6,
      low: basePrice,
    });

    // Candle 1: Type 1 - Inside bar (consolidation)
    candles.push({
      open: basePrice + 3,
      close: basePrice + 4,
      high: basePrice + 5,
      low: basePrice + 2,
    });

    // Candle 2: Type 2 - Breaks low of candle 1 (bearish, false breakdown)
    candles.push({
      open: basePrice + 3,
      close: basePrice,
      high: basePrice + 4,
      low: basePrice - 1,
    });

    // Candle 3: Type 2 - Breaks high of candle 2 (bullish reversal)
    candles.push({
      open: basePrice + 1,
      close: basePrice + 6,
      high: basePrice + 7,
      low: basePrice,
    });
  } else {
    // Candle 0: Reference candle (larger range)
    candles.push({
      open: basePrice + 5,
      close: basePrice + 1,
      high: basePrice + 6,
      low: basePrice,
    });

    // Candle 1: Type 1 - Inside bar (consolidation)
    candles.push({
      open: basePrice + 4,
      close: basePrice + 3,
      high: basePrice + 5,
      low: basePrice + 2,
    });

    // Candle 2: Type 2 - Breaks high of candle 1 (bullish, false breakout)
    candles.push({
      open: basePrice + 3,
      close: basePrice + 6,
      high: basePrice + 7,
      low: basePrice + 2,
    });

    // Candle 3: Type 2 - Breaks low of candle 2 (bearish reversal)
    candles.push({
      open: basePrice + 5,
      close: basePrice,
      high: basePrice + 6,
      low: basePrice - 1,
    });
  }

  return { candles, pattern: "1-2-2" };
}

// Generate an outside bar pattern (4 candles total)
export function makeOutside(): { candles: Candle[]; pattern: PatternType } {
  const direction = Math.random() > 0.5 ? "bullish" : "bearish";
  const basePrice = 100 + (Math.random() - 0.5) * 20; // Random base between 90-110
  const candles: Candle[] = [];

  if (direction === "bullish") {
    // Candle 0: Reference candle
    candles.push({
      open: basePrice + 3,
      close: basePrice + 2,
      high: basePrice + 4,
      low: basePrice,
    });

    // Candle 1: Down bar (Type 2)
    candles.push({
      open: basePrice + 2,
      close: basePrice,
      high: basePrice + 3,
      low: basePrice - 1,
    });

    // Candle 2: Bullish outside bar (Type 3) - engulfs candle 1
    candles.push({
      open: basePrice - 1,
      close: basePrice + 5,
      high: basePrice + 6,
      low: basePrice - 2,
    });

    // Candle 3: Continuation up (Type 2)
    candles.push({
      open: basePrice + 5,
      close: basePrice + 8,
      high: basePrice + 9,
      low: basePrice + 4,
    });
  } else {
    // Candle 0: Reference candle
    candles.push({
      open: basePrice + 2,
      close: basePrice + 3,
      high: basePrice + 4,
      low: basePrice,
    });

    // Candle 1: Up bar (Type 2)
    candles.push({
      open: basePrice + 3,
      close: basePrice + 5,
      high: basePrice + 6,
      low: basePrice + 2,
    });

    // Candle 2: Bearish outside bar (Type 3) - engulfs candle 1
    candles.push({
      open: basePrice + 6,
      close: basePrice,
      high: basePrice + 7,
      low: basePrice - 1,
    });

    // Candle 3: Continuation down (Type 2)
    candles.push({
      open: basePrice,
      close: basePrice - 3,
      high: basePrice + 1,
      low: basePrice - 4,
    });
  }

  return { candles, pattern: "outside" };
}

// Generate random candles with no valid pattern (4 candles total)
export function makeRandom(): { candles: Candle[]; pattern: PatternType } {
  const basePrice = 100 + (Math.random() - 0.5) * 20;
  const candles: Candle[] = [];

  // Generate 4 random candles with no specific Strat pattern
  for (let i = 0; i < 4; i++) {
    const isGreen = Math.random() > 0.5;
    const bodySize = Math.random() * 4 + 1;
    const wickSize = Math.random() * 2 + 0.5;

    const open = basePrice + (Math.random() - 0.5) * 8 + i;
    const close = isGreen ? open + bodySize : open - bodySize;
    const high = Math.max(open, close) + wickSize;
    const low = Math.min(open, close) - wickSize;

    candles.push({ open, close, high, low });
  }

  return { candles, pattern: "none" };
}

// Main generator - randomly picks one of the patterns
export function generatePattern(): { candles: Candle[]; pattern: PatternType } {
  const patterns = [
    make212,    // 2-1-2 Reversal
    make312,    // 3-1-2 Continuation
    make222,    // 2-2-2 Strong Trend (NEW)
    make111,    // 1-1-1 Consolidation (NEW)
    make322,    // 3-2-2 Reversal (NEW)
    make122,    // 1-2-2 Failed Breakout (NEW)
    makeOutside, // Generic Outside Bar
    makeRandom  // No Pattern
  ];
  const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return randomPattern();
}

// Utility function to verify pattern (for debugging/testing)
export function verifyPattern(candles: Candle[]): string {
  if (candles.length !== 4) {
    return "Invalid: Need exactly 4 candles";
  }

  const types = [];
  for (let i = 1; i < candles.length; i++) {
    types.push(getCandleType(candles[i], candles[i - 1]));
  }

  return `Pattern: ${types.join('-')} (${types[0]}-${types[1]}-${types[2]})`;
}

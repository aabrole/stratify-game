export interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

export type PatternType = "2-1-2" | "3-1-2" | "outside" | "none";

// Generate a 2-1-2 reversal pattern
export function make212(): { candles: Candle[]; pattern: PatternType } {
  const direction = Math.random() > 0.5 ? "bullish" : "bearish";
  const basePrice = 100 + (Math.random() - 0.5) * 20; // Random base between 90-110
  const candles: Candle[] = [];

  if (direction === "bullish") {
    // Bar 1: Down bar (2-bar)
    candles.push({
      open: basePrice + 4,
      close: basePrice,
      high: basePrice + 5,
      low: basePrice - 1,
    });

    // Bar 2: Inside bar (1-bar)
    candles.push({
      open: basePrice + 1,
      close: basePrice + 2,
      high: basePrice + 3,
      low: basePrice,
    });

    // Bar 3: Up bar (2-bar) - reversal
    candles.push({
      open: basePrice + 2,
      close: basePrice + 6,
      high: basePrice + 7,
      low: basePrice + 1,
    });
  } else {
    // Bar 1: Up bar (2-bar)
    candles.push({
      open: basePrice,
      close: basePrice + 4,
      high: basePrice + 5,
      low: basePrice - 1,
    });

    // Bar 2: Inside bar (1-bar)
    candles.push({
      open: basePrice + 3,
      close: basePrice + 2,
      high: basePrice + 4,
      low: basePrice + 1,
    });

    // Bar 3: Down bar (2-bar) - reversal
    candles.push({
      open: basePrice + 2,
      close: basePrice - 2,
      high: basePrice + 3,
      low: basePrice - 3,
    });
  }

  return { candles, pattern: "2-1-2" };
}

// Generate a 3-1-2 continuation pattern
export function make312(): { candles: Candle[]; pattern: PatternType } {
  const direction = Math.random() > 0.5 ? "bullish" : "bearish";
  const basePrice = 100 + (Math.random() - 0.5) * 20; // Random base between 90-110
  const candles: Candle[] = [];

  if (direction === "bullish") {
    // Bar 1: Up bar outside (3-bar)
    candles.push({
      open: basePrice,
      close: basePrice + 6,
      high: basePrice + 7,
      low: basePrice - 1,
    });

    // Bar 2: Inside bar (1-bar)
    candles.push({
      open: basePrice + 4,
      close: basePrice + 5,
      high: basePrice + 6,
      low: basePrice + 3,
    });

    // Bar 3: Up bar (2-bar) - continuation
    candles.push({
      open: basePrice + 5,
      close: basePrice + 8,
      high: basePrice + 9,
      low: basePrice + 4,
    });
  } else {
    // Bar 1: Down bar outside (3-bar)
    candles.push({
      open: basePrice + 6,
      close: basePrice,
      high: basePrice + 7,
      low: basePrice - 1,
    });

    // Bar 2: Inside bar (1-bar)
    candles.push({
      open: basePrice + 2,
      close: basePrice + 1,
      high: basePrice + 3,
      low: basePrice,
    });

    // Bar 3: Down bar (2-bar) - continuation
    candles.push({
      open: basePrice + 1,
      close: basePrice - 2,
      high: basePrice + 2,
      low: basePrice - 3,
    });
  }

  return { candles, pattern: "3-1-2" };
}

// Generate an outside bar pattern
export function makeOutside(): { candles: Candle[]; pattern: PatternType } {
  const direction = Math.random() > 0.5 ? "bullish" : "bearish";
  const basePrice = 100 + (Math.random() - 0.5) * 20; // Random base between 90-110
  const candles: Candle[] = [];

  if (direction === "bullish") {
    // Bar 1: Down bar
    candles.push({
      open: basePrice + 4,
      close: basePrice + 1,
      high: basePrice + 5,
      low: basePrice,
    });

    // Bar 2: Bullish outside bar - engulfs previous bar
    candles.push({
      open: basePrice,
      close: basePrice + 6,
      high: basePrice + 7,
      low: basePrice - 1,
    });

    // Bar 3: Continuation up
    candles.push({
      open: basePrice + 6,
      close: basePrice + 8,
      high: basePrice + 9,
      low: basePrice + 5,
    });
  } else {
    // Bar 1: Up bar
    candles.push({
      open: basePrice + 1,
      close: basePrice + 4,
      high: basePrice + 5,
      low: basePrice,
    });

    // Bar 2: Bearish outside bar - engulfs previous bar
    candles.push({
      open: basePrice + 6,
      close: basePrice,
      high: basePrice + 7,
      low: basePrice - 1,
    });

    // Bar 3: Continuation down
    candles.push({
      open: basePrice,
      close: basePrice - 2,
      high: basePrice + 1,
      low: basePrice - 3,
    });
  }

  return { candles, pattern: "outside" };
}

// Generate random candles with no valid pattern
export function makeRandom(): { candles: Candle[]; pattern: PatternType } {
  const basePrice = 100;
  const candles: Candle[] = [];

  // Generate 3 random candles with no specific pattern
  for (let i = 0; i < 3; i++) {
    const isGreen = Math.random() > 0.5;
    const bodySize = Math.random() * 4 + 1;
    const wickSize = Math.random() * 2 + 0.5;

    const open = basePrice + (Math.random() - 0.5) * 4;
    const close = isGreen ? open + bodySize : open - bodySize;
    const high = Math.max(open, close) + wickSize;
    const low = Math.min(open, close) - wickSize;

    candles.push({ open, close, high, low });
  }

  return { candles, pattern: "none" };
}

// Main generator - randomly picks one of the patterns
export function generatePattern(): { candles: Candle[]; pattern: PatternType } {
  const patterns = [make212, make312, makeOutside, makeRandom];
  const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return randomPattern();
}

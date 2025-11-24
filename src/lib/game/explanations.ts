import { PatternType } from "./patternGenerator";

export interface PatternExplanation {
  title: string;
  description: string;
  logic: string;
  whyItWorks: string;
  riskLevel: "Low" | "Medium" | "High";
}

export const PATTERN_EXPLANATIONS: Record<PatternType, PatternExplanation> = {
  "2-1-2": {
    title: "2-1-2 Reversal",
    description:
      "A powerful reversal pattern consisting of a directional bar (2), an inside bar (1), and a reversal bar (2) that breaks in the opposite direction.",
    logic:
      "The first 2-bar sets the initial direction. The inside bar (1) shows consolidation and indecision. The final 2-bar breaks the opposite way, signaling a reversal of the prior trend.",
    whyItWorks:
      "This pattern works because it represents a shift in market sentiment. The inside bar shows weakening momentum in the original direction, followed by strong momentum in the opposite direction. Traders who entered on the first 2-bar often get trapped, creating fuel for the reversal move.",
    riskLevel: "Medium",
  },
  "3-1-2": {
    title: "3-1-2 Continuation",
    description:
      "A continuation pattern that starts with an outside bar (3), consolidates with an inside bar (1), then continues with a directional bar (2) in the same direction as the 3-bar.",
    logic:
      "The 3-bar (outside bar) shows strong momentum and expansion. The inside bar (1) represents a healthy pullback or consolidation. The 2-bar continuation confirms the original direction and provides an entry point.",
    whyItWorks:
      "This pattern is powerful because the 3-bar establishes a strong directional bias and often represents institutional participation. The inside bar allows for a lower-risk entry after the pullback, and the 2-bar confirms continuation with reduced risk compared to entering on the 3-bar.",
    riskLevel: "Low",
  },
  "2-2-2": {
    title: "2-2-2 Strong Trend",
    description:
      "Three consecutive directional bars in the same direction, each breaking the high or low of the previous bar. This is a broadening formation showing strong trending market.",
    logic:
      "Each bar is a Type 2 (directional), breaking in the same direction. First bar breaks the reference candle, second bar breaks the first, third bar breaks the second - creating higher highs (bullish) or lower lows (bearish).",
    whyItWorks:
      "The 2-2-2 pattern represents pure momentum and trend strength. Each successive break confirms growing participation and commitment in that direction. This is what Rob Smith calls a 'broadening formation' - the universal truth that strong trends make higher highs or lower lows. Pullbacks to previous bar levels offer excellent continuation entries.",
    riskLevel: "Low",
  },
  "1-1-1": {
    title: "1-1-1 Consolidation",
    description:
      "Three consecutive inside bars, each contained within the previous bar's range. This shows extreme compression and coiling before an explosive move.",
    logic:
      "Each bar is a Type 1 (inside bar), getting progressively tighter. The first inside bar shows initial consolidation, the second shows continued compression, and the third shows extreme tightness - like a coiled spring.",
    whyItWorks:
      "The 1-1-1 pattern works because it represents maximum compression and indecision before a directional resolution. The tighter the compression, the more explosive the eventual breakout. This is often seen before major news events or at key support/resistance levels. Traders are waiting, creating a powder keg that explodes when triggered. Entry comes on the break of the consolidation range.",
    riskLevel: "High",
  },
  "3-2-2": {
    title: "3-2-2 Outside Reversal",
    description:
      "An outside bar (3) followed by a directional move (2) that fails, then a strong reversal (2) in the opposite direction. Shows failed follow-through after expansion.",
    logic:
      "The 3-bar creates high volatility and expansion. The first 2-bar attempts to follow through in one direction but fails. The second 2-bar reverses strongly in the opposite direction, trapping traders who chased the first 2-bar.",
    whyItWorks:
      "This pattern is effective because the outside bar creates uncertainty and draws in traders on both sides. When the first directional move fails (false breakout), it triggers stops and creates fuel for the reversal move. The failed follow-through after expansion is a powerful signal that the other direction has control. This often happens at major support/resistance levels.",
    riskLevel: "Medium",
  },
  "1-2-2": {
    title: "1-2-2 Failed Breakout",
    description:
      "An inside bar (1) followed by a false breakout (2) in one direction, then a strong reversal (2) in the opposite direction. Classic bull or bear trap pattern.",
    logic:
      "The inside bar shows consolidation. The first 2-bar breaks out of the consolidation, appearing to signal direction. The second 2-bar reverses this breakout, trapping traders who entered on the initial break.",
    whyItWorks:
      "Failed breakouts are one of the most reliable patterns in trading. The inside bar builds anticipation. The false breakout (first 2-bar) draws in breakout traders and triggers stops on the opposite side. When this fails, all those traders are trapped and must exit, creating strong momentum for the reversal (second 2-bar). This is how market makers hunt stops before the real move.",
    riskLevel: "Low",
  },
  outside: {
    title: "Outside Bar (Type 3)",
    description:
      "A single bar that engulfs the previous bar, with both a higher high and lower low. This shows expansion and often precedes strong directional moves.",
    logic:
      "The outside bar completely engulfs the previous bar's range, indicating increased volatility and participation. The direction of the close (bullish or bearish) often determines the next move.",
    whyItWorks:
      "Outside bars work because they represent a surge in market participation and volatility. They often occur at support/resistance levels or after periods of consolidation. The engulfing nature traps traders on the wrong side and creates strong momentum in the breakout direction. Rob Smith emphasizes that outside bars cannot sustain - they must resolve directionally.",
    riskLevel: "Medium",
  },
  none: {
    title: "No Valid Pattern",
    description:
      "These candles don't form any of the key Strat patterns. Not every price action forms a tradeable setup.",
    logic:
      "Without a clear pattern structure (like 2-1-2, 3-1-2, 2-2-2, 1-1-1, etc.), there's no defined edge or high-probability setup to trade. The candles may show random movement or incomplete pattern formation.",
    whyItWorks:
      "Recognizing when there's NO pattern is just as important as identifying valid patterns. This discipline prevents overtrading and helps you wait for high-probability setups. The market doesn't always provide clear signals, and patience is a critical skill. Rob Smith teaches that you should only trade when patterns align with timeframe continuity - if there's no pattern, there's no trade.",
    riskLevel: "High",
  },
};

export interface TutorialTopic {
  id: string;
  title: string;
  content: string;
}

export const TUTORIAL_TOPICS: TutorialTopic[] = [
  {
    id: "strat-numbering",
    title: "The Strat Numbering System",
    content: `Rob Smith's Strat uses a simple 1-2-3 numbering system to classify every candle based on its relationship to the PREVIOUS candle's range:

**Type 1 (Inside Bar):**
• High and low are BOTH inside the previous candle's range
• Shows consolidation, compression, or indecision
• Example: Previous candle 100-110, current candle 103-107

**Type 2 (Directional Bar):**
• Breaks EITHER the high OR the low (not both)
• Shows directional momentum
• Bullish 2: Breaks the high
• Bearish 2: Breaks the low

**Type 3 (Outside Bar):**
• Breaks BOTH the high AND the low
• Shows expansion and volatility
• Engulfs the previous candle completely

Every candle is numbered relative to the one before it. Patterns are sequences like 2-1-2, 3-1-2, 2-2-2, etc.`,
  },
  {
    id: "broadening-formation",
    title: "Broadening Formation",
    content: `Rob Smith's concept of broadening formation is fundamental to The Strat:

**Universal Truth:** Price always breaks ranges. It makes higher highs and lower lows.

**What is a Broadening Formation?**
A series of candles that continue breaking in the same direction, creating expansion. This is seen in 2-2-2 patterns where each bar breaks the previous bar's high (bullish) or low (bearish).

**Why It Matters:**
• Shows strong trending market
• Each break confirms momentum
• Provides clear entry levels (previous bar's high/low)
• Offers defined risk (opposite side of previous bar)

**Trading Broadening Formations:**
1. Wait for pullback to previous bar's range
2. Enter on break of that bar in trend direction
3. Stop loss on opposite side of entry bar
4. Target: Next resistance/support or continuation

The more consecutive breaks, the stronger the trend. A 2-2-2 is stronger than a single 2-bar.`,
  },
  {
    id: "timeframe-continuity",
    title: "Timeframe Continuity",
    content: `Timeframe continuity is when multiple timeframes align in the same direction. This dramatically increases the probability of success.

**Key principle:** Trade in the direction of the higher timeframe.

**Example of Perfect Continuity:**
• Daily chart: Bullish 2-2-2 trend
• 4-hour chart: Bullish 3-1-2 continuation
• 1-hour chart: Bullish 2-1-2 reversal up

**Why Timeframe Continuity Works:**
• Aligns with institutional order flow
• Reduces counter-trend risk
• Provides multiple layers of support/resistance
• Higher timeframes are harder to reverse

**How to Check Continuity:**
1. Start with higher timeframe (daily/weekly)
2. Identify the trend direction
3. Drop to lower timeframes
4. Only trade patterns that align with higher timeframe

**Discontinuity (Avoid):**
When timeframes conflict (daily bullish but 1-hour bearish), wait for alignment. Rob Smith emphasizes: only trade when timeframes agree.`,
  },
  {
    id: "reversals-vs-continuations",
    title: "Reversal vs Continuation Patterns",
    content: `Understanding the difference between reversal and continuation patterns is crucial:

**Reversal Patterns:**
• 2-1-2: Direction changes after inside bar
• 1-2-2: Failed breakout reversal
• 3-2-2: Failed follow-through after outside bar

**Characteristics:**
• Change market direction
• Often occur at support/resistance
• Higher risk but bigger reward
• Need confirmation from higher timeframes

**Continuation Patterns:**
• 3-1-2: Outside bar with pullback then continuation
• 2-2-2: Strong trend continuation
• 2-1-2 with timeframe continuity

**Characteristics:**
• Continue existing trend
• Lower risk when aligned with higher timeframes
• More reliable than reversals
• Better risk/reward with pullback entries

**Trading Strategy:**
Prefer continuation patterns that align with higher timeframe trends. Only take reversals when you have strong confluence (support/resistance, divergence, multiple timeframe alignment).

Rob Smith's rule: "Don't fight the trend" - continuations with timeframe continuity have the highest win rate.`,
  },
  {
    id: "entry-exit-stops",
    title: "Entry, Exit & Stop Loss Placement",
    content: `Proper trade management is essential for The Strat:

**Entry Points:**
• 2-1-2: Enter on break of inside bar in reversal direction
• 3-1-2: Enter on break of inside bar in continuation direction
• 2-2-2: Enter on pullback to previous bar's range
• 1-1-1: Enter on break of consolidation range (either direction)
• 1-2-2 & 3-2-2: Enter on second 2-bar reversal

**Stop Loss Placement:**
• Always below/above the entry candle's range
• For inside bar breaks: Stop on opposite side of inside bar
• For 2-2-2: Stop below/above previous bar's low/high
• For outside bar patterns: Stop on opposite extreme of outside bar
• Never risk more than 1-2% of account per trade

**Profit Targets:**
• First target: Previous swing high/low
• Second target: Higher timeframe support/resistance
• Trail stop: Move to breakeven after 1R, trail at previous bar lows/highs
• Exit: If pattern fails or timeframe continuity breaks

**Risk/Reward:**
Minimum 2:1 risk/reward. With good entries using inside bar breakouts, 3:1 or better is achievable.`,
  },
];

export function getExplanation(pattern: PatternType): PatternExplanation {
  return PATTERN_EXPLANATIONS[pattern];
}

export function getTutorialTopic(id: string): TutorialTopic | undefined {
  return TUTORIAL_TOPICS.find((topic) => topic.id === id);
}

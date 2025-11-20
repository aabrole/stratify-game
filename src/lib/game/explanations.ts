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
  outside: {
    title: "Outside Bar",
    description:
      "A single bar that engulfs the previous bar, with both a higher high and lower low. This shows expansion and often precedes strong directional moves.",
    logic:
      "The outside bar completely engulfs the previous bar's range, indicating increased volatility and participation. The direction of the close (bullish or bearish) often determines the next move.",
    whyItWorks:
      "Outside bars work because they represent a surge in market participation and volatility. They often occur at support/resistance levels or after periods of consolidation. The engulfing nature traps traders on the wrong side and creates strong momentum in the breakout direction.",
    riskLevel: "Medium",
  },
  none: {
    title: "No Valid Pattern",
    description:
      "These candles don't form any of the key Strat patterns. Not every price action forms a tradeable setup.",
    logic:
      "Without a clear pattern structure (like 2-1-2, 3-1-2, or outside bars), there's no defined edge or high-probability setup to trade.",
    whyItWorks:
      "Recognizing when there's NO pattern is just as important as identifying valid patterns. This discipline prevents overtrading and helps you wait for high-probability setups. The market doesn't always provide clear signals, and patience is a critical skill.",
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
    id: "50-retrace",
    title: "50% Retrace Entry",
    content: `The 50% retrace is a key concept in The Strat. After a strong directional move (like a 3-bar or 2-bar), waiting for price to retrace 50% of that move before entering provides a better risk/reward setup.

Why it works:
• Reduces risk by entering closer to support/resistance
• Confirms that the move has "legs" if it holds the 50% level
• Provides a clear invalidation point if 50% fails
• Often aligns with institutional entry points

Example: If a bullish 3-bar goes from 100 to 110, wait for price to retrace to 105 (50%) before entering long. This gives you a better entry than chasing at 110.`,
  },
  {
    id: "timeframe-continuity",
    title: "Timeframe Continuity",
    content: `Timeframe continuity is when multiple timeframes align in the same direction. This dramatically increases the probability of success.

Key principle: Trade in the direction of the higher timeframe.

Example of continuity:
• Daily chart: Bullish 3-1-2 continuation
• 4-hour chart: Bullish 2-1-2 reversal
• 1-hour chart: Bullish outside bar

When all timeframes align bullish (or bearish), the probability of a successful trade increases significantly. This is because you're trading WITH the larger market forces, not against them.

Always check at least 2-3 timeframes before entering a trade.`,
  },
  {
    id: "htf-bias",
    title: "Higher Timeframe Bias",
    content: `The higher timeframe (HTF) bias is the directional tendency shown on larger timeframes like daily, weekly, or monthly charts. This bias acts as the "wind at your back."

Why HTF matters:
• Institutional traders operate on higher timeframes
• HTF trends are harder to reverse
• Trading with HTF bias increases win rate
• Going against HTF requires exceptional lower timeframe setups

How to use HTF bias:
1. Identify the trend on daily/weekly charts
2. Look for lower timeframe entries in that direction
3. Avoid counter-trend trades unless you have strong confluence
4. Use HTF support/resistance for targets and stops

Remember: "The trend is your friend" - and the HTF shows you the true trend.`,
  },
];

export function getExplanation(pattern: PatternType): PatternExplanation {
  return PATTERN_EXPLANATIONS[pattern];
}

export function getTutorialTopic(id: string): TutorialTopic | undefined {
  return TUTORIAL_TOPICS.find((topic) => topic.id === id);
}

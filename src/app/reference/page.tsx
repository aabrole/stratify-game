'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, TrendingUp, TrendingDown, Minus, Layers } from 'lucide-react';
import Link from 'next/link';

export default function ReferencePage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <BookOpen className="h-10 w-10 text-blue-600" />
            The Strat Pattern Reference Library
          </h1>
          <p className="text-lg text-gray-600">
            Complete guide to Rob Smith's Strat methodology with pattern definitions and trading strategies
          </p>
        </div>

        <Accordion type="multiple" defaultValue={['universal-truths', 'candle-types', 'reversal-patterns']} className="space-y-4">

          {/* Universal Truths Section */}
          <AccordionItem value="universal-truths" className="bg-white rounded-lg border-2 border-blue-200">
            <AccordionTrigger className="px-6 py-4 text-2xl font-bold hover:no-underline text-blue-700">
              The 3 Universal Truths of The Strat
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Rob Smith discovered that the market only moves in <strong>three ways</strong>. These are universal truths that always occur and repeat on every timeframe and in every market. Mastering these three patterns is the foundation of The Strat.
                </p>

                {/* Truth 1: Inward Consolidation */}
                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Minus className="h-5 w-5 text-yellow-600" />
                      1. Inward Consolidation (Inside Bars)
                    </CardTitle>
                    <CardDescription>Type 1 - Compression before expansion</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-700">
                      Before making big decisions, <strong>prices always move inward</strong>. Each successive wave becomes shorter than the previous wave. On a candlestick chart, this appears as <strong>inside bars</strong> where the high and low are both contained within the previous candle's range.
                    </p>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="font-semibold text-yellow-800 mb-2">Key Characteristics:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Represents market indecision and consolidation</li>
                        <li>Tighter range = more compression = bigger breakout potential</li>
                        <li>Breakout direction signals the next major move</li>
                        <li>Often forms before trend reversals or continuations</li>
                      </ul>
                    </div>
                    <p className="text-sm italic text-gray-600">
                      Trading Strategy: Wait for the break of the inside bar range. The direction of the break tells you where the market wants to go.
                    </p>
                  </CardContent>
                </Card>

                {/* Truth 2: Up/Down Trend */}
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      2. Up/Down Price Trend (Directional Bars)
                    </CardTitle>
                    <CardDescription>Type 2 - Directional momentum</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-700">
                      "Trend is your friend." When the market is trending, prices make <strong>higher highs (bullish) or lower lows (bearish)</strong>. This is where traders should focus their entries - trading WITH the trend, not against it.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="font-semibold text-green-800 mb-2">Key Characteristics:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Shows dominance of buyers (bullish) or sellers (bearish)</li>
                        <li>Each candle breaks either the high OR the low of the previous candle</li>
                        <li>Consecutive 2-bars create broadening formations</li>
                        <li>Best conditions for entering trades</li>
                      </ul>
                    </div>
                    <p className="text-sm italic text-gray-600">
                      Trading Strategy: Enter on pullbacks to previous candle ranges, or on breaks in the trend direction. Always trade with the higher timeframe trend.
                    </p>
                  </CardContent>
                </Card>

                {/* Truth 3: Broadening Formation */}
                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-purple-600" />
                      3. Broadening Formation (Outside Bars)
                    </CardTitle>
                    <CardDescription>Type 3 - Expansion and volatility</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-700">
                      When price <strong>expands and breaks both the previous high AND low</strong>, a broadening pattern forms. This creates an outside bar (engulfing pattern) that shows high volatility and often precedes major directional moves.
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <p className="font-semibold text-purple-800 mb-2">Key Characteristics:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Breaks BOTH high and low of previous candle (engulfing)</li>
                        <li>Shows increased volatility and participation</li>
                        <li>Often "hunts stops" - traps traders on both sides</li>
                        <li>Creates liquidity before major trends</li>
                        <li>Cannot sustain - must resolve directionally</li>
                      </ul>
                    </div>
                    <p className="text-sm italic text-gray-600">
                      Trading Strategy: Wait for the outside bar to resolve. The direction of the close often indicates the next major move. Use these for trend reversal or continuation setups.
                    </p>
                  </CardContent>
                </Card>

                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                  <p className="font-semibold text-blue-900 mb-2">The Bottom Line:</p>
                  <p className="text-gray-700">
                    These three universal truths occur on EVERY timeframe and in EVERY market. When you combine them with <strong>timeframe continuity</strong> (alignment across multiple timeframes) and <strong>actionable signals</strong> (specific entry patterns), you get high-probability Strat trading setups.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <Separator className="my-6" />

          {/* Candle Type Definitions */}
          <AccordionItem value="candle-types" className="bg-white rounded-lg border-2 border-gray-200">
            <AccordionTrigger className="px-6 py-4 text-2xl font-bold hover:no-underline">
              Candle Numbering System (Type 1, 2, 3)
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Every candle in The Strat is numbered <strong>1, 2, or 3</strong> based on its relationship to the <strong>PREVIOUS candle's range</strong> (high to low). This simple numbering system allows you to quickly identify patterns and market conditions.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Type 1 */}
                  <Card className="border-2 border-yellow-400">
                    <CardHeader className="bg-yellow-50">
                      <CardTitle className="flex items-center gap-2 text-yellow-800">
                        <Minus className="h-6 w-6" />
                        Type 1
                      </CardTitle>
                      <CardDescription className="font-semibold">Inside Bar</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      <div className="bg-yellow-100 p-3 rounded text-center">
                        <p className="font-mono font-bold text-yellow-900">High & Low INSIDE</p>
                      </div>
                      <p className="text-sm text-gray-700">
                        Both the high and low are <strong>contained within</strong> the previous candle's range.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold text-gray-800">Indicates:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>Consolidation</li>
                          <li>Compression</li>
                          <li>Indecision</li>
                          <li>Pause before breakout</li>
                        </ul>
                      </div>
                      <p className="text-xs italic text-gray-500">
                        Example: Prev candle 100-110, current candle 103-107 → Type 1
                      </p>
                    </CardContent>
                  </Card>

                  {/* Type 2 */}
                  <Card className="border-2 border-green-400">
                    <CardHeader className="bg-green-50">
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <TrendingUp className="h-6 w-6" />
                        Type 2
                      </CardTitle>
                      <CardDescription className="font-semibold">Directional Bar</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      <div className="bg-green-100 p-3 rounded text-center">
                        <p className="font-mono font-bold text-green-900">Breaks HIGH or LOW</p>
                        <p className="text-xs text-green-700">(not both)</p>
                      </div>
                      <p className="text-sm text-gray-700">
                        Breaks <strong>either</strong> the high OR the low of the previous candle.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold text-gray-800">Indicates:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>Directional movement</li>
                          <li>Trend continuation</li>
                          <li>Momentum</li>
                          <li>Breakout direction</li>
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-green-200 p-2 rounded">
                          <p className="font-semibold">Bullish 2:</p>
                          <p>Breaks the high ↑</p>
                        </div>
                        <div className="bg-red-200 p-2 rounded">
                          <p className="font-semibold">Bearish 2:</p>
                          <p>Breaks the low ↓</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Type 3 */}
                  <Card className="border-2 border-purple-400">
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="flex items-center gap-2 text-purple-800">
                        <Layers className="h-6 w-6" />
                        Type 3
                      </CardTitle>
                      <CardDescription className="font-semibold">Outside Bar</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      <div className="bg-purple-100 p-3 rounded text-center">
                        <p className="font-mono font-bold text-purple-900">Breaks HIGH & LOW</p>
                        <p className="text-xs text-purple-700">(both)</p>
                      </div>
                      <p className="text-sm text-gray-700">
                        Breaks <strong>BOTH</strong> the high AND the low of the previous candle (engulfing).
                      </p>
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold text-gray-800">Indicates:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>Volatility expansion</li>
                          <li>High volume activity</li>
                          <li>Stop hunting</li>
                          <li>Reversal potential</li>
                        </ul>
                      </div>
                      <p className="text-xs italic text-gray-500 bg-purple-50 p-2 rounded">
                        Rob Smith's rule: "Outside bars cannot sustain - they must resolve."
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                  <p className="font-semibold text-gray-900 mb-2">How Patterns Work:</p>
                  <p className="text-gray-700">
                    Strat patterns are <strong>sequences of these numbered candles</strong>. For example, a <code className="bg-gray-200 px-2 py-1 rounded">2-1-2</code> pattern means:
                    Type 2 (directional) → Type 1 (inside bar) → Type 2 (reversal direction). Each pattern tells a story about market structure and provides actionable trading signals.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <Separator className="my-6" />

          {/* Reversal Patterns */}
          <AccordionItem value="reversal-patterns" className="bg-white rounded-lg border-2 border-red-200">
            <AccordionTrigger className="px-6 py-4 text-2xl font-bold hover:no-underline text-red-700">
              Reversal Patterns
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid md:grid-cols-2 gap-6">

                {/* 2-1-2 Reversal */}
                <PatternDefinitionCard
                  patternName="2-1-2 Reversal"
                  patternCode="2-1-2"
                  riskLevel="Medium"
                  description="The classic Strat reversal pattern. A directional move, followed by consolidation (inside bar), then a reversal in the opposite direction."
                  structure={[
                    "Candle 1: Type 2 - Directional move (sets initial direction)",
                    "Candle 2: Type 1 - Inside bar (consolidation/pause)",
                    "Candle 3: Type 2 - Breaks opposite direction (reversal)"
                  ]}
                  entry="Enter on break of inside bar in the reversal direction"
                  stopLoss="Opposite side of the inside bar"
                  whyItWorks="The inside bar shows weakening momentum in the original direction. When it breaks the opposite way, it traps traders from the first move and creates strong reversal momentum."
                />

                {/* 1-2-2 Failed Breakout */}
                <PatternDefinitionCard
                  patternName="1-2-2 Failed Breakout"
                  patternCode="1-2-2"
                  riskLevel="Low"
                  description="A bull or bear trap pattern. Inside bar breaks out one direction (false breakout), then reverses sharply."
                  structure={[
                    "Candle 1: Type 1 - Inside bar (consolidation)",
                    "Candle 2: Type 2 - Breaks out (false signal)",
                    "Candle 3: Type 2 - Reverses breakout (trap sprung)"
                  ]}
                  entry="Enter on the reversal (second 2-bar)"
                  stopLoss="Extreme of the false breakout candle"
                  whyItWorks="False breakouts trap breakout traders. When they fail, all those traders must exit, creating strong momentum for the reversal. This is how market makers hunt stops."
                />

                {/* 3-2-2 Outside Reversal */}
                <PatternDefinitionCard
                  patternName="3-2-2 Outside Reversal"
                  patternCode="3-2-2"
                  riskLevel="Medium"
                  description="An outside bar followed by a failed directional move, then strong reversal. Shows rejection after volatility expansion."
                  structure={[
                    "Candle 1: Type 3 - Outside bar (expansion/volatility)",
                    "Candle 2: Type 2 - Attempts follow-through (fails)",
                    "Candle 3: Type 2 - Reverses strongly"
                  ]}
                  entry="Enter on second 2-bar reversal"
                  stopLoss="Opposite extreme of outside bar"
                  whyItWorks="Outside bars create uncertainty. When follow-through fails, it signals the opposite direction has control. Common at support/resistance levels."
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Continuation Patterns */}
          <AccordionItem value="continuation-patterns" className="bg-white rounded-lg border-2 border-green-200">
            <AccordionTrigger className="px-6 py-4 text-2xl font-bold hover:no-underline text-green-700">
              Continuation Patterns
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid md:grid-cols-2 gap-6">

                {/* 3-1-2 Continuation */}
                <PatternDefinitionCard
                  patternName="3-1-2 Continuation"
                  patternCode="3-1-2"
                  riskLevel="Low"
                  description="The strongest continuation pattern. Outside bar shows momentum, inside bar provides pullback entry, directional bar confirms continuation."
                  structure={[
                    "Candle 1: Type 3 - Outside bar (strong momentum)",
                    "Candle 2: Type 1 - Inside bar (healthy pullback)",
                    "Candle 3: Type 2 - Continues original direction"
                  ]}
                  entry="Enter on break of inside bar in continuation direction"
                  stopLoss="Opposite side of inside bar"
                  whyItWorks="Outside bar establishes strong directional bias (often institutional). Inside bar allows lower-risk entry. 2-bar confirms continuation with reduced risk."
                />

                {/* 2-2-2 Strong Trend */}
                <PatternDefinitionCard
                  patternName="2-2-2 Strong Trend"
                  patternCode="2-2-2"
                  riskLevel="Low"
                  description="Three consecutive directional bars in same direction. Pure momentum - Rob Smith's broadening formation in action."
                  structure={[
                    "Candle 1: Type 2 - Breaks direction",
                    "Candle 2: Type 2 - Continues breaking (higher high/lower low)",
                    "Candle 3: Type 2 - Continues breaking (strong trend confirmed)"
                  ]}
                  entry="Pullback to previous bar's range, then break continuation"
                  stopLoss="Below/above previous bar's low/high"
                  whyItWorks="Each successive break confirms growing participation and momentum. This IS the broadening formation - higher highs or lower lows. Strong trending market."
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Consolidation & Special Patterns */}
          <AccordionItem value="special-patterns" className="bg-white rounded-lg border-2 border-yellow-200">
            <AccordionTrigger className="px-6 py-4 text-2xl font-bold hover:no-underline text-yellow-700">
              Consolidation & Special Patterns
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid md:grid-cols-2 gap-6">

                {/* 1-1-1 Consolidation */}
                <PatternDefinitionCard
                  patternName="1-1-1 Tight Consolidation"
                  patternCode="1-1-1"
                  riskLevel="High"
                  description="Three consecutive inside bars showing extreme compression. Like a coiled spring before explosive move."
                  structure={[
                    "Candle 1: Type 1 - Inside bar (consolidation)",
                    "Candle 2: Type 1 - Inside bar (tighter compression)",
                    "Candle 3: Type 1 - Inside bar (maximum compression)"
                  ]}
                  entry="Enter on breakout in EITHER direction with volume"
                  stopLoss="Opposite side of entire consolidation range"
                  whyItWorks="Extreme compression precedes explosive breakouts. Often seen before news events or at major S/R. Traders waiting creates a powder keg."
                />

                {/* Outside Bar (Generic) */}
                <PatternDefinitionCard
                  patternName="Outside Bar (Type 3)"
                  patternCode="Outside"
                  riskLevel="Medium"
                  description="Single bar that engulfs previous bar - breaks both high and low. Shows volatility expansion."
                  structure={[
                    "Breaks BOTH previous candle's high AND low",
                    "Creates engulfing pattern",
                    "Shows increased participation and volatility"
                  ]}
                  entry="Wait for direction confirmation, then enter on break"
                  stopLoss="Opposite extreme of outside bar"
                  whyItWorks="Outside bars cannot sustain - they must resolve directionally. Often trap traders on both sides before major move. Common at S/R levels."
                />

                {/* No Pattern */}
                <Card className="border-2 border-gray-300">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="flex items-center justify-between">
                      <span>No Valid Pattern</span>
                      <Badge variant="secondary">Recognition</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <p className="text-gray-700">
                      Not every price action forms a tradeable Strat pattern. Recognizing when there's <strong>NO pattern</strong> is just as important as identifying valid setups.
                    </p>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <p className="font-semibold text-gray-800 mb-2">Why This Matters:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Prevents overtrading</li>
                        <li>Enforces discipline to wait for setups</li>
                        <li>Protects capital from low-probability trades</li>
                        <li>Forces focus on high-quality patterns only</li>
                      </ul>
                    </div>
                    <p className="text-sm italic text-gray-600 bg-yellow-50 p-3 rounded border border-yellow-200">
                      Rob Smith's wisdom: "Only trade when patterns align with timeframe continuity. If there's no pattern, there's no trade."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>

        {/* Bottom Actions */}
        <div className="flex gap-4 justify-center pt-8">
          {isSignedIn ? (
            <>
              <Link href="/game">
                <Button size="lg" className="gap-2">
                  Practice Patterns
                </Button>
              </Link>
              <Link href="/analytics">
                <Button size="lg" variant="outline" className="gap-2">
                  View Analytics
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/">
              <Button size="lg" className="gap-2">
                Sign In to Start Learning
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Component for pattern definition cards
interface PatternDefinitionCardProps {
  patternName: string;
  patternCode: string;
  riskLevel: string;
  description: string;
  structure: string[];
  entry: string;
  stopLoss: string;
  whyItWorks: string;
}

function PatternDefinitionCard({
  patternName,
  patternCode,
  riskLevel,
  description,
  structure,
  entry,
  stopLoss,
  whyItWorks,
}: PatternDefinitionCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{patternName}</span>
          <Badge className={`${getRiskColor(riskLevel)} border`}>
            {riskLevel} Risk
          </Badge>
        </CardTitle>
        <CardDescription className="font-mono text-lg font-bold">
          {patternCode}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{description}</p>

        <div>
          <p className="font-semibold text-gray-800 mb-2">Pattern Structure:</p>
          <ul className="list-decimal list-inside space-y-1 text-sm text-gray-600">
            {structure.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-green-50 p-3 rounded border border-green-200">
            <p className="font-semibold text-green-800 mb-1">Entry:</p>
            <p className="text-gray-700">{entry}</p>
          </div>
          <div className="bg-red-50 p-3 rounded border border-red-200">
            <p className="font-semibold text-red-800 mb-1">Stop Loss:</p>
            <p className="text-gray-700">{stopLoss}</p>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded border border-blue-200">
          <p className="font-semibold text-blue-800 mb-1">Why It Works:</p>
          <p className="text-sm text-gray-700">{whyItWorks}</p>
        </div>
      </CardContent>
    </Card>
  );
}

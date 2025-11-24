# The Strat Pattern Scenarios - Comprehensive Guide

This document outlines all the major Strat pattern combinations that should be implemented in the Stratify training game.

## Pattern Numbering System

Each candle is numbered 1, 2, or 3 based on its relationship to the **previous candle's range**:

- **Type 1 (Inside Bar)**: High and low are both inside the previous candle's range
- **Type 2 (Directional Bar)**: Breaks either the high OR the low of the previous candle (not both)
- **Type 3 (Outside Bar)**: Breaks BOTH the high AND low of the previous candle

## Core Reversal Patterns

### 2-1-2 Reversal (Currently Implemented)
**Pattern**: Directional → Inside → Directional (opposite direction)

**Bullish 2-1-2**:
- Candle 0: Reference (neutral/bearish)
- Candle 1: Type 2 - Breaks low (bearish directional)
- Candle 2: Type 1 - Inside bar (consolidation)
- Candle 3: Type 2 - Breaks high of candle 2 (bullish reversal)

**Bearish 2-1-2**:
- Candle 0: Reference (neutral/bullish)
- Candle 1: Type 2 - Breaks high (bullish directional)
- Candle 2: Type 1 - Inside bar (consolidation)
- Candle 3: Type 2 - Breaks low of candle 2 (bearish reversal)

**Trading Signal**: High probability reversal when inside bar is broken in opposite direction
**Entry**: Break of inside bar in reversal direction
**Stop Loss**: Below/above the inside bar

---

### 3-2-2 Reversal
**Pattern**: Outside → Directional → Directional (reversal)

**Bullish 3-2-2**:
- Candle 0: Reference
- Candle 1: Type 3 - Outside bar (high volatility, breaks both high and low)
- Candle 2: Type 2 - Breaks low of candle 1 (bearish directional)
- Candle 3: Type 2 - Breaks high of candle 2 (bullish reversal)

**Bearish 3-2-2**:
- Candle 0: Reference
- Candle 1: Type 3 - Outside bar
- Candle 2: Type 2 - Breaks high of candle 1 (bullish directional)
- Candle 3: Type 2 - Breaks low of candle 2 (bearish reversal)

**Trading Signal**: Outside bar followed by failed directional move
**Entry**: When third candle breaks opposite direction
**Stop Loss**: Opposite side of outside bar

---

### 1-2-2 Reversal
**Pattern**: Inside → Directional → Directional (reversal)

**Bullish 1-2-2**:
- Candle 0: Reference (larger range)
- Candle 1: Type 1 - Inside bar (consolidation)
- Candle 2: Type 2 - Breaks low of candle 1 (bearish directional, false breakdown)
- Candle 3: Type 2 - Breaks high of candle 2 (bullish reversal)

**Bearish 1-2-2**:
- Candle 0: Reference (larger range)
- Candle 1: Type 1 - Inside bar
- Candle 2: Type 2 - Breaks high of candle 1 (bullish directional, false breakout)
- Candle 3: Type 2 - Breaks low of candle 2 (bearish reversal)

**Trading Signal**: False break of inside bar followed by reversal
**Entry**: When third candle reverses the false break
**Stop Loss**: Opposite extreme of candle 2

---

## Core Continuation Patterns

### 3-1-2 Continuation (Currently Implemented)
**Pattern**: Outside → Inside → Directional (continuation)

**Bullish 3-1-2**:
- Candle 0: Reference
- Candle 1: Type 3 - Bullish outside bar (strong momentum)
- Candle 2: Type 1 - Inside bar (pause/consolidation)
- Candle 3: Type 2 - Breaks high of candle 2 (continuation up)

**Bearish 3-1-2**:
- Candle 0: Reference
- Candle 1: Type 3 - Bearish outside bar
- Candle 2: Type 1 - Inside bar
- Candle 3: Type 2 - Breaks low of candle 2 (continuation down)

**Trading Signal**: Strong continuation after consolidation
**Entry**: Break of inside bar in trend direction
**Stop Loss**: Opposite side of inside bar

---

### 2-2-2 Continuation
**Pattern**: Three consecutive directional bars in same direction

**Bullish 2-2-2**:
- Candle 0: Reference
- Candle 1: Type 2 - Breaks high (bullish)
- Candle 2: Type 2 - Breaks high of candle 1 (bullish)
- Candle 3: Type 2 - Breaks high of candle 2 (strong bullish trend)

**Bearish 2-2-2**:
- Candle 0: Reference
- Candle 1: Type 2 - Breaks low (bearish)
- Candle 2: Type 2 - Breaks low of candle 1 (bearish)
- Candle 3: Type 2 - Breaks low of candle 2 (strong bearish trend)

**Trading Signal**: Strong trending market (broadening formation)
**Entry**: Pullback to previous candle's range
**Stop Loss**: Below/above previous candle's low/high

---

### 3-2 Shoot (Momentum Play)
**Pattern**: Outside → Directional (explosive move)

**Bullish 3-2 Shoot**:
- Candle 0: Reference
- Candle 1: Type 3 - Bullish outside bar (volatility expansion)
- Candle 2: Type 2 - Breaks high of candle 1 (momentum confirmation)
- Candle 3: Type 2 - Breaks high of candle 2 (continuation)

**Bearish 3-2 Shoot**:
- Candle 0: Reference
- Candle 1: Type 3 - Bearish outside bar
- Candle 2: Type 2 - Breaks low of candle 1
- Candle 3: Type 2 - Breaks low of candle 2

**Trading Signal**: Explosive momentum after volatility expansion
**Entry**: Break of first directional candle
**Stop Loss**: Opposite side of outside bar

---

## Advanced Consolidation Patterns

### 1-1-1 (Tight Consolidation)
**Pattern**: Three consecutive inside bars

- Candle 0: Reference (larger range)
- Candle 1: Type 1 - Inside bar
- Candle 2: Type 1 - Inside bar (within candle 1)
- Candle 3: Type 1 - Inside bar (within candle 2)

**Trading Signal**: Extreme compression, big move imminent
**Entry**: Break in either direction with volume
**Stop Loss**: Opposite side of entire consolidation range

---

### 1-3 Reversal (Coil Release)
**Pattern**: Inside → Outside (volatility explosion)

**Bullish 1-3**:
- Candle 0: Reference (larger bearish move)
- Candle 1: Type 1 - Inside bar (coiling)
- Candle 2: Type 3 - Bullish outside bar (breaks both sides, signals reversal)
- Candle 3: Type 2 - Continuation up

**Bearish 1-3**:
- Candle 0: Reference (larger bullish move)
- Candle 1: Type 1 - Inside bar
- Candle 2: Type 3 - Bearish outside bar
- Candle 3: Type 2 - Continuation down

**Trading Signal**: Compression followed by explosive reversal
**Entry**: Break of outside bar direction
**Stop Loss**: Opposite extreme of outside bar

---

### 2-1-1 (Failed Breakout Setup)
**Pattern**: Directional → Inside → Inside

- Candle 0: Reference
- Candle 1: Type 2 - Directional break
- Candle 2: Type 1 - Inside bar (failed continuation)
- Candle 3: Type 1 - Inside bar (consolidation)

**Trading Signal**: Failed breakout, potential reversal coming
**Entry**: Wait for candle 4 to break inside bars (likely reversal)
**Stop Loss**: Extreme of candle 1

---

## Complex Multi-Bar Patterns

### 3-1-2-2 (Extended Continuation)
**Pattern**: Outside → Inside → Two directional bars

**Trading Signal**: Strong trend with brief pause
**Use**: Identify continuation opportunities in strong trends

---

### 2-1-2-1 (Double Inside Reversal)
**Pattern**: Directional → Inside → Directional → Inside

**Trading Signal**: Multiple consolidation phases, test patience
**Use**: Trade second inside bar breakout in reversal direction

---

### 1-1-2 (Breakout Confirmation)
**Pattern**: Inside → Inside → Directional

**Trading Signal**: Consolidation breakout with confirmation
**Entry**: Second candle breaking consolidation
**Use**: Lower risk entry after pattern confirmation

---

## Timeframe Continuity Patterns

### Aligned Bullish (All Timeframes)
**Daily**: 2-2-2 uptrend
**4-Hour**: 3-1-2 bullish
**1-Hour**: 2-1-2 reversal up

**Trading Signal**: HIGHEST probability long trade
**Entry**: 1-hour reversal in direction of higher timeframes

---

### Aligned Bearish (All Timeframes)
**Daily**: 2-2-2 downtrend
**4-Hour**: 3-1-2 bearish
**1-Hour**: 2-1-2 reversal down

**Trading Signal**: HIGHEST probability short trade
**Entry**: 1-hour reversal in direction of higher timeframes

---

### Timeframe Conflict (Mixed Signals)
**Daily**: 2-2-2 uptrend
**4-Hour**: 1-1-1 consolidation
**1-Hour**: 2-1-2 reversal down

**Trading Signal**: AVOID - No clear direction
**Action**: Wait for timeframe alignment

---

## Pattern Difficulty Levels

### Beginner Patterns (Easy to Identify)
1. **2-1-2 Reversal** - Clear inside bar with directional breaks
2. **2-2-2 Continuation** - Three bars in same direction
3. **1-1-1 Consolidation** - Three inside bars

### Intermediate Patterns
1. **3-1-2 Continuation** - Requires identifying outside bars
2. **3-2-2 Reversal** - Outside bar with directional change
3. **1-2-2 Reversal** - Failed breakout recognition

### Advanced Patterns
1. **3-2 Shoot** - Fast-moving momentum plays
2. **1-3 Reversal** - Coil and release patterns
3. **Timeframe Continuity** - Multi-timeframe alignment

---

## Implementation Priority

### Phase 1 (MVP - Currently Implemented)
- ✅ 2-1-2 Reversal
- ✅ 3-1-2 Continuation
- ✅ Outside Bar (Type 3 identification)
- ✅ None (random candles)

### Phase 2 (Next Implementation)
- 2-2-2 Continuation (strong trend)
- 1-1-1 Consolidation (compression)
- 3-2-2 Reversal (outside bar reversal)
- 1-2-2 Reversal (failed breakout)

### Phase 3 (Advanced)
- 3-2 Shoot (momentum)
- 1-3 Reversal (coil release)
- 2-1-1 (failed continuation)
- 1-1-2 (breakout confirmation)

### Phase 4 (Expert)
- Multi-bar patterns (4+ candles)
- Timeframe continuity scenarios
- Pattern variations with context

---

## Game Mechanics Recommendations

### Difficulty Progression
1. **Level 1-5**: Only 2-1-2 and 2-2-2 patterns
2. **Level 6-10**: Add 3-1-2 and 1-1-1 patterns
3. **Level 11-15**: Add 3-2-2 and 1-2-2 patterns
4. **Level 16-20**: Add advanced patterns
5. **Level 21+**: Multi-timeframe scenarios

### Pattern Recognition Training
- Show candle-by-candle formation
- Highlight previous candle's range
- Number each candle as 1, 2, or 3
- Display pattern name after correct answer
- Show entry/stop loss levels for educational value

### Educational Features
- **Pattern Library**: Reference guide for all patterns
- **Video Tutorials**: Animated explanations
- **Practice Mode**: User-selected patterns
- **Challenge Mode**: Random patterns with time pressure
- **Analytics**: Track accuracy by pattern type

---

## Pattern Validation Rules

For each pattern, validate:
1. **Candle 1**: Correctly numbered relative to Candle 0
2. **Candle 2**: Correctly numbered relative to Candle 1
3. **Candle 3**: Correctly numbered relative to Candle 2
4. **Pattern Match**: Sequence matches defined pattern (e.g., 2-1-2)
5. **Direction**: Reversal vs continuation correctly identified

---

## Reference Resources

Based on Rob Smith's Strat methodology:
- Inside bars (Type 1) = Consolidation/pause
- Directional bars (Type 2) = Trend/momentum
- Outside bars (Type 3) = Volatility/expansion
- Timeframe continuity = Confluence of trends
- Broadening formation = Higher highs and lower lows

All patterns follow the universal truth: **Price breaks ranges**.

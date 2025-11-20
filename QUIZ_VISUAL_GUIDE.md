# Pattern Quiz Visual Guide

## User Flow

### 1. Home Page (Signed In)
```
┌─────────────────────────────────────────────────────┐
│                    Sign Out  [UserButton]           │
│                                                     │
│                                                     │
│                    Stratify                         │
│                                                     │
│    Welcome to Stratify - Your Candlestick          │
│           Pattern Trainer                           │
│                                                     │
│    You are signed in! Ready to start learning?     │
│                                                     │
│          ┌─────────────────────────┐               │
│          │  Start Pattern Quiz     │               │
│          └─────────────────────────┘               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 2. Quiz Welcome Screen
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                      🏆                             │
│                                                     │
│          Candlestick Pattern Quiz                  │
│      Test your knowledge of The Strat              │
│          candlestick patterns                       │
│                                                     │
│   ┌──────────────────────────────────────────┐    │
│   │  Quiz Details:                           │    │
│   │  • 10 questions covering all 10 Strat    │    │
│   │    patterns                               │    │
│   │  • Multiple choice with instant feedback │    │
│   │  • Detailed explanations after each      │    │
│   │    answer                                 │    │
│   │  • Track your progress and improve over  │    │
│   │    time                                   │    │
│   └──────────────────────────────────────────┘    │
│                                                     │
│          ┌─────────────────────────┐               │
│          │      Start Quiz         │               │
│          └─────────────────────────┘               │
│                                                     │
│              ← Back to Home                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3. Active Quiz Screen
```
┌─────────────────────────────────────────────────────┐
│  Quiz Session                    ┌────────────────┐ │
│  Answer all questions to         │ Current Score  │ │
│  complete the quiz               │      5/7       │ │
│                                  └────────────────┘ │
│  ┌─────────────────────────────────────────────┐   │
│  │  Question 7 of 10                 Incorrect│   │
│  │                                              │   │
│  │      Candlestick Pattern                    │   │
│  │  ┌────────────────────────────────────┐    │   │
│  │  │  100 ┼─────────────────────────── │    │   │
│  │  │      │                             │    │   │
│  │  │   95 ┼─────────────────────────── │    │   │
│  │  │      │    │     │       │          │    │   │
│  │  │      │   ███   ███     ███         │    │   │
│  │  │   90 ┼───███───███─────███──────  │    │   │
│  │  │      │   ███   ███     ███         │    │   │
│  │  │      │    │     │       │          │    │   │
│  │  │   85 ┼─────────────────────────── │    │   │
│  │  │      Type 1  2-up   Type 3        │    │   │
│  │  │      Candle 1 Candle 2 Candle 3   │    │   │
│  │  └────────────────────────────────────┘    │   │
│  │                                              │   │
│  │  What pattern is shown above?               │   │
│  │                                              │   │
│  │  [ 1-Up (Type 1 Bullish)           ]       │   │
│  │  [ 2-Up (Inside Bullish)           ] ✓     │   │
│  │  [ 3-Bullish (Directional)         ] ✗     │   │
│  │  [ 2-Down (Inside Bearish)         ]       │   │
│  │                                              │   │
│  │  ┌─────────────────────────────────────┐   │   │
│  │  │ Explanation:                         │   │   │
│  │  │ A 2-up pattern shows a Type 2 inside│   │   │
│  │  │ candle (both high and low are       │   │   │
│  │  │ contained within the previous       │   │   │
│  │  │ candle's range) with a bullish      │   │   │
│  │  │ close...                            │   │   │
│  │  │                                      │   │   │
│  │  │ The correct answer was: 2-Up        │   │   │
│  │  └─────────────────────────────────────┘   │   │
│  │                                              │   │
│  │                    ┌──────────────────┐     │   │
│  │                    │ Next Question → │     │   │
│  │                    └──────────────────┘     │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│              End Session Early                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 4. Quiz Complete Screen
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                      🏆                             │
│                                                     │
│               Quiz Complete!                        │
│       Great job on completing the quiz!            │
│                                                     │
│   ┌──────────────────┐   ┌──────────────────┐     │
│   │       🎯         │   │        📈        │     │
│   │       70%        │   │       7/10       │     │
│   │     Accuracy     │   │ Correct Answers  │     │
│   └──────────────────┘   └──────────────────┘     │
│                                                     │
│          ┌─────────────────────────┐               │
│          │   Start New Quiz        │               │
│          └─────────────────────────┘               │
│                                                     │
│          ┌─────────────────────────┐               │
│          │   Return to Home        │               │
│          └─────────────────────────┘               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Candlestick Chart Details

### Chart Components
- **Grid lines**: Horizontal lines with price labels
- **Wicks**: Thin lines showing high and low
- **Bodies**: Rectangles showing open to close
  - Green: Bullish (close > open)
  - Red: Bearish (close < open)
- **Labels**: Type classification below each candle
  - "Type 1" - Outside bar (new high + new low)
  - "2-up" - Inside bar bullish
  - "2-down" - Inside bar bearish
  - "Type 3" - Directional move

### Example Patterns

#### Type 1 Pattern (1-up)
```
Candle 1: Base candle (Type 3)
Candle 2: Type 1 - Makes NEW HIGH and NEW LOW, closes bullish
Candle 3: Follow through
```

#### Type 2 Pattern (2-up)
```
Candle 1: Base candle with wider range
Candle 2: Type 2-up - INSIDE bar (high < prev high, low > prev low), closes bullish
Candle 3: Follow through
```

#### Type 3 Pattern (3-bullish)
```
Candle 1: Base candle
Candle 2: Type 3 - Makes new high but NOT new low
Candle 3: Type 3 - Continues bullish movement
```

## Color Scheme

### Main Colors
- **Primary Blue**: `#3B82F6` (buttons, accents)
- **Green (Bullish)**: `#10B981` (correct answers, bullish candles)
- **Red (Bearish)**: `#EF4444` (incorrect answers, bearish candles)
- **Gray Background**: `#F9FAFB` (chart background)
- **Border Gray**: `#E5E7EB` (borders, grid lines)

### Interactive States
- **Hover**: Darker shade with shadow
- **Selected Correct**: Green background with border
- **Selected Incorrect**: Red background with border
- **Disabled**: Gray with reduced opacity

## Responsive Design

The quiz is fully responsive:
- **Desktop**: Full 600x400 charts, side-by-side stats
- **Tablet**: Scaled charts, stacked stats
- **Mobile**: Compact charts, vertical layout

## Accessibility

- High contrast text and backgrounds
- Clear visual feedback for interactions
- Keyboard navigation support
- Screen reader friendly labels
- Focus indicators on interactive elements

## Performance

- **Instant feedback**: No loading delays
- **Smooth animations**: CSS transitions
- **Optimized SVG**: Lightweight chart rendering
- **Real-time updates**: Convex backend synchronization
- **Fast page loads**: Next.js optimization

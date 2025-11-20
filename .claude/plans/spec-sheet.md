1. What This App Does
Stratify is an interactive web app that teaches you to recognize “The Strat” 3‑candle setups through quick visual quizzes. It shows realistic candlestick sequences, gives instant feedback, and tracks your progress over time.

2. Core Features
- Pattern Practice: Take randomized 3‑candle quizzes rendered as SVG candlestick charts with proper wicks, green/red bodies, and per‑candle type labels. A custom generator enforces Type 1/2‑up/2‑down/3 rules to build the 10 Strat setups, presents four choices, and gives instant ✓/✗ feedback with an explanation and a Next Question flow (built in Next.js with custom SVG).
- Performance Analytics: See live running score, percent accuracy, session history, mistake breakdowns by pattern, and simple trend graphs. Convex persists per‑user attempts and pattern stats keyed to the Clerk user ID, while inline SVG sparklines visualize accuracy trends and enable one‑click targeted drills on weak patterns.
- Pattern Reference: Open a collapsible, illustrated rulebook defining the three bar types and all 10 setups with labeled samples and tooltips. Built with shadcn components; “Practice this pattern” triggers the generator seeded to that setup in Next.js.

3. Tech Stack
- Framework: Next.js 15 (React 18, App Router)
- Database: Convex (session/attempt storage, pattern breakdowns)
- Auth: Clerk (user accounts and session handling)
- UI Components/Styling: shadcn/ui with Tailwind CSS
- Chart Rendering: SVG for candlestick charts (with custom drawing logic)
- State/Interactions: React state and Next.js client components; CSS transitions for smooth question changes

4. UI Design Style
Clean, modern, high‑contrast training UI with professional chart styling (green up/red down, clear wicks, labeled bars), spacious layout with header “Strat Setup Trainer,” centered chart and choices below, collapsible reference panel, helpful tooltips, and fully responsive behavior for mobile and desktop.
'use client';

interface AccuracyChartProps {
  data: Array<{ date: string; accuracy: number; totalAttempts: number }>;
  width?: number;
  height?: number;
}

export function AccuracyChart({ data, width = 200, height = 40 }: AccuracyChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-xs text-muted-foreground italic">No data available</div>
    );
  }

  // Create sparkline path
  const maxAccuracy = Math.max(...data.map(d => d.accuracy), 100);
  const minAccuracy = Math.min(...data.map(d => d.accuracy), 0);
  const range = maxAccuracy - minAccuracy || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.accuracy - minAccuracy) / range) * height;
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(' L ')}`;

  // Calculate trend
  const firstAccuracy = data[0]?.accuracy || 0;
  const lastAccuracy = data[data.length - 1]?.accuracy || 0;
  const isImproving = lastAccuracy >= firstAccuracy;

  return (
    <div className="flex items-center gap-2">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isImproving ? "#10b981" : "#ef4444"} stopOpacity="0.3" />
            <stop offset="100%" stopColor={isImproving ? "#10b981" : "#ef4444"} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area under the line */}
        <path
          d={`${pathData} L ${width},${height} L 0,${height} Z`}
          fill="url(#sparkline-gradient)"
        />
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={isImproving ? "#10b981" : "#ef4444"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - ((d.accuracy - minAccuracy) / range) * height;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill={isImproving ? "#10b981" : "#ef4444"}
            />
          );
        })}
      </svg>
    </div>
  );
}

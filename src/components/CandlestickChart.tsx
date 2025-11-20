'use client';

import React from 'react';
import { Candle } from '@/lib/types/candlestick';

interface CandlestickChartProps {
  candles: Candle[];
  width?: number;
  height?: number;
  showLabels?: boolean;
}

/**
 * SVG Candlestick Chart Component
 * Renders 3 candles as professional candlestick chart with proper wicks and type labels
 */
export function CandlestickChart({
  candles,
  width = 600,
  height = 400,
  showLabels = true,
}: CandlestickChartProps) {
  // Find the overall high and low for scaling
  const allHighs = candles.map((c) => c.high);
  const allLows = candles.map((c) => c.low);
  const overallHigh = Math.max(...allHighs);
  const overallLow = Math.min(...allLows);

  // Add 10% padding to the price range
  const priceRange = overallHigh - overallLow;
  const paddedHigh = overallHigh + priceRange * 0.1;
  const paddedLow = overallLow - priceRange * 0.1;
  const paddedRange = paddedHigh - paddedLow;

  // Chart dimensions
  const chartPadding = { top: 20, right: 40, bottom: 60, left: 60 };
  const chartWidth = width - chartPadding.left - chartPadding.right;
  const chartHeight = height - chartPadding.top - chartPadding.bottom;

  // Candle spacing
  const candleWidth = 60;
  const spacing = (chartWidth - candleWidth * 3) / 4;

  /**
   * Convert price to Y coordinate
   */
  const priceToY = (price: number): number => {
    const ratio = (paddedHigh - price) / paddedRange;
    return chartPadding.top + ratio * chartHeight;
  };

  /**
   * Get candle color (green for bullish, red for bearish)
   */
  const getCandleColor = (candle: Candle): string => {
    return candle.close > candle.open ? '#10B981' : '#EF4444';
  };

  /**
   * Get candle label text
   */
  const getCandleLabel = (candle: Candle): string => {
    switch (candle.type) {
      case '1':
        return 'Type 1';
      case '2-up':
        return '2-up';
      case '2-down':
        return '2-down';
      case '3':
        return 'Type 3';
      default:
        return candle.type;
    }
  };

  return (
    <svg
      width={width}
      height={height}
      className="bg-white rounded-lg shadow-sm border border-gray-200"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Chart background */}
      <rect
        x={chartPadding.left}
        y={chartPadding.top}
        width={chartWidth}
        height={chartHeight}
        fill="#F9FAFB"
        stroke="#E5E7EB"
        strokeWidth="1"
      />

      {/* Horizontal grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
        const y = chartPadding.top + ratio * chartHeight;
        const price = paddedHigh - ratio * paddedRange;

        return (
          <g key={ratio}>
            <line
              x1={chartPadding.left}
              y1={y}
              x2={chartPadding.left + chartWidth}
              y2={y}
              stroke="#E5E7EB"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x={chartPadding.left - 10}
              y={y + 4}
              textAnchor="end"
              fontSize="12"
              fill="#6B7280"
            >
              {price.toFixed(2)}
            </text>
          </g>
        );
      })}

      {/* Render candlesticks */}
      {candles.map((candle, index) => {
        const x = chartPadding.left + spacing + index * (candleWidth + spacing);
        const centerX = x + candleWidth / 2;

        const openY = priceToY(candle.open);
        const closeY = priceToY(candle.close);
        const highY = priceToY(candle.high);
        const lowY = priceToY(candle.low);

        const bodyTop = Math.min(openY, closeY);
        const bodyBottom = Math.max(openY, closeY);
        const bodyHeight = Math.max(bodyBottom - bodyTop, 2); // Minimum 2px height

        const color = getCandleColor(candle);

        return (
          <g key={index}>
            {/* Wick (high to low) */}
            <line
              x1={centerX}
              y1={highY}
              x2={centerX}
              y2={lowY}
              stroke={color}
              strokeWidth="2"
            />

            {/* Body (open to close) */}
            <rect
              x={x}
              y={bodyTop}
              width={candleWidth}
              height={bodyHeight}
              fill={color}
              stroke={color}
              strokeWidth="1"
              rx="2"
            />

            {/* Candle label */}
            {showLabels && (
              <>
                <text
                  x={centerX}
                  y={chartPadding.top + chartHeight + 25}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="600"
                  fill="#374151"
                >
                  {getCandleLabel(candle)}
                </text>
                <text
                  x={centerX}
                  y={chartPadding.top + chartHeight + 40}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6B7280"
                >
                  Candle {index + 1}
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* Chart title */}
      <text
        x={width / 2}
        y={15}
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill="#1F2937"
      >
        Candlestick Pattern
      </text>
    </svg>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';
import { Candle } from '@/lib/game/patternGenerator';

interface StaticCandleChartProps {
  candles: Candle[];
}

// Helper to determine candle type based on previous candle
function getCandleType(current: Candle, previous: Candle): 1 | 2 | 3 {
  const breaksHigh = current.high > previous.high;
  const breaksLow = current.low < previous.low;

  if (breaksHigh && breaksLow) return 3; // Outside bar
  else if (breaksHigh || breaksLow) return 2; // Directional
  else return 1; // Inside bar
}

export function StaticCandleChart({ candles }: StaticCandleChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 600, height: 400 });

  // Handle responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const newWidth = Math.min(containerWidth - 32, 600); // Max 600px
      const aspectRatio = 400 / 600;
      setDimensions({
        width: newWidth,
        height: newWidth * aspectRatio,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || candles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;

    // Set canvas size for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate chart dimensions
    const padding = { top: 60, right: 20, bottom: 60, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Find price range
    const allPrices = candles.flatMap((c) => [c.high, c.low]);
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const priceRange = maxPrice - minPrice;
    const paddedRange = priceRange * 1.2;
    const paddedLow = minPrice - priceRange * 0.1;
    const paddedHigh = maxPrice + priceRange * 0.1;

    // Helper to convert price to Y coordinate
    const priceToY = (price: number): number => {
      const ratio = (paddedHigh - price) / paddedRange;
      return padding.top + ratio * chartHeight;
    };

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    // Calculate candle positions
    const candleWidth = 70;
    const spacing = (chartWidth - candleWidth * candles.length) / (candles.length + 1);

    // Draw candles
    candles.forEach((candle, index) => {
      const x = padding.left + spacing + index * (candleWidth + spacing);
      const isBullish = candle.close > candle.open;

      // Determine candle type (for label)
      let candleTypeNum: number;
      if (index === 0) {
        candleTypeNum = 0; // Reference candle
      } else {
        candleTypeNum = getCandleType(candle, candles[index - 1]);
      }

      // Draw high-low line (wick)
      const highY = priceToY(candle.high);
      const lowY = priceToY(candle.low);
      const centerX = x + candleWidth / 2;

      ctx.strokeStyle = isBullish ? '#10b981' : '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, highY);
      ctx.lineTo(centerX, lowY);
      ctx.stroke();

      // Draw body
      const openY = priceToY(candle.open);
      const closeY = priceToY(candle.close);
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.abs(openY - closeY);

      ctx.fillStyle = isBullish ? '#10b981' : '#ef4444';
      ctx.fillRect(x, bodyTop, candleWidth, Math.max(bodyHeight, 2));

      // Draw candle border
      ctx.strokeStyle = isBullish ? '#059669' : '#dc2626';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, bodyTop, candleWidth, Math.max(bodyHeight, 2));

      // Draw candle type label above candle
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      const labelText = index === 0 ? 'Ref' : `Type ${candleTypeNum}`;
      ctx.fillText(labelText, centerX, padding.top - 35);

      // Draw candle index below candle
      ctx.font = '14px Inter, sans-serif';
      ctx.fillStyle = '#9ca3af';
      ctx.fillText(`Candle ${index}`, centerX, height - padding.bottom + 25);
    });

    // Draw legend
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.textAlign = 'left';
    ctx.fillText('Type 1 = Inside Bar  |  Type 2 = Directional  |  Type 3 = Outside Bar', padding.left, height - 15);
  }, [candles, dimensions.width, dimensions.height]);

  return (
    <div ref={containerRef} className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-cyan-400">Pattern Formation:</h3>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 border border-gray-700">
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
}

'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Candle } from '@/lib/game/patternGenerator';

interface AnimatedChartProps {
  candles: Candle[];
  width?: number;
  height?: number;
  onAnimationComplete?: () => void;
}

/**
 * Canvas-based Animated Candlestick Chart
 * Renders candles progressively with smooth animations
 */
export function AnimatedChart({
  candles,
  width: propWidth,
  height: propHeight,
  onAnimationComplete,
}: AnimatedChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const onCompleteRef = useRef(onAnimationComplete);

  // Responsive sizing
  const [dimensions, setDimensions] = React.useState({
    width: propWidth || 700,
    height: propHeight || 400,
  });

  // Update the ref when callback changes
  useEffect(() => {
    onCompleteRef.current = onAnimationComplete;
  }, [onAnimationComplete]);

  // Handle responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const newWidth = Math.min(containerWidth - 32, propWidth || 700); // 32px for padding
      const aspectRatio = (propHeight || 400) / (propWidth || 700);
      setDimensions({
        width: newWidth,
        height: newWidth * aspectRatio,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [propWidth, propHeight]);

  // Create a stable key from candles to detect actual changes
  const candlesKey = useMemo(() => {
    return candles.map(c => `${c.open}-${c.close}-${c.high}-${c.low}`).join('|');
  }, [candles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

    // Animation parameters
    const duration = 3000; // 3 seconds total animation
    const startTime = performance.now();
    let hasCompleted = false; // Track if animation already completed

    const drawChart = (ctxParam: CanvasRenderingContext2D, progress: number) => {
      // Clear canvas
      ctxParam.fillStyle = '#1a1a2e';
      ctxParam.fillRect(0, 0, width, height);

      // Chart dimensions
      const padding = { top: 40, right: 60, bottom: 40, left: 60 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;

      // Find price range
      const allHighs = candles.map((c) => c.high);
      const allLows = candles.map((c) => c.low);
      const overallHigh = Math.max(...allHighs);
      const overallLow = Math.min(...allLows);
      const priceRange = overallHigh - overallLow;
      const paddedHigh = overallHigh + priceRange * 0.15;
      const paddedLow = overallLow - priceRange * 0.15;
      const paddedRange = paddedHigh - paddedLow;

      // Convert price to Y coordinate
      const priceToY = (price: number): number => {
        const ratio = (paddedHigh - price) / paddedRange;
        return padding.top + ratio * chartHeight;
      };

      // Draw grid and labels
      drawGrid(ctxParam, padding, chartWidth, chartHeight, paddedHigh, paddedLow, paddedRange);

      // Calculate candle positions (optimized for 4 candles)
      const candleWidth = 70;
      const spacing = (chartWidth - candleWidth * candles.length) / (candles.length + 1);

      // Draw candles with animation
      const candlesPerPhase = 1 / candles.length;

      candles.forEach((candle, index) => {
        const candleStartProgress = index * candlesPerPhase;

        if (progress >= candleStartProgress) {
          const candleProgress = Math.min(
            (progress - candleStartProgress) / candlesPerPhase,
            1
          );

          const x = padding.left + spacing + index * (candleWidth + spacing);
          drawCandle(ctxParam, candle, x, candleWidth, priceToY, candleProgress);
        }
      });
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      drawChart(ctx, progress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Only call onAnimationComplete once
        if (!hasCompleted && onCompleteRef.current) {
          hasCompleted = true;
          onCompleteRef.current();
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [candlesKey, dimensions.width, dimensions.height]); // Use candlesKey and dimensions


  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    padding: { top: number; right: number; bottom: number; left: number },
    chartWidth: number,
    chartHeight: number,
    paddedHigh: number,
    paddedLow: number,
    paddedRange: number
  ) => {
    // Draw horizontal grid lines
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.font = '12px monospace';
    ctx.fillStyle = '#9CA3AF';

    [0, 0.25, 0.5, 0.75, 1].forEach((ratio) => {
      const y = padding.top + ratio * chartHeight;
      const price = paddedHigh - ratio * paddedRange;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      // Price labels
      ctx.fillText(
        price.toFixed(2),
        padding.left + chartWidth + 10,
        y + 4
      );
    });

    // Draw border
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(padding.left, padding.top, chartWidth, chartHeight);
  };

  const drawCandle = (
    ctx: CanvasRenderingContext2D,
    candle: Candle,
    x: number,
    candleWidth: number,
    priceToY: (price: number) => number,
    progress: number
  ) => {
    const centerX = x + candleWidth / 2;
    const isGreen = candle.close > candle.open;
    const color = isGreen ? '#10B981' : '#EF4444';
    const glowColor = isGreen ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)';

    // Calculate positions
    const openY = priceToY(candle.open);
    const closeY = priceToY(candle.close);
    const highY = priceToY(candle.high);
    const lowY = priceToY(candle.low);

    // Animate from bottom to top
    const bodyTop = Math.min(openY, closeY);
    const bodyBottom = Math.max(openY, closeY);
    const bodyHeight = bodyBottom - bodyTop;

    const animatedHighY = lowY - (lowY - highY) * progress;
    const animatedBodyTop = bodyBottom - bodyHeight * progress;
    const animatedBodyHeight = bodyHeight * progress;

    // Draw wick with glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = glowColor;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, animatedHighY);
    ctx.lineTo(centerX, lowY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw body with glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = glowColor;
    ctx.fillStyle = color;
    ctx.fillRect(x, animatedBodyTop, candleWidth, Math.max(animatedBodyHeight, 2));
    ctx.shadowBlur = 0;

    // Draw body outline
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, animatedBodyTop, candleWidth, Math.max(animatedBodyHeight, 2));
  };

  return (
    <div ref={containerRef} className="flex justify-center items-center w-full px-4">
      <canvas
        ref={canvasRef}
        className="rounded-lg w-full"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
}

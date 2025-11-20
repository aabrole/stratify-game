'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Minus } from 'lucide-react';

export function BarTypeGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          Understanding Bar Types
        </CardTitle>
        <CardDescription>
          The foundation of The Strat - every candle is classified as Type 1, 2, or 3
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Type 1 */}
        <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded-r-lg">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-red-600">Type 1</Badge>
            <h3 className="font-semibold text-lg">Outside Bar</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Makes <strong>both</strong> a new high AND a new low compared to the previous candle.
            This represents expansion and increased volatility.
          </p>
          <div className="bg-white rounded p-3 text-sm space-y-1">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 mt-0.5 text-red-600 flex-shrink-0" />
              <span><strong>Key Signal:</strong> Expansion in both directions - market breaking out of previous range</span>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 mt-0.5 text-red-600 flex-shrink-0" />
              <span><strong>Trading Implication:</strong> High volatility, potential trend change or continuation</span>
            </div>
          </div>
        </div>

        {/* Type 2 */}
        <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-blue-600">Type 2</Badge>
            <h3 className="font-semibold text-lg">Inside Bar</h3>
          </div>
          <p className="text-gray-700 mb-3">
            The high is <strong>lower</strong> than the previous high AND the low is <strong>higher</strong> than the previous low.
            This represents consolidation and contraction.
          </p>
          <div className="bg-white rounded p-3 text-sm space-y-1">
            <div className="flex items-start gap-2">
              <Minus className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
              <span><strong>Key Signal:</strong> Compression within previous candle&apos;s range - pause or indecision</span>
            </div>
            <div className="flex items-start gap-2">
              <Minus className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
              <span><strong>Trading Implication:</strong> Potential breakout setup, reduced volatility before move</span>
            </div>
          </div>
        </div>

        {/* Type 3 */}
        <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-green-600">Type 3</Badge>
            <h3 className="font-semibold text-lg">Directional Bar</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Makes <strong>either</strong> a new high OR a new low (but not both).
            This represents directional movement and trending behavior.
          </p>
          <div className="bg-white rounded p-3 text-sm space-y-1">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span><strong>Key Signal:</strong> Directional movement - extends range on one side only</span>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span><strong>Trading Implication:</strong> Trend continuation, controlled momentum</span>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold mb-3">Quick Decision Tree</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-mono text-xs bg-white px-2 py-1 rounded">1.</span>
              <span>Does it make a new high AND new low? → <Badge className="bg-red-600 ml-1">Type 1</Badge></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono text-xs bg-white px-2 py-1 rounded">2.</span>
              <span>Is it completely inside the previous bar? → <Badge className="bg-blue-600 ml-1">Type 2</Badge></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono text-xs bg-white px-2 py-1 rounded">3.</span>
              <span>Everything else → <Badge className="bg-green-600 ml-1">Type 3</Badge></span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

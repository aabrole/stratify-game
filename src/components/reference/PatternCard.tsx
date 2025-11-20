'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CandlestickChart } from '@/components/CandlestickChart';
import { PatternName } from '@/lib/types/candlestick';
import { patternGenerators } from '@/lib/quiz/patternGenerator';
import { getPatternExplanation, getPatternHint } from '@/lib/quiz/explanations';
import { Target, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PatternCardProps {
  patternName: PatternName;
}

export function PatternCard({ patternName }: PatternCardProps) {
  const router = useRouter();

  // Generate an example of this pattern
  const pattern = patternGenerators[patternName]();
  const explanation = getPatternExplanation(patternName);
  const hint = getPatternHint(patternName);

  const handlePractice = () => {
    // Navigate to quiz to practice
    router.push('/quiz');
  };

  // Get pattern category badge
  const getCategoryBadge = (name: PatternName) => {
    if (name.startsWith('1-')) return <Badge className="bg-red-600">Type 1</Badge>;
    if (name.startsWith('2-')) return <Badge className="bg-blue-600">Type 2</Badge>;
    if (name.startsWith('3-')) return <Badge className="bg-green-600">Type 3</Badge>;
    return null;
  };

  // Get directional badge
  const getDirectionalBadge = (name: PatternName) => {
    if (name.includes('up') || name.includes('bullish')) {
      return <Badge variant="outline" className="border-green-600 text-green-700">Bullish</Badge>;
    }
    if (name.includes('down') || name.includes('bearish')) {
      return <Badge variant="outline" className="border-red-600 text-red-700">Bearish</Badge>;
    }
    return <Badge variant="outline" className="border-gray-600 text-gray-700">Neutral</Badge>;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl">{patternName}</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p className="text-sm">{hint}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex gap-2">
            {getCategoryBadge(patternName)}
            {getDirectionalBadge(patternName)}
          </div>
        </div>
        <CardDescription>{explanation}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pattern Chart */}
        <div className="flex justify-center bg-gray-50 rounded-lg p-4">
          <CandlestickChart
            candles={pattern.candles}
            width={500}
            height={300}
            showLabels={true}
          />
        </div>

        {/* Pattern Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="font-semibold text-muted-foreground">Pattern Type</div>
            <div className="font-medium">{patternName}</div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-muted-foreground">Market Direction</div>
            <div className="font-medium">
              {patternName.includes('up') || patternName.includes('bullish') ? 'Bullish' :
               patternName.includes('down') || patternName.includes('bearish') ? 'Bearish' :
               'Neutral/Consolidation'}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handlePractice}
          className="w-full gap-2"
          variant="default"
        >
          <Target className="h-4 w-4" />
          Practice This Pattern
        </Button>
      </CardContent>
    </Card>
  );
}

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PatternStat {
  _id: string;
  _creationTime: number;
  userId: string;
  patternName: string;
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  averageResponseTime?: number;
  lastAttemptTime?: number;
}

interface PatternBreakdownProps {
  patternStats: PatternStat[];
}

export function PatternBreakdown({ patternStats }: PatternBreakdownProps) {
  const router = useRouter();

  const handlePracticePattern = () => {
    // Navigate to quiz with pattern filter (can be implemented later)
    router.push('/quiz');
  };

  if (!patternStats || patternStats.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pattern Performance</CardTitle>
          <CardDescription>No pattern data available yet. Start practicing!</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600';
    if (accuracy >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyBadge = (accuracy: number) => {
    if (accuracy >= 90) return <Badge className="bg-green-600">Mastered</Badge>;
    if (accuracy >= 70) return <Badge className="bg-blue-600">Proficient</Badge>;
    if (accuracy >= 50) return <Badge className="bg-yellow-600">Learning</Badge>;
    return <Badge className="bg-red-600">Needs Practice</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Pattern Performance Breakdown
        </CardTitle>
        <CardDescription>
          Your accuracy across all candlestick patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patternStats.map((stat) => (
            <div key={stat._id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold">{stat.patternName}</h4>
                  {getAccuracyBadge(stat.accuracy)}
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getAccuracyColor(stat.accuracy)}`}>
                    {stat.accuracy}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.correctAttempts}/{stat.totalAttempts} correct
                  </div>
                </div>
              </div>

              <Progress value={stat.accuracy} className="h-2" />

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>{stat.totalAttempts} attempts</span>
                  {stat.averageResponseTime && (
                    <span>{(stat.averageResponseTime / 1000).toFixed(1)}s avg</span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePracticePattern}
                >
                  Practice This
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

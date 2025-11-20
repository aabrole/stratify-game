'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Target } from 'lucide-react';
import { AccuracyChart } from './AccuracyChart';

interface Session {
  _id: string;
  _creationTime: number;
  userId: string;
  startTime: number;
  endTime?: number;
  totalQuestions: number;
  correctAnswers: number;
  score?: number;
}

interface SessionHistoryProps {
  sessions: Session[];
}

export function SessionHistory({ sessions }: SessionHistoryProps) {
  if (!sessions || sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Session History</CardTitle>
          <CardDescription>No sessions yet. Start your first quiz!</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDuration = (startTime: number, endTime?: number) => {
    if (!endTime) return 'In progress';
    const durationMs = endTime - startTime;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const getScoreBadge = (score?: number) => {
    if (!score) return <Badge variant="secondary">Incomplete</Badge>;
    if (score >= 90) return <Badge className="bg-green-600">Excellent</Badge>;
    if (score >= 70) return <Badge className="bg-blue-600">Good</Badge>;
    if (score >= 50) return <Badge className="bg-yellow-600">Fair</Badge>;
    return <Badge className="bg-red-600">Needs Work</Badge>;
  };

  // Prepare sparkline data from recent sessions
  const sparklineData = sessions
    .slice(0, 10)
    .reverse()
    .map((session) => ({
      date: formatDate(session.startTime),
      accuracy: session.score || 0,
      totalAttempts: session.totalQuestions,
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Session History
        </CardTitle>
        <CardDescription>Your recent quiz sessions and performance trends</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Trend Chart */}
        {sparklineData.length > 1 && (
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="text-sm font-medium mb-2">Performance Trend</div>
            <AccuracyChart data={sparklineData} width={600} height={60} />
          </div>
        )}

        {/* Sessions List */}
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium">{formatDate(session.startTime)}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(session.startTime)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {session.score !== undefined ? `${session.score}%` : 'N/A'}
                  </div>
                  {getScoreBadge(session.score)}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {session.correctAnswers}/{session.totalQuestions} correct
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {getDuration(session.startTime, session.endTime)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

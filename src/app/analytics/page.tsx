'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { StatsCard } from '@/components/analytics/StatsCard';
import { PatternBreakdown } from '@/components/analytics/PatternBreakdown';
import { SessionHistory } from '@/components/analytics/SessionHistory';
import { Target, TrendingUp, Clock, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function AnalyticsPage() {
  const { isLoaded, isSignedIn } = useUser();

  // Fetch analytics data
  const userStats = useQuery(api.analytics.getUserStats);
  const patternBreakdown = useQuery(api.analytics.getPatternBreakdown);
  const sessionHistory = useQuery(api.analytics.getSessionHistory, { limit: 20 });
  const weakPatterns = useQuery(api.analytics.getWeakPatterns, { threshold: 70 });

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-md text-center space-y-4">
          <Trophy className="w-16 h-16 text-blue-600 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-600">Please sign in to view your analytics.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Performance Analytics</h1>
          <p className="text-gray-600">Track your progress and improve your pattern recognition skills</p>
        </div>

        {/* Stats Cards */}
        {userStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Overall Accuracy"
              value={`${userStats.overallAccuracy}%`}
              icon={Target}
              description="Across all patterns"
            />
            <StatsCard
              title="Total Attempts"
              value={userStats.totalAttempts}
              icon={TrendingUp}
              description={`${userStats.totalCorrect} correct answers`}
            />
            <StatsCard
              title="Sessions Completed"
              value={userStats.completedSessions}
              icon={Trophy}
              description={`Avg score: ${userStats.averageSessionScore}%`}
            />
            <StatsCard
              title="Avg Response Time"
              value={`${(userStats.averageResponseTime / 1000).toFixed(1)}s`}
              icon={Clock}
              description="Time to answer"
            />
          </div>
        )}

        {/* Main Content - Tabs */}
        <Tabs defaultValue="patterns" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="patterns">Pattern Performance</TabsTrigger>
            <TabsTrigger value="sessions">Session History</TabsTrigger>
          </TabsList>

          <TabsContent value="patterns" className="space-y-6">
            {/* Weak Patterns Alert */}
            {weakPatterns && weakPatterns.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">
                  Patterns Needing Practice ({weakPatterns.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {weakPatterns.map((pattern) => (
                    <span
                      key={pattern._id}
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                    >
                      {pattern.patternName} ({pattern.accuracy}%)
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pattern Breakdown */}
            <PatternBreakdown patternStats={patternBreakdown || []} />
          </TabsContent>

          <TabsContent value="sessions">
            <SessionHistory sessions={sessionHistory || []} />
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="flex gap-4 justify-center">
          <Link href="/quiz">
            <Button size="lg" className="gap-2">
              <Trophy className="h-5 w-5" />
              Start New Quiz
            </Button>
          </Link>
          <Link href="/reference">
            <Button size="lg" variant="outline" className="gap-2">
              View Pattern Reference
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

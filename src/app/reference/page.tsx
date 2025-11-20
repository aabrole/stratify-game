'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { BarTypeGuide } from '@/components/reference/BarTypeGuide';
import { PatternCard } from '@/components/reference/PatternCard';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function ReferencePage() {
  const { isLoaded, isSignedIn } = useUser();

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Not signed in - still allow access to reference
  const content = (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <BookOpen className="h-10 w-10" />
            Pattern Reference Library
          </h1>
          <p className="text-gray-600">
            Complete guide to The Strat candlestick patterns with visual examples
          </p>
        </div>

        {/* Accordion for organized content */}
        <Accordion type="multiple" defaultValue={['bar-types', 'type-1', 'type-2', 'type-3']} className="space-y-4">
          {/* Bar Types Explanation */}
          <AccordionItem value="bar-types" className="bg-white rounded-lg border">
            <AccordionTrigger className="px-6 py-4 text-xl font-semibold hover:no-underline">
              Understanding Bar Types (Type 1, 2, 3)
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <BarTypeGuide />
            </AccordionContent>
          </AccordionItem>

          <Separator />

          {/* Type 1 Patterns */}
          <AccordionItem value="type-1" className="bg-white rounded-lg border">
            <AccordionTrigger className="px-6 py-4 text-xl font-semibold hover:no-underline">
              Type 1 Patterns (Outside Bars)
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PatternCard patternName="1-up" />
                <PatternCard patternName="1-down" />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Type 2 Patterns */}
          <AccordionItem value="type-2" className="bg-white rounded-lg border">
            <AccordionTrigger className="px-6 py-4 text-xl font-semibold hover:no-underline">
              Type 2 Patterns (Inside Bars)
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PatternCard patternName="2-up" />
                <PatternCard patternName="2-down" />
                <PatternCard patternName="2-up-outside" />
                <PatternCard patternName="2-down-outside" />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Type 3 Patterns */}
          <AccordionItem value="type-3" className="bg-white rounded-lg border">
            <AccordionTrigger className="px-6 py-4 text-xl font-semibold hover:no-underline">
              Type 3 Patterns (Directional Bars)
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PatternCard patternName="3-bullish" />
                <PatternCard patternName="3-bearish" />
                <PatternCard patternName="3-inside" />
                <PatternCard patternName="3-outside" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Bottom Action */}
        {isSignedIn && (
          <div className="flex gap-4 justify-center pt-8">
            <Link href="/quiz">
              <Button size="lg" className="gap-2">
                Test Your Knowledge
              </Button>
            </Link>
            <Link href="/analytics">
              <Button size="lg" variant="outline" className="gap-2">
                View Your Analytics
              </Button>
            </Link>
          </div>
        )}

        {!isSignedIn && (
          <div className="flex gap-4 justify-center pt-8">
            <Link href="/">
              <Button size="lg" className="gap-2">
                Sign In to Start Learning
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return content;
}

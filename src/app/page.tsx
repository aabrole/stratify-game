'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function Home() {
  const router = useRouter();
  const { isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      // Redirect to game page
      router.push('/game');
    }
  }, [isLoaded, router]);

  return (
    <div className="min-h-screen bg-game flex items-center justify-center">
      <div className="text-center text-white">
        <div className="text-6xl mb-4">⚡</div>
        <h1 className="text-4xl font-bold mb-4">STRAT MASTER</h1>
        <p className="text-xl text-gray-300">Loading...</p>
      </div>
    </div>
  );
}

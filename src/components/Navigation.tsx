'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Trophy, BarChart3, BookOpen } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/game', label: 'Game', icon: Trophy, badge: null },
    { href: '/analytics', label: 'Analytics', icon: BarChart3, badge: 'Coming Soon' },
    { href: '/reference', label: 'Reference', icon: BookOpen, badge: 'Coming Soon' },
  ];

  const isActive = (href: string) => {
    if (href === '/game') {
      return pathname === '/' || pathname === '/game';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-600 rounded">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">Stratify</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={active ? 'default' : 'ghost'}
                      className="gap-2 relative"
                      size="sm"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                      {item.badge && (
                        <span className="ml-1 px-1.5 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-800 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="flex gap-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={active ? 'default' : 'ghost'}
                  size="sm"
                  className="flex-col h-auto py-2 gap-1 relative"
                >
                  <Icon className="h-4 w-4" />
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{item.label}</span>
                    {item.badge && (
                      <span className="px-1 py-0.5 text-[8px] font-medium bg-amber-100 text-amber-800 rounded-full whitespace-nowrap">
                        Soon
                      </span>
                    )}
                  </div>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

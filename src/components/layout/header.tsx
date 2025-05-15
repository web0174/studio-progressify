// src/components/layout/header.tsx
import Link from 'next/link';
import { Rocket } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Rocket className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold text-primary">Progressify</span>
        </Link>
        <nav className="flex items-center space-x-4">
          {/* Navigation links can go here if needed */}
          {/* For example: <Link href="/features" className="text-sm font-medium text-foreground/80 hover:text-primary">Features</Link> */}
        </nav>
      </div>
    </header>
  );
}

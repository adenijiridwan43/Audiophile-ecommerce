// src/app/not-found.tsx - 404 page

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-very-light-gray">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold uppercase mb-4">Page Not Found</h2>
        <p className="text-dark-gray mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. The page may have been 
          moved or deleted.
        </p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}
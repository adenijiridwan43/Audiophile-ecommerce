// src/app/layout.tsx - Root Layout with Header/Footer

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { CartModal } from '@/components/cart/CartModal';
import { ToastContainer } from '@/components/ui/Toast';

const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Audiophile - Premium Audio Equipment',
  description: 'Shop high-end headphones, speakers, and earphones at Audiophile. Experience premium audio quality.',
  keywords: 'headphones, speakers, earphones, audio equipment, premium audio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Providers>
          {/* Header */}
          <Header />
          
          {/* Mobile Menu */}
          <MobileMenu />
          
          {/* Cart Modal */}
          <CartModal />
          
          {/* Toast Notifications */}
          <ToastContainer />
          
          {/* Main Content */}
          {children}
          
          {/* Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
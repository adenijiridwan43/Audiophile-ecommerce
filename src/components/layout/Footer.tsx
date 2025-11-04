// src/components/layout/Footer.tsx - Main Footer

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-6 lg:px-8 pt-16 pb-12">
        {/* Top Bar */}
        <div className="h-1 w-24 bg-primary mb-12" />

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left Column */}
          <div>
            {/* Logo */}
            <Link 
              href="/" 
              className="text-2xl font-bold tracking-tight hover:text-primary transition-colors inline-block mb-8"
            >
              audiophile
            </Link>

            {/* Description */}
            <p className="text-white/50 text-sm leading-relaxed max-w-xl">
              Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers 
              and sound specialists who are devoted to helping you get the most out of personal audio. Come and 
              visit our demo facility - we're open 7 days a week.
            </p>
          </div>

          {/* Right Column - Desktop Navigation */}
          <nav className="hidden md:flex md:flex-col md:items-end">
            <div className="flex gap-8 mb-8">
              <Link
                href="/"
                className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/headphones"
                className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                Headphones
              </Link>
              <Link
                href="/speakers"
                className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                Speakers
              </Link>
              <Link
                href="/earphones"
                className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                Earphones
              </Link>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col gap-4 mb-12 md:hidden">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/headphones"
            className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Headphones
          </Link>
          <Link
            href="/speakers"
            className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Speakers
          </Link>
          <Link
            href="/earphones"
            className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Earphones
          </Link>
        </nav>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pt-8 border-t border-white/10">
          {/* Copyright */}
          <p className="text-white/50 text-sm">
            Copyright {new Date().getFullYear()}. All Rights Reserved
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
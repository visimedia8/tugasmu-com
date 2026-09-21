'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  const isMoneyPage = pathname.startsWith('/tools');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-50/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight font-heading text-slate-900">
            Tugas<span className="text-sky-500">Mu</span>
            <span className="text-xs font-semibold px-1.5 py-0.5 ml-1.5 rounded bg-sky-100 text-sky-700">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/tools" className="hover:text-sky-600 transition-colors">Tools AI</Link>
          <Link href="/#statistik" className="hover:text-sky-600 transition-colors">Statistik</Link>
          <Link href="/guru" className="hover:text-sky-600 transition-colors">Guru Kontributor</Link>
          {!isMoneyPage && (
            <Link href="/blog" className="hover:text-sky-600 transition-colors">Blog</Link>
          )}
        </nav>

        {/* Desktop Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/tools" className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm shadow-sm hover:shadow-md shadow-sky-500/25 transition-all duration-200 flex items-center gap-2 cursor-pointer">
            <span>Coba Gratis</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors" 
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-base font-medium text-slate-700">
            <Link href="/tools" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">Tools AI</Link>
            <Link href="/#statistik" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">Statistik</Link>
            <Link href="/guru" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">Guru Kontributor</Link>
            {!isMoneyPage && (
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">Blog</Link>
            )}
          </div>
          <div className="pt-2">
            <Link href="/tools" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-center shadow-md shadow-sky-500/25 transition-all flex items-center justify-center gap-2">
              <span>Coba Gratis Sekarang</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, LogOut, Crown } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isSignedIn = !!session;

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">TugasMu</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive('/') ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'}`}>Beranda</Link>
          <Link href="/tools" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive('/tools') ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'}`}>AI Tools</Link>
          <Link href="/harga" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${isActive('/harga') ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'}`}>
            <Crown className="w-4 h-4" />
            Premium
          </Link>
          <Link href="/blog" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive('/blog') ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'}`}>Blog</Link>
        </nav>

        {/* Auth / CTA Button Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <Link href="/akun" className="flex items-center gap-2">
                <img 
                  src={session?.user?.image ?? 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} 
                  alt={session?.user?.name ?? 'User'} 
                  className="w-8 h-8 rounded-full border border-slate-200"
                />
              </Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm text-slate-600 hover:text-red-500 transition-colors flex items-center gap-1">
                <LogOut className="w-4 h-4" />
                <span className="sr-only">Keluar</span>
              </button>
            </div>
          ) : (
            <Link 
              href="/masuk"
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition-all shadow-md shadow-sky-500/20 active:scale-95 flex items-center gap-2"
            >
              Masuk / Daftar
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-4">
          {isSignedIn && (
            <div className="flex items-center gap-3">
              <Link href="/akun" className="flex items-center gap-2">
                <img 
                  src={session?.user?.image ?? 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} 
                  alt={session?.user?.name ?? 'User'} 
                  className="w-8 h-8 rounded-full border border-slate-200"
                />
              </Link>
            </div>
          )}
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
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">Beranda</Link>
            <Link href="/tools" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">AI Tools</Link>
            <Link href="/harga" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2"><Crown className="w-4 h-4"/> Premium</Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">Blog</Link>
          </div>
          <div className="pt-2">
            {!isSignedIn ? (
              <Link href="/masuk" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-center shadow-md shadow-sky-500/25 transition-all flex items-center justify-center gap-2">
                <span>Masuk / Daftar</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            ) : (
              <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full py-3 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 font-semibold text-center transition-all flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}





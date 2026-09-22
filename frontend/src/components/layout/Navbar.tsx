/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isSignedIn = !!session;

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');



  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main navbar */}
      <div className="bg-brand-cream/95 backdrop-blur-md border-b border-brand-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo — wordmark style */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center shadow-sm group-hover:bg-brand-lime transition-colors duration-300">
              <svg className="w-4 h-4 fill-brand-cream group-hover:fill-brand-navy transition-colors duration-300" viewBox="0 0 24 24">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span className="font-heading font-bold text-xl text-brand-navy tracking-tight group-hover:text-brand-navy/70 transition-colors">
              TugasMu
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/tools"
              className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                pathname === '/tools' && !pathname.includes('cat')
                  ? 'text-brand-navy bg-brand-lime'
                  : 'text-brand-navy/70 hover:text-brand-navy hover:bg-brand-navy/5'
              }`}
            >
              Semua Tools
            </Link>
            
            <div className="relative group">
              <button className="relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 text-brand-navy/70 hover:text-brand-navy hover:bg-brand-navy/5 flex items-center gap-1">
                Kategori
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50">
                <Link href="/tools?cat=tulis" className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600 flex flex-col">
                  <span>Tugas Tulis & Makalah</span>
                  <span className="text-xs text-slate-400 font-normal mt-0.5">KTI, Parafrase, EYD Checker</span>
                </Link>
                <Link href="/tools?cat=pesantren" className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600 flex flex-col">
                  <span>Pesantren & Madrasah</span>
                  <span className="text-xs text-slate-400 font-normal mt-0.5">Kitab Kuning, Nahwu Shorof</span>
                </Link>
                <Link href="/tools?cat=smk" className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600 flex flex-col">
                  <span>SMK & Kejuruan</span>
                  <span className="text-xs text-slate-400 font-normal mt-0.5">Proposal, Laporan PKL, Akuntansi</span>
                </Link>
                <Link href="/tools?cat=anak" className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600 flex flex-col">
                  <span>SD & Anak</span>
                  <span className="text-xs text-slate-400 font-normal mt-0.5">Cerita Pendek, Kamus Anak</span>
                </Link>
                <Link href="/tools?cat=umum" className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600 flex flex-col border-t border-slate-100 mt-1 pt-3">
                  <span>Akademik Umum</span>
                  <span className="text-xs text-slate-400 font-normal mt-0.5">Rangkuman, Math Solver, UTBK</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <div className="flex items-center gap-2">
                <Link href="/akun">
                  <img
                    src={session?.user?.image ?? 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                    alt={session?.user?.name ?? 'User'}
                    className="w-8 h-8 rounded-full border-2 border-brand-lime"
                  />
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-2 rounded-full text-brand-navy/50 hover:text-red-500 transition-colors"
                  aria-label="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/masuk"
                className="px-5 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy/90 text-brand-cream font-bold text-sm transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
              >
                Masuk / Daftar
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            {isSignedIn && (
              <Link href="/akun">
                <img
                  src={session?.user?.image ?? 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                  alt={session?.user?.name ?? 'User'}
                  className="w-8 h-8 rounded-full border-2 border-brand-lime"
                />
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-brand-navy hover:bg-brand-navy/5 transition-colors"
              aria-label="Toggle Menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="8" x2="21" y2="8" />
                    <line x1="3" y1="16" x2="21" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-cream border-b border-brand-navy/10 px-4 pt-2 pb-6 space-y-1 shadow-lg h-[80vh] overflow-y-auto">
          <div className="font-bold text-xs text-brand-navy/50 uppercase tracking-wider px-4 py-2">Navigasi Utama</div>
          <Link
            href="/tools"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
              pathname === '/tools' && !pathname.includes('cat')
                ? 'bg-brand-lime text-brand-navy'
                : 'text-brand-navy/70 hover:text-brand-navy hover:bg-brand-navy/5'
            }`}
          >
            Semua Tools
          </Link>

          <div className="font-bold text-xs text-brand-navy/50 uppercase tracking-wider px-4 pt-4 pb-2">Kategori Tools</div>
          <Link href="/tools?cat=tulis" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-brand-navy/5 rounded-xl">
            Tugas Tulis & Makalah
          </Link>
          <Link href="/tools?cat=pesantren" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-brand-navy/5 rounded-xl">
            Pesantren & Madrasah
          </Link>
          <Link href="/tools?cat=smk" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-brand-navy/5 rounded-xl">
            SMK & Kejuruan
          </Link>
          <Link href="/tools?cat=anak" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-brand-navy/5 rounded-xl">
            SD & Anak
          </Link>
          <Link href="/tools?cat=umum" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-brand-navy/5 rounded-xl">
            Akademik Umum
          </Link>

          <div className="pt-6 border-t border-brand-navy/10 mt-4">
            {!isSignedIn ? (
              <Link
                href="/masuk"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-3 rounded-xl bg-brand-navy text-brand-cream font-bold text-center transition-all"
              >
                Masuk / Daftar
              </Link>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="block w-full py-3 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 font-semibold text-center transition-all"
              >
                Keluar
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

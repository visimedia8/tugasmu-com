/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogOut, LayoutDashboard, ReceiptText, ChevronDown } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isSignedIn = status === 'authenticated';
  const isLoading = status === 'loading';

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main navbar */}
      <div className="bg-brand-cream/95 backdrop-blur-md border-b border-brand-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
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
          <nav className="hidden lg:flex items-center gap-1">
            
            {/* Kategori 1: Tugas Tulis */}
            <div className="relative group">
              <button className="relative px-3 py-2 text-sm font-semibold rounded-full transition-all duration-200 text-brand-navy/70 hover:text-brand-navy hover:bg-brand-navy/5 flex items-center gap-1">
                Tugas Tulis
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50">
                <Link href="/tools/parafrase" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Parafrase Teks & Makalah</Link>
                <Link href="/tools/grammar-eyd" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Cek Grammar & EYD</Link>
                <Link href="/tools/makalah-builder" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Struktur Makalah</Link>
                <Link href="/tools/kti-builder" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Karya Tulis Ilmiah</Link>
                <Link href="/tools/slide-outline" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Slide Presentasi</Link>
                <Link href="/tools?cat=tulis" className="px-4 py-2 mt-1 border-t border-slate-100 text-xs font-bold text-sky-600 hover:bg-slate-50">Lihat Semua →</Link>
              </div>
            </div>

            {/* Kategori 2: Pesantren */}
            <div className="relative group">
              <button className="relative px-3 py-2 text-sm font-semibold rounded-full transition-all duration-200 text-brand-navy/70 hover:text-brand-navy hover:bg-brand-navy/5 flex items-center gap-1">
                Pesantren
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50">
                <Link href="/tools/kitab-kuning" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Translator Kitab Kuning</Link>
                <Link href="/tools/nahwu-shorof" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Nahwu & Shorof</Link>
                <Link href="/tools/tafsir-quran" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Tafsir Al-Quran</Link>
                <Link href="/tools/tajwid" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Ilmu Tajwid</Link>
                <Link href="/tools?cat=pesantren" className="px-4 py-2 mt-1 border-t border-slate-100 text-xs font-bold text-sky-600 hover:bg-slate-50">Lihat Semua →</Link>
              </div>
            </div>

            {/* Kategori 3: SMK */}
            <div className="relative group">
              <button className="relative px-3 py-2 text-sm font-semibold rounded-full transition-all duration-200 text-brand-navy/70 hover:text-brand-navy hover:bg-brand-navy/5 flex items-center gap-1">
                SMK
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50">
                <Link href="/tools/laporan-pkl" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Laporan PKL</Link>
                <Link href="/tools/cv-lamaran" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">CV & Lamaran (ATS)</Link>
                <Link href="/tools/akuntansi-solver" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Jurnal Akuntansi</Link>
                <Link href="/tools/proposal-usaha" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Proposal Usaha</Link>
                <Link href="/tools?cat=smk" className="px-4 py-2 mt-1 border-t border-slate-100 text-xs font-bold text-sky-600 hover:bg-slate-50">Lihat Semua →</Link>
              </div>
            </div>

            {/* Kategori 4: Umum & SD */}
            <div className="relative group">
              <button className="relative px-3 py-2 text-sm font-semibold rounded-full transition-all duration-200 text-brand-navy/70 hover:text-brand-navy hover:bg-brand-navy/5 flex items-center gap-1">
                Umum & SD
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50">
                <Link href="/tools/math-solver" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Math Solver</Link>
                <Link href="/tools/generator-soal" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Generator Soal</Link>
                <Link href="/tools/rangkuman" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Rangkuman Materi</Link>
                <Link href="/tools/simulasi-utbk" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Simulasi UTBK</Link>
                <Link href="/tools/kamus-anak" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600">Kamus Anak (SD)</Link>
                <Link href="/tools?cat=umum" className="px-4 py-2 mt-1 border-t border-slate-100 text-xs font-bold text-sky-600 hover:bg-slate-50">Lihat Semua →</Link>
              </div>
            </div>

          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <Skeleton className="w-24 h-10 rounded-full" />
            ) : isSignedIn ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <button className="flex items-center gap-2 hover:bg-brand-navy/5 p-1 rounded-full transition-colors focus:outline-none">
                      <img
                        src={session?.user?.image ?? 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                        alt={session?.user?.name ?? 'User'}
                        className="w-8 h-8 rounded-full border-2 border-brand-lime"
                      />
                      <ChevronDown className="w-4 h-4 text-brand-navy/50 mr-1" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session?.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href="/akun" className="cursor-pointer">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard Akun</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/akun?tab=tagihan" className="cursor-pointer">
                          <ReceiptText className="mr-2 h-4 w-4" />
                          <span>Riwayat Transaksi</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer" onClick={() => signOut({ callbackUrl: '/' })}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Keluar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
            {isLoading ? (
              <Skeleton className="w-8 h-8 rounded-full" />
            ) : isSignedIn && (
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
        <div className="md:hidden bg-brand-cream border-b border-brand-navy/10 px-4 pt-2 pb-6 space-y-1 shadow-lg h-[80vh] overflow-y-auto z-50 absolute w-full left-0">
          <div className="font-bold text-xs text-brand-navy/50 uppercase tracking-wider px-4 pt-4 pb-2">Kategori Tools</div>
          <Link href="/tools?cat=tulis" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navy/5 rounded-xl">
            Tugas Tulis & Makalah
          </Link>
          <Link href="/tools?cat=pesantren" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navy/5 rounded-xl">
            Pesantren & Madrasah
          </Link>
          <Link href="/tools?cat=smk" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navy/5 rounded-xl">
            SMK & Kejuruan
          </Link>
          <Link href="/tools?cat=anak" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navy/5 rounded-xl">
            SD & Anak
          </Link>
          <Link href="/tools?cat=umum" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navy/5 rounded-xl">
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
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  setIsMobileMenuOpen(false);
                }}
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

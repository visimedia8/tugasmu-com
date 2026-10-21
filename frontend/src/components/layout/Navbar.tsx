/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronRight,
  Search,
  X,
  Sparkles,
  Calculator,
  Briefcase,
  BookOpen,
  ArrowRight,
  LogOut,
  LayoutDashboard,
  ReceiptText,
} from 'lucide-react';
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

interface NavItem {
  name: string;
  href: string;
  desc: string;
  badge?: string;
}

interface NavCategory {
  id: string;
  title: string;
  badge?: string;
  allHref: string;
  allLabel: string;
  items: NavItem[];
}

const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'tulis',
    title: 'Tugas & Tulisan',
    badge: 'Populer',
    allHref: '/tools?cat=tulis',
    allLabel: 'Lihat Semua Tools Tulis (7)',
    items: [
      {
        name: 'Parafrase Teks & Makalah',
        href: '/tools/parafrase',
        desc: 'Tulis ulang teks tugas agar natural & lolos Turnitin',
        badge: 'Turnitin',
      },
      {
        name: 'Cek Grammar & EYD',
        href: '/tools/grammar-bahasa-indonesia',
        desc: 'Perbaiki tata bahasa, ejaan baku & kaidah PUEBI',
      },
      {
        name: 'Grammar Bahasa Inggris',
        href: '/tools/grammar-bahasa-inggris',
        desc: 'Koreksi esai Inggris & rekomendasi kosakata CEFR',
      },
      {
        name: 'Struktur Makalah',
        href: '/tools/makalah-builder',
        desc: 'Susun bab pendahuluan, pembahasan & daftar pustaka',
      },
      {
        name: 'Karya Tulis Ilmiah (KTI)',
        href: '/tools/kti-builder',
        desc: 'Generator kerangka riset, hipotesis & metodologi',
      },
      {
        name: 'Slide Outline',
        href: '/tools/slide-outline',
        desc: 'Ringkas makalah jadi materi slide presentasi siap pakai',
      },
      {
        name: 'Generator Teks Pidato',
        href: '/tools/pidato',
        desc: 'Buat naskah pidato upacara, perpisahan & lomba',
      },
    ],
  },
  {
    id: 'umum',
    title: 'Pelajaran & Ujian',
    allHref: '/tools?cat=umum',
    allLabel: 'Lihat Semua Tools Pelajaran (8)',
    items: [
      {
        name: 'Math Solver',
        href: '/tools/math-solver',
        desc: 'Hitung rumus & persamaan matematika langkah demi langkah',
        badge: 'Step-by-Step',
      },
      {
        name: 'Generator Soal & Kuis',
        href: '/tools/generator-soal',
        desc: 'Paket latihan soal lengkap kunci jawaban & pembahasan',
      },
      {
        name: 'Rangkuman Materi & Bab',
        href: '/tools/rangkuman',
        desc: 'Ringkas bab buku cetak & dokumen PDF panjang jadi hafalan',
      },
      {
        name: 'Simulasi UTBK SNBT',
        href: '/tools/simulasi-utbk',
        desc: 'Latihan soal penalaran skolastik & analisis skor ujian',
      },
      {
        name: 'Kamus Pelajaran Anak',
        href: '/tools/kamus-anak',
        desc: 'Penjelasan istilah sains & sosial bahasa ramah anak SD',
      },
    ],
  },
  {
    id: 'smk',
    title: 'Kejuruan & Karier',
    badge: 'SMK',
    allHref: '/tools?cat=smk',
    allLabel: 'Lihat Semua Tools Kejuruan (6)',
    items: [
      {
        name: 'Laporan PKL & Magang',
        href: '/tools/laporan-pkl',
        desc: 'Format bab laporan magang & logbook kegiatan industri',
        badge: 'Format SMK',
      },
      {
        name: 'CV & Lamaran Kerja (ATS)',
        href: '/tools/cv-lamaran',
        desc: 'Surat lamaran & template CV ramah mesin screening HRD',
      },
      {
        name: 'Jurnal Akuntansi',
        href: '/tools/akuntansi-solver',
        desc: 'Catat transaksi debit, kredit, buku besar & neraca saldo',
      },
      {
        name: 'Proposal Usaha & Bisnis',
        href: '/tools/proposal-usaha',
        desc: 'Rencana kewirausahaan, analisis SWOT & estimasi modal',
      },
    ],
  },
  {
    id: 'pesantren',
    title: 'Madrasah & Pesantren',
    badge: 'Khas',
    allHref: '/tools?cat=pesantren',
    allLabel: 'Lihat Semua Tools Pesantren (7)',
    items: [
      {
        name: 'Translator Kitab Kuning',
        href: '/tools/kitab-kuning',
        desc: 'Terjemah Arab gundul & makna gandul ala santri',
        badge: 'Santri',
      },
      {
        name: 'Nahwu & Shorof',
        href: '/tools/nahwu-shorof',
        desc: 'Tashrif fi\'il, penjelas pola kata & analisis i\'rob kalimat',
      },
      {
        name: 'Tafsir Al-Qur\'an',
        href: '/tools/tafsir-quran',
        desc: 'Tafsir tematik ayat pilihan lengkap dengan asbabul nuzul',
      },
      {
        name: 'Ilmu Tajwid & Tahsin',
        href: '/tools/tajwid',
        desc: 'Hukum bacaan ayat (idgham, ikhfa, mad) & cara pelafalannya',
      },
      {
        name: 'Materi PAI & Fikih',
        href: '/tools/materi-pai',
        desc: 'Rangkuman akidah akhlak, fikih ibadah & SKI madrasah',
      },
    ],
  },
];

const BENTO_QUICK_TOOLS = [
  {
    name: 'Parafrase Teks',
    href: '/tools/parafrase',
    desc: 'Lolos Turnitin',
    badge: 'Tulis',
    icon: Sparkles,
  },
  {
    name: 'Math Solver',
    href: '/tools/math-solver',
    desc: 'Rumus Step-by-Step',
    badge: 'Hitungan',
    icon: Calculator,
  },
  {
    name: 'Laporan PKL',
    href: '/tools/laporan-pkl',
    desc: 'Standar Industri',
    badge: 'SMK',
    icon: Briefcase,
  },
  {
    name: 'Kitab Kuning',
    href: '/tools/kitab-kuning',
    desc: 'Makna Gandul',
    badge: 'Pesantren',
    icon: BookOpen,
  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('tulis');
  const { data: session, status } = useSession();
  const isSignedIn = status === 'authenticated';
  const isLoading = status === 'loading';

  // Lock body scroll when mobile menu is open to prevent jitter and CLS
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Flattened tools list for instant search filtering
  const allTools = useMemo(() => {
    return NAV_CATEGORIES.flatMap((cat) =>
      cat.items.map((item) => ({
        ...item,
        categoryTitle: cat.title,
      }))
    );
  }, []);

  // Filtered tools when searching in mobile drawer
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.desc.toLowerCase().includes(q) ||
        tool.categoryTitle.toLowerCase().includes(q)
    );
  }, [searchQuery, allTools]);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Main navbar bar */}
      <div className="bg-brand-cream/95 backdrop-blur-md border-b border-brand-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center shadow-sm group-hover:bg-brand-lime transition-colors duration-200">
              <svg
                className="w-4 h-4 fill-brand-cream group-hover:fill-brand-navy transition-colors duration-200"
                viewBox="0 0 24 24"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-brand-navy tracking-tight leading-none group-hover:text-brand-navy/70 transition-colors">
                TugasMu
              </span>
              <span className="text-[10px] font-semibold text-brand-navy/40 tracking-wider uppercase mt-0.5">
                AI Edukasi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (5 Intent Clusters) */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_CATEGORIES.map((category, index) => {
              const alignRight = index >= 2;
              return (
                <div key={category.id} className="relative group">
                  <button className="relative px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-150 text-brand-navy/75 hover:text-brand-navy hover:bg-brand-navy/5 flex items-center gap-1.5 focus:outline-none">
                    <span>{category.title}</span>
                    {category.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-brand-lime text-brand-navy leading-normal">
                        {category.badge}
                      </span>
                    )}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  {/* Mega-Menu Panel */}
                  <div
                    className={`absolute top-full ${
                      alignRight ? 'right-0' : 'left-0'
                    } pt-2 w-[380px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}
                  >
                    <div className="bg-white border border-brand-navy/10 shadow-2xl rounded-2xl p-2.5 flex flex-col">
                      <div className="px-3 py-1.5 flex items-center justify-between border-b border-brand-navy/5 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-navy/50">
                          {category.title}
                        </span>
                        <span className="text-[11px] font-medium text-brand-navy/40">
                          {category.items.length} Tools
                        </span>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        {category.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group/item px-3 py-2 rounded-xl text-left hover:bg-brand-cream/80 transition-colors flex items-start justify-between gap-2"
                          >
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-brand-navy group-hover/item:text-brand-navy transition-colors">
                                {item.name}
                              </span>
                              <span className="text-xs text-brand-navy/60 line-clamp-1 leading-snug">
                                {item.desc}
                              </span>
                            </div>
                            {item.badge && (
                              <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-brand-navy/5 text-brand-navy/80 group-hover/item:bg-brand-lime group-hover/item:text-brand-navy transition-colors mt-0.5">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>

                      {/* Dropdown Footer CTA */}
                      <Link
                        href={category.allHref}
                        className="mt-1.5 pt-2 border-t border-brand-navy/5 px-3 py-1.5 rounded-xl text-xs font-bold text-brand-navy/80 hover:text-brand-navy hover:bg-brand-navy/5 flex items-center justify-between transition-colors"
                      >
                        <span>{category.allLabel}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Kamus Glosarium */}
            <Link
              href="/kamus"
              className="px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-150 text-brand-navy/75 hover:text-brand-navy hover:bg-brand-navy/5"
            >
              Kamus
            </Link>

            {/* Blog Edukasi */}
            <Link
              href="/blog"
              className="px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-150 text-brand-navy/75 hover:text-brand-navy hover:bg-brand-navy/5"
            >
              Blog
            </Link>
          </nav>

          {/* Desktop Right CTA / User Profile */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/harga"
              className="text-xs font-bold px-3 py-1.5 rounded-full border border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5 transition-colors"
            >
              Paket Pro ⚡
            </Link>

            {isLoading ? (
              <Skeleton className="w-24 h-10 rounded-full" />
            ) : isSignedIn ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <button
                      className="flex items-center gap-2 hover:bg-brand-navy/5 p-1 rounded-full transition-colors focus:outline-none"
                      aria-label="User Menu"
                    >
                      <img
                        src={
                          session?.user?.image ??
                          'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                        }
                        alt={session?.user?.name ?? 'User'}
                        className="w-8 h-8 rounded-full border-2 border-brand-lime object-cover"
                      />
                      <ChevronDown className="w-4 h-4 text-brand-navy/50 mr-1" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-brand-navy">
                          {session?.user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          {session?.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href="/akun" className="cursor-pointer flex items-center">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard Akun</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/akun?tab=tagihan" className="cursor-pointer flex items-center">
                          <ReceiptText className="mr-2 h-4 w-4" />
                          <span>Riwayat Transaksi</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 cursor-pointer flex items-center"
                      onClick={() => signOut({ callbackUrl: '/' })}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Keluar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link
                href="/masuk"
                className="px-5 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy/90 text-brand-cream font-bold text-sm transition-all shadow-sm hover:shadow active:scale-95 flex items-center gap-2"
              >
                Masuk / Daftar
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2.5">
            {isSignedIn && (
              <Link href="/akun" aria-label="Profil Akun">
                <img
                  src={
                    session?.user?.image ??
                    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                  }
                  alt={session?.user?.name ?? 'User'}
                  className="w-8 h-8 rounded-full border-2 border-brand-lime object-cover"
                />
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-xl text-brand-navy hover:bg-brand-navy/5 active:scale-95 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2.2]" />
              ) : (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Premium Mobile Bento Drawer (Fullscreen Fixed Overlay, Zero CLS) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-brand-cream text-brand-navy">
          
          {/* Drawer Top Bar */}
          <div className="h-16 px-4 border-b border-brand-navy/10 flex items-center justify-between shrink-0 bg-brand-cream/95 backdrop-blur-md">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 fill-brand-cream" viewBox="0 0 24 24">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span className="font-heading font-bold text-xl text-brand-navy tracking-tight">
                TugasMu
              </span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy active:scale-95 transition-colors focus:outline-none"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* Drawer Quick Search Field */}
          <div className="px-4 pt-3 pb-2 shrink-0 bg-brand-cream">
            <div className="relative">
              <Search className="w-4 h-4 text-brand-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari tugas, rumus, makalah, kitab..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border border-brand-navy/15 text-sm placeholder:text-brand-navy/40 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="w-8 h-8 flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 text-brand-navy/40 hover:text-brand-navy"
                  aria-label="Hapus Pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Drawer Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
            
            {/* If searching: Show Instant Search Results */}
            {searchQuery ? (
              <div className="space-y-1.5 pt-1">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-navy/50 px-1 pb-1">
                  Hasil Pencarian ({searchResults.length})
                </div>
                {searchResults.length > 0 ? (
                  searchResults.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block p-3 rounded-xl bg-white border border-brand-navy/10 hover:border-brand-navy/20 active:scale-[0.99] transition-all shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-brand-navy">{tool.name}</span>
                        <span className="text-[10px] font-semibold text-brand-navy/50 bg-brand-navy/5 px-2 py-0.5 rounded-md">
                          {tool.categoryTitle}
                        </span>
                      </div>
                      <p className="text-xs text-brand-navy/60 mt-0.5 line-clamp-1">{tool.desc}</p>
                    </Link>
                  ))
                ) : (
                  <div className="p-6 text-center text-sm text-brand-navy/60 bg-white rounded-xl border border-brand-navy/10">
                    Tidak ditemukan alat untuk &ldquo;{searchQuery}&rdquo;.
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Bento Quick Access Grid (4 Most Popular) */}
                <div>
                  <div className="flex items-center justify-between px-1 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-navy/50">
                      ⚡ Akses Cepat Populer
                    </span>
                    <Link
                      href="/tools"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs font-bold text-brand-navy/70 hover:text-brand-navy"
                    >
                      Semua Tools →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {BENTO_QUICK_TOOLS.map((tool) => {
                      const IconComp = tool.icon;
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="p-3 rounded-xl bg-white border border-brand-navy/10 hover:border-brand-navy/30 active:scale-[0.98] transition-all shadow-sm flex flex-col justify-between min-h-[76px]"
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-7 h-7 rounded-lg bg-brand-cream flex items-center justify-center text-brand-navy">
                              <IconComp className="w-4 h-4 stroke-[2]" />
                            </div>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-lime text-brand-navy">
                              {tool.badge}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="text-xs font-bold text-brand-navy leading-tight truncate">
                              {tool.name}
                            </div>
                            <div className="text-[11px] text-brand-navy/60 leading-none mt-0.5 truncate">
                              {tool.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Categorized Accordion Section */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-navy/50 px-1">
                    📂 Kategori Solusi Tugas
                  </div>

                  <div className="bg-white rounded-2xl border border-brand-navy/10 divide-y divide-brand-navy/5 overflow-hidden shadow-sm">
                    {NAV_CATEGORIES.map((category) => {
                      const isExpanded = expandedCategory === category.id;
                      return (
                        <div key={category.id} className="transition-colors">
                          <button
                            onClick={() =>
                              setExpandedCategory(isExpanded ? null : category.id)
                            }
                            className="w-full px-4 py-3.5 flex items-center justify-between text-left focus:outline-none hover:bg-brand-cream/50 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-brand-navy">
                                {category.title}
                              </span>
                              {category.badge && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-brand-lime text-brand-navy">
                                  {category.badge}
                                </span>
                              )}
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-brand-navy/40 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="px-3 pb-3 pt-1 space-y-1 bg-brand-cream/30">
                              {category.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-brand-navy hover:bg-white active:scale-[0.99] transition-all"
                                >
                                  <span>{item.name}</span>
                                  {item.badge && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-navy/5 text-brand-navy/70">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              ))}
                              <Link
                                href={category.allHref}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-1.5 text-[11px] font-bold text-brand-navy/70 hover:text-brand-navy text-right"
                              >
                                {category.allLabel} →
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Content & Resources Section */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-navy/50 px-1">
                    📖 Sumber Belajar & Edukasi
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/kamus"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-white border border-brand-navy/10 hover:border-brand-navy/20 active:scale-[0.98] transition-all shadow-sm"
                    >
                      <div className="text-xs font-bold text-brand-navy">Kamus Pelajaran</div>
                      <div className="text-[11px] text-brand-navy/60 mt-0.5">Glosarium SD - SMA</div>
                    </Link>
                    <Link
                      href="/blog"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-white border border-brand-navy/10 hover:border-brand-navy/20 active:scale-[0.98] transition-all shadow-sm"
                    >
                      <div className="text-xs font-bold text-brand-navy">Blog Edukasi</div>
                      <div className="text-[11px] text-brand-navy/60 mt-0.5">Materi & Panduan</div>
                    </Link>
                    <Link
                      href="/tools"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-white border border-brand-navy/10 hover:border-brand-navy/20 active:scale-[0.98] transition-all shadow-sm"
                    >
                      <div className="text-xs font-bold text-brand-navy">Direktori Tools</div>
                      <div className="text-[11px] text-brand-navy/60 mt-0.5">Semua 29+ Asisten AI</div>
                    </Link>
                    <Link
                      href="/harga"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-white border border-brand-lime hover:border-brand-navy/20 active:scale-[0.98] transition-all shadow-sm"
                    >
                      <div className="text-xs font-bold text-brand-navy flex items-center justify-between">
                        <span>Paket Pro</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-brand-lime text-brand-navy">
                          ⚡
                        </span>
                      </div>
                      <div className="text-[11px] text-brand-navy/60 mt-0.5">Akses Unlimited</div>
                    </Link>
                  </div>
                </div>
              </>
            )}

            {/* Bottom Padding so content isn't blocked by Docked Action Bar */}
            <div className="h-20" />
          </div>

          {/* Docked Bottom Action Bar (Thumb Zone) */}
          <div className="shrink-0 p-4 bg-brand-cream border-t border-brand-navy/10 shadow-lg">
            {!isSignedIn ? (
              <div className="space-y-1.5">
                <Link
                  href="/masuk"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full h-12 rounded-xl bg-brand-navy hover:bg-brand-navy/90 text-brand-cream font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md"
                >
                  <span>Mulai Belajar / Masuk Akun</span>
                  <ArrowRight className="w-4 h-4 text-brand-lime" />
                </Link>
                <p className="text-[11px] text-center text-brand-navy/60 font-medium">
                  Gratis 10 token tugas setiap hari ✨
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <Link
                  href="/akun"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 min-w-0"
                >
                  <img
                    src={
                      session?.user?.image ??
                      'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                    }
                    alt={session?.user?.name ?? 'User'}
                    className="w-9 h-9 rounded-full border-2 border-brand-lime object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-brand-navy truncate">
                      {session?.user?.name ?? 'Pengguna'}
                    </p>
                    <p className="text-[10px] text-brand-navy/50 font-medium">Buka Dashboard Akun →</p>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="shrink-0 px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </header>
  );
}

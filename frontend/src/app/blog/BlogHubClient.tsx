'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  kategori: string;
}

export const BLOG_CATEGORIES = [
  { slug: 'bahasa-indonesia', label: 'Bahasa Indonesia', icon: 'menu_book', class: 'bg-blue-50 text-blue-700 border-blue-200' },
  { slug: 'bahasa-inggris', label: 'Bahasa Inggris', icon: 'translate', class: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { slug: 'matematika', label: 'Matematika', icon: 'calculate', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { slug: 'ipa', label: 'IPA & Sains', icon: 'science', class: 'bg-teal-50 text-teal-700 border-teal-200' },
  { slug: 'ips', label: 'IPS & Sosial', icon: 'public', class: 'bg-amber-50 text-amber-700 border-amber-200' },
  { slug: 'sejarah', label: 'Sejarah', icon: 'history_edu', class: 'bg-orange-50 text-orange-700 border-orange-200' },
  { slug: 'ppkn', label: 'PPKn', icon: 'account_balance', class: 'bg-red-50 text-red-700 border-red-200' },
  { slug: 'agama', label: 'Pendidikan Agama', icon: 'auto_stories', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { slug: 'smk', label: 'Kejuruan SMK', icon: 'work', class: 'bg-sky-50 text-sky-700 border-sky-200' },
  { slug: 'seni-budaya', label: 'Seni Budaya', icon: 'palette', class: 'bg-pink-50 text-pink-700 border-pink-200' },
  { slug: 'kurikulum-merdeka', label: 'Kurikulum Merdeka', icon: 'verified', class: 'bg-purple-50 text-purple-700 border-purple-200' },
  { slug: 'persiapan-ujian', label: 'Ujian & UTBK', icon: 'school', class: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { slug: 'tips-belajar', label: 'Tips Belajar', icon: 'psychology', class: 'bg-rose-50 text-rose-700 border-rose-200' },
];

export default function BlogHubClient({ posts }: { posts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  // Group posts by category for the full directory silos
  const postsByCategory = useMemo(() => {
    const map: Record<string, Post[]> = {};
    posts.forEach((p) => {
      if (!map[p.kategori]) map[p.kategori] = [];
      map[p.kategori].push(p);
    });
    return map;
  }, [posts]);

  const getCategoryBadge = (kategori: string) => {
    const match = BLOG_CATEGORIES.find((c) => c.slug === kategori.toLowerCase());
    if (match) {
      return { label: match.label, class: match.class, icon: match.icon };
    }
    return {
      label: kategori.replace(/-/g, ' '),
      class: 'bg-surface-container-high text-primary',
      icon: 'article',
    };
  };

  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.kategori.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  return (
    <div className="flex flex-col w-full">
      {/* Top Header Section & Search */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-high/60 via-surface to-surface py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-margin md:px-margin-desktop relative z-10 flex flex-col items-center text-center">
          {/* Top Kicker Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
              Pusat Bacaan &amp; Edukasi Pelajar ({posts.length} Materi)
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight max-w-3xl">
            Blog &amp; Tips Belajar TugasMu
          </h1>

          {/* Subtitle */}
          <p className="mt-3 font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl">
            Kumpulan tips belajar efektif, panduan Kurikulum Merdeka, trik ngerjain PR cepat, dan materi lengkap SD, SMP, SMA/SMK.
          </p>

          {/* Search Box with tactile elevation */}
          <div className="w-full max-w-2xl mt-8">
            <div className="relative flex items-center bg-surface-container-lowest rounded-xl shadow-md p-1.5 transition-all focus-within:shadow-xl focus-within:ring-2 focus-within:ring-primary-container/40">
              <div className="pl-3 pr-2 text-outline">
                <span className="material-symbols-outlined text-[24px]">search</span>
              </div>
              <input
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none py-2.5"
                placeholder="Cari materi (misal: rumus pythagoras, kalimat aktif, teks eksposisi)..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 text-slate-400 hover:text-slate-600 text-xs font-semibold"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Real Hyperlink Category Filter Bar (Crawlable by Googlebot) */}
          <div className="w-full max-w-5xl mt-6">
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-2 px-1 no-scrollbar">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden lg:inline-block">
                Topik:
              </span>
              {BLOG_CATEGORIES.map((cat) => {
                const count = postsByCategory[cat.slug]?.length || 0;
                return (
                  <Link
                    key={cat.slug}
                    href={`/blog/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 hover:border-sky-400 hover:shadow-xs text-slate-700 hover:text-sky-600 font-label-md text-xs whitespace-nowrap transition-all shrink-0"
                  >
                    <span className="material-symbols-outlined text-[15px]">{cat.icon}</span>
                    <span>{cat.label}</span>
                    {count > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
                        {count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post (First post when not searching) */}
      {!searchQuery && filteredPosts.length > 0 && (
        <section className="max-w-[1200px] w-full mx-auto px-margin md:px-margin-desktop -mt-2 mb-12">
          <div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-lg bg-surface-container-high text-primary tracking-wide">
                      {getCategoryBadge(filteredPosts[0].kategori).label}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      5 menit baca
                    </span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {new Date(filteredPosts[0].date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface group-hover:text-primary transition-colors leading-tight">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="mt-4 font-body-lg text-body-md md:text-body-lg text-on-surface-variant leading-relaxed">
                    {filteredPosts[0].description}
                  </p>
                </div>
                <div className="pt-8 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-label-md text-label-md shadow-sm">
                      AI
                    </div>
                    <div>
                      <div className="font-label-md text-label-md text-on-surface">Redaksi TugasMu</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Tim Kurasi</div>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${filteredPosts[0].kategori}/${filteredPosts[0].slug}`}
                    className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary group-hover:text-primary-container transition-all self-start sm:self-auto font-bold"
                  >
                    <span>Baca Selengkapnya</span>
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-surface-container overflow-hidden flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md p-3.5 rounded-xl shadow-sm flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      getCategoryBadge(filteredPosts[0].kategori).class
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {getCategoryBadge(filteredPosts[0].kategori).icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-label-sm text-label-sm text-tertiary uppercase">Rekomendasi</div>
                    <div className="font-body-sm text-body-sm text-on-surface truncate font-semibold">
                      Artikel Pilihan Editor
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section Articles Grid */}
      <section className="max-w-[1200px] w-full mx-auto px-margin md:px-margin-desktop mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : 'Koleksi Artikel Terbaru'}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Daftar tulisan dan panduan materi kurikulum sekolah dari tim edukasi TugasMu
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
            <span>Ditemukan</span>
            <span className="font-semibold text-primary">{filteredPosts.length}</span>
            <span>Materi</span>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts
                .slice(!searchQuery ? 1 : 0, (!searchQuery ? 1 : 0) + visibleCount)
                .map((post) => {
                  const badge = getCategoryBadge(post.kategori);
                  return (
                    <article
                      key={post.slug}
                      className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group border border-slate-100"
                    >
                      <div className="h-44 w-full relative overflow-hidden bg-slate-50 flex items-center justify-center border-b border-slate-100">
                        <span className="material-symbols-outlined text-[64px] opacity-15 text-slate-800">
                          {badge.icon}
                        </span>
                        <div className="absolute top-3 left-3">
                          <Link
                            href={`/blog/${post.kategori}`}
                            className={`font-label-sm text-xs px-2.5 py-1 rounded-full shadow-xs font-semibold ${badge.class} hover:opacity-90`}
                          >
                            {badge.label}
                          </Link>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 font-body-sm text-xs text-on-surface-variant mb-2">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            <span>
                              {new Date(post.date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                          </div>
                          <h4 className="font-headline-sm text-base md:text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                            <Link href={`/blog/${post.kategori}/${post.slug}`}>{post.title}</Link>
                          </h4>
                          <p className="font-body-sm text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                            {post.description}
                          </p>
                        </div>
                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="font-label-sm text-xs text-on-surface-variant font-medium flex items-center gap-1 capitalize">
                            {post.kategori.replace(/-/g, ' ')}
                          </span>
                          <Link
                            href={`/blog/${post.kategori}/${post.slug}`}
                            className="font-label-md text-xs font-bold text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-all"
                          >
                            <span>Baca Materi</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
            {filteredPosts.length > (!searchQuery ? 1 : 0) + visibleCount && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-6 py-3 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-highest transition-colors flex items-center gap-2"
                >
                  <span>Muat Lebih Banyak ({filteredPosts.length - ((!searchQuery ? 1 : 0) + visibleCount)} Tersisa)</span>
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-16 text-center bg-surface-container-lowest rounded-xl shadow-sm mt-6">
            <div className="w-12 h-12 rounded-full bg-surface-container-high mx-auto flex items-center justify-center text-on-surface-variant mb-3">
              <span className="material-symbols-outlined text-[24px]">search_off</span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface">Tidak ada artikel yang cocok</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Coba gunakan kata kunci pencarian yang lain.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 rounded-xl bg-primary-fixed text-on-primary-fixed font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors"
            >
              Tampilkan Semua Artikel
            </button>
          </div>
        )}
      </section>

      {/* TOPICAL SILOS & KNOWLEDGE HUBS DIRECTORY (KORAY SEMANTIC SEO FOUNDATION) */}
      {!searchQuery && (
        <section className="max-w-[1200px] w-full mx-auto px-margin md:px-margin-desktop mb-20">
          <div className="border-t border-slate-200 pt-12 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 inline-block mb-3">
              Struktur Silo Otoritas
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-2">
              Jelajahi Berdasarkan Klaster Materi Sekolah
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Akses direktori lengkap per mata pelajaran untuk menemukan seluruh panduan materi, latihan soal, dan ringkasan konsep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_CATEGORIES.map((cat) => {
              const catPosts = postsByCategory[cat.slug] || [];
              if (catPosts.length === 0) return null;
              return (
                <div
                  key={cat.slug}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-sky-600 text-[24px]">
                          {cat.icon}
                        </span>
                        <Link
                          href={`/blog/${cat.slug}`}
                          className="font-heading font-bold text-slate-900 hover:text-sky-600 text-lg transition-colors"
                        >
                          {cat.label}
                        </Link>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-bold text-slate-600">
                        {catPosts.length} Materi
                      </span>
                    </div>

                    {/* Top 3 Articles in this Silo */}
                    <ul className="space-y-2 mb-4">
                      {catPosts.slice(0, 3).map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/blog/${p.kategori}/${p.slug}`}
                            className="text-xs text-slate-700 hover:text-sky-600 hover:underline flex items-start gap-1.5 leading-snug"
                          >
                            <span className="text-slate-400 mt-0.5">•</span>
                            <span className="line-clamp-1">{p.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/blog/${cat.slug}`}
                    className="inline-flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors group"
                  >
                    <span>Lihat Semua {catPosts.length} Materi {cat.label}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Newsletter Subscription Banner */}
      <section className="max-w-[1200px] w-full mx-auto px-margin md:px-margin-desktop mb-16">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary to-primary-container text-on-primary shadow-xl p-8 md:p-12">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm mb-4">
              <span className="material-symbols-outlined text-[16px]">mark_email_read</span>
              <span>Newsletter Mingguan Pelajar</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary font-bold tracking-tight">
              Dapatkan Tips Belajar &amp; Kisi-Kisi Ujian Setiap Minggu
            </h3>
            <p className="mt-3 font-body-md text-body-md text-on-primary/85 max-w-lg mx-auto">
              Rangkuman panduan Kurikulum Merdeka, trik ngerjain tugas, serta inspirasi belajar langsung di inbox email kamu.
            </p>
            <form
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Terima kasih sudah mendaftar!');
              }}
            >
              <div className="relative flex-1">
                <input
                  className="w-full h-11 px-4 rounded-xl bg-surface text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-fixed"
                  placeholder="Masukkan email kamu..."
                  required
                  type="email"
                />
              </div>
              <button
                className="h-11 px-6 rounded-xl bg-primary-container hover:bg-sky-600 text-on-primary font-label-md text-label-md shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                type="submit"
              >
                <span>Langganan Gratis</span>
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </form>
            <p className="mt-3 font-body-sm text-body-sm text-on-primary/75">
              🔒 Tanpa spam. Bisa berhenti berlangganan kapan saja.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  kategori: string;
}

export default function BlogHubClient({ posts }: { posts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => { setVisibleCount(9); }, [searchQuery, currentCategory]);

  // We map mdx categories to our badges
  const getCategoryBadge = (kategori: string) => {
    switch(kategori.toLowerCase()) {
      case 'kurikulum-merdeka': return { label: 'Kurikulum Merdeka', class: 'bg-secondary-container text-on-secondary-container', icon: 'verified' };
      case 'tips-belajar': return { label: 'Tips Belajar', class: 'bg-error-container text-error', icon: 'psychology' };
      case 'trik-pr': return { label: 'Trik PR & Ujian', class: 'bg-tertiary-fixed text-on-tertiary-fixed', icon: 'lightbulb' };
      case 'seputar-ai': return { label: 'Seputar AI', class: 'bg-surface-variant text-primary', icon: 'memory' };
      case 'bahasa-indonesia': return { label: 'Bahasa Indonesia', class: 'bg-primary-fixed text-on-primary-fixed', icon: 'menu_book' };
      default: return { label: kategori.replace('-', ' '), class: 'bg-surface-container-high text-primary', icon: 'article' };
    }
  };

  const filteredPosts = posts.filter(post => {
    const query = searchQuery.toLowerCase();
    const matchesQuery = !query || post.title.toLowerCase().includes(query) || post.description.toLowerCase().includes(query);
    const matchesCategory = currentCategory === 'all' || post.kategori === currentCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Top Header Section & Search */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-high/60 via-surface to-surface py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-margin md:px-margin-desktop relative z-10 flex flex-col items-center text-center">
          {/* Top Kicker Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">Pusat Bacaan &amp; Edukasi</span>
          </div>
          {/* Main Headline */}
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight max-w-3xl">
            Blog &amp; Tips Belajar TugasMu
          </h1>
          {/* Subtitle */}
          <p className="mt-3 font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl">
            Kumpulan tips belajar efektif, panduan Kurikulum Merdeka, trik ngerjain PR cepat, dan kabar seputar dunia edukasi Indonesia.
          </p>
          
          {/* Search Box with tactile elevation */}
          <div className="w-full max-w-2xl mt-8">
            <div className="relative flex items-center bg-surface-container-lowest rounded-xl shadow-md p-1.5 transition-all focus-within:shadow-xl focus-within:ring-2 focus-within:ring-primary-container/40">
              <div className="pl-3 pr-2 text-outline">
                <span className="material-symbols-outlined text-[24px]">search</span>
              </div>
              <input 
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none py-2.5" 
                placeholder="Cari artikel, tips belajar, atau panduan tugas..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="hidden sm:inline-flex items-center gap-1.5 bg-primary-container hover:bg-primary text-on-primary px-space-lg py-2.5 rounded-xl font-label-md text-label-md transition-all active:scale-[0.98] shadow-sm">
                <span>Cari</span>
              </button>
            </div>
          </div>
          
          {/* Topic Filter Badges */}
          <div className="w-full max-w-4xl mt-6 flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar">
            <button 
              onClick={() => setCurrentCategory('all')}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md shadow-sm transition-all whitespace-nowrap ${currentCategory === 'all' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              Semua Artikel
            </button>
            <button 
              onClick={() => setCurrentCategory('tips-belajar')}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md shadow-sm transition-all whitespace-nowrap ${currentCategory === 'tips-belajar' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              Tips Belajar &amp; Produktivitas
            </button>
            <button 
              onClick={() => setCurrentCategory('kurikulum-merdeka')}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md shadow-sm transition-all whitespace-nowrap ${currentCategory === 'kurikulum-merdeka' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              Kurikulum Merdeka
            </button>
            <button 
              onClick={() => setCurrentCategory('trik-pr')}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md shadow-sm transition-all whitespace-nowrap ${currentCategory === 'trik-pr' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              Trik PR &amp; Ujian
            </button>
            <button 
              onClick={() => setCurrentCategory('seputar-ai')}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md shadow-sm transition-all whitespace-nowrap ${currentCategory === 'seputar-ai' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              Seputar AI &amp; Teknologi
            </button>
          </div>
        </div>
      </section>

      {/* Featured Post (First post) */}
      {filteredPosts.length > 0 && currentCategory === 'all' && !searchQuery && (
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
                        day: 'numeric', month: 'short', year: 'numeric'
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
                  <Link href={`/blog/${filteredPosts[0].kategori}/${filteredPosts[0].slug}`} className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary group-hover:text-primary-container transition-all self-start sm:self-auto">
                    <span>Baca Selengkapnya</span>
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-surface-container overflow-hidden flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md p-3.5 rounded-xl shadow-sm flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${getCategoryBadge(filteredPosts[0].kategori).class}`}>
                    <span className="material-symbols-outlined text-[20px]">{getCategoryBadge(filteredPosts[0].kategori).icon}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-label-sm text-label-sm text-tertiary uppercase">Trending</div>
                    <div className="font-body-sm text-body-sm text-on-surface truncate font-semibold">Artikel Pilihan Editor</div>
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
            <h3 className="font-headline-md text-headline-md text-on-surface">Koleksi Artikel</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Daftar tulisan terbaru dari tim edukasi TugasMu</p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
            <span>Menampilkan</span>
            <span className="font-semibold text-primary">{filteredPosts.length}</span>
            <span>Materi</span>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(currentCategory === 'all' && !searchQuery ? 1 : 0, (currentCategory === 'all' && !searchQuery ? 1 : 0) + visibleCount).map((post) => {
              const badge = getCategoryBadge(post.kategori);
              return (
                <article key={post.slug} className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                  <div className="h-48 w-full relative overflow-hidden bg-surface-container flex items-center justify-center">
                    <span className={`material-symbols-outlined text-[64px] opacity-20 text-on-surface`}>{badge.icon}</span>
                    <div className="absolute top-3 left-3">
                      <span className={`font-label-sm text-label-sm px-2.5 py-1 rounded-full shadow-sm font-semibold ${badge.class}`}>
                        {badge.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant mb-2.5">
                        <span className="material-symbols-outlined text-[15px]">schedule</span>
                        <span>{new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 line-clamp-3 leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                    <div className="pt-5 mt-4 flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">{badge.icon}</span>
                        Baca Artikel
                      </span>
                      <Link href={`/blog/${post.kategori}/${post.slug}`} className="font-label-md text-label-md text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                        <span>Lanjut</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}

          </div>
          {filteredPosts.length > (currentCategory === 'all' && !searchQuery ? 1 : 0) + visibleCount && (
            <div className="flex justify-center mt-10">
              <button 
                onClick={() => setVisibleCount(prev => prev + 9)}
                className="px-6 py-3 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-highest transition-colors flex items-center gap-2"
              >
                <span>Muat Lebih Banyak</span>
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
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
            <button 
              onClick={() => { setSearchQuery(''); setCurrentCategory('all'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-primary-fixed text-on-primary-fixed font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors"
            >
              Tampilkan Semua Artikel
            </button>
          </div>
        )}
      </section>

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
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert("Terima kasih sudah mendaftar!"); }}>
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

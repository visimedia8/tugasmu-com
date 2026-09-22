'use client';

import React, { useState } from 'react';
import Link from 'next/link';



import { useSearchParams, useRouter } from 'next/navigation';
import { TOOLS } from '@/data/tools';

export default function ToolsHubClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState(searchParams.get('cat') || 'all');
  
  // Sync URL when category changes
  const handleCategoryChange = (cat: string) => {
    handleCategoryChange(cat);
    if (cat === 'all') {
      router.replace('/tools', { scroll: false });
    } else {
      router.replace(`/tools?cat=${cat}`, { scroll: false });
    }
  };
  const [filterPopular, setFilterPopular] = useState(false);
  const [filterMerdeka, setFilterMerdeka] = useState(false);

  const filteredTools = TOOLS.filter(tool => {
    const query = searchQuery.toLowerCase();
    const matchesQuery = !query || tool.name.toLowerCase().includes(query) || tool.categories.join(' ').includes(query);
    const matchesCategory = currentCategory === 'all' || tool.categories.includes(currentCategory);
    const matchesPopular = !filterPopular || tool.isPopular;
    const matchesMerdeka = !filterMerdeka || tool.isMerdeka;

    return matchesQuery && matchesCategory && matchesPopular && matchesMerdeka;
  });

  const handleReset = () => {
    setSearchQuery('');
    handleCategoryChange('all');
    setFilterPopular(false);
    setFilterMerdeka(false);
  };

  return (
    <div className="w-full bg-surface min-h-screen pb-16">
      <div className="relative w-full max-w-[1200px] mx-auto px-margin-desktop py-space-xl">
        {/* Ambient decorative aura */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-56 bg-gradient-to-b from-primary-fixed/30 via-surface-container/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>
        
        {/* Header & Pitch Section */}
        <div className="relative flex flex-col items-center text-center mb-10 mt-8">
          <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm shadow-sm mb-space-md">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <span>Eksplorasi 8+ Asisten Belajar Mandiri</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface max-w-2xl tracking-tight">
            Koleksi Tools AI TugasMu
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-3">
            Pilih asisten pintar sesuai mata pelajaran dan kebutuhan tugas harianmu. Cepat, akurat, dan gratis.
          </p>
          
          {/* Student Community Snapshot */}
          <div className="flex items-center gap-3 mt-6 px-space-lg py-2 rounded-xl bg-surface-container-lowest shadow-sm">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center ring-2 ring-surface-container-lowest">SD</div>
              <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm flex items-center justify-center ring-2 ring-surface-container-lowest">SMP</div>
              <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm flex items-center justify-center ring-2 ring-surface-container-lowest">SMA</div>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Terverifikasi sesuai <strong className="text-on-surface font-semibold">Kurikulum Merdeka</strong> &amp; standar Kemendikbudristek
            </span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="relative z-10 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm mb-10 flex flex-col gap-5">
          {/* Search Input row */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input 
              className="w-full h-12 pl-11 pr-28 bg-surface-container-low rounded-xl text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#0ea5e9,0_0_10px_rgba(14,165,233,0.15)] transition-all" 
              id="toolSearchInput" 
              placeholder="Cari tool (misal: Parafrase, Rumus Fisika, Essay Inggris)..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded-lg flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">keyboard</span>
                Ctrl + K
              </span>
            </div>
          </div>
          
          {/* Categories & Flags Bar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => handleCategoryChange('all')}
                className={`category-btn px-4 py-2 rounded-xl font-label-md text-label-md transition-all active:scale-[0.98] ${currentCategory === 'all' ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                Semua (36)
              </button>
              <button 
                onClick={() => handleCategoryChange('umum')}
                className={`category-btn px-4 py-2 rounded-xl font-label-md text-label-md transition-all active:scale-[0.98] ${currentCategory === 'umum' ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                Akademik & Umum
              </button>
              <button 
                onClick={() => handleCategoryChange('tulis')}
                className={`category-btn px-4 py-2 rounded-xl font-label-md text-label-md transition-all active:scale-[0.98] ${currentCategory === 'tulis' ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                Tugas Tulis & Makalah
              </button>
              <button 
                onClick={() => handleCategoryChange('pesantren')}
                className={`category-btn px-4 py-2 rounded-xl font-label-md text-label-md transition-all active:scale-[0.98] ${currentCategory === 'pesantren' ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                Pesantren & Madrasah
              </button>
              <button 
                onClick={() => handleCategoryChange('smk')}
                className={`category-btn px-4 py-2 rounded-xl font-label-md text-label-md transition-all active:scale-[0.98] ${currentCategory === 'smk' ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                SMK & Kejuruan
              </button>
              <button 
                onClick={() => handleCategoryChange('anak')}
                className={`category-btn px-4 py-2 rounded-xl font-label-md text-label-md transition-all active:scale-[0.98] ${currentCategory === 'anak' ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                SD & Anak
              </button>
            </div>
            
            {/* Quick Filter Toggles */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto pt-2 lg:pt-0">
              <button 
                onClick={() => setFilterPopular(!filterPopular)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-label-md text-label-md transition-colors ${filterPopular ? 'bg-tertiary-fixed text-on-tertiary-fixed font-bold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined text-[16px] text-tertiary">local_fire_department</span>
                <span>Paling Populer</span>
              </button>
              <button 
                onClick={() => setFilterMerdeka(!filterMerdeka)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-label-md text-label-md transition-colors ${filterMerdeka ? 'bg-secondary-fixed text-on-secondary-fixed font-bold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                <span>Kurikulum Merdeka</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Feedback & Count */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-on-surface">Daftar Generator &amp; Pemecah Masalah</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              {filteredTools.length} Tools Aktif
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
            <span>Semua tool beroperasi normal (SLA 99.9%)</span>
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="tool-card group bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-colors ${tool.colorClass}`}>
                      <span className="material-symbols-outlined text-[26px]">{tool.icon}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                      {tool.isPopular && <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>}
                      {tool.badge}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">{tool.categoryLabel}</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-2 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mb-4">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-4 mt-auto">
                  <div className="flex items-center justify-between font-label-sm text-label-sm text-outline mb-3">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-primary">group</span>
                      {(tool.usage / 1000).toFixed(1)}k digunakan
                    </span>
                    <span className="text-secondary font-bold">{tool.statsLabel}</span>
                  </div>
                  <Link href={tool.href} className="w-full inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary py-2.5 px-4 rounded-xl font-label-md text-label-md shadow-sm transition-all active:scale-[0.98]">
                    <span>Gunakan Tool</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-12 bg-surface-container-lowest rounded-xl shadow-sm my-6">
            <div className="w-16 h-16 rounded-full bg-surface-container-high text-outline flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[32px]">search_off</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Tool tidak ditemukan</h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-6">
              Tidak ada asisten yang cocok dengan kata kunci atau filter kamu. Coba ganti kata kunci atau usulkan tool baru!
            </p>
            <button onClick={handleReset} className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors">
              Reset Pencarian
            </button>
          </div>
        )}

        {/* Kakak Hint / Pedoman Belajar Etis Card */}
        <div className="mt-14 mb-10 bg-[#fffbeb] rounded-xl p-space-lg md:p-space-xl shadow-sm flex flex-col md:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#fef3c7] text-[#92400e] flex-shrink-0 flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[26px]">psychology_alt</span>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-[#fde68a] text-[#78350f] font-label-sm text-label-sm font-bold uppercase tracking-wider">
                Tips dari Kakak Kelas
              </span>
              <span className="font-label-md text-label-md text-[#92400e] font-semibold">Gunakan AI Sebagai Partner, Bukan Pengganti Berpikir</span>
            </div>
            <p className="font-body-md text-body-md text-[#78350f] mt-1 leading-relaxed">
              Semua tool dirancang untuk memandu alur berpikir dan rumus dasarmu. Selalu baca kembali penjabaran langkah dari AI, pastikan kamu memahami cara pengerjaannya sebelum menyalin ke buku tugas!
            </p>
          </div>
        </div>

        {/* Visual Divider Featurette: Guru Kontributor & Quality Checklist */}
        <div className="mb-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">Kurikulum 2026 Ready</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Materi diselaraskan dengan capaian pembelajaran resmi.</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">bolt</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">Respon Kilat &lt; 2 Detik</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Mesin AI teroptimasi hemat kuota untuk smartphone.</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">100% Gratis Pelajar</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Akses penuh tanpa kartu kredit atau langganan wajib.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

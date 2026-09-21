import React from 'react';
import Link from 'next/link';

export default function home() {
  return (
    <>
      
  
  <header className="sticky top-0 z-50 w-full bg-slate-50/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
      
      <a href="#" className="flex items-center gap-2.5 group">
        <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight font-heading text-slate-900">
          Tugas<span className="text-sky-500">Mu</span>
          <span className="text-xs font-semibold px-1.5 py-0.5 ml-1.5 rounded bg-sky-100 text-sky-700">AI</span>
        </span>
      </a>

      
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <a href="#tools" className="hover:text-sky-600 transition-colors">Tools AI</a>
        <a href="#statistik" className="hover:text-sky-600 transition-colors">Statistik</a>
        <a href="#testimoni" className="hover:text-sky-600 transition-colors">Guru Kontributor</a>
        <a href="#tentang" className="hover:text-sky-600 transition-colors">Blog</a>
      </nav>

      
      <div className="hidden md:flex items-center gap-3">
        <button className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm shadow-sm hover:shadow-md shadow-sky-500/25 transition-all duration-200 flex items-center gap-2 cursor-pointer">
          <span>Coba Gratis</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      
      <div className="flex md:hidden items-center">
        <button id="mobile-menu-btn" className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors" aria-label="Toggle Menu">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    
    <div id="mobile-menu" className="hidden md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
      <div className="flex flex-col space-y-2 text-base font-medium text-slate-700">
        <a href="#tools" className="px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">Tools AI</a>
        <a href="#statistik" className="px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">Statistik</a>
        <a href="#testimoni" className="px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">Guru Kontributor</a>
        <a href="#tentang" className="px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">Blog</a>
      </div>
      <div className="pt-2">
        <button className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-center shadow-md shadow-sky-500/25 transition-all flex items-center justify-center gap-2">
          <span>Coba Gratis Sekarang</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <main>
    
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-32">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs border border-green-200/60">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>🎉 100% Gratis untuk Pelajar Indonesia</span>
        </div>

        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6 font-heading">
          AI yang Ngerti Pelajaran Kamu
        </h1>

        
        <p className="text-base sm:text-lg md:text-xl text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
          Ngerjain PR, bikin rangkuman, sampai latihan soal jadi lebih cepat. 
          Tanpa ribet, langsung ketemu jawabannya layaknya dibantu kakak kelas pintar.
        </p>

        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <a href="#tools" className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-base shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2">
            <span>Mulai Belajar</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="#tools" className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100/80 text-slate-700 border border-slate-300 font-semibold text-base shadow-xs hover:border-slate-400 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2">
            <span>Lihat Semua Tools</span>
          </a>
        </div>

        
        <div className="mt-10 pt-8 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-y-2.5 gap-x-6 text-xs sm:text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 12 11 14 15 10"></polyline>
            </svg>
            <span>Tanpa Perlu Kartu Kredit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
            </svg>
            <span>Materi Kurikulum Merdeka & K13</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
            <span>Ramah Kuota & HP Ringan</span>
          </div>
        </div>
      </div>
    </section>

    
    <section id="statistik" className="py-10 md:py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 md:p-8 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-5 hover:border-sky-200 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-heading">
                +15.000
              </div>
              <div className="text-sm sm:text-base text-slate-500 font-medium mt-0.5">
                Siswa Terbantu
              </div>
            </div>
          </div>

          
          <div className="p-6 md:p-8 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-5 hover:border-sky-200 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 11 3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-heading">
                50.000+
              </div>
              <div className="text-sm sm:text-base text-slate-500 font-medium mt-0.5">
                Soal Dibuat
              </div>
            </div>
          </div>

          
          <div className="p-6 md:p-8 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-5 hover:border-sky-200 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-heading">
                120+
              </div>
              <div className="text-sm sm:text-base text-slate-500 font-medium mt-0.5">
                Guru Kontributor
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section id="tools" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4 font-heading">
          Pilih Bantuan yang Kamu Butuhkan
        </h2>
        <p className="text-slate-500 text-base sm:text-lg">
          Semua alat dirancang khusus memahami bahasa pelajaran anak sekolah dari SD hingga SMA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="group relative bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-sky-300 transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 7 4 4 20 4 20 7"></polyline>
                <line x1="9" y1="20" x2="15" y2="20"></line>
                <line x1="12" y1="4" x2="12" y2="20"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">Parafrase Teks</h3>
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              Ubah gaya kalimat tugas atau makalahmu agar rapi dan bebas dari tuduhan plagiasi.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-sky-600">Gunakan Tool</span>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        
        <div className="group relative bg-white border-2 border-sky-500 rounded-xl p-6 shadow-md shadow-sky-500/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
          
          <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Terpopuler</span>
          </div>

          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">Generator Soal</h3>
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              Bikin latihan soal ujian harian, UTBK, atau kuis mandiri lengkap dengan kunci jawaban.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-sky-600">Gunakan Tool</span>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        
        <div className="group relative bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-sky-300 transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">Rangkuman Materi</h3>
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              Paste bab buku tebal atau artikel panjang untuk dapat poin inti ringkas dalam sekejap.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-sky-600">Gunakan Tool</span>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        
        <div className="group relative bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-sky-300 transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">Pantun & Puisi</h3>
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              Ketik tema sastra Indonesia dan dapatkan karya pantun rima sempurna serta puisi puitis.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-sky-600">Gunakan Tool</span>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </section>

    
    <section id="testimoni" className="py-16 md:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1 text-amber-500 mb-2">
            <svg className="w-4 h-4 fill-amber-500" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg className="w-4 h-4 fill-amber-500" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg className="w-4 h-4 fill-amber-500" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg className="w-4 h-4 fill-amber-500" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg className="w-4 h-4 fill-amber-500" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-heading">
            Dipercaya oleh Guru Kontributor
          </h2>
          <p className="text-slate-500 text-base mt-2">
            Dirancang bersama para pendidik untuk memastikan konten tetap edukatif dan berbobot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-xl relative flex flex-col justify-between">
            <blockquote className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-normal italic">
              &ldquo;Sangat membantu siswa belajar mandiri di rumah. Jawaban yang dihasilkan tidak sekadar memberi hasil akhir, tetapi juga menyertakan penalaran konsep yang runtut.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/80">
              <div className="w-11 h-11 rounded-full bg-sky-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                BR
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base font-heading">Bu Ratna</h4>
                <p className="text-xs sm:text-sm text-slate-500">Guru IPA, SMPN 5 Bandung</p>
              </div>
            </div>
          </div>

          
          <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-xl relative flex flex-col justify-between">
            <blockquote className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-normal italic">
              &ldquo;Fitur pembuat soal dan rangkumannya sangat menghemat waktu murid saat persiapan ulangan harian. Platformnya sangat cepat dibuka di HP siswa tanpa makan kuota.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/80">
              <div className="w-11 h-11 rounded-full bg-green-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                PA
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base font-heading">Pak Anwar</h4>
                <p className="text-xs sm:text-sm text-slate-500">Guru Bahasa Indonesia, SMAN 1 Yogyakarta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  
  <footer className="bg-slate-50 border-t border-slate-200 py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center text-white">
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
            <span className="font-bold text-slate-900 text-base font-heading">TugasMu.com</span>
          </div>
          <span className="text-xs sm:text-sm text-slate-500">
            © 2026 TugasMu.com. Hak cipta dilindungi.
          </span>
        </div>

        
        <div className="flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-500">
          <a href="#privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          <a href="#kontak" className="hover:text-slate-900 transition-colors">Kontak</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
      });
    }
  </script>

    </>
  );
}

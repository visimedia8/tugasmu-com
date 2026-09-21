import Link from 'next/link';

export default function ToolsGrid() {
  return (
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
        {/* Card 1: Parafrase Teks */}
        <Link href="/tools/parafrase" className="group relative bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-sky-300 transition-all duration-200 flex flex-col justify-between">
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
        </Link>

        {/* Card 2: Generator Soal (Terpopuler) */}
        <Link href="/tools/generator-soal" className="group relative bg-white border-2 border-sky-500 rounded-xl p-6 shadow-md shadow-sky-500/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
          {/* Badge Terpopuler */}
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
        </Link>

        {/* Card 3: Rangkuman Materi */}
        <Link href="/tools/rangkuman" className="group relative bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-sky-300 transition-all duration-200 flex flex-col justify-between">
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
        </Link>

        {/* Card 4: Pantun & Puisi */}
        <Link href="/tools/pantun-puisi" className="group relative bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-sky-300 transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">Pantun &amp; Puisi</h3>
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
        </Link>
      </div>
    </section>
  );
}

export default function StatsCounter() {
  return (
    <section id="statistik" className="py-10 md:py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1 */}
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

          {/* Stat 2 */}
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

          {/* Stat 3 */}
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
  );
}

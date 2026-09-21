import Link from 'next/link';
import ToolsGrid from '@/components/home/ToolsGrid';
import StatsCounter from '@/components/home/StatsCounter';
import BlogPreview from '@/components/home/BlogPreview';

export default function Home() {
  return (
    <>
      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-32">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Free Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs border border-green-200/60">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>🎉 100% Gratis untuk Pelajar Indonesia</span>
          </div>

          {/* Headline H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6 font-heading">
            AI yang Ngerti Pelajaran Kamu
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
            Ngerjain PR, bikin rangkuman, sampai latihan soal jadi lebih cepat. 
            Tanpa ribet, langsung ketemu jawabannya layaknya dibantu kakak kelas pintar.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <Link href="/tools" className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-base shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2">
              <span>Mulai Belajar</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link href="/tools" className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100/80 text-slate-700 border border-slate-300 font-semibold text-base shadow-xs hover:border-slate-400 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2">
              <span>Lihat Semua Tools</span>
            </Link>
          </div>

          {/* Micro trust elements */}
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
              <span>Materi Kurikulum Merdeka &amp; K13</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              <span>Ramah Kuota &amp; HP Ringan</span>
            </div>
          </div>
        </div>
      </section>

      <StatsCounter />
      <ToolsGrid />
      <BlogPreview />

      {/* 5. SOCIAL PROOF / TESTIMONI GURU */}
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
            {/* Testimonial 1 */}
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

            {/* Testimonial 2 */}
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
    </>
  );
}

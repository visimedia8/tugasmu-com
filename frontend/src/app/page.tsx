import Link from 'next/link';
import ToolsGrid from '@/components/home/ToolsGrid';
import StatsCounter from '@/components/home/StatsCounter';
import BlogPreview from '@/components/home/BlogPreview';

export default function Home() {
  return (
    <>
      {/* HERO — asymmetric, editorial, high-energy */}
      <section className="relative overflow-hidden bg-brand-navy">
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-noise opacity-100 pointer-events-none" />

        {/* Lime glow blob */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-brand-lime/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-brand-sky/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Content */}
            <div>
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-lime/15 border border-brand-lime/30 text-brand-lime text-xs font-bold tracking-wide uppercase mb-8">
                <span className="flex h-1.5 w-1.5 rounded-full bg-brand-lime animate-pulse" />
                100% Gratis · Kurikulum Merdeka
              </div>

              {/* Heading: Fraunces serif untuk karakter editorial */}
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-cream leading-[1.05] tracking-tight mb-6">
                AI yang{' '}
                <span className="italic text-brand-lime">ngerti</span>
                <br />
                pelajaran<br />
                kamu
              </h1>

              <p className="text-brand-cream/60 text-base sm:text-lg leading-relaxed max-w-lg mb-10">
                Ngerjain PR, bikin rangkuman, sampai latihan soal — selesai lebih cepat.
                Kayak dibantu kakak kelas yang emang jago.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Link
                  href="/tools"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-lime hover:bg-brand-lime-dark text-brand-navy font-bold text-base transition-all duration-200 shadow-lg shadow-brand-lime/20 hover:shadow-brand-lime/30 active:scale-[0.98]"
                >
                  Mulai Belajar
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-brand-cream/20 text-brand-cream/70 hover:text-brand-cream hover:border-brand-cream/40 font-semibold text-base transition-all duration-200"
                >
                  Lihat Semua Tools
                </Link>
              </div>

              {/* Trust micro-signals */}
              <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-brand-cream/10 text-brand-cream/40 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-brand-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                  Tanpa kartu kredit
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-brand-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                  K13 &amp; Merdeka
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-brand-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  Hemat kuota
                </span>
              </div>
            </div>

            {/* Right: Visual — floating tool cards preview */}
            <div className="relative hidden lg:block">
              {/* Floating card cluster */}
              <div className="relative h-[420px]">
                {/* Card 1 — main */}
                <div className="absolute top-8 left-0 right-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-lime flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-brand-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-brand-cream font-bold text-sm">Generator Soal</p>
                      <p className="text-brand-cream/40 text-xs">18.4k digunakan</p>
                    </div>
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-brand-lime text-brand-navy text-[10px] font-bold">Terpopuler</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-4/5 rounded-full bg-brand-lime" />
                  </div>
                </div>

                {/* Card 2 — offset */}
                <div className="absolute top-36 right-0 left-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-xl animate-float">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-coral/20 border border-brand-coral/30 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-brand-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-brand-cream font-bold text-sm">Rangkuman Materi</p>
                      <p className="text-brand-cream/40 text-xs">12.8k digunakan</p>
                    </div>
                  </div>
                  <p className="text-brand-cream/50 text-xs leading-relaxed line-clamp-2">
                    Paste bab buku tebal atau artikel panjang untuk dapat poin inti ringkas dalam sekejap.
                  </p>
                </div>

                {/* Card 3 — bottom */}
                <div className="absolute bottom-0 left-0 right-8 bg-brand-lime rounded-2xl p-5 shadow-xl shadow-brand-lime/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-brand-navy font-heading font-bold text-base">Coba Sekarang</p>
                      <p className="text-brand-navy/60 text-xs mt-0.5">Gratis, tanpa daftar dulu</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center">
                      <svg className="w-5 h-5 text-brand-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsCounter />
      <ToolsGrid />
      <BlogPreview />

      {/* TESTIMONIALS */}
      <section id="testimoni" className="py-16 md:py-24 bg-brand-cream border-t border-brand-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1 text-brand-gold mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-brand-gold" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight">
              Dipercaya oleh Guru Kontributor
            </h2>
            <p className="text-brand-navy/50 text-base mt-2">
              Dirancang bersama para pendidik untuk memastikan konten tetap edukatif dan berbobot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                quote: '"Sangat membantu siswa belajar mandiri di rumah. Jawaban yang dihasilkan tidak sekadar memberi hasil akhir, tetapi juga menyertakan penalaran konsep yang runtut."',
                name: 'Bu Ratna',
                role: 'Guru IPA, SMPN 5 Bandung',
                initials: 'BR',
                color: 'bg-brand-sky',
              },
              {
                quote: '"Fitur pembuat soal dan rangkumannya sangat menghemat waktu murid saat persiapan ulangan harian. Platformnya sangat cepat dibuka di HP siswa tanpa makan kuota."',
                name: 'Pak Anwar',
                role: 'Guru Bahasa Indonesia, SMAN 1 Yogyakarta',
                initials: 'PA',
                color: 'bg-brand-lime',
              },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-brand-navy/10 p-6 md:p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <blockquote className="text-brand-navy/70 text-base sm:text-lg leading-relaxed mb-6 font-normal italic">
                  {t.quote}
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-brand-navy/8">
                  <div className={`w-10 h-10 rounded-full ${t.color} text-brand-navy font-bold text-sm flex items-center justify-center shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-brand-navy text-sm">{t.name}</h4>
                    <p className="text-xs text-brand-navy/50">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

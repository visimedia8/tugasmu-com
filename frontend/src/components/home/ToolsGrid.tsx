import Link from 'next/link';

const tools = [
  {
    href: '/tools/generator-soal',
    label: 'Ujian & Latihan',
    title: 'Generator Soal & Kuis',
    desc: 'Bikin latihan soal ujian harian, UTBK, atau kuis mandiri lengkap dengan kunci jawaban.',
    featured: true,
    iconBg: 'bg-brand-lime',
    iconColor: 'text-brand-navy',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    stats: '18.4k digunakan',
    badge: '⚡ Terpopuler',
    badgeColor: 'bg-brand-lime text-brand-navy',
  },
  {
    href: '/tools/parafrase',
    label: 'Bahasa & Makalah',
    title: 'Parafrase Teks & Makalah',
    desc: 'Ubah kalimat tugas agar natural, santun, dan lolos uji orisinalitas tanpa mengubah inti materi.',
    featured: false,
    iconBg: 'bg-brand-sky/15',
    iconColor: 'text-brand-sky',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
    stats: '14.2k digunakan',
    badge: 'Lolos Turnitin',
    badgeColor: 'bg-brand-navy/8 text-brand-navy/60',
  },
  {
    href: '/tools/rangkuman',
    label: 'Belajar Cepat',
    title: 'Rangkuman Materi & Bab',
    desc: 'Ringkas bab buku cetak tebal, PDF materi guru, atau artikel panjang menjadi poin hafalan dalam hitungan detik.',
    featured: false,
    iconBg: 'bg-brand-coral/15',
    iconColor: 'text-brand-coral',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    stats: '12.8k digunakan',
    badge: 'Instant Bullets',
    badgeColor: 'bg-brand-navy/8 text-brand-navy/60',
  },
  {
    href: '/tools/math-solver',
    label: 'Eksakta',
    title: 'Solver Rumus Matematika & IPA',
    desc: 'Ketik atau tempel soal hitungan fisika, kimia, matematika. Dapatkan langkah penjabaran rumus tahap demi tahap.',
    featured: false,
    iconBg: 'bg-brand-gold/15',
    iconColor: 'text-brand-gold',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
    stats: '11.5k digunakan',
    badge: 'LaTeX Ready',
    badgeColor: 'bg-brand-navy/8 text-brand-navy/60',
  },
];

export default function ToolsGrid() {
  const featured = tools.find(t => t.featured)!;
  const rest = tools.filter(t => !t.featured);

  return (
    <section id="tools" className="py-16 md:py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
          <div>
            <p className="text-brand-navy/50 text-sm font-bold uppercase tracking-widest mb-2">Tools AI</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight">
              Pilih yang kamu butuhkan
            </h2>
          </div>
          <Link
            href="/tools"
            className="self-start md:self-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy/60 hover:text-brand-navy transition-colors"
          >
            Lihat semua 8 tools
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>

        {/* Grid: featured (2x) + 3 normal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Featured card — spans 2 columns on lg */}
          <Link
            href={featured.href}
            className="group lg:col-span-2 relative bg-brand-navy rounded-2xl p-7 flex flex-col justify-between min-h-[260px] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
          >
            {/* Background texture */}
            <div className="absolute inset-0 bg-noise opacity-100 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-lime/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl ${featured.iconBg} ${featured.iconColor} flex items-center justify-center shadow-lg`}>
                  {featured.icon}
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${featured.badgeColor}`}>
                  {featured.badge}
                </span>
              </div>
              <p className="text-brand-lime/70 text-xs font-bold uppercase tracking-widest mb-2">{featured.label}</p>
              <h3 className="font-heading text-2xl font-bold text-brand-cream mb-3">{featured.title}</h3>
              <p className="text-brand-cream/50 text-sm leading-relaxed">{featured.desc}</p>
            </div>

            <div className="relative flex items-center justify-between mt-6 pt-5 border-t border-brand-cream/10">
              <span className="text-brand-cream/40 text-xs font-medium">{featured.stats}</span>
              <span className="inline-flex items-center gap-1.5 text-brand-lime text-sm font-bold group-hover:gap-2.5 transition-all">
                Coba sekarang
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Regular cards */}
          {rest.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white border border-brand-navy/8 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-brand-navy/20 transition-all duration-200"
            >
              <div>
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl ${tool.iconBg} ${tool.iconColor} flex items-center justify-center`}>
                    {tool.icon}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>
                <p className="text-brand-navy/40 text-[10px] font-bold uppercase tracking-widest mb-1.5">{tool.label}</p>
                <h3 className="font-heading text-base font-bold text-brand-navy mb-2 group-hover:text-brand-sky transition-colors">{tool.title}</h3>
                <p className="text-brand-navy/50 text-xs leading-relaxed line-clamp-3">{tool.desc}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-brand-navy/6 flex items-center justify-between">
                <span className="text-brand-navy/30 text-[10px] font-medium">{tool.stats}</span>
                <svg className="w-4 h-4 text-brand-navy/30 group-hover:text-brand-navy group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

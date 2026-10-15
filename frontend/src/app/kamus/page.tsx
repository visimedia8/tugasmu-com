export const dynamic = 'force-static';
export const dynamicParams = false;

import { getAllKamus } from '@/lib/kamus';
import Link from 'next/link';

export const metadata = {
  title: 'Kamus & Glosarium Belajar Siswa',
  description: 'Glosarium lengkap definisi istilah pelajaran SD, SMP, SMA di Indonesia. Pahami konsepnya dengan bahasa santun dan mudah dimengerti.',
  alternates: {
    canonical: '/kamus',
  },
  openGraph: {
    title: 'Kamus & Glosarium Belajar Siswa | TugasMu',
    description: 'Glosarium lengkap istilah pelajaran sekolah di Indonesia.',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Kamus%20%26%20Glosarium%20Pelajaran&category=Glosarium',
        width: 1200,
        height: 630,
        alt: 'Kamus TugasMu',
      },
    ],
  },
};

export default function KamusIndexPage() {
  const entries = getAllKamus();
  
  // Group alphabetically
  const grouped = entries.reduce((acc, entry) => {
    const letter = entry.title.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(entry);
    return acc;
  }, {} as Record<string, typeof entries>);

  const letters = Object.keys(grouped).sort();

  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Kamus & Glosarium Belajar TugasMu",
    "description": "Glosarium istilah edukasi kurikulum sekolah dasar dan menengah di Indonesia.",
    "url": "https://tugasmu.com/kamus",
    "hasDefinedTerm": entries.map((entry) => ({
      "@type": "DefinedTerm",
      "name": entry.title,
      "description": entry.description,
      "url": `https://tugasmu.com/kamus/${entry.slug}`
    }))
  };

  return (
    <div className="bg-surface-container-lowest min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />
      {/* Header */}
      <section className="bg-primary text-on-primary py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary rounded-full filter blur-[120px] opacity-20"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-surface/10 text-surface-bright font-label-md text-label-md mb-6 border border-surface/20">
            Semantic Knowledge Hub
          </span>
          <h1 className="font-heading text-display-lg-mobile md:text-display-lg font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Kamus &amp; Glosarium Pelajaran
          </h1>
          <p className="text-body-lg md:text-headline-sm text-surface-dim max-w-2xl mx-auto opacity-90 leading-relaxed">
            Cari istilah sulit? Pahami konsep aslinya di sini. Bukan sekadar definisi kaku, tapi penjelasan logis terstruktur agar kamu benar-benar paham konsepnya.
          </p>
        </div>
      </section>

      {/* Dictionary List */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          {entries.length === 0 ? (
            <div className="text-center py-20 text-on-surface-variant">
              <p>Glosarium belum tersedia.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {letters.map((letter) => (
                <div key={letter} className="mb-8">
                  <h2 className="text-headline-lg font-heading text-primary border-b-2 border-primary/10 pb-2 mb-4">
                    {letter}
                  </h2>
                  <ul className="space-y-3">
                    {grouped[letter].map((entry) => (
                      <li key={entry.slug}>
                        <Link 
                          href={`/kamus/${entry.slug}`}
                          className="group block"
                        >
                          <span className="text-body-lg font-semibold text-on-surface group-hover:text-primary-container transition-colors duration-200">
                            {entry.title}
                          </span>
                          <span className="block text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">
                            {entry.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

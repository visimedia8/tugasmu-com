import { getAllKamus } from '@/lib/kamus';
import Link from 'next/link';

export const metadata = {
  title: 'Kamus & Glosarium Belajar',
  description: 'Glosarium lengkap istilah pelajaran SD, SMP, SMA. Pahami definisinya dengan bahasa yang mudah.',
  alternates: {
    canonical: '/kamus',
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

  return (
    <div className="bg-surface-container-lowest min-h-screen pb-24">
      {/* Header */}
      <section className="bg-primary text-on-primary py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary rounded-full filter blur-[120px] opacity-20"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-surface/10 text-surface-bright font-label-md text-label-md mb-6 border border-surface/20">
            Fase 2: Semantic Hub
          </span>
          <h1 className="font-heading text-display-lg-mobile md:text-display-lg font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Kamus & Glosarium Pelajaran
          </h1>
          <p className="text-body-lg md:text-headline-sm text-surface-dim max-w-2xl mx-auto opacity-90">
            Cari istilah sulit? Pahami konsep aslinya di sini. Bukan cuma definisi kaku, tapi penjelasan ala Kakak Kelas yang gampang dicerna.
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

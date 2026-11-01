import React from 'react';
import Link from 'next/link';
import kamusData from '@/lib/generated-kamus.json';

interface RelatedKamusTermsProps {
  toolId?: string;
  kategori?: string;
  slugs?: string[];
  title?: string;
  description?: string;
  limit?: number;
}

const TOOL_KAMUS_MAP: Record<string, string[]> = {
  'simulasi-utbk': [
    'item-response-theory',
    'silogisme',
    'penalaran-deduktif',
    'penalaran-induktif',
    'daya-pembeda',
    'tingkat-kesukaran',
    'modus-ponens',
    'modus-tollens'
  ],
  'math-solver': [
    'teorema-pythagoras',
    'fungsi-komposisi',
    'matriks-invers',
    'sudut-sehadap',
    'aritmetika-sosial',
    'probabilitas',
    'statistika',
    'rata-rata-gabungan'
  ],
  'generator-soal': [
    'capaian-pembelajaran',
    'alur-tujuan-pembelajaran',
    'asesmen-diagnostik',
    'asesmen-formatif',
    'asesmen-sumatif',
    'taksonomi-bloom',
    'kriteria-ketercapaian-tujuan-pembelajaran',
    'diferensiasi-pembelajaran'
  ],
  'parafrase': [
    'paragraf-deduktif',
    'paragraf-induktif',
    'integritas-akademik',
    'turnitin',
    'makalah',
    'abstrak'
  ],
  'rangkuman': [
    'fotosintesis',
    'mitokondria',
    'dna',
    'osmosis',
    'enzim',
    'ekosistem',
    'klorofil',
    'hukum-newton'
  ],
  'slide-outline': [
    'modul-ajar',
    'profil-pelajar-pancasila',
    'interaksi-sosial',
    'stratifikasi-sosial'
  ],
  'kti-builder': [
    'makalah',
    'latar-belakang',
    'daftar-pustaka',
    'abstrak',
    'integritas-akademik',
    'anomi'
  ],
  'pantun-puisi': [
    'pantun',
    'puisi',
    'gurindam',
    'syair'
  ],
  'cerita-pendek': [
    'cerpen',
    'alur-cerita',
    'tokoh-protagonis'
  ],
  'cv-lamaran': [
    'curriculum-vitae',
    'surat-lamaran-kerja',
    'teks-prosedur'
  ],
  'akuntansi-solver': [
    'inflasi',
    'elastisitas-harga',
    'aritmetika-sosial'
  ],
  'proposal-usaha': [
    'hukum-permintaan-dan-penawaran',
    'kebijakan-fiskal',
    'produk-domestik-bruto',
    'biaya-peluang'
  ]
};

const CATEGORY_KAMUS_MAP: Record<string, string[]> = {
  'persiapan-ujian': [
    'item-response-theory',
    'silogisme',
    'penalaran-deduktif',
    'penalaran-induktif',
    'daya-pembeda',
    'tingkat-kesukaran',
    'modus-ponens',
    'modus-tollens'
  ],
  'utbk-snbt': [
    'item-response-theory',
    'silogisme',
    'penalaran-deduktif',
    'penalaran-induktif',
    'daya-pembeda',
    'tingkat-kesukaran',
    'modus-ponens',
    'modus-tollens'
  ],
  'ipa': [
    'fotosintesis',
    'hukum-newton',
    'ikatan-kovalen',
    'mitokondria',
    'hukum-kekekalan-energi',
    'reaksi-redoks'
  ],
  'ips': [
    'produk-domestik-bruto',
    'inflasi',
    'interaksi-sosial',
    'stratifikasi-sosial',
    'mobilitas-sosial',
    'biaya-peluang'
  ],
  'ppkn': [
    'pancasila',
    'sosialisasi',
    'integritas-akademik',
    'profil-pelajar-pancasila'
  ],
  'seni-budaya': [
    'pantun',
    'puisi',
    'gurindam',
    'syair'
  ],
  'smk': [
    'curriculum-vitae',
    'surat-lamaran-kerja',
    'teks-prosedur',
    'integritas-akademik'
  ],
  'matematika': [
    'teorema-pythagoras',
    'fungsi-komposisi',
    'matriks-invers',
    'sudut-sehadap',
    'aritmetika-sosial',
    'probabilitas',
    'statistika',
    'rata-rata-gabungan'
  ],
  'biologi': [
    'fotosintesis',
    'mitokondria',
    'dna',
    'osmosis',
    'enzim',
    'ekosistem',
    'klorofil',
    'meiosis'
  ],
  'fisika': [
    'hukum-newton',
    'hukum-kekekalan-energi',
    'gaya-gravitasi',
    'tekanan-hidrostatis',
    'efek-doppler',
    'hukum-archimedes',
    'energi-kinetik'
  ],
  'kimia': [
    'ikatan-kovalen',
    'reaksi-redoks',
    'stoikiometri',
    'larutan-elektrolit',
    'ph-derajat-keasaman',
    'larutan-penyangga',
    'tabel-periodik'
  ],
  'ekonomi': [
    'produk-domestik-bruto',
    'inflasi',
    'elastisitas-harga',
    'biaya-peluang',
    'hukum-permintaan-dan-penawaran',
    'kebijakan-fiskal'
  ],
  'sosiologi': [
    'interaksi-sosial',
    'konflik-sosial',
    'mobilitas-sosial',
    'anomi',
    'sosialisasi',
    'stratifikasi-sosial'
  ],
  'bahasa-indonesia': [
    'paragraf-deduktif',
    'paragraf-induktif',
    'integritas-akademik',
    'turnitin',
    'tokoh-protagonis',
    'pantun',
    'puisi'
  ],
  'kurikulum-merdeka': [
    'capaian-pembelajaran',
    'alur-tujuan-pembelajaran',
    'modul-ajar',
    'asesmen-diagnostik',
    'profil-pelajar-pancasila',
    'diferensiasi-pembelajaran',
    'asesmen-formatif',
    'asesmen-sumatif'
  ],
  'tips-belajar': [
    'item-response-theory',
    'taksonomi-bloom',
    'integritas-akademik',
    'turnitin',
    'tingkat-kesukaran'
  ],
  'sejarah': [
    'litosfer',
    'anomi',
    'kebijakan-fiskal',
    'produk-domestik-bruto'
  ],
  'agama': [
    'pancasila',
    'sosialisasi',
    'integritas-akademik'
  ]
};

const DEFAULT_SLUGS = [
  'item-response-theory',
  'teorema-pythagoras',
  'fotosintesis',
  'taksonomi-bloom'
];

export default function RelatedKamusTerms({
  toolId,
  kategori,
  slugs,
  title = 'Glosarium & Konsep Pelajaran Kunci Terkait',
  description = 'Pahami istilah, rumus pembentuk, dan contoh soal ujian resmi yang mendasari materi ini:',
  limit = 4,
}: RelatedKamusTermsProps) {
  const kamusLookup = React.useMemo(() => {
    return new Map(kamusData.map((item) => [item.slug, item]));
  }, []);

  let targetSlugs: string[] = [];

  if (slugs && slugs.length > 0) {
    targetSlugs = slugs;
  } else if (toolId && TOOL_KAMUS_MAP[toolId]) {
    targetSlugs = TOOL_KAMUS_MAP[toolId];
  } else if (kategori && CATEGORY_KAMUS_MAP[kategori]) {
    targetSlugs = CATEGORY_KAMUS_MAP[kategori];
  } else {
    targetSlugs = DEFAULT_SLUGS;
  }

  const terms = targetSlugs
    .map((slug) => kamusLookup.get(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, limit);

  if (terms.length === 0) return null;

  return (
    <div className="mt-12 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>Glosarium Istilah Sekolah</span>
          </div>
          <h3 className="text-xl md:text-2xl font-heading font-bold text-slate-900">
            {title}
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            {description}
          </p>
        </div>
        <Link
          href="/kamus"
          className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700 hover:underline shrink-0 self-start sm:self-auto"
        >
          <span>Buka 100 Istilah</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {terms.map((term) => (
          <Link
            key={term.slug}
            href={`/kamus/${term.slug}`}
            className="group flex flex-col justify-between p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-sky-300 hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="inline-block px-2 py-0.5 rounded-md bg-sky-100/70 text-sky-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                Konsep Inti
              </div>
              <h4 className="font-heading font-bold text-slate-900 group-hover:text-sky-600 text-base mb-1.5 line-clamp-1">
                {term.title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {term.description}
              </p>
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 group-hover:underline pt-2 border-t border-slate-100">
              <span>Pelajari Rumus &amp; EAV</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

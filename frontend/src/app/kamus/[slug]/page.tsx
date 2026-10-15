export const dynamic = 'force-static';
export const dynamicParams = false;

import { notFound } from 'next/navigation';
import { getKamusBySlug, getKamusSlugs } from '@/lib/kamus';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

const KAMUS_TOOL_BRIDGE: Record<string, { toolName: string; toolHref: string; ctaTitle: string; ctaDesc: string }> = {
  // Parafrase & Grammar
  'parafrase': { toolName: 'Tool Parafrase AI', toolHref: '/tools/parafrase', ctaTitle: 'Mau Parafrase Teks Bebas Plagiat?', ctaDesc: 'Gunakan AI TugasMu untuk menyusun ulang struktur kalimat dengan variasi kosakata kaya dan lolos Turnitin.' },
  'plagiarisme': { toolName: 'Tool Parafrase AI', toolHref: '/tools/parafrase', ctaTitle: 'Hindari Plagiarisme pada Tugasmu', ctaDesc: 'Tulis ulang referensi ilmiah menggunakan teknik parafrase mendalam dengan asisten AI.' },
  'sinonim': { toolName: 'Tool Parafrase AI', toolHref: '/tools/parafrase', ctaTitle: 'Cari Variasi Sinonim Kalimat?', ctaDesc: 'Kembangkan variasi diksi tulisanmu agar tidak repetitif dan lebih enak dibaca.' },
  'kalimat-pasif': { toolName: 'Tool Parafrase AI', toolHref: '/tools/parafrase', ctaTitle: 'Ubah Kalimat Aktif ke Pasif Otomatis', ctaDesc: 'Variasikan susunan kalimat makalahmu menjadi bentuk aktif atau pasif dengan sekali klik.' },
  
  // Grammar EYD
  'kalimat-efektif': { toolName: 'Pengecek Ejaan EYD & PUEBI', toolHref: '/tools/grammar-eyd', ctaTitle: 'Cek Efektivitas Kalimatmu', ctaDesc: 'Singkirkan kata mubazir dan perbaiki struktur SPOK sesuai kaidah ejaan terbaru.' },
  'puebi': { toolName: 'Pengecek Ejaan EYD & PUEBI', toolHref: '/tools/grammar-eyd', ctaTitle: 'Koreksi Ejaan Sesuai PUEBI/EYD', ctaDesc: 'Pindai seluruh typo, tanda baca koma, dan huruf kapital pada tugasmu secara otomatis.' },
  'kata-baku': { toolName: 'Pengecek Ejaan EYD & PUEBI', toolHref: '/tools/grammar-eyd', ctaTitle: 'Cek Kata Baku Sesuai KBBI', ctaDesc: 'Pastikan diksi dalam laporan atau makalahmu menggunakan kata baku resmi.' },
  'spok': { toolName: 'Pengecek Ejaan EYD & PUEBI', toolHref: '/tools/grammar-eyd', ctaTitle: 'Sempurnakan Susunan Kalimat SPOK', ctaDesc: 'Susun kalimat yang tertata rapi dengan pola Subjek-Predikat-Objek-Keterangan yang jelas.' },
  'majas': { toolName: 'Pengecek Ejaan EYD & PUEBI', toolHref: '/tools/grammar-eyd', ctaTitle: 'Analisis Gaya Bahasa & Majas', ctaDesc: 'Identifikasi majas personifikasi, metafora, dan hiperbola dalam teks sastra.' },
  'majas-personifikasi': { toolName: 'Pengecek Ejaan EYD & PUEBI', toolHref: '/tools/grammar-eyd', ctaTitle: 'Koreksi dan Analisis Gaya Bahasa', ctaDesc: 'Pelajari gaya bahasa personifikasi dan implementasikan dalam tulisan kreatifmu.' },

  // Math Solver
  'persamaan-kuadrat': { toolName: 'Math Solver Step-by-Step', toolHref: '/tools/math-solver', ctaTitle: 'Pecahkan Soal Persamaan Kuadrat', ctaDesc: 'Dapatkan penyelesaian rumus kuadrat dan pemfaktoran aljabar baris demi baris.' },
  'logaritma': { toolName: 'Math Solver Step-by-Step', toolHref: '/tools/math-solver', ctaTitle: 'Selesaikan Soal Logaritma', ctaDesc: 'Pahami sifat-sifat logaritma dengan kalkulator penjelasan bertahap.' },
  'trigonometri': { toolName: 'Math Solver Step-by-Step', toolHref: '/tools/math-solver', ctaTitle: 'Hitung Sudut Trigonometri (Sin, Cos, Tan)', ctaDesc: 'Masukkan soal trigonometrimu dan pahami konsep kuadran secara visual.' },
  'matriks': { toolName: 'Math Solver Step-by-Step', toolHref: '/tools/math-solver', ctaTitle: 'Hitung Determinan & Invers Matriks', ctaDesc: 'Pecahkan operasi penjumlahan, perkalian, dan invers matriks lengkap dengan rumus.' },
  'pecahan-campuran': { toolName: 'Math Solver Step-by-Step', toolHref: '/tools/math-solver', ctaTitle: 'Kalkulator Pecahan Campuran', ctaDesc: 'Ubah dan operasikan pecahan campuran ke desimal atau pecahan biasa dengan mudah.' },
  'aljabar': { toolName: 'Math Solver Step-by-Step', toolHref: '/tools/math-solver', ctaTitle: 'Selesaikan Operasi Aljabar', ctaDesc: 'Pahami aturan pindah ruas dan eliminasi variabel pada aljabar sekolah.' },
  'bilangan-prima': { toolName: 'Math Solver Step-by-Step', toolHref: '/tools/math-solver', ctaTitle: 'Cek & Uji Bilangan Prima', ctaDesc: 'Pelajari faktor prima dan uji kelayakan bilangan prima secara instan.' },

  // Makalah & KTI Builder
  'makalah': { toolName: 'Pembuat Struktur Makalah AI', toolHref: '/tools/makalah-builder', ctaTitle: 'Bingung Cara Menyusun Makalah?', ctaDesc: 'Buat kerangka Bab 1 hingga Bab 3 makalah ilmiah lengkap dengan latar belakang dan rumusan masalah.' },
  'latar-belakang': { toolName: 'Pembuat Struktur Makalah AI', toolHref: '/tools/makalah-builder', ctaTitle: 'Buat Paragraf Latar Belakang Masalah', ctaDesc: 'AI TugasMu membantu merangkai kalimat pembuka Bab 1 yang tajam dan logis.' },
  'daftar-pustaka': { toolName: 'Pembuat Struktur Makalah AI', toolHref: '/tools/makalah-builder', ctaTitle: 'Format Daftar Pustaka APA/MLA Otomatis', ctaDesc: 'Susun referensi buku, jurnal ilmiah, dan situs web sesuai standar sitasi akademik.' },
  'abstrak': { toolName: 'Pembuat Struktur Makalah AI', toolHref: '/tools/makalah-builder', ctaTitle: 'Buat Ringkasan Abstrak Karya Ilmiah', ctaDesc: 'Ekstraksi intisari metodologi dan kesimpulan penelitianmu menjadi satu halaman abstrak padat.' },

  // Sastra & Puisi
  'pantun': { toolName: 'Generator Pantun & Puisi AI', toolHref: '/tools/pantun-puisi', ctaTitle: 'Buat Pantun Berima Otomatis', ctaDesc: 'Hasilkan pantun nasihat, jenaka, atau adat dengan rima a-b-a-b yang sempurna.' },
  'puisi': { toolName: 'Generator Pantun & Puisi AI', toolHref: '/tools/pantun-puisi', ctaTitle: 'Tulis Puisi Estetik & Puitis', ctaDesc: 'Ekspresikan tema tugas seni sastramu dengan bait puisi penuh majas yang indah.' },
  'gurindam': { toolName: 'Generator Pantun & Puisi AI', toolHref: '/tools/pantun-puisi', ctaTitle: 'Pelajari Ciri Khas Gurindam', ctaDesc: 'Rangkai larik gurindam berisi petuah moral dua baris berima sama.' },
  'syair': { toolName: 'Generator Pantun & Puisi AI', toolHref: '/tools/pantun-puisi', ctaTitle: 'Pelajari Struktur Syair Klasik', ctaDesc: 'Bimbingan AI untuk memahami sajak puisi lama dan menganalisis maknanya.' },

  // Pidato
  'pidato': { toolName: 'Pembuat Naskah Pidato AI', toolHref: '/tools/pidato', ctaTitle: 'Susun Naskah Pidato Persuasif', ctaDesc: 'Buat pidato sambutan sekolah, orasi OSIS, atau perpisahan dengan struktur pembuka-isi-penutup mantap.' },
  'orasi': { toolName: 'Pembuat Naskah Pidato AI', toolHref: '/tools/pidato', ctaTitle: 'Buat Teks Orasi Semangat', ctaDesc: 'Susun argumen orasi kepemudaan yang membakar semangat audiens.' },
  'retorika': { toolName: 'Pembuat Naskah Pidato AI', toolHref: '/tools/pidato', ctaTitle: 'Kuasai Seni Berbicara Retorika', ctaDesc: 'Gunakan teknik Ethos, Pathos, dan Logos dalam teks pidatomu.' },

  // Cerpen
  'cerpen': { toolName: 'Generator Cerita Pendek AI', toolHref: '/tools/cerita-pendek', ctaTitle: 'Tulis Cerita Pendek Menarik', ctaDesc: 'Rangkai alur cerita seru untuk tugas cerpen Bahasa Indonesia dengan berbagai genre.' },
  'alur-cerita': { toolName: 'Generator Cerita Pendek AI', toolHref: '/tools/cerita-pendek', ctaTitle: 'Rancang Plot & Alur Narasi', ctaDesc: 'Bangun konflik maju, mundur, atau campuran untuk novel dan cerpenmu.' },
  'tokoh-protagonis': { toolName: 'Generator Cerita Pendek AI', toolHref: '/tools/cerita-pendek', ctaTitle: 'Karakterisasi Tokoh Cerita', ctaDesc: 'Ciptakan karakter protagonis dan antagonis yang berkarakter kuat.' },

  // CV & Lamaran
  'curriculum-vitae': { toolName: 'Pembuat CV & Lamaran (ATS)', toolHref: '/tools/cv-lamaran', ctaTitle: 'Buat CV Lulusan SMK/SMA Standar ATS', ctaDesc: 'Format dokumen riwayat hidup profesional yang mudah lolos seleksi HRD.' },
  'surat-lamaran-kerja': { toolName: 'Pembuat CV & Lamaran (ATS)', toolHref: '/tools/cv-lamaran', ctaTitle: 'Tulis Surat Lamaran Kerja Sopan', ctaDesc: 'Susun surat lamaran resmi untuk melamar kerja atau magang (PKL).' },

  // Sains / Rangkuman
  'fotosintesis': { toolName: 'Rangkuman Materi Sains AI', toolHref: '/tools/rangkuman', ctaTitle: 'Pahami Reaksi Fotosintesis', ctaDesc: 'Ringkas proses reaksi terang dan gelap biologi tumbuhan secara gamblang.' },
  'mitokondria': { toolName: 'Rangkuman Materi Sains AI', toolHref: '/tools/rangkuman', ctaTitle: 'Pahami Struktur Sel & Mitokondria', ctaDesc: 'Pelajari organel penghasil energi sel dengan bantuan rangkuman AI.' },
  'hukum-newton': { toolName: 'Rangkuman Materi Sains AI', toolHref: '/tools/rangkuman', ctaTitle: 'Kuasai Hukum Newton I, II, dan III', ctaDesc: 'Pecahkan contoh soal gerak dan gaya fisika mekanika dengan langkah mudah.' },
  'litosfer': { toolName: 'Rangkuman Materi Sains AI', toolHref: '/tools/rangkuman', ctaTitle: 'Pelajari Lapisan Kulit Bumi (Litosfer)', ctaDesc: 'Rangkum konsep batuan, lempeng tektonik, dan vulkanisme geografi.' },
  'tabel-periodik': { toolName: 'Rangkuman Materi Sains AI', toolHref: '/tools/rangkuman', ctaTitle: 'Hafal Unsur Tabel Periodik Kimia', ctaDesc: 'Pahami nomor atom, konfigurasi elektron, dan golongan kimia praktis.' },
  'pancasila': { toolName: 'Generator Soal & Kuis PPKn', toolHref: '/tools/generator-soal', ctaTitle: 'Uji Pemahaman Nilai-Nilai Pancasila', ctaDesc: 'Buat kuis simulasi pemahaman butir-butir Pancasila sila ke-1 sampai ke-5.' },
  'teks-prosedur': { toolName: 'Pembuat CV & Lamaran (ATS)', toolHref: '/tools/cv-lamaran', ctaTitle: 'Susun Teks Langkah Demi Langkah', ctaDesc: 'Buat teks petunjuk teknis atau prosedur pelaksanaan kerja dengan teratur.' }
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const entry = getKamusBySlug(resolvedParams.slug);
  
  if (!entry) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${entry.title}: Pengertian & Definisi | Kamus TugasMu`,
    description: entry.description,
    alternates: {
      canonical: `/kamus/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${entry.title}: Pengertian & Definisi | Kamus TugasMu`,
      description: entry.description,
      type: 'article',
      publishedTime: entry.date,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(entry.title)}&category=Glosarium`,
          width: 1200,
          height: 630,
          alt: entry.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getKamusSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export default async function KamusEntryPage({ params }: Props) {
  const resolvedParams = await params;
  const entry = getKamusBySlug(resolvedParams.slug);

  if (!entry) {
    notFound();
  }

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": entry.title,
    "description": entry.description,
    "url": `https://tugasmu.com/kamus/${resolvedParams.slug}`,
    "inDefinedTermSet": "https://tugasmu.com/kamus"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Beranda",
        "item": "https://tugasmu.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Glosarium",
        "item": "https://tugasmu.com/kamus"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": entry.title,
        "item": `https://tugasmu.com/kamus/${resolvedParams.slug}`
      }
    ]
  };

  const bridge = KAMUS_TOOL_BRIDGE[resolvedParams.slug] || {
    toolName: 'Tools Asisten AI TugasMu',
    toolHref: '/tools',
    ctaTitle: 'Pusing Ngerjain Tugas Sekolah?',
    ctaDesc: 'Biar AI TugasMu bantu jelasin materi dan bantu ngerjain tugasmu dengan cara yang pintar.'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="bg-surface-container-lowest min-h-screen">
        {/* Navigation Breadcrumb */}
        <div className="bg-surface-container-lowest border-b border-surface-container/50 sticky top-[72px] z-30">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <Link 
              href="/kamus"
              className="inline-flex items-center gap-2 text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Glosarium
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
          <header className="mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
              Glosarium Pelajaran
            </span>
            <h1 className="text-display-lg-mobile md:text-display-lg font-heading font-bold text-primary mb-4 leading-tight">
              {entry.title}
            </h1>
            <p className="text-headline-sm text-on-surface-variant leading-relaxed">
              {entry.description}
            </p>
          </header>

          <div className="prose prose-lg md:prose-xl prose-slate max-w-none 
            prose-headings:font-heading prose-headings:text-primary prose-headings:font-bold 
            prose-a:text-primary-container hover:prose-a:text-primary 
            prose-strong:text-on-surface prose-strong:font-bold
            prose-img:rounded-2xl prose-img:shadow-sm">
            <MDXRemote source={entry.content} />
          </div>
          
          {/* Internal Linking Bridge - Targeted Tool Conversion */}
          <div className="mt-16 pt-8 border-t border-surface-container">
            <div className="bg-gradient-to-r from-sky-50 to-indigo-50 p-6 md:p-8 rounded-2xl border border-sky-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Asisten Belajar Terkait</span>
                <h3 className="font-heading text-headline-sm font-bold text-slate-900 mt-1 mb-2">
                  {bridge.ctaTitle}
                </h3>
                <p className="text-body-md text-slate-600">
                  {bridge.ctaDesc}
                </p>
              </div>
              <Link 
                href={bridge.toolHref} 
                className="inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm whitespace-nowrap shrink-0"
              >
                Coba {bridge.toolName} →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

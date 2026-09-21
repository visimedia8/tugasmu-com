import type { Metadata } from 'next';
import Link from 'next/link';
import ParafraseClient from './ParafraseClient';
import SchemaMarkup from '@/components/shared/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Tool Parafrase Teks AI Gratis',
  description: 'Tulis ulang teks tugasmu dengan bahasa yang unik dan anti-plagiat menggunakan AI TugasMu.',
};

export default function ParafrasePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cara Memparafrase Teks dengan AI TugasMu",
    "description": "Langkah mudah menggunakan alat parafrase gratis dari TugasMu",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Pilih Konteks",
        "text": "Pilih jenjang, kelas, kurikulum, dan mata pelajaran."
      },
      {
        "@type": "HowToStep",
        "name": "Masukkan Teks",
        "text": "Tempel teks yang ingin diparafrase ke dalam kotak."
      },
      {
        "@type": "HowToStep",
        "name": "Generate & Salin",
        "text": "Klik tombol 'Parafrase Sekarang' dan salin hasilnya."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Apa itu Parafrase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Parafrase adalah menulis ulang sebuah teks menggunakan kata-kata sendiri tanpa mengubah makna dasar dari teks aslinya."
        }
      },
      {
        "@type": "Question",
        "name": "Mengapa menggunakan TugasMu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TugasMu dirancang khusus untuk memahami konteks siswa Indonesia sehingga hasil parafrase terdengar lebih natural dan disesuaikan dengan tingkat sekolah."
        }
      }
    ]
  };

  return (
    <div className="w-full bg-surface min-h-screen">
      <SchemaMarkup schema={schema} />
      <SchemaMarkup schema={faqSchema} />
      
      <section className="max-w-[1200px] mx-auto w-full px-margin md:px-margin-desktop py-space-lg">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm mb-space-md">
          <Link className="hover:text-primary transition-colors flex items-center gap-1" href="/">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Beranda</span>
          </Link>
          <span className="text-outline-variant font-medium">/</span>
          <Link className="hover:text-primary transition-colors" href="/tools">Tools AI</Link>
          <span className="text-outline-variant font-medium">/</span>
          <span className="text-on-surface font-semibold">Parafrase Teks &amp; Makalah</span>
        </nav>

        {/* Tool Header & Badges */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-sm mb-space-lg relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-primary-container/10 blur-2xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg relative z-10">
            <div className="space-y-space-xs max-w-3xl">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>thumb_up</span>
                  Rekomendasi
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                  Lolos Turnitin
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Parafrase Teks &amp; Makalah
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Ubah susunan kalimat tugas agar terdengar natural, santun, dan bebas plagiasi tanpa mengubah inti materi akademik.
              </p>
            </div>
            {/* Tool Quick Actions */}
            <div className="flex items-center flex-wrap gap-space-xs shrink-0 self-start lg:self-center">
              <button className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>Panduan Tool</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Client Component handles the 2-column layout and API fetch */}
        <ParafraseClient />

        {/* FAQ / Content SEO */}
        <div className="mt-space-xl p-space-lg bg-surface-container-lowest rounded-2xl shadow-sm prose prose-slate max-w-none">
          <h2>Apa itu Parafrase?</h2>
          <p>Parafrase adalah menulis ulang sebuah teks menggunakan kata-kata sendiri tanpa mengubah makna dasar dari teks aslinya. Ini adalah kemampuan penting dalam menulis akademik untuk menghindari plagiarisme.</p>
          
          <h2>Mengapa menggunakan TugasMu?</h2>
          <p>Banyak tool pembuat parafrase di luar sana yang menghasilkan kalimat kaku seperti robot. TugasMu dirancang khusus untuk memahami konteks siswa Indonesia sehingga hasil parafrase terdengar lebih natural, menggunakan ejaan yang disempurnakan (EYD), dan disesuaikan dengan tingkat sekolahmu.</p>
        </div>
      </section>
    </div>
  );
}

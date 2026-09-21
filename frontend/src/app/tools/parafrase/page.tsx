import type { Metadata } from 'next';
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
    <div className="container py-8 md:py-12 max-w-4xl">
      <SchemaMarkup schema={schema} />
      <SchemaMarkup schema={faqSchema} />
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Parafrase Teks & Anti-Plagiat
        </h1>
        <p className="text-slate-600 text-lg">
          Tulis ulang kalimat atau paragraf menjadi versi yang berbeda tanpa mengubah makna aslinya. 
          Sangat cocok untuk membuat tugasmu terlihat lebih natural dan unik.
        </p>
      </div>
      
      <ParafraseClient />
      
      <div className="mt-16 prose prose-slate max-w-none">
        <h2>Apa itu Parafrase?</h2>
        <p>Parafrase adalah menulis ulang sebuah teks menggunakan kata-kata sendiri tanpa mengubah makna dasar dari teks aslinya. Ini adalah kemampuan penting dalam menulis akademik untuk menghindari plagiarisme.</p>
        
        <h2>Mengapa menggunakan TugasMu?</h2>
        <p>Banyak tool pembuat parafrase di luar sana yang menghasilkan kalimat kaku seperti robot. TugasMu dirancang khusus untuk memahami konteks siswa Indonesia sehingga hasil parafrase terdengar lebih natural, menggunakan ejaan yang disempurnakan (EYD), dan disesuaikan dengan tingkat sekolahmu.</p>
      </div>
    </div>
  );
}

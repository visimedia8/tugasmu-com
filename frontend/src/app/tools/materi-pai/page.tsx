/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import MateriPaiClient from './MateriPaiClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Rangkuman Materi PAI, Fikih, SKI & Aqidah Akhlak',
  description: 'Generator materi pelajaran Pendidikan Agama Islam otomatis sesuai kurikulum madrasah (Fikih, SKI, Aqidah Akhlak).',
};

export default function MateriPaiPage() {
  const faqs = [
  {
    "q": "Apakah ada referensi mazhab untuk materi Fikih?",
    "a": "<p>Secara default, penjelasan Fikih menggunakan standar mazhab Syafi'i yang diajarkan mayoritas di Indonesia. Namun jika ada perbedaan ulama, AI seringkali memberikan catatan perbandingan (Ikhtilaf).</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Rangkuman Materi PAI (Fikih, SKI, Aqidah)
        </h1>
        <p className="text-slate-600 text-lg">
          Tugas PAI besok dikumpulkan? Dapatkan rangkuman materi lengkap beserta dalil Al-Quran dan Hadits pendukung.
        </p>
      </div>

      <MateriPaiClient />

      <RelatedTools toolIds={["kitab-kuning","nahwu-shorof","muhafazhah"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">mosque</span>
            Cara Cepat Memahami Pelajaran Agama Islam di Sekolah
          </h2>
          <p>Mata Pelajaran PAI di madrasah dipecah menjadi sangat detail: Fikih (hukum praktis), Aqidah (Tauhid/Keyakinan), Akhlak (Moralitas), dan SKI (Sejarah). Terkadang, mencari dalil spesifik di buku cetak memakan waktu lama.</p><p>Dengan Generator Materi PAI, kamu bisa mendapatkan struktur lengkap: mulai dari definisi etimologi & terminologi, dalil shahih, hingga rincian rukun/syaratnya. Sangat cocok untuk bahan presentasi atau membuat makalah PAI.</p>
        </div>
      </div>

      <div className="mt-12">
        <FAQAccordion
          title="Pertanyaan Seputar Tool Ini"
          description="Panduan singkat penggunaan."
          faqs={faqs.map(f => ({ question: f.q, answer: <div dangerouslySetInnerHTML={{ __html: f.a }} /> }))}
        />
      </div>
    </div>
  );
}
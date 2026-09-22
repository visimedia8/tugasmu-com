/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import PenjelasHaditsClient from './PenjelasHaditsClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Penjelas Derajat dan Makna Hadits (Syarah)',
  description: 'Cari tahu derajat hadits (shahih/dhaif) dan penjelasan kandungannya secara komprehensif.',
};

export default function PenjelasHaditsPage() {
  const faqs = [
  {
    "q": "Apakah AI bisa mendeteksi hadits palsu (Maudhu)?",
    "a": "<p>Ya, jika kamu memasukkan hadits yang populer namun ternyata palsu menurut para ulama hadits, AI akan menginformasikan bahwa riwayat tersebut maudhu' dan tidak bisa dijadikan dalil.</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Penjelas Derajat Hadits & Syarah
        </h1>
        <p className="text-slate-600 text-lg">
          Jangan asal sebar hadits di grup WA. Pastikan derajatnya (Shahih/Hasan/Dhaif) dan pahami konteksnya di sini.
        </p>
      </div>

      <PenjelasHaditsClient />

      <RelatedTools toolIds={["kitab-kuning","nahwu-shorof","muhafazhah"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">forum</span>
            Memahami Fiqhul Hadits & Asbabul Wurud
          </h2>
          <p>Mirip dengan Al-Quran yang memiliki Asbabul Nuzul, hadits Nabi Muhammad ﷺ juga memiliki Asbabul Wurud (Konteks atau alasan mengapa hadits tersebut diucapkan). Memotong perkataan Nabi dari konteks aslinya bisa berakibat fatal.</p><p>Misalnya, hadits tentang peperangan tidak bisa diaplikasikan di ruang publik yang damai. AI ini membantumu memahami "Fiqhul Hadits" (pemahaman mendalam atas hadits) berdasarkan penjelasan para pensyarah kitab (seperti Imam Nawawi atau Ibnu Hajar Al-Asqalani).</p>
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
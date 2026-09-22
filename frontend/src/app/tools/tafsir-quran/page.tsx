/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import TafsirQuranClient from './TafsirQuranClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Penjelas Tafsir Ayat Al-Quran & Asbabul Nuzul',
  description: 'Dapatkan penjelasan tafsir ringkas, asbabul nuzul, dan hikmah pelajaran dari setiap ayat Al-Quran.',
};

export default function TafsirQuranPage() {
  const faqs = [
  {
    "q": "Apakah tafsir ini bisa dipertanggungjawabkan?",
    "a": "<p>AI dilatih menggunakan sumber literatur Islam klasik berhaluan moderat (Ahlussunnah wal Jamaah). Namun, untuk fatwa hukum syariah yang rumit (Fikih Kontemporer), tetap rujuklah kepada Ulama atau Kiai setempat.</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Penjelas Makna Ayat & Tafsir Al-Quran
        </h1>
        <p className="text-slate-600 text-lg">
          Gali hikmah dan latar belakang (Asbabul Nuzul) turunnya sebuah ayat untuk tugas PAI atau kultum.
        </p>
      </div>

      <TafsirQuranClient />

      <RelatedTools toolIds={["kitab-kuning","nahwu-shorof","muhafazhah"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">auto_stories</span>
            Pentingnya Belajar Tafsir, Bukan Sekadar Terjemahan
          </h2>
          <p>Membaca terjemahan Al-Quran saja sering kali bisa menimbulkan kesalahpahaman. Bahasa Arab memiliki kedalaman makna yang tidak bisa diterjemahkan 1:1 ke bahasa Indonesia. Selain itu, ada ayat-ayat yang turun untuk konteks peperangan, hukum spesifik, atau menegur sahabat.</p><p>Oleh karena itu, ilmu Tafsir dan Asbabul Nuzul (Sebab turunnya ayat) mutlak diperlukan. Melalui AI ini, ringkasan dari kitab-kitab tafsir mu'tabar (seperti Ibnu Katsir dan Jalalain) dikompilasi agar mudah dibaca siswa madrasah.</p>
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
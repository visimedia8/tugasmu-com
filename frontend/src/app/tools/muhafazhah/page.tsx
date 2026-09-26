/* eslint-disable react/no-unescaped-entities */
import SchemaMarkup from '@/components/shared/SchemaMarkup';
import MuhafazhahClient from './MuhafazhahClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Ujian Hafalan (Muhafazhah) - Sambung Ayat & Nadhom',
  description: "Generator otomatis untuk mengetes hafalan Qur'an, Alfiyah, Imrithi, atau nadhom lainnya dengan soal sambung bait.",
  alternates: { canonical: '/tools/muhafazhah' },
};

export default function MuhafazhahPage() {

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Ujian Hafalan (Muhafazhah) - Sambung Ayat & Nadhom",
    "description": "Generator otomatis untuk mengetes hafalan Qur",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  };
  const faqs = [
  {
    "q": "Apakah ada nadhom kitab yang tidak didukung?",
    "a": "<p>Untuk kitab-kitab mahsyur (terkenal) seperti Alfiyah, Imrithi, Aqidatul Awam, Zubad, dan Tuhfatul Athfal, AI sudah menghafalnya. Untuk kitab spesifik lokal mungkin akurasinya berkurang.</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <SchemaMarkup schema={schema} />
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Tes Hafalan (Muhafazhah) Otomatis
        </h1>
        <p className="text-slate-600 text-lg">
          Uji hafalan Qur'an atau hafalan Nadhom-mu sebelum maju setoran ke Kiai/Ustadz.
        </p>
      </div>

      <MuhafazhahClient />

      <RelatedTools toolIds={["kitab-kuning","nahwu-shorof","tafsir-quran"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">record_voice_over</span>
            Strategi Murojaah Hafalan Agar Tidak Mudah Lupa
          </h2>
          <p>Menghafal (Ziyadah) itu sulit, tapi menjaga hafalan (Murojaah) jauh lebih sulit. Salah satu cara terbaik agar hafalan menempel di otak panjang (long-term memory) adalah dengan melakukan <em>Recall Testing</em> (Uji Tarik Ingatan).</p><p>Dengan AI ini, kamu bisa menstimulasi diri seolah sedang disimak oleh guru. AI akan memberikan potongan awal ayat atau bait nadhom, dan kamu harus melanjutkannya tanpa melihat buku catatan.</p>
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
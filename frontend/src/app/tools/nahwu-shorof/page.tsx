/* eslint-disable react/no-unescaped-entities */
import SchemaMarkup from '@/components/shared/SchemaMarkup';
import NahwuShorofClient from './NahwuShorofClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: "Penjelas Nahwu & Shorof (Bedah I'rab Otomatis)",
  description: "Analisis I'rab dan kedudukan tata bahasa (Nahwu Shorof) dari sebuah kalimat Arab secara otomatis untuk santri dan siswa MA.",
  alternates: { canonical: '/tools/nahwu-shorof' },
};

export default function NahwuShorofPage() {

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Penjelas Nahwu & Shorof (Bedah I",
    "description": "Analisis I",
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
    "q": "Apakah format i'rabnya standar kitab kuning?",
    "a": "<p>Ya, penjelasan I'rab akan menyebutkan istilah baku seperti <em>Marfu' wa 'alamat raf'ihi dhommah dzohirah</em> dan sebagainya, lalu dijelaskan dalam bahasa Indonesia.</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <SchemaMarkup schema={schema} />
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Bedah I'rab & Tata Bahasa Arab (Nahwu Shorof)
        </h1>
        <p className="text-slate-600 text-lg">
          Bingung menentukan Fa'il, Maf'ul, atau Mubtada Khabar? Ketik kalimatnya, biar AI yang menjabarkan I'rab-nya.
        </p>
      </div>

      <NahwuShorofClient />

      <RelatedTools toolIds={["kitab-kuning","muhafazhah","tafsir-quran"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">account_tree</span>
            Mengapa Belajar Nahwu Shorof Itu Penting?
          </h2>
          <p>Di pesantren ada pepatah: <em>Shorof adalah ibunya ilmu, dan Nahwu adalah bapaknya</em>. Tanpa keduanya, seseorang tidak akan bisa menggali hukum dari Al-Quran dan Hadits dengan benar.</p><p>Tool ini berfungsi sebagai asisten saat kamu kebingungan menentukan harakat akhir kalimat (I'rab) atau mencari asal kata (Wazan) saat setoran hafalan Alfiyah Ibnu Malik atau Jurumiyah.</p>
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
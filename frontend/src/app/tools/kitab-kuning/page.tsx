import { CheckCircle, Zap, ShieldCheck, Users } from 'lucide-react';
/* eslint-disable react/no-unescaped-entities */
import SchemaMarkup from '@/components/shared/SchemaMarkup';
import KitabKuningClient from './KitabKuningClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolSchema from '@/components/seo/ToolSchema';

export const metadata = {
  title: 'Translator Kitab Kuning & Arab Gundul - TugasMu',
  description: 'Terjemahkan teks Arab gundul (Kitab Kuning) ke bahasa Indonesia lengkap dengan harakat dan syarah.',
  alternates: { canonical: '/tools/kitab-kuning' },
};

export default function KitabKuningPage() {

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Translator Kitab Kuning & Arab Gundul - TugasMu",
    "description": "Terjemahkan teks Arab gundul (Kitab Kuning) ke bahasa Indonesia lengkap dengan harakat dan syarah.",
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
    "q": "Apakah bisa untuk bahasa Arab modern (Koran)?",
    "a": "<p>Bisa, namun prompt dasar AI ini dikhususkan untuk struktur bahasa Arab klasik (Turats). Hasil untuk koran modern mungkin terasa terlalu kaku/klasik.</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <ToolSchema toolId="kitab-kuning" />
      <SchemaMarkup schema={schema} />
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Translator & Syarah Kitab Kuning
        </h1>
        <p className="text-slate-600 text-lg">
          Membaca kitab kuning kini lebih mudah. Dapatkan terjemahan, harakat, dan makna yang mendalam.
        </p>
      </div>

      
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 mb-8 mt-6">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> 100% Gratis
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <Zap className="w-4 h-4 text-amber-500" /> AI Super Cepat
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-slate-700" /> Privasi Aman
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <Users className="w-4 h-4 text-sky-600" /> Dipakai 10.000+ Pelajar
          </span>
        </div>

      <KitabKuningClient />

      <RelatedTools toolIds={["nahwu-shorof","muhafazhah","tafsir-quran"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">menu_book</span>
            Cara Membaca Kitab Kuning Tanpa Harakat
          </h2>
          <p>Bagi santri, membaca kitab kuning (Arab gundul) adalah sebuah keharusan. Tantangan terbesarnya bukan hanya mengartikan per kata, tetapi mengetahui kedudukan kata (i'rab) agar harakat akhirnya tepat dan maknanya tidak menyimpang.</p><p>AI TugasMu dirancang khusus untuk membedah teks Arab klasik, menempatkan harakat yang hilang sesuai kaidah Nahwu-Shorof, dan memberikan penjelasan (syarah) layaknya ngaji bandongan bersama kiai.</p>
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
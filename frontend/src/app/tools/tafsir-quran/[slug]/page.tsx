/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import TafsirQuranClient from '../TafsirQuranClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import SiblingSpokes from '@/components/tools/SiblingSpokes';
import ToolSchema from '@/components/seo/ToolSchema';
import SchemaMarkup from '@/components/shared/SchemaMarkup';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PSEO_DATA
    .filter((item) => item.toolId === 'tafsir-quran')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'tafsir-quran'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/tafsir-quran/${data.slug}` },
  };
}

export default function TafsirQuranPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'tafsir-quran'
  );

  if (!data) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": data.title,
    "description": data.description,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  };

  return (
    <div className="container py-8 md:py-12 max-w-5xl mx-auto px-4">
      <ToolSchema toolId="tafsir-quran" />
      <SchemaMarkup schema={schema} />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <TafsirQuranClient initialPrompt={data.initialPrompt} />

      {/* Konten Edukatif Semantik (Pencegah Thin Content) */}
      <div 
        className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs"
        dangerouslySetInnerHTML={{ __html: data.explanation }} 
      />

      <div className="max-w-4xl mt-14">
        <SiblingSpokes toolId={data.toolId} currentSlug={data.slug} />
        <RelatedTools toolIds={["tajwid", "penjelas-hadits", "materi-pai"]} />

        <FAQAccordion
          title="Tafsir Tematik Ayat Al-Qur'an Pelajar"
          description="Pertanyaan umum siswa seputar materi, rumus kaidah dasar, dan cara penyelesaian tugas."
          faqs={[
            {
              question: "Kitab rujukan tafsir apa yang digunakan?",
              answer: (
                <p>
                  Menggunakan rujukan kitab tafsir mu'tabar seperti Tafsir Ibnu Katsir, Tafsir Al-Jalalain (Imam Jalaluddin Al-Mahalli & As-Suyuthi), serta Tafsir Kemenag RI resmi.
                </p>
              )
            },
            {
              question: "Apakah bisa digunakan untuk tugas makalah PAI tematik?",
              answer: (
                <p>
                  Sangat bisa. AI merincikan konteks ayat, asbabun nuzul, munasabah ayat, kosa kata kunci (mufrodat), dan relevansi nilai akhlak dalam kehidupan sehari-hari.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

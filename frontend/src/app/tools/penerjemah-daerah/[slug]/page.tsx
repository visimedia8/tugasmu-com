/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import PenerjemahDaerahClient from '../PenerjemahDaerahClient';
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
    .filter((item) => item.toolId === 'penerjemah-daerah')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'penerjemah-daerah'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/penerjemah-daerah/${data.slug}` },
  };
}

export default function PenerjemahDaerahPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'penerjemah-daerah'
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
      <ToolSchema toolId="penerjemah-daerah" />
      <SchemaMarkup schema={schema} />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <PenerjemahDaerahClient initialPrompt={data.initialPrompt} />

      {/* Konten Edukatif Semantik (Pencegah Thin Content) */}
      <div 
        className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs"
        dangerouslySetInnerHTML={{ __html: data.explanation }} 
      />

      <div className="max-w-4xl mt-14">
        <SiblingSpokes toolId={data.toolId} currentSlug={data.slug} />
        <RelatedTools toolIds={["translator-arab", "pantun-puisi", "cerita-pendek"]} />

        <FAQAccordion
          title="Terjemahan Bahasa Daerah Nusantara & Tingkatan Undha-Usuk"
          description="Pertanyaan umum siswa seputar materi, rumus kaidah dasar, dan cara penyelesaian tugas."
          faqs={[
            {
              question: "Apakah hasil terjemahan memperhatikan tingkatan bahasa krama dan lemes?",
              answer: (
                <p>
                  Ya. AI secara cerdas membedakan tingkatan undha-usuk basa Jawa (ngoko lugu, krama madya, krama alus/inggil) dan basa Sunda (loma vs lemes) sesuai lawan bicara.
                </p>
              )
            },
            {
              question: "Bahasa daerah apa saja yang didukung?",
              answer: (
                <p>
                  Bahasa Jawa, Sunda, Bali, Minangkabau, Batak, Madura, dan Bugis yang sering menjadi muatan lokal (mulok) tugas sekolah.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

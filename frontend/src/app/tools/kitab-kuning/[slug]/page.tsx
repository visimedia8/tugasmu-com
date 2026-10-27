/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import KitabKuningClient from '../KitabKuningClient';
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
    .filter((item) => item.toolId === 'kitab-kuning')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'kitab-kuning'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/kitab-kuning/${data.slug}` },
  };
}

export default function KitabKuningPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'kitab-kuning'
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
      <ToolSchema toolId="kitab-kuning" />
      <SchemaMarkup schema={schema} />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <KitabKuningClient initialPrompt={data.initialPrompt} />

      {/* Konten Edukatif Semantik (Pencegah Thin Content) */}
      <div 
        className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs"
        dangerouslySetInnerHTML={{ __html: data.explanation }} 
      />

      <div className="max-w-4xl mt-14">
        <SiblingSpokes toolId={data.toolId} currentSlug={data.slug} />
        <RelatedTools toolIds={["nahwu-shorof", "muhafazhah", "translator-arab"]} />

        <FAQAccordion
          title="Penerjemahan & Pemaknaan Kitab Kuning Pesantren"
          description="Pertanyaan umum siswa seputar materi, rumus kaidah dasar, dan cara penyelesaian tugas."
          faqs={[
            {
              question: "Apakah alat ini mendukung makna gandul pegon Jawa dan Sunda?",
              answer: (
                <p>
                  Ya. AI mengenali kode kedudukan i'rob standar pesantren (seperti utawi untuk mubtada', iku untuk khobar, kelawan untuk maf'ul bih) beserta terjemahan bahasa Indonesia lengkapnya.
                </p>
              )
            },
            {
              question: "Kitab apa saja yang dapat diterjemahkan?",
              answer: (
                <p>
                  Semua kitab matan dasar dan syarah fikih, nahwu, shorof, tauhid, tasawuf, dan akhlak yang umum dikaji di pesantren salaf maupun modern.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

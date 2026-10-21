/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import KTIBuilderClient from '../KTIBuilderClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolSchema from '@/components/seo/ToolSchema';
import SchemaMarkup from '@/components/shared/SchemaMarkup';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PSEO_DATA
    .filter((item) => item.toolId === 'kti-builder')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'kti-builder'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/kti-builder/${data.slug}` },
  };
}

export default function KTIBuilderPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'kti-builder'
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
      <ToolSchema toolId="kti-builder" />
      <SchemaMarkup schema={schema} />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <KTIBuilderClient initialPrompt={data.initialPrompt} />

      {/* Konten Edukatif Semantik (Pencegah Thin Content) */}
      <div 
        className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs"
        dangerouslySetInnerHTML={{ __html: data.explanation }} 
      />

      <div className="max-w-4xl mt-14">
        <RelatedTools toolIds={["makalah-builder", "slide-outline", "parafrase"]} />

        <FAQAccordion
          title={`FAQ: ${data.h1}`}
          description="Pertanyaan umum seputar penyusunan karya tulis ilmiah (KTI), proposal penelitian, dan format penulisan akademis SMA/SMK."
          faqs={[
            {
              question: 'Apakah kerangka KTI ini sesuai standar Lomba Karya Ilmiah Remaja (LKIR)?',
              answer: (
                <p>
                  Ya, sistematika penulisan Bab 1 hingga Bab 5 mengikuti pedoman standar penulisan karya ilmiah remaja yang diakui BRIN dan Kemendikbudristek.
                </p>
              )
            },
            {
              question: 'Bagaimana cara menambahkan daftar pustaka standar APA Style?',
              answer: (
                <p>
                  Kamu dapat memanfaatkan outline dan rujukan yang dihasilkan untuk kemudian diverifikasi melalui alat Parafrase & Pengecek Sitasi TugasMu.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

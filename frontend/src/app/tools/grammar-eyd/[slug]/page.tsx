
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import GrammarEYDClient from '../GrammarEYDClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolSchema from '@/components/seo/ToolSchema';
import SchemaMarkup from '@/components/shared/SchemaMarkup';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PSEO_DATA
    .filter((item) => item.toolId === 'grammar-eyd')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'grammar-eyd'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/grammar-eyd/${data.slug}` },
  };
}

export default function GrammarEydPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'grammar-eyd'
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
    <div className="container py-8 md:py-12 max-w-4xl">
      <ToolSchema toolId="grammar-eyd" />
      <SchemaMarkup schema={schema} />
      
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <GrammarEYDClient initialTeks={data.initialPrompt} />

      {/* Teks Unik untuk mencegah Thin Content (SEO) */}
      <div className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800"
           dangerouslySetInnerHTML={{ __html: data.explanation }} />

      <RelatedTools toolIds={["parafrase","laporan-pkl","cerita-pendek"]} />

      <FAQAccordion
        title={`FAQ: ${data.h1}`}
        description="Pertanyaan tentang pengecekan Ejaan Yang Disempurnakan (EYD) menggunakan AI."
        faqs={[
          {
            question: 'Apakah alat ini menggunakan pedoman EYD V terbaru?',
            answer: (
              <p>
                Ya, mesin cerdas kami dikalibrasi menggunakan PUEBI dan pedoman EYD V terbaru dari Kemdikbud. Ini memastikan tanda baca, huruf kapital, dan tata bahasa baku kamu sesuai standar akademis.
              </p>
            )
          }
        ]}
      />
    </div>
  );
}

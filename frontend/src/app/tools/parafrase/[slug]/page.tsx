import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import ParafraseClient from '../ParafraseClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolSchema from '@/components/seo/ToolSchema';
import SchemaMarkup from '@/components/shared/SchemaMarkup';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PSEO_DATA
    .filter((item) => item.toolId === 'parafrase')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'parafrase'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/parafrase/${data.slug}` },
  };
}

export default function ParafrasePseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'parafrase'
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
    <div className="container py-8 md:py-12 max-w-6xl">
      <ToolSchema toolId="parafrase" />
      <SchemaMarkup schema={schema} />
      
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <ParafraseClient initialInputText={data.initialPrompt} />

      {/* Teks Unik untuk mencegah Thin Content (SEO) */}
      <div className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800"
           dangerouslySetInnerHTML={{ __html: data.explanation }} />

      <div className="max-w-4xl mt-16">
        <RelatedTools toolIds={["grammar-eyd", "rangkuman", "makalah-builder"]} />

        <FAQAccordion
          title={`FAQ: ${data.h1}`}
          description="Pertanyaan yang sering diajukan mengenai algoritma anti-plagiarisme kami."
          faqs={[
            {
              question: 'Apakah hasil teks aman dari deteksi Turnitin?',
              answer: (
                <p>
                  Ya, tool parafrase kami merombak struktur sintaksis (S-P-O-K) secara fundamental dan menggunakan sinonim tingkat lanjut. Hal ini mencegah kesamaan *string* secara langsung sehingga tingkat *similarity* Turnitin kamu dapat ditekan secara drastis.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

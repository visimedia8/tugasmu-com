import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import MakalahBuilderClient from '../MakalahBuilderClient';
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
    .filter((item) => item.toolId === 'makalah-builder')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'makalah-builder'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/makalah-builder/${data.slug}` },
  };
}

export default function MakalahBuilderPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'makalah-builder'
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
      <ToolSchema toolId="makalah-builder" />
      <SchemaMarkup schema={schema} />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <MakalahBuilderClient />

      {/* Konten Edukatif Semantik (Pencegah Thin Content) */}
      <div 
        className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs"
        dangerouslySetInnerHTML={{ __html: data.explanation }} 
      />

      <div className="max-w-4xl mt-14">
        <SiblingSpokes toolId={data.toolId} currentSlug={data.slug} />
        <RelatedTools toolIds={["parafrase", "grammar-eyd", "kti-builder"]} />

        <FAQAccordion
          title={`FAQ: ${data.h1}`}
          description="Pertanyaan umum seputar kaidah penyusunan makalah ilmiah sekolah."
          faqs={[
            {
              question: "Apakah susunan makalah ini sesuai standar karya ilmiah sekolah?",
              answer: (
                <p>
                  Ya, struktur makalah mengikuti kaidah tata tulis ilmiah baku: Bab I Pendahuluan (Latar Belakang & Rumusan Masalah), Bab II Pembahasan, dan Bab III Penutup (Kesimpulan & Saran).
                </p>
              )
            },
            {
              question: "Bagaimana cara memastikan makalah bebas dari plagiasi?",
              answer: (
                <p>
                  Gunakan hasil draf AI sebagai kerangka ide dan lakukan parafrase pada kalimat rujukan kutipan menggunakan alat Parafrase Teks TugasMu agar lolos uji orisinalitas Turnitin.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

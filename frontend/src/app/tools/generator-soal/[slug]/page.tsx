import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import GeneratorSoalClient from '../GeneratorSoalClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolSchema from '@/components/seo/ToolSchema';
import SchemaMarkup from '@/components/shared/SchemaMarkup';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PSEO_DATA
    .filter((item) => item.toolId === 'generator-soal')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'generator-soal'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/generator-soal/${data.slug}` },
  };
}

export default function GeneratorSoalPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'generator-soal'
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
      <ToolSchema toolId="generator-soal" />
      <SchemaMarkup schema={schema} />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <GeneratorSoalClient />

      {/* Konten Edukatif Semantik (Pencegah Thin Content) */}
      <div 
        className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs"
        dangerouslySetInnerHTML={{ __html: data.explanation }} 
      />

      <div className="max-w-4xl mt-14">
        <RelatedTools toolIds={["simulasi-utbk", "rangkuman", "math-solver"]} />

        <FAQAccordion
          title={`FAQ: ${data.h1}`}
          description="Pertanyaan umum seputar bank soal dan simulasi latihan evaluasi mandiri."
          faqs={[
            {
              question: 'Apakah soal yang dihasilkan disertai kunci jawaban dan pembahasan?',
              answer: (
                <p>
                  Ya, seluruh paket soal pilihan ganda maupun esai yang digenerate AI TugasMu dilengkapi kunci jawaban definitif dan pembahasan langkah demi langkah agar siswa memahami konsep dasar materi.
                </p>
              )
            },
            {
              question: 'Apakah soal ini sesuai dengan Kurikulum Merdeka?',
              answer: (
                <p>
                  Format soal disesuaikan dengan Capaian Pembelajaran (CP) dan indikator asesmen Kurikulum Merdeka serta AKM Pusat Asesmen Pendidikan Kemendikbudristek.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

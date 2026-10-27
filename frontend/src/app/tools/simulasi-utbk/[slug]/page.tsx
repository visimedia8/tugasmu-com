import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import SimulasiUTBKClient from '../SimulasiUTBKClient';
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
    .filter((item) => item.toolId === 'simulasi-utbk')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'simulasi-utbk'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/simulasi-utbk/${data.slug}` },
  };
}

export default function SimulasiUtbkPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'simulasi-utbk'
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
      <ToolSchema toolId="simulasi-utbk" />
      <SchemaMarkup schema={schema} />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <SimulasiUTBKClient />

      <div 
        className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs"
        dangerouslySetInnerHTML={{ __html: data.explanation }} 
      />

      <div className="max-w-4xl mt-14">
        <SiblingSpokes toolId={data.toolId} currentSlug={data.slug} />
        <RelatedTools toolIds={["generator-soal", "rangkuman", "math-solver"]} />

        <FAQAccordion
          title={`FAQ: ${data.h1}`}
          description="Pertanyaan seputar persiapan dan strategi menaklukkan soal seleksi nasional UTBK SNBT."
          faqs={[
            {
              question: "Apakah tipe soal diperbarui sesuai kisi-kisi BP3 terbaru?",
              answer: (
                <p>
                  Ya, simulator kami mengadopsi standar soal Tes Potensi Skolastik (TPS) dan Literasi terbaru yang menitikberatkan pada nalar logis, pemahaman wacana kritis, dan penalaran kuantitatif.
                </p>
              )
            },
            {
              question: "Apakah pembahasan soal disertai rumus cepat eliminasi pilihan ganda?",
              answer: (
                <p>
                  Setiap kunci jawaban dilengkapi pembahasan konsep fundamental serta trik eliminasi pilihan ganda (*distractor analysis*) agar kamu dapat menghemat waktu saat hari ujian.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

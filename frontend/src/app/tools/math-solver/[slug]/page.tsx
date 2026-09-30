import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import MathSolverClient from '../MathSolverClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolSchema from '@/components/seo/ToolSchema';
import SchemaMarkup from '@/components/shared/SchemaMarkup';

interface PageProps {
  params: { slug: string };
}

// 1. Generate Static Params for build time SSG
export function generateStaticParams() {
  return PSEO_DATA
    .filter((item) => item.toolId === 'math-solver')
    .map((item) => ({
      slug: item.slug,
    }));
}

// 2. Generate Dynamic Metadata
export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'math-solver'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/math-solver/${data.slug}` },
  };
}

// 3. Render the Page
export default function MathSolverPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'math-solver'
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
      <ToolSchema toolId="math-solver" />
      <SchemaMarkup schema={schema} />
      
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <MathSolverClient initialSoal={data.initialPrompt} />

      {/* Teks Unik untuk mencegah Thin Content (SEO) */}
      <div className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800"
           dangerouslySetInnerHTML={{ __html: data.explanation }} />

      <RelatedTools toolIds={["generator-soal","rangkuman","simulasi-utbk"]} />

      <FAQAccordion
        title={`FAQ: ${data.h1}`}
        description="Pertanyaan umum seputar penggunaan tool matematika kami."
        faqs={[
          {
            question: 'Apakah hasil perhitungan ini dijamin akurat?',
            answer: (
              <p>
                Ya, AI kami dirancang menggunakan model reasoning khusus yang memecah soal matematika menjadi langkah-langkah logis, dari rumus hingga hasil akhir. Namun, kami selalu menyarankan kamu untuk membaca alasannya agar benar-benar paham.
              </p>
            )
          },
          {
            question: 'Apakah tool ini gratis untuk digunakan pelajar?',
            answer: (
              <p>
                Tentu saja! TugasMu menyediakan akses gratis dengan kuota harian. Cukup <em>login</em> untuk menyimpan riwayat pertanyaanmu.
              </p>
            )
          }
        ]}
      />
    </div>
  );
}

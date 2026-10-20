import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import CVLamaranClient from '../CVLamaranClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolSchema from '@/components/seo/ToolSchema';
import SchemaMarkup from '@/components/shared/SchemaMarkup';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PSEO_DATA
    .filter((item) => item.toolId === 'cv-lamaran')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'cv-lamaran'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/cv-lamaran/${data.slug}` },
  };
}

export default function CvLamaranPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'cv-lamaran'
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
      <ToolSchema toolId="cv-lamaran" />
      <SchemaMarkup schema={schema} />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <CVLamaranClient />

      <div 
        className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs"
        dangerouslySetInnerHTML={{ __html: data.explanation }} 
      />

      <div className="max-w-4xl mt-14">
        <RelatedTools toolIds={["laporan-pkl", "proposal-usaha", "pidato"]} />

        <FAQAccordion
          title={`FAQ: ${data.h1}`}
          description="Pertanyaan umum seputar pembuatan resume ATS dan surat permohonan kerja/magang."
          faqs={[
            {
              question: 'Apakah format ini benar-benar lolos sistem ATS HRD?',
              answer: (
                <p>
                  Ya, teks yang dihasilkan menggunakan struktur satu kolom, heading standar yang jelas, tanpa tabel bertumpuk atau grafik rumit yang sering memicu error pada algoritma sistem penyaring ATS.
                </p>
              )
            },
            {
              question: 'Bagaimana jika saya belum memiliki pengalaman kerja sama sekali?',
              answer: (
                <p>
                  AI akan secara otomatis memfokuskan sorotan pada pengalaman Praktik Kerja Lapangan (PKL), kepanitiaan organisasi sekolah, serta keahlian teknis (hard skills) yang relevan dengan posisi yang kamu lamar.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

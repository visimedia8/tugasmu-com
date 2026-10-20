import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import LaporanPKLClient from '../LaporanPKLClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolSchema from '@/components/seo/ToolSchema';
import SchemaMarkup from '@/components/shared/SchemaMarkup';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PSEO_DATA
    .filter((item) => item.toolId === 'laporan-pkl')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'laporan-pkl'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/laporan-pkl/${data.slug}` },
  };
}

export default function LaporanPklPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'laporan-pkl'
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
      <ToolSchema toolId="laporan-pkl" />
      <SchemaMarkup schema={schema} />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <LaporanPKLClient />

      {/* Konten Edukatif Semantik (Pencegah Thin Content) */}
      <div 
        className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs"
        dangerouslySetInnerHTML={{ __html: data.explanation }} 
      />

      <div className="max-w-4xl mt-14">
        <RelatedTools toolIds={["cv-lamaran", "makalah-builder", "kti-builder"]} />

        <FAQAccordion
          title={`FAQ: ${data.h1}`}
          description="Pertanyaan seputar panduan penyusunan dan pengesahan laporan PKL industri."
          faqs={[
            {
              question: 'Apakah struktur laporan ini sesuai dengan format resmi SMK?',
              answer: (
                <p>
                  Ya, struktur yang dihasilkan mengikuti format baku buku pedoman PKL SMK Kemendikbudristek: Bab I Pendahuluan, Bab II Gambaran Umum Perusahaan, Bab III Pelaksanaan Kerja, dan Bab IV Penutup.
                </p>
              )
            },
            {
              question: 'Bisa langsung diunduh ke Microsoft Word?',
              answer: (
                <p>
                  Tentu, kamu bisa menyalin draft hasil generasi AI atau mengekspor teksnya langsung ke aplikasi pengolah kata favoritmu untuk ditambahkan lembar pengesahan tanda tangan pembimbing industri.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

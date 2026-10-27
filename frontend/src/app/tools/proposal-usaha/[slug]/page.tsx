import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import ProposalUsahaClient from '../ProposalUsahaClient';
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
    .filter((item) => item.toolId === 'proposal-usaha')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'proposal-usaha'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/proposal-usaha/${data.slug}` },
  };
}

export default function ProposalUsahaPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'proposal-usaha'
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
      <ToolSchema toolId="proposal-usaha" />
      <SchemaMarkup schema={schema} />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <ProposalUsahaClient />

      {/* Konten Edukatif Semantik (Pencegah Thin Content) */}
      <div 
        className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs"
        dangerouslySetInnerHTML={{ __html: data.explanation }} 
      />

      <div className="max-w-4xl mt-14">
        <SiblingSpokes toolId={data.toolId} currentSlug={data.slug} />
        <RelatedTools toolIds={["laporan-pkl", "akuntansi-solver", "makalah-builder"]} />

        <FAQAccordion
          title={`FAQ: ${data.h1}`}
          description="Pertanyaan umum seputar penyusunan proposal bisnis dan rencana anggaran kewirausahaan."
          faqs={[
            {
              question: "Apakah analisis SWOT dan RAB yang dihasilkan cocok untuk tugas sekolah?",
              answer: (
                <p>
                  Ya, draf proposal dirancang spesifik untuk memenuhi rubrik penilaian mata pelajaran Produk Kreatif dan Kewirausahaan (PKK) SMK maupun Prakarya dan Kewirausahaan (PKWU) SMA.
                </p>
              )
            },
            {
              question: "Bagaimana cara menentukan harga jual produk?",
              answer: (
                <p>
                  Hitung seluruh Total Biaya (Biaya Tetap + Biaya Variabel), bagi dengan jumlah unit produksi untuk memperoleh Harga Pokok Produksi (HPP), lalu tambahkan persentase margin keuntungan yang diinginkan.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

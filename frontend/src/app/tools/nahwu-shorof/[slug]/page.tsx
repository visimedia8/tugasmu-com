/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import NahwuShorofClient from '../NahwuShorofClient';
import PseoSolutionSection from '@/components/tools/PseoSolutionSection';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import RelatedBlogArticles from '@/components/tools/RelatedBlogArticles';

import SiblingSpokes from '@/components/tools/SiblingSpokes';
import ToolSchema from '@/components/seo/ToolSchema';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PSEO_DATA
    .filter((item) => item.toolId === 'nahwu-shorof')
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'nahwu-shorof'
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/nahwu-shorof/${data.slug}` },
  };
}

export default function NahwuShorofPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && item.toolId === 'nahwu-shorof'
  );

  if (!data) {
    notFound();
  }

  return (
    <div className="container py-8 md:py-12 max-w-5xl mx-auto px-4">
      <ToolSchema toolId={data.toolId} slug={data.slug} name={data.title} description={data.description} />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <NahwuShorofClient initialPrompt={data.initialPrompt} />

      
      {/* Solusi Interaktif Terverifikasi & Schema HowTo (Anti-Doorway Thick Content) */}
      <PseoSolutionSection
        toolId={data.toolId}
        title={data.title}
        initialPrompt={data.initialPrompt}
        solution={data.solution}
      />

      {/* Konten Edukatif Semantik (Pencegah Thin Content) */}
      <div 
        className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs"
        dangerouslySetInnerHTML={{ __html: data.explanation }} 
      />

      <div className="max-w-4xl mt-14">
        <SiblingSpokes toolId={data.toolId} currentSlug={data.slug} />
        <RelatedTools toolIds={["tajwid", "translator-arab", "kitab-kuning"]} />
        <RelatedBlogArticles kategori="agama" categoryLabel="Kaidah Bahasa Arab & Agama" />


        <FAQAccordion
          title={`FAQ: ${data.h1}`}
          description="Pertanyaan umum seputar kaidah gramatika bahasa Arab, tashrif istilahi, pembagian i'rab, dan tarkib kalimat."
          faqs={[
            {
              question: "Apakah alat ini bisa membedah i\\'rab kalimat Arab gundul (tanpa harakat)?",
              answer: (
                <p>
                  Bisa. Algoritma AI TugasMu mampu mengidentifikasi pola morfologi (wazan) dan konteks sintaksis kalimat untuk membedah amil, ma'mul, serta harakat akhirnya secara sistematis.
                </p>
              )
            },
            {
              question: "Apakah penjelasan i\\'rab sesuai dengan kitab Al-Jurumiyyah?",
              answer: (
                <p>
                  Ya, terminologi dan klasifikasi i'rab mengacu pada standar Matan Al-Jurumiyyah dan Alfiyyah Ibnu Malik yang menjadi kurikulum utama di pesantren dan madrasah aliyah di Indonesia.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import GrammarCheckerClient from '../GrammarCheckerClient';
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
    .filter((item) => (item.toolId === 'grammar-bahasa-inggris' || item.toolId === 'grammar-checker'))
    .map((item) => ({
      slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && (item.toolId === 'grammar-bahasa-inggris' || item.toolId === 'grammar-checker')
  );

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/tools/grammar-bahasa-inggris/${data.slug}` },
  };
}

export default function GrammarCheckerPseoPage({ params }: PageProps) {
  const data = PSEO_DATA.find(
    (item) => item.slug === params.slug && (item.toolId === 'grammar-bahasa-inggris' || item.toolId === 'grammar-checker')
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
      <ToolSchema toolId="grammar-bahasa-inggris" />
      <SchemaMarkup schema={schema} />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          {data.h1}
        </h1>
        <p className="text-slate-600 text-lg">
          {data.subtitle}
        </p>
      </div>

      <GrammarCheckerClient initialPrompt={data.initialPrompt} />

      {/* Konten Edukatif Semantik (Pencegah Thin Content) */}
      <div 
        className="mt-12 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs"
        dangerouslySetInnerHTML={{ __html: data.explanation }} 
      />

      <div className="max-w-4xl mt-14">
        <SiblingSpokes toolId={data.toolId} currentSlug={data.slug} />
        <RelatedTools toolIds={["essay-english", "grammar-bahasa-indonesia", "parafrase"]} />

        <FAQAccordion
          title="English Grammar & Syntax Correction"
          description="Pertanyaan umum siswa seputar materi, rumus kaidah dasar, dan cara penyelesaian tugas."
          faqs={[
            {
              question: "Does this tool explain why a sentence is incorrect?",
              answer: (
                <p>
                  Yes. Beyond fixing typos and grammatical mistakes, the tool explains the underlying grammar rules (such as subject-verb agreement or tense consistency) so students learn from their errors.
                </p>
              )
            },
            {
              question: "Can it detect complex clause errors?",
              answer: (
                <p>
                  It detects run-on sentences, comma splices, misplaced modifiers, and preposition errors across all academic writing levels.
                </p>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

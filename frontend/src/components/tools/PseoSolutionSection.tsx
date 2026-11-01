import React from 'react';
import Link from 'next/link';
import { TOOL_TO_KAMUS_CONCEPTS } from '@/lib/seo/semantic-mesh';

export interface SolutionStep {
  name: string;
  text: string;
}

export interface PseoSolution {
  steps: SolutionStep[];
  result: string;
  tips?: string;
}

interface PseoSolutionSectionProps {
  toolId: string;
  title: string;
  initialPrompt: string;
  solution?: PseoSolution;
}

export default function PseoSolutionSection({
  toolId,
  title,
  initialPrompt,
  solution,
}: PseoSolutionSectionProps) {
  if (!solution || !solution.steps || solution.steps.length === 0) {
    return null;
  }

  const concepts = TOOL_TO_KAMUS_CONCEPTS[toolId] || [];

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: `Panduan dan langkah penyelesaian lengkap untuk: ${initialPrompt}`,
    step: solution.steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.name,
      itemListElement: [
        {
          '@type': 'HowToDirection',
          text: step.text,
        },
      ],
    })),
  };

  return (
    <section className="my-10 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8">
      {/* Structured Data HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
            ✓
          </span>
          <h2 className="text-xl md:text-2xl font-heading font-bold text-slate-900">
            Langkah Penyelesaian Lengkap (Contoh Kasus)
          </h2>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          Terverifikasi Edukasi
        </span>
      </div>

      {/* Soal / Kasus Input */}
      <div className="p-4 md:p-5 rounded-2xl bg-surface-container-low border border-slate-200/70 mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          Soal / Studi Kasus:
        </p>
        <p className="text-slate-800 font-medium text-base leading-relaxed">
          &ldquo;{initialPrompt}&rdquo;
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-4 mb-6">
        {solution.steps.map((step, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-brand-navy text-white font-bold flex items-center justify-center shrink-0 text-xs">
              {idx + 1}
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">{step.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hasil Akhir */}
      <div className="p-4 md:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            Kesimpulan & Hasil Akhir:
          </span>
          <p className="text-emerald-950 font-bold text-lg md:text-xl mt-0.5">
            {solution.result}
          </p>
        </div>
      </div>

      {/* Tips Tambahan jika ada */}
      {solution.tips && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-900 text-xs md:text-sm">
          <span className="shrink-0 font-bold">💡 Tips Kakak Kelas:</span>
          <span>{solution.tips}</span>
        </div>
      )}

      {/* Konsep Terkait di Glosarium (Semantic Mesh Bridge) */}
      {concepts.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1.5">
              <span>📚</span> Konsep Terkait di Glosarium:
            </span>
            {concepts.map((concept) => (
              <Link
                key={concept.slug}
                href={`/kamus/${concept.slug}`}
                className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-primary/10 text-slate-700 hover:text-primary border border-slate-200/60 hover:border-primary/20 transition-all"
              >
                {concept.title} →
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

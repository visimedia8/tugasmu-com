import React from 'react';
import Link from 'next/link';
import { PSEO_DATA } from '@/lib/seo/pseo-data';

interface SiblingSpokesProps {
  toolId: string;
  currentSlug?: string;
  title?: string;
  description?: string;
}

export default function SiblingSpokes({
  toolId,
  currentSlug = '',
  title = "Panduan & Contoh Terkait Lainnya",
  description = "Eksplorasi materi, rumus, dan panduan belajar lainnya yang relevan dengan topik ini:"
}: SiblingSpokesProps) {
  // Normalize alias tool IDs if applicable
  const siblings = PSEO_DATA.filter((item) => {
    const isMatchingTool = item.toolId === toolId ||
      (toolId === 'grammar-bahasa-inggris' && item.toolId === 'grammar-checker') ||
      (toolId === 'grammar-checker' && item.toolId === 'grammar-bahasa-inggris') ||
      (toolId === 'grammar-bahasa-indonesia' && item.toolId === 'grammar-eyd') ||
      (toolId === 'grammar-eyd' && item.toolId === 'grammar-bahasa-indonesia');

    return isMatchingTool && item.slug !== currentSlug;
  });

  if (siblings.length === 0) return null;

  return (
    <div className="mt-12 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs">
      <div className="mb-6">
        <h2 className="text-2xl font-heading font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-brand-sky text-[26px]">menu_book</span>
          {title}
        </h2>
        <p className="text-slate-600 text-sm md:text-base">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {siblings.map((spoke) => (
          <Link
            key={spoke.slug}
            href={`/tools/${spoke.toolId}/${spoke.slug}`}
            className="group flex flex-col p-5 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-brand-sky/40 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-sky mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-sky"></span>
              <span>Panduan Solusi</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-sky transition-colors line-clamp-2 mb-2">
              {spoke.h1}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
              {spoke.subtitle}
            </p>
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-brand-sky mt-auto pt-2 border-t border-slate-200/60">
              <span>Pelajari Konsep</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

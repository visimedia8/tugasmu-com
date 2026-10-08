import React from 'react';
import Link from 'next/link';
import { TOOLS } from '@/data/tools';

interface RelatedToolsProps {
  toolIds: string[];
}

export default function RelatedTools({ toolIds }: RelatedToolsProps) {
  const relatedTools = toolIds
    .map(id => TOOLS.find(t => t.id === id))
    .filter((t): t is typeof TOOLS[0] => t !== undefined);

  if (relatedTools.length === 0) return null;

  return (
    <div className="mt-16 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-12">
      <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-brand-sky text-[28px]">assistant</span>
        Tools Terkait (Langkah Selanjutnya)
      </h2>
      <p className="text-slate-600 text-base mb-8">
        Setelah selesai menggunakan alat ini, tugas kamu mungkin akan lebih sempurna jika dilanjutkan dengan asisten AI berikut:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {relatedTools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group flex flex-col p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-brand-sky/40 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4 mb-3">
              <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-colors shadow-sm bg-white border border-slate-100 ${tool.colorClass}`}>
                <span className="material-symbols-outlined text-[24px]">{tool.icon}</span>
              </div>
              <h3 className="text-base text-slate-900 font-semibold group-hover:text-brand-sky transition-colors line-clamp-2 mt-0.5">
                {tool.name}
              </h3>
            </div>
            <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-grow">
              {tool.description}
            </p>
            <div className="inline-flex items-center gap-1.5 text-brand-sky font-semibold text-sm mt-auto">
              <span>Gunakan Tool</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

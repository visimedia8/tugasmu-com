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
    <div className="mt-16 bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-on-surface mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-[28px]">assistant</span>
        Tools Terkait (Langkah Selanjutnya)
      </h2>
      <p className="text-on-surface-variant text-base mb-6 font-body-md">
        Setelah selesai menggunakan alat ini, tugas kamu mungkin akan lebih sempurna jika dilanjutkan dengan asisten AI berikut:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group flex flex-col p-5 rounded-2xl border border-outline-variant bg-surface-container-lowest hover:border-primary/50 hover:shadow-md hover:bg-surface-container-low transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm ${tool.colorClass}`}>
                <span className="material-symbols-outlined text-[20px]">{tool.icon}</span>
              </div>
              <h3 className="font-label-lg text-label-lg text-on-surface font-bold group-hover:text-primary transition-colors line-clamp-1">
                {tool.name}
              </h3>
            </div>
            <p className="text-sm font-body-sm text-on-surface-variant line-clamp-2 mb-4 flex-grow">
              {tool.description}
            </p>
            <div className="inline-flex items-center gap-1.5 text-primary font-label-sm text-label-sm mt-auto">
              <span>Gunakan Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

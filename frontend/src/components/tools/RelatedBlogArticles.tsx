import React from 'react';
import Link from 'next/link';
import { getPostsByCategory } from '@/lib/mdx';

interface RelatedBlogArticlesProps {
  kategori: string;
  categoryLabel?: string;
  title?: string;
  description?: string;
  limit?: number;
}

export default function RelatedBlogArticles({
  kategori,
  categoryLabel,
  title = 'Panduan Materi & Konsep Pelajaran Terkait',
  description = 'Pelajari teori dasar, aturan tata bahasa, atau rumus lengkap materi ini:',
  limit = 3,
}: RelatedBlogArticlesProps) {
  const posts = getPostsByCategory(kategori, limit);

  if (posts.length === 0) return null;

  const displayCategory = categoryLabel || kategori.replace(/-/g, ' ');

  return (
    <div className="mt-12 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>Klaster Materi: {displayCategory}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-heading font-bold text-slate-900">
            {title}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {description}
          </p>
        </div>
        <Link
          href={`/blog/${kategori}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700 hover:underline shrink-0 self-start sm:self-auto"
        >
          <span>Buka Semua Materi</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.kategori}/${post.slug}`}
            className="group flex flex-col p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-sky-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>
                {new Date(post.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
              {post.description}
            </p>
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 group-hover:text-sky-700 mt-auto">
              <span>Baca Panduan</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

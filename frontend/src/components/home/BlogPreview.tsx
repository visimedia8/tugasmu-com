import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default function BlogPreview() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <section className="py-16 bg-slate-50">
      <div className="container">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Artikel Terbaru</h2>
            <p className="text-slate-600">Panduan materi dan tips belajar untukmu.</p>
          </div>
          <Link href="/blog" className="hidden md:block text-sky-600 font-medium hover:text-sky-700">
            Lihat Semua Artikel →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.kategori}/${post.slug}`}
              className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2 block">
                  {post.kategori.replace(/-/g, ' ')}
                </span>
                <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600">
                <span>Baca Selengkapnya</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="text-sky-600 font-medium hover:text-sky-700">
            Lihat Semua Artikel →
          </Link>
        </div>
      </div>
    </section>
  );
}

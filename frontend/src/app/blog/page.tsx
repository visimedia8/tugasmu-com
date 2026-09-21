import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export const metadata = {
  title: 'Blog Edukasi | TugasMu',
  description: 'Artikel, panduan, dan tips belajar untuk siswa Indonesia.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-slate-900 mb-8">Blog Edukasi</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link href={`/blog/${post.kategori}/${post.slug}`} key={post.slug} className="block group">
            <article className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-2 block">
                {post.kategori.replace('-', ' ')}
              </span>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-slate-600 line-clamp-2">
                {post.description}
              </p>
              <div className="mt-4 text-sm text-slate-400">
                {new Date(post.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-slate-500">Belum ada artikel saat ini.</p>
      )}
    </main>
  );
}

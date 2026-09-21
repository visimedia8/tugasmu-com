import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllCategories, getPostSlugs, getPostBySlug } from '@/lib/mdx';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ kategori: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Artikel ${resolvedParams.kategori.replace('-', ' ')} | TugasMu`,
    description: `Kumpulan artikel dan panduan belajar untuk materi ${resolvedParams.kategori.replace('-', ' ')}.`,
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((kategori) => ({
    kategori,
  }));
}

export default async function BlogCategory({ params }: Props) {
  const resolvedParams = await params;
  const categories = getAllCategories();
  
  if (!categories.includes(resolvedParams.kategori)) {
    notFound();
  }

  const slugs = getPostSlugs(resolvedParams.kategori);
  const posts = slugs.map(slug => getPostBySlug(resolvedParams.kategori, slug)).filter(Boolean) as import('@/lib/mdx').BlogPost[];

  // Filter drafts in production
  const visiblePosts = posts.filter((post) => {
    if (process.env.NODE_ENV === 'production') {
      if (post.draft) return false;
      if (new Date(post.date) > new Date()) return false;
    }
    return true;
  }).sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return (
    <main className="container py-12 max-w-4xl mx-auto">
      <nav className="mb-8 text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
          <li>/</li>
          <li><Link href="/blog" className="hover:text-slate-900">Blog</Link></li>
          <li>/</li>
          <li className="capitalize text-slate-900">{resolvedParams.kategori.replace('-', ' ')}</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-heading font-bold text-slate-900 mb-8 capitalize">
        Materi: {resolvedParams.kategori.replace('-', ' ')}
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {visiblePosts.map((post) => (
          <Link href={`/blog/${post.kategori}/${post.slug}`} key={post.slug} className="block group">
            <article className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
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

      {visiblePosts.length === 0 && (
        <p className="text-slate-500">Belum ada artikel di kategori ini.</p>
      )}
    </main>
  );
}

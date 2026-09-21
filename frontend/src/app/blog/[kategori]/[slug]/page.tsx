import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs, getAllCategories } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ kategori: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.kategori, resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${post.title} | TugasMu`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  const paths: { kategori: string; slug: string }[] = [];

  categories.forEach((kategori) => {
    const slugs = getPostSlugs(kategori);
    slugs.forEach((slug) => {
      paths.push({
        kategori,
        slug: slug.replace(/\.mdx$/, ''),
      });
    });
  });

  return paths;
}

const components = {
  // Custom components for MDX can be added here
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link href={props.href as string} {...props}>
      {props.children}
    </Link>
  ),
};

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.kategori, resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container py-12 max-w-3xl mx-auto">
      <nav className="mb-8 text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
          <li>/</li>
          <li><Link href="/blog" className="hover:text-slate-900">Blog</Link></li>
          <li>/</li>
          <li className="capitalize"><Link href={`/blog/${resolvedParams.kategori}`} className="hover:text-slate-900">{resolvedParams.kategori.replace('-', ' ')}</Link></li>
          <li>/</li>
          <li className="text-slate-900 truncate">{post.title}</li>
        </ol>
      </nav>

      <article>
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">{post.title}</h1>
          <time dateTime={post.date} className="text-slate-500">
            {new Date(post.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </time>
        </header>

        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600 hover:prose-a:text-sky-700">
          <MDXRemote source={post.content} components={components} />
        </div>
      </article>
      
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.description,
            "datePublished": post.date,
            "author": {
              "@type": "Organization",
              "name": "TugasMu"
            }
          })
        }}
      />
    </main>
  );
}

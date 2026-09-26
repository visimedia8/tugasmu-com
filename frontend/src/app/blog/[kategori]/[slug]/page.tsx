import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs, getAllCategories, getAllPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

type Props = {
  params: Promise<{ kategori: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
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
    alternates: {
      canonical: `/blog/${resolvedParams.kategori}/${resolvedParams.slug}`,
    },
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
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link href={props.href as string} {...props}>
      {props.children}
    </Link>
  ),
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-space-lg leading-tight" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-space-lg mb-space-sm" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-space-md mb-space-sm" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md" {...props} />,
};

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.kategori, resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, exclude current)
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.kategori === resolvedParams.kategori && p.slug !== resolvedParams.slug)
    .slice(0, 3);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-desktop py-space-lg md:py-space-xl">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm mb-space-lg overflow-x-auto whitespace-nowrap scrollbar-none">
        <Link className="hover:text-primary transition-colors flex items-center gap-1" href="/">
          <span className="material-symbols-outlined text-[16px]">home</span>
          <span>Home</span>
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <Link className="hover:text-primary transition-colors" href="/blog">Blog</Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <Link className="hover:text-primary transition-colors capitalize" href={`/blog/${resolvedParams.kategori}`}>
          {resolvedParams.kategori.replace('-', ' ')}
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <span className="text-primary truncate max-w-[200px] md:max-w-none font-medium">{post.title}</span>
      </nav>

      {/* Layout Grid: Left Content Column + Right Sticky Utility Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Left Column: Main Article Body */}
        <article className="lg:col-span-8 flex flex-col">
          {/* Category Pill & Estimated Speed Read */}
          <div className="flex flex-wrap items-center gap-space-sm mb-space-md">
            <span className="px-space-md py-1 rounded-xl bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm tracking-wide uppercase">
              {resolvedParams.kategori.replace('-', ' ')}
            </span>
            <span className="px-space-md py-1 rounded-xl bg-surface-container text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
              5 menit baca
            </span>
          </div>

          <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface tracking-tight mb-space-lg leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md p-space-md md:p-space-lg rounded-xl bg-surface-container-low mb-space-xl border border-slate-100">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary font-headline-sm text-headline-sm flex items-center justify-center font-bold shadow-sm ring-2 ring-primary-fixed">
                TM
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-label-lg text-label-lg text-on-surface font-bold">Tim Kurasi TugasMu</span>
                  <span className="material-symbols-outlined text-primary text-[16px]" title="Terverifikasi">verified</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Diterbitkan pada {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-space-xs sm:pt-0">
              <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-secondary font-label-md text-label-md transition-all shadow-sm">
                <span className="material-symbols-outlined text-[18px]">share</span>
                <span className="hidden sm:inline">Bagikan</span>
              </button>
            </div>
          </div>

          <div className="prose-content flex flex-col gap-space-lg text-on-surface font-body-lg text-body-lg leading-relaxed bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm border border-slate-100">
            <MDXRemote source={post.content} components={components} />
          </div>

          <section className="mt-space-xl p-space-lg md:p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-space-lg border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-lg text-headline-lg font-bold shrink-0 shadow-md ring-4 ring-primary-fixed">
              TM
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Redaksi TugasMu</h4>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm">
                  Tim Edukasi
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Tim kurator konten yang berdedikasi untuk membagikan tips belajar, pembaruan kurikulum, dan cara cerdas memanfaatkan AI bagi pelajar Indonesia.
              </p>
            </div>
          </section>

          {relatedPosts.length > 0 && (
            <section className="mt-space-xl pt-space-xl border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-space-lg">
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">auto_stories</span>
                  Baca Juga di Kategori Ini
                </h3>
                <Link href={`/blog/${resolvedParams.kategori}`} className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container transition-colors">
                  <span>Lihat Semua {resolvedParams.kategori.replace('-', ' ')}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                {relatedPosts.map(rp => (
                  <Link key={rp.slug} href={`/blog/${rp.kategori}/${rp.slug}`} className="group p-space-md rounded-xl bg-surface-container-lowest border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-container transition-all">
                    <h4 className="font-label-lg text-label-lg text-on-surface font-bold group-hover:text-primary mb-1 line-clamp-2">{rp.title}</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{rp.description}</p>
                  </Link>
                ))}
              </div>
</section>
          )}
        </article>

        {/* Right Column */}
        <aside className="lg:col-span-4 flex flex-col gap-space-lg lg:sticky lg:top-24">
          <div className="p-space-lg rounded-xl bg-gradient-to-b from-surface-container to-surface-container-high shadow-sm flex flex-col gap-space-md border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Butuh Bantuan Tugas?</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Gunakan asisten AI TugasMu secara gratis. Buat soal, parafrase makalah, dan temukan jawaban dari PR-mu.
              </p>
            </div>
            <Link href="/tools" className="w-full inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary py-2.5 px-4 rounded-xl font-label-md text-label-md transition-all shadow-sm">
              <span>Buka Tools AI</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </aside>
      </div>

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
    </div>
  );
}

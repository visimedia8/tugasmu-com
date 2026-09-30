import { notFound } from 'next/navigation';
import { getKamusBySlug, getKamusSlugs } from '@/lib/kamus';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const entry = getKamusBySlug(resolvedParams.slug);
  
  if (!entry) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${entry.title} | Glosarium TugasMu`,
    description: entry.description,
    alternates: {
      canonical: `/kamus/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${entry.title} | Glosarium TugasMu`,
      description: entry.description,
      type: 'article',
      publishedTime: entry.date,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(entry.title)}&category=Glosarium`,
          width: 1200,
          height: 630,
          alt: entry.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getKamusSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export default async function KamusEntryPage({ params }: Props) {
  const resolvedParams = await params;
  const entry = getKamusBySlug(resolvedParams.slug);

  if (!entry) {
    notFound();
  }

  // Schema Markup for Dictionary/Definition (FAQ or Article)
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": entry.title,
    "description": entry.description,
    "inDefinedTermSet": "https://tugasmu.com/kamus"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-surface-container-lowest min-h-screen">
        {/* Navigation Breadcrumb */}
        <div className="bg-surface-container-lowest border-b border-surface-container/50 sticky top-[72px] z-30">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <Link 
              href="/kamus"
              className="inline-flex items-center gap-2 text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Glosarium
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
          <header className="mb-10">
            <h1 className="text-display-lg-mobile md:text-display-lg font-heading font-bold text-primary mb-4 leading-tight">
              {entry.title}
            </h1>
            <p className="text-headline-sm text-on-surface-variant leading-relaxed">
              {entry.description}
            </p>
          </header>

          <div className="prose prose-lg md:prose-xl prose-slate max-w-none 
            prose-headings:font-heading prose-headings:text-primary prose-headings:font-bold 
            prose-a:text-primary-container hover:prose-a:text-primary 
            prose-strong:text-on-surface prose-strong:font-bold
            prose-img:rounded-2xl prose-img:shadow-sm">
            <MDXRemote source={entry.content} />
          </div>
          
          {/* Internal Linking Bridge - Back to Main Tools */}
          <div className="mt-16 pt-8 border-t border-surface-container">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm">
              <h3 className="font-heading text-headline-sm font-bold text-primary mb-2">
                Pusing Ngerjain Tugas?
              </h3>
              <p className="text-body-md text-on-surface-variant mb-4">
                Biar AI TugasMu bantu jelasin materi dan bantu ngerjain tugas lo dengan cara yang pinter.
              </p>
              <Link href="/tools" className="inline-flex items-center justify-center bg-secondary hover:bg-secondary-fixed-dim text-on-secondary px-6 py-2.5 rounded-xl font-label-md transition-colors">
                Lihat Semua Tools AI
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

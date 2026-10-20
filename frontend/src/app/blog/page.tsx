import { getAllPosts } from '@/lib/mdx';
import BlogHubClient from './BlogHubClient';

export const metadata = {
  title: 'Blog Edukasi & Panduan Materi Siswa',
  description: 'Kumpulan panduan belajar, rumus pelajaran, tata bahasa PUEBI, dan tips menyelesaikan tugas sekolah untuk siswa Indonesia.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog Edukasi & Panduan Materi Siswa | TugasMu',
    description: 'Kumpulan artikel dan panduan belajar untuk siswa Indonesia.',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Blog%20Edukasi%20TugasMu&category=Pusat%20Artikel',
        width: 1200,
        height: 630,
        alt: 'Blog Edukasi TugasMu',
      },
    ],
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  
  // Sort posts by date, newest first and strip full content/html to keep SSR payload ultra-light (<60KB vs 5MB)
  const sortedPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(({ slug, title, description, date, kategori }) => ({
      slug,
      title,
      description,
      date,
      kategori,
    }));

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Edukasi TugasMu",
    "description": "Kumpulan panduan, materi pelajaran, dan tips belajar siswa SD, SMP, SMA/SMK di Indonesia.",
    "url": "https://tugasmu.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "TugasMu",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tugasmu.com/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogHubClient posts={sortedPosts} />
    </>
  );
}

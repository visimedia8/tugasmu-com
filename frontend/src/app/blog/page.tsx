import { getAllPosts } from '@/lib/mdx';
import BlogHubClient from './BlogHubClient';

export const metadata = {
  title: 'Blog Edukasi | TugasMu',
  description: 'Artikel, panduan, dan tips belajar untuk siswa Indonesia.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  
  // Sort posts by date, newest first
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return <BlogHubClient posts={sortedPosts} />;
}

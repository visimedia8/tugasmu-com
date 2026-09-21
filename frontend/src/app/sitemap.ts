import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tugasmu.com';
  
  // Static routes
  const staticRoutes = [
    '',
    '/tools',
    '/tools/parafrase',
    '/tools/generator-soal',
    '/tools/rangkuman',
    '/tools/pantun-puisi',
    '/blog',
    '/tentang',
    '/kontak',
    '/privasi',
    '/syarat',
    '/guru'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route.startsWith('/tools') ? 1.0 : 0.8,
  }));

  // Dynamic blog routes
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.kategori}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}

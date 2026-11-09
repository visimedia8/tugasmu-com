import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { getAllKamus } from '@/lib/kamus';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import { TOOLS } from '@/data/tools';

export const revalidate = 86400; // Cache sitemap for 24 hours

export async function generateSitemaps() {
  return [
    { id: 'main' },
    { id: 'kamus' },
    { id: 'blog' },
    { id: 'spokes' },
  ];
}

export default async function sitemap({ id }: { id?: string }): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tugasmu.com';
  const CORE_UPDATE_DATE = new Date('2026-11-02T00:00:00.000Z');
  const SPOKE_UPDATE_DATE = new Date('2026-11-01T00:00:00.000Z');

  // 1. MAIN SITEMAP (id === 'main'): Core Pages, Hub Tools, & Category Hubs (55 URLs)
  if (id === 'main') {
    const coreRoutes = [
      { path: '', priority: 1.0, freq: 'daily' as const },
      { path: '/tools', priority: 0.9, freq: 'weekly' as const },
      { path: '/harga', priority: 0.9, freq: 'weekly' as const },
      { path: '/kamus', priority: 0.9, freq: 'daily' as const },
      { path: '/blog', priority: 0.9, freq: 'daily' as const },
      { path: '/tentang', priority: 0.5, freq: 'monthly' as const },
      { path: '/redaksi', priority: 0.7, freq: 'monthly' as const },
      { path: '/kebijakan-editorial', priority: 0.6, freq: 'monthly' as const },
      { path: '/peta-situs', priority: 0.7, freq: 'weekly' as const },
      { path: '/kontak', priority: 0.5, freq: 'monthly' as const },
      { path: '/privasi', priority: 0.3, freq: 'monthly' as const },
      { path: '/syarat', priority: 0.3, freq: 'monthly' as const },
      { path: '/guru', priority: 0.6, freq: 'monthly' as const },
    ].map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: CORE_UPDATE_DATE,
      changeFrequency: route.freq,
      priority: route.priority,
    }));

    const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
      url: `${baseUrl}${tool.href}`,
      lastModified: CORE_UPDATE_DATE,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    let categoryRoutes: MetadataRoute.Sitemap = [];
    try {
      const categories = getAllCategories();
      categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}/blog/${cat}`,
        lastModified: CORE_UPDATE_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    } catch (error) {
      console.error('Error generating category sitemap:', error);
    }

    return [...coreRoutes, ...toolRoutes, ...categoryRoutes];
  }

  // 2. KAMUS SITEMAP (id === 'kamus'): 100 Educational Glossary Terms
  if (id === 'kamus') {
    try {
      const kamusEntries = getAllKamus();
      return kamusEntries.map((entry) => ({
        url: `${baseUrl}/kamus/${entry.slug}`,
        lastModified: new Date(entry.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }));
    } catch (error) {
      console.error('Error generating kamus sitemap:', error);
      return [];
    }
  }

  // 3. BLOG SITEMAP (id === 'blog'): 230 Pillar Articles
  if (id === 'blog') {
    try {
      const posts = getAllPosts();
      return posts.map((post) => ({
        url: `${baseUrl}/blog/${post.kategori}/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }));
    } catch (error) {
      console.error('Error generating blog sitemap:', error);
      return [];
    }
  }

  // 4. SPOKES SITEMAP (id === 'spokes'): 290 PSEO Practice Case Pages
  if (id === 'spokes') {
    return PSEO_DATA.map((item) => ({
      url: `${baseUrl}/tools/${item.toolId}/${item.slug}`,
      lastModified: SPOKE_UPDATE_DATE,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  }

  // Fallback if id is not provided
  return [
    {
      url: `${baseUrl}`,
      lastModified: CORE_UPDATE_DATE,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];
}

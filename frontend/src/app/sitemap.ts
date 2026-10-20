import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { getAllKamus } from '@/lib/kamus';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import { TOOLS } from '@/data/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tugasmu.com';
  
  // Core routes
  const coreRoutes = [
    { path: '', priority: 1.0, freq: 'daily' as const },
    { path: '/tools', priority: 0.9, freq: 'weekly' as const },
    { path: '/harga', priority: 0.9, freq: 'weekly' as const },
    { path: '/kamus', priority: 0.8, freq: 'weekly' as const },
    { path: '/blog', priority: 0.8, freq: 'daily' as const },
    { path: '/tentang', priority: 0.5, freq: 'monthly' as const },
    { path: '/redaksi', priority: 0.7, freq: 'monthly' as const },
    { path: '/kebijakan-editorial', priority: 0.6, freq: 'monthly' as const },
    { path: '/peta-situs', priority: 0.7, freq: 'weekly' as const },
    { path: '/kontak', priority: 0.5, freq: 'monthly' as const },
    { path: '/privasi', priority: 0.3, freq: 'monthly' as const },
    { path: '/syarat', priority: 0.3, freq: 'monthly' as const },
    { path: '/guru', priority: 0.6, freq: 'monthly' as const }
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));

  // Tool routes from static TOOLS registry
  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Programmatic SEO (pSEO) routes
  const pseoRoutes: MetadataRoute.Sitemap = PSEO_DATA.map((item) => ({
    url: `${baseUrl}/tools/${item.toolId}/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Category hub routes (/blog/[kategori])
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = getAllCategories();
    categoryRoutes = categories.map((cat) => ({
      url: `${baseUrl}/blog/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error generating category sitemap:', error);
  }

  // Dynamic blog routes (/blog/[kategori]/[slug])
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllPosts();
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.kategori}/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
  }

  // Kamus / Glosarium routes (/kamus/[slug])
  let kamusRoutes: MetadataRoute.Sitemap = [];
  try {
    const kamusEntries = getAllKamus();
    kamusRoutes = kamusEntries.map((entry) => ({
      url: `${baseUrl}/kamus/${entry.slug}`,
      lastModified: new Date(entry.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating kamus sitemap:', error);
  }

  return [
    ...coreRoutes,
    ...toolRoutes,
    ...pseoRoutes,
    ...categoryRoutes,
    ...blogRoutes,
    ...kamusRoutes,
  ];
}

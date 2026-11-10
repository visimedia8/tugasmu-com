import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { getAllKamus } from '@/lib/kamus';
import { PSEO_DATA } from '@/lib/seo/pseo-data';
import { TOOLS } from '@/data/tools';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tugasmu.com';
  const CORE_UPDATE_DATE = new Date('2026-11-02T00:00:00.000Z');
  const SPOKE_UPDATE_DATE = new Date('2026-11-01T00:00:00.000Z');

  // 1. Core Pages
  const coreRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/harga`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/kamus`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/tentang`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/redaksi`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/kebijakan-editorial`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/peta-situs`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/kontak`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privasi`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/syarat`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/guru`, lastModified: CORE_UPDATE_DATE, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // 2. Tool Hub Pages
  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: CORE_UPDATE_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Category Hub Pages
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

  // 4. Kamus Entries
  let kamusRoutes: MetadataRoute.Sitemap = [];
  try {
    const kamusEntries = getAllKamus();
    kamusRoutes = kamusEntries.map((entry) => ({
      url: `${baseUrl}/kamus/${entry.slug}`,
      lastModified: new Date(entry.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error generating kamus sitemap:', error);
  }

  // 5. Blog Articles
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllPosts();
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.kategori}/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
  }

  // 6. PSEO Spokes
  const spokeRoutes: MetadataRoute.Sitemap = PSEO_DATA.map((item) => ({
    url: `${baseUrl}/tools/${item.toolId}/${item.slug}`,
    lastModified: SPOKE_UPDATE_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...coreRoutes,
    ...toolRoutes,
    ...categoryRoutes,
    ...kamusRoutes,
    ...blogRoutes,
    ...spokeRoutes,
  ];
}

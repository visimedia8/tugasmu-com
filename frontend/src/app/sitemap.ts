import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tugasmu.com';
  
  // Core routes
  const coreRoutes = [
    '',
    '/tools',
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
    priority: route === '' ? 1.0 : (route === '/tools' ? 0.9 : 0.8),
  }));

  // Dynamically get all tools
  let toolRoutes: MetadataRoute.Sitemap = [];
  try {
    const toolsDir = path.join(process.cwd(), 'src/app/tools');
    if (fs.existsSync(toolsDir)) {
      const entries = fs.readdirSync(toolsDir, { withFileTypes: true });
      const tools = entries
        .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('['))
        .map(dirent => dirent.name);

      toolRoutes = tools.map((toolSlug) => ({
        url: `${baseUrl}/tools/${toolSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Error generating tools sitemap:', error);
  }

  // Dynamic blog routes
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

  return [...coreRoutes, ...toolRoutes, ...blogRoutes];
}

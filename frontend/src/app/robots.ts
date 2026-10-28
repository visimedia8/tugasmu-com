import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/akun/', '/s/'],
      },
      {
        userAgent: [
          'Bytespider',
          'GPTBot',
          'CCBot',
          'ClaudeBot',
          'anthropic-ai',
          'Amazonbot',
          'PetalBot',
          'SemrushBot',
          'AhrefsBot',
          'DotBot',
        ],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://tugasmu.com/sitemap.xml',
  };
}

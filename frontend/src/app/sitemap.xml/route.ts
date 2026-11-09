import { NextResponse } from 'next/server';

export const revalidate = 86400; // 24 hours

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://tugasmu.com/sitemap/main.xml</loc>
    <lastmod>2026-11-02T00:00:00.000Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://tugasmu.com/sitemap/kamus.xml</loc>
    <lastmod>2026-11-01T00:00:00.000Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://tugasmu.com/sitemap/blog.xml</loc>
    <lastmod>2026-11-01T00:00:00.000Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://tugasmu.com/sitemap/spokes.xml</loc>
    <lastmod>2026-11-01T00:00:00.000Z</lastmod>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

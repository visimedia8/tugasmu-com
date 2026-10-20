import { getAllPosts } from '@/lib/mdx';

export async function GET() {
  const baseUrl = 'https://tugasmu.com';
  const posts = getAllPosts();

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.kategori}/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      // Clean CDATA contents to prevent XML parsing breaks
      const cleanTitle = (post.title || '').replace(/]]>/g, ']]&gt;');
      const cleanDesc = (post.description || '').replace(/]]>/g, ']]&gt;');

      return `    <item>
      <title><![CDATA[${cleanTitle}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${cleanDesc}]]></description>
      <category>${post.kategori}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Edukasi TugasMu</title>
    <link>${baseUrl}/blog</link>
    <description>Kumpulan panduan belajar, materi pelajaran Kurikulum Merdeka, rumus eksakta, dan tips belajar siswa Indonesia.</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

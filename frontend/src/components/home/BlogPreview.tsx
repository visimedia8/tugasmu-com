import Link from 'next/link';

export default function BlogPreview() {
  // Static content for MVP
  const recentPosts = [
    {
      title: 'Cara Membuat Teks Eksplanasi Fenomena Alam',
      category: 'Bahasa Indonesia',
      slug: 'cara-membuat-teks-eksplanasi-fenomena-alam'
    },
    {
      title: 'Contoh Majas Hiperbola dan Pengertiannya',
      category: 'Bahasa Indonesia',
      slug: 'contoh-majas-hiperbola-dan-pengertiannya'
    },
    {
      title: 'Materi Sejarah Kelas 10 Kurikulum Merdeka Bab 1',
      category: 'Sejarah',
      slug: 'materi-sejarah-kelas-10-kurikulum-merdeka-bab-1'
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Artikel Terbaru</h2>
            <p className="text-slate-600">Panduan materi dan tips belajar untukmu.</p>
          </div>
          <Link href="/blog" className="hidden md:block text-sky-600 font-medium hover:text-sky-700">
            Lihat Semua Artikel →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.category.toLowerCase().replace(/ /g, '-')}/${post.slug}`}
              className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow group"
            >
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2 block">
                {post.category}
              </span>
              <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-sky-600 transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="text-sky-600 font-medium hover:text-sky-700">
            Lihat Semua Artikel →
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { getAllKamus } from '@/lib/kamus';
import { TOOLS } from '@/data/tools';
import { PSEO_DATA } from '@/lib/seo/pseo-data';

export const metadata = {
  title: 'Peta Situs (HTML Sitemap) — Navigasi Lengkap Seluruh Materi & Tools',
  description: 'Peta situs lengkap TugasMu: direktori 29 tools belajar AI, 75 panduan solusi & template praktis, 228 materi pelajaran SD/SMP/SMA/SMK, dan 40 glosarium istilah edukasi.',
  alternates: { canonical: '/peta-situs' },
};

export default function PetaSitusPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const kamusList = getAllKamus();

  // Group posts by category
  const postsByCategory: Record<string, typeof posts> = {};
  categories.forEach((cat) => {
    postsByCategory[cat] = posts.filter((p) => p.kategori === cat);
  });

  const corePages = [
    { name: 'Beranda Utama', href: '/' },
    { name: 'Koleksi Tools Belajar AI', href: '/tools' },
    { name: 'Pusat Blog & Materi', href: '/blog' },
    { name: 'Glosarium & Kamus Pelajaran', href: '/kamus' },
    { name: 'Paket & Harga Langganan', href: '/harga' },
    { name: 'Tentang TugasMu', href: '/tentang' },
    { name: 'Tim Redaksi & Kurator Ahli', href: '/redaksi' },
    { name: 'Kebijakan Editorial & Standar AI', href: '/kebijakan-editorial' },
    { name: 'Hubungi Kontak Kami', href: '/kontak' },
    { name: 'Kebijakan Privasi', href: '/privasi' },
    { name: 'Syarat & Ketentuan Layanan', href: '/syarat' },
  ];

  return (
    <div className="container py-12 md:py-16 max-w-5xl mx-auto px-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 flex items-center space-x-2">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Peta Situs</span>
      </nav>

      {/* Header */}
      <div className="mb-12 border-b border-slate-200 pb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 inline-block mb-3">
          Indeks Direktori Lengkap
        </span>
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-4 tracking-tight">
          Peta Situs TugasMu
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Temukan seluruh navigasi halaman, kumpulan 29 alat bantu belajar AI, 75 panduan solusi & template praktis, 228 artikel panduan materi pelajaran, dan 40 istilah kamus edukasi dalam satu indeks terstruktur.
        </p>
      </div>

      {/* Section 1: Halaman Inti */}
      <section className="mb-12">
        <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-sky-600 rounded-full inline-block"></span>
          Halaman Navigasi Inti
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {corePages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-xs transition-all text-sm font-medium text-slate-800 hover:text-sky-600 flex items-center justify-between group"
            >
              <span>{page.name}</span>
              <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 2: Direktori Tools AI */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-emerald-600 rounded-full inline-block"></span>
            Direktori Alat Belajar AI ({TOOLS.length} Tools)
          </h2>
          <Link href="/tools" className="text-xs font-bold text-sky-600 hover:underline">
            Buka Direktori Tools →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 mb-1">
                {tool.name}
              </span>
              <span className="text-xs text-slate-500 line-clamp-1">
                {tool.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 3: Panduan Solusi & Template Praktis (pSEO) */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-amber-500 rounded-full inline-block"></span>
            Panduan Solusi & Template Praktis ({PSEO_DATA.length} Halaman)
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {PSEO_DATA.map((item) => (
            <Link
              key={item.slug}
              href={`/tools/${item.toolId}/${item.slug}`}
              className="p-3 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <span className="text-xs font-bold text-slate-900 group-hover:text-amber-600 mb-1 line-clamp-1">
                {item.h1}
              </span>
              <span className="text-[11px] text-slate-500 line-clamp-1">
                {item.subtitle}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 4: Klaster Blog & Materi Pelajaran */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
            Klaster Materi Pelajaran ({posts.length} Artikel di {categories.length} Kategori)
          </h2>
          <Link href="/blog" className="text-xs font-bold text-sky-600 hover:underline">
            Buka Blog Hub →
          </Link>
        </div>

        <div className="space-y-8">
          {categories.map((cat) => {
            const catPosts = postsByCategory[cat] || [];
            return (
              <div key={cat} className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200">
                <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                  <h3 className="text-lg font-heading font-bold text-slate-900 capitalize flex items-center gap-2">
                    <span className="text-sky-600">📁</span>
                    {cat.replace(/-/g, ' ')} ({catPosts.length} Materi)
                  </h3>
                  <Link
                    href={`/blog/${cat}`}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline"
                  >
                    Lihat Hub Kategori →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {catPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.kategori}/${post.slug}`}
                      className="text-xs text-slate-700 hover:text-sky-600 hover:underline py-1 flex items-start gap-1.5 leading-snug"
                    >
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span className="line-clamp-2">{post.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 5: Glosarium & Kamus Pelajaran */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-purple-600 rounded-full inline-block"></span>
            Glosarium & Kamus Pelajaran ({kamusList.length} Istilah)
          </h2>
          <Link href="/kamus" className="text-xs font-bold text-sky-600 hover:underline">
            Buka Glosarium →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {kamusList.map((entry) => (
            <Link
              key={entry.slug}
              href={`/kamus/${entry.slug}`}
              className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-purple-300 text-xs font-medium text-slate-800 hover:text-purple-600 transition-colors truncate"
              title={entry.title}
            >
              📖 {entry.title}
            </Link>
          ))}
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Peta Situs TugasMu",
            "description": "Indeks direktori lengkap materi dan alat belajar TugasMu",
            "url": "https://tugasmu.com/peta-situs",
          }),
        }}
      />
    </div>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllCategories, getPostSlugs, getPostBySlug } from '@/lib/mdx';

type Props = {
  params: { kategori: string } | Promise<{ kategori: string }>;
};

const CATEGORY_META_INFO: Record<string, { title: string; desc: string; toolName: string; toolHref: string; toolCta: string }> = {
  'bahasa-indonesia': {
    title: 'Materi Bahasa Indonesia SMA & SMP',
    desc: 'Panduan lengkap tata bahasa PUEBI, jenis paragraf deduktif-induktif, struktur teks ilmiah, dan analisis majas sastra Indonesia.',
    toolName: 'Tool Parafrase Teks & Cek EYD',
    toolHref: '/tools/parafrase',
    toolCta: 'Parafrase Makalah Bebas Plagiasi'
  },
  'bahasa-inggris': {
    title: 'Materi Bahasa Inggris (Grammar & Tenses)',
    desc: 'Kumpulan pembahasan 16 tenses, passive voice, conditional sentences, essay writing, dan teks analytical exposition.',
    toolName: 'English Grammar Checker AI',
    toolHref: '/tools/grammar-checker',
    toolCta: 'Periksa Grammar Esai Otomatis'
  },
  'matematika': {
    title: 'Materi Matematika & Rumus Cepat',
    desc: 'Pemecahan konsep aljabar, matriks, trigonometri, persamaan kuadrat, dan geometri ruang dengan langkah logis bertahap.',
    toolName: 'Math Solver Step-by-Step',
    toolHref: '/tools/math-solver',
    toolCta: 'Pecahkan Soal Matematika AI'
  },
  'sejarah': {
    title: 'Materi Sejarah Indonesia & Dunia',
    desc: 'Timeline peristiwa pergerakan nasional, masa Hindu-Buddha, kerajaan Islam, perang kemerdekaan, hingga revolusi global.',
    toolName: 'Rangkuman & Mind Map Sejarah',
    toolHref: '/tools/rangkuman',
    toolCta: 'Rangkum Bab Sejarah Instan'
  },
  'ppkn': {
    title: 'Materi PPKn & Pendidikan Kewarganegaraan',
    desc: 'Kajian nilai-nilai Pancasila, sistem ketatanegaraan, hak asasi manusia (HAM), hukum nasional, dan wawasan nusantara.',
    toolName: 'Generator Soal & Ringkasan PPKn',
    toolHref: '/tools/generator-soal',
    toolCta: 'Buat Latihan Soal PPKn'
  },
  'agama': {
    title: 'Materi Pendidikan Agama Islam (PAI)',
    desc: 'Pembahasan hukum bacaan tajwid, hadits tematik, sejarah kebudayaan Islam (SKI), dan fikih ibadah praktis.',
    toolName: 'Tafsir Quran & Tajwid AI',
    toolHref: '/tools/tafsir-quran',
    toolCta: 'Pelajari Ilmu Tajwid & Tafsir'
  },
  'smk': {
    title: 'Materi Kejuruan & Panduan Siswa SMK',
    desc: 'Format penyusunan laporan PKL industri, akuntansi keuangan, pembuatan proposal usaha, dan template CV ATS lulusan SMK.',
    toolName: 'Pembuat Laporan PKL & CV (ATS)',
    toolHref: '/tools/laporan-pkl',
    toolCta: 'Buat Laporan PKL & Magang'
  },
  'ipa': {
    title: 'Materi Sains & Ilmu Pengetahuan Alam (IPA)',
    desc: 'Konsep dasar fisika mekanika, biologi sel dan ekosistem, serta kimia larutan untuk jenjang sekolah menengah.',
    toolName: 'Rangkuman Materi Sains AI',
    toolHref: '/tools/rangkuman',
    toolCta: 'Rangkum Catatan IPA Sekolah'
  },
  'ips': {
    title: 'Materi Ilmu Pengetahuan Sosial (IPS)',
    desc: 'Kajian interaksi sosial, dinamika geografi penduduk, perekonomian pasar, dan sejarah perkembangan masyarakat.',
    toolName: 'Rangkuman Materi IPS AI',
    toolHref: '/tools/rangkuman',
    toolCta: 'Rangkum Konsep IPS Lengkap'
  }
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const categoryInfo = CATEGORY_META_INFO[resolvedParams.kategori];
  const title = categoryInfo ? categoryInfo.title : `Artikel ${resolvedParams.kategori.replace('-', ' ')}`;
  const description = categoryInfo ? categoryInfo.desc : `Kumpulan artikel dan panduan belajar untuk materi ${resolvedParams.kategori.replace('-', ' ')}.`;

  return {
    title: `${title} | TugasMu`,
    description,
    alternates: { canonical: `/blog/${resolvedParams.kategori}` },
    openGraph: {
      title: `${title} | TugasMu`,
      description,
      type: 'website',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&category=Kategori%20Belajar`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((kategori) => ({
    kategori,
  }));
}

export default async function BlogCategory({ params }: Props) {
  const resolvedParams = await params;
  const categories = getAllCategories();
  
  if (!categories.includes(resolvedParams.kategori)) {
    notFound();
  }

  const slugs = getPostSlugs(resolvedParams.kategori);
  const posts = slugs.map(slug => getPostBySlug(resolvedParams.kategori, slug)).filter(Boolean) as import('@/lib/mdx').BlogPost[];

  // Filter drafts in production
  const visiblePosts = posts.filter((post) => {
    if (process.env.NODE_ENV === 'production') {
      if (post.draft) return false;
      if (new Date(post.date) > new Date()) return false;
    }
    return true;
  }).sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  const info = CATEGORY_META_INFO[resolvedParams.kategori] || {
    title: `Materi Pelajaran: ${resolvedParams.kategori.replace('-', ' ')}`,
    desc: `Kumpulan panduan, materi rangkuman, dan contoh soal terstruktur untuk mata pelajaran ${resolvedParams.kategori.replace('-', ' ')}.`,
    toolName: 'Tools Asisten AI TugasMu',
    toolHref: '/tools',
    toolCta: 'Buka Semua Tools AI'
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": info.title,
    "description": info.desc,
    "url": `https://tugasmu.com/blog/${resolvedParams.kategori}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": visiblePosts.map((post, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `https://tugasmu.com/blog/${post.kategori}/${post.slug}`,
        "name": post.title
      }))
    }
  };

  return (
    <main className="container py-12 max-w-4xl mx-auto px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <nav className="mb-8 text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
          <li>/</li>
          <li><Link href="/blog" className="hover:text-slate-900">Blog</Link></li>
          <li>/</li>
          <li className="capitalize text-slate-900">{resolvedParams.kategori.replace('-', ' ')}</li>
        </ol>
      </nav>

      {/* Header Silo Makro-Konteks */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-3 capitalize">
          {info.title}
        </h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          {info.desc}
        </p>
      </div>

      {/* Target Money Page Conversion Bridge */}
      <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Asisten Belajar Terkait</span>
          <h3 className="font-heading font-bold text-slate-900 text-lg mt-0.5">{info.toolName}</h3>
          <p className="text-sm text-slate-600 mt-1">Selesaikan tugas dan pahami konsep materi ini lebih cepat dengan AI.</p>
        </div>
        <Link 
          href={info.toolHref}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-medium text-sm transition-colors whitespace-nowrap shadow-sm shrink-0"
        >
          {info.toolCta} →
        </Link>
      </div>
      
      {/* Article Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {visiblePosts.map((post) => (
          <Link href={`/blog/${post.kategori}/${post.slug}`} key={post.slug} className="block group">
            <article className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all flex flex-col h-full">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed mb-4 flex-1">
                {post.description}
              </p>
              <div className="text-xs text-slate-400 font-medium">
                Diterbitkan {new Date(post.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {visiblePosts.length === 0 && (
        <p className="text-slate-500 py-12 text-center">Belum ada artikel di kategori ini.</p>
      )}
    </main>
  );
}

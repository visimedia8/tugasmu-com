/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: process.env.NODE_ENV === 'development' 
            ? 'http://127.0.0.1:8787/api/:path*' 
            : 'https://tugasmu-api.johananggo.workers.dev/api/:path*',
        },
      ]
    };
  },
  async redirects() {
    return [
      // Host canonicalization (www to non-www)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.tugasmu.com',
          },
        ],
        destination: 'https://tugasmu.com/:path*',
        permanent: true,
      },
      // Cannibalization 301 Redirects (Consolidating into Koray Topical Authority nodes)
      {
        source: '/blog/bahasa-indonesia/perbedaan-kalimat-aktif-pasif',
        destination: '/blog/bahasa-indonesia/perbedaan-kalimat-aktif-dan-pasif',
        permanent: true,
      },
      {
        source: '/blog/bahasa-indonesia/macam-macam-majas-dan-contoh',
        destination: '/blog/bahasa-indonesia/jenis-jenis-majas-bahasa-indonesia',
        permanent: true,
      },
      {
        source: '/blog/bahasa-indonesia/cara-melakukan-parafrase-kalimat',
        destination: '/blog/bahasa-indonesia/teknik-parafrase-menghindari-plagiarisme',
        permanent: true,
      },
      {
        source: '/blog/bahasa-indonesia/cara-menulis-makalah-yang-benar',
        destination: '/blog/bahasa-indonesia/struktur-makalah-ilmiah-baik-benar',
        permanent: true,
      },
      {
        source: '/blog/bahasa-indonesia/ciri-teks-argumentasi',
        destination: '/blog/bahasa-indonesia/perbedaan-teks-eksposisi-argumentasi',
        permanent: true,
      },
      {
        source: '/blog/bahasa-indonesia/struktur-teks-eksposisi',
        destination: '/blog/bahasa-indonesia/perbedaan-teks-eksposisi-argumentasi',
        permanent: true,
      },
      {
        source: '/blog/bahasa-inggris/report-text-vs-descriptive-text',
        destination: '/blog/bahasa-inggris/perbedaan-descriptive-dan-report-text',
        permanent: true,
      },
      {
        source: '/blog/bahasa-inggris/kalimat-pasif-passive-voice-inggris',
        destination: '/blog/bahasa-inggris/aturan-penggunaan-passive-voice',
        permanent: true,
      },
      {
        source: '/blog/bahasa-inggris/pengertian-simple-present-tense',
        destination: '/blog/bahasa-inggris/cara-menggunakan-simple-present-tense',
        permanent: true,
      },
      {
        source: '/blog/bahasa-inggris/narrative-text-dongeng-dan-legenda',
        destination: '/blog/bahasa-inggris/jenis-narrative-text-struktur',
        permanent: true,
      },
      // Legacy dead tools and cannibalized post routes
      {
        source: '/tools/tanya-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/blog/bahasa-indonesia/struktur-teks-artikel-ilmiah-populer',
        destination: '/blog/bahasa-indonesia/struktur-makalah-ilmiah-baik-benar',
        permanent: true,
      },
      {
        source: '/blog/bahasa-inggris/strategi-membaca-reading-comprehension-efektif',
        destination: '/blog/bahasa-inggris/panduan-soal-reading-comprehension-utbk',
        permanent: true,
      },
      {
        source: '/blog/bahasa-indonesia/struktur-teks-argumentasi-ciri-contoh-analisis',
        destination: '/blog/bahasa-indonesia/perbedaan-teks-eksposisi-argumentasi',
        permanent: true,
      },
      {
        source: '/blog/matematika/soal-cerita-matematika-pemodelan-aljabar',
        destination: '/blog/matematika/tips-menjawab-soal-cerita',
        permanent: true,
      },
      {
        source: '/blog/matematika/persamaan-kuadrat-akar-rumus-abc',
        destination: '/blog/matematika/persamaan-kuadrat-rumus-dan-akar',
        permanent: true,
      },
      {
        source: '/blog/bahasa-indonesia/struktur-teks-laporan-hasil-observasi-lho',
        destination: '/blog/bahasa-indonesia/struktur-ciri-teks-laporan-observasi',
        permanent: true,
      },
      {
        source: '/blog/bahasa-indonesia/struktur-teks-pantun-syair-gurindam',
        destination: '/blog/bahasa-indonesia/jenis-puisi-lama-pantun-syair-gurindam',
        permanent: true,
      },
      {
        source: '/tools/grammar-eyd',
        destination: '/tools/grammar-bahasa-indonesia',
        permanent: true,
      },
      {
        source: '/tools/grammar-eyd/:slug',
        destination: '/tools/grammar-bahasa-indonesia/:slug',
        permanent: true,
      },
      {
        source: '/tools/grammar-checker',
        destination: '/tools/grammar-bahasa-inggris',
        permanent: true,
      },
      {
        source: '/tools/grammar-checker/:slug',
        destination: '/tools/grammar-bahasa-inggris/:slug',
        permanent: true,
      },
      // Fallback 301 Redirects for legacy mock homepage URLs
      {
        source: '/blog/bahasa-indonesia/cara-membuat-teks-eksplanasi-fenomena-alam',
        destination: '/blog/bahasa-indonesia',
        permanent: true,
      },
      {
        source: '/blog/bahasa-indonesia/contoh-majas-hiperbola-dan-pengertiannya',
        destination: '/blog/bahasa-indonesia/jenis-jenis-majas-bahasa-indonesia',
        permanent: true,
      },
      {
        source: '/blog/sejarah/materi-sejarah-kelas-10-kurikulum-merdeka-bab-1',
        destination: '/blog/sejarah',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

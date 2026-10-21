/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react', 'sonner'],
  },
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
    ];
  },
};

export default nextConfig;

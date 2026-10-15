import PricingClient from './PricingClient';

export const metadata = {
  title: 'Harga & Paket Berlangganan AI Siswa',
  description: 'Pilih paket berlangganan TugasMu AI untuk akses fitur premium tanpa batas. Gratis selamanya atau upgrade ke Pro dengan harga terjangkau.',
  alternates: { canonical: '/harga' },
  openGraph: {
    title: 'Harga & Paket Berlangganan AI Siswa | TugasMu',
    description: 'Pilih paket berlangganan TugasMu AI. Tersedia paket gratis selamanya dan Pro terjangkau.',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Paket%20Berlangganan%20TugasMu&category=Harga',
        width: 1200,
        height: 630,
        alt: 'Harga TugasMu Pro',
      },
    ],
  },
};

export default function HargaPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "TugasMu AI Pro",
    "description": "Platform AI pendidikan untuk memparafrase teks, menyelesaikan soal matematika, membuat soal latihan, dan bimbingan belajar siswa Indonesia.",
    "brand": {
      "@type": "Brand",
      "name": "TugasMu"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Paket Gratis Selamanya",
        "price": "0",
        "priceCurrency": "IDR",
        "availability": "https://schema.org/InStock",
        "url": "https://tugasmu.com/harga"
      },
      {
        "@type": "Offer",
        "name": "Paket Pro Pelajar",
        "price": "29000",
        "priceCurrency": "IDR",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://tugasmu.com/harga"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Apakah TugasMu benar-benar bisa digunakan gratis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya! TugasMu menyediakan akses gratis selamanya dengan kuota harian untuk seluruh 29 tools asisten belajar siswa."
        }
      },
      {
        "@type": "Question",
        "name": "Metode pembayaran apa saja yang didukung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pembayaran diverifikasi secara otomatis melalui gateway Duitku, mendukung QRIS, GoPay, OVO, Dana, ShopeePay, dan Virtual Account bank lokal."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah langganan Pro bisa dibatalkan sewaktu-waktu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bisa. Kamu dapat membatalkan perpanjangan langganan kapan saja melalui dashboard akun tanpa biaya pinalti."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-heading tracking-tight">
          Investasi Kecil untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Masa Depan Belajar</span>
        </h1>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Mulai dari gratis selamanya, atau upgrade ke Pro untuk akses kuota tak terbatas dan respons AI kilat. Tanpa ikatan kontrak.
        </p>
      </div>

      <PricingClient />

      <div className="max-w-3xl mx-auto px-4 mt-20 text-center">
        <h4 className="text-lg font-bold text-slate-900 mb-4">Pembayaran Aman &amp; Mudah</h4>
        <p className="text-sm text-slate-500 mb-6">Mendukung GoPay, OVO, Dana, ShopeePay, QRIS, Virtual Account, dan Kartu Kredit.</p>
        <div className="flex justify-center items-center gap-4 flex-wrap opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
          {/* eslint-disable @next/next/no-img-element */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_Dana.png/640px-Logo_Dana.png" alt="Dana" className="h-6 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Gen_QRIS_logo.svg/1024px-Gen_QRIS_logo.svg.png" alt="QRIS" className="h-6 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png" alt="GoPay" className="h-6 object-contain" />
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      </div>
    </div>
  );
}

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
  const digitalShippingDetails = {
    "@type": "OfferShippingDetails",
    "shippingRate": {
      "@type": "MonetaryAmount",
      "value": "0",
      "currency": "IDR"
    },
    "shippingDestination": {
      "@type": "DefinedRegion",
      "addressCountry": "ID"
    },
    "deliveryTime": {
      "@type": "ShippingDeliveryTime",
      "handlingTime": {
        "@type": "QuantitativeValue",
        "minValue": 0,
        "maxValue": 0,
        "unitCode": "DAY"
      },
      "transitTime": {
        "@type": "QuantitativeValue",
        "minValue": 0,
        "maxValue": 0,
        "unitCode": "DAY"
      }
    }
  };

  const digitalReturnPolicy = {
    "@type": "MerchantReturnPolicy",
    "applicableCountry": "ID",
    "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
    "merchantReturnDays": 0
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "Product"],
    "name": "TugasMu AI Pro",
    "description": "Platform SaaS asisten kecerdasan buatan pendidikan untuk memparafrase teks, memecahkan rumus matematika step-by-step, membuat latihan soal, dan bimbingan belajar siswa Indonesia.",
    "url": "https://tugasmu.com/harga",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All modern web browsers, Windows, macOS, Android, iOS",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "inLanguage": "id-ID",
    "sku": "TUGASMU-AI-PRO",
    "category": "Educational Software",
    "image": [
      "https://tugasmu.com/og-image.jpg",
      "https://tugasmu.com/api/og?title=Paket%20Berlangganan%20TugasMu&category=Harga"
    ],
    "brand": {
      "@type": "Brand",
      "name": "TugasMu"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Bu Ratna"
        },
        "datePublished": "2026-08-15",
        "reviewBody": "Sangat membantu siswa belajar mandiri di rumah. Jawaban yang dihasilkan menyertakan penalaran konsep yang runtut.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Pak Anwar"
        },
        "datePublished": "2026-08-20",
        "reviewBody": "Fitur pembuat soal dan rangkumannya sangat menghemat waktu murid saat persiapan ulangan harian. Platform sangat cepat dan hemat kuota.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "Paket Gratis Selamanya",
        "sku": "TUGASMU-FREE",
        "image": "https://tugasmu.com/og-image.jpg",
        "price": "0",
        "priceCurrency": "IDR",
        "validFrom": "2024-01-01",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "TugasMu",
          "url": "https://tugasmu.com"
        },
        "url": "https://tugasmu.com/harga",
        "shippingDetails": digitalShippingDetails,
        "hasMerchantReturnPolicy": digitalReturnPolicy
      },
      {
        "@type": "Offer",
        "name": "Paket Pro Pelajar",
        "sku": "TUGASMU-PRO-PELAJAR",
        "image": "https://tugasmu.com/og-image.jpg",
        "price": "29000",
        "priceCurrency": "IDR",
        "validFrom": "2024-01-01",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "TugasMu",
          "url": "https://tugasmu.com"
        },
        "url": "https://tugasmu.com/harga",
        "shippingDetails": digitalShippingDetails,
        "hasMerchantReturnPolicy": digitalReturnPolicy
      },
      {
        "@type": "Offer",
        "name": "Paket Guru / Tutor",
        "sku": "TUGASMU-PRO-GURU",
        "image": "https://tugasmu.com/og-image.jpg",
        "price": "99000",
        "priceCurrency": "IDR",
        "validFrom": "2024-01-01",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "TugasMu",
          "url": "https://tugasmu.com"
        },
        "url": "https://tugasmu.com/harga",
        "shippingDetails": digitalShippingDetails,
        "hasMerchantReturnPolicy": digitalReturnPolicy
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
          "text": "Ya! TugasMu menyediakan akses gratis selamanya dengan kuota harian untuk seluruh 29 tools asisten belajar siswa. Kamu bisa mendaftar tanpa perlu memasukkan kartu kredit."
        }
      },
      {
        "@type": "Question",
        "name": "Metode pembayaran apa saja yang didukung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pembayaran diverifikasi secara otomatis melalui gateway Duitku, mendukung QRIS, GoPay, OVO, Dana, ShopeePay, dan Virtual Account bank lokal (BCA, Mandiri, BNI, BRI, Permata)."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah langganan Pro bisa dibatalkan sewaktu-waktu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bisa. Kamu dapat membatalkan perpanjangan langganan kapan saja melalui dashboard akun tanpa biaya pinalti atau ikatan kontrak jangka panjang."
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

      {/* Pertanyaan yang Sering Diajukan (FAQ) - Sinkronisasi Schema.org */}
      <div className="max-w-4xl mx-auto px-4 mt-20 text-left">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Tanya Jawab</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 font-heading">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Punya pertanyaan seputar paket langganan dan akses fitur TugasMu? Berikut jawabannya.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Apakah TugasMu benar-benar bisa digunakan gratis?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ya! TugasMu menyediakan akses gratis selamanya dengan kuota harian untuk seluruh 29 tools asisten belajar siswa. Kamu bisa mendaftar tanpa perlu memasukkan kartu kredit.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Metode pembayaran apa saja yang didukung?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Pembayaran diverifikasi secara otomatis melalui gateway Duitku, mendukung QRIS, GoPay, OVO, Dana, ShopeePay, dan Virtual Account bank lokal (BCA, Mandiri, BNI, BRI, Permata).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Apakah langganan Pro bisa dibatalkan sewaktu-waktu?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Bisa. Kamu dapat membatalkan perpanjangan langganan kapan saja melalui dashboard akun tanpa biaya pinalti atau ikatan kontrak jangka panjang.
            </p>
          </div>
        </div>
      </div>

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

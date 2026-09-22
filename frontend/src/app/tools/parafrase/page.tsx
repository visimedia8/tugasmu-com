import type { Metadata } from 'next';
import Link from 'next/link';
import ParafraseClient from './ParafraseClient';
import SchemaMarkup from '@/components/shared/SchemaMarkup';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Tool Parafrase Teks AI Gratis',
  description: 'Tulis ulang teks tugasmu dengan bahasa yang unik dan anti-plagiat menggunakan AI TugasMu.',
};

export default function ParafrasePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cara Memparafrase Teks dengan AI TugasMu",
    "description": "Langkah mudah menggunakan alat parafrase gratis dari TugasMu",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Pilih Konteks",
        "text": "Pilih jenjang, kelas, kurikulum, dan mata pelajaran."
      },
      {
        "@type": "HowToStep",
        "name": "Masukkan Teks",
        "text": "Tempel teks yang ingin diparafrase ke dalam kotak."
      },
      {
        "@type": "HowToStep",
        "name": "Generate & Salin",
        "text": "Klik tombol 'Parafrase Sekarang' dan salin hasilnya."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Apa itu Parafrase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Parafrase adalah menulis ulang sebuah teks menggunakan kata-kata sendiri tanpa mengubah makna dasar dari teks aslinya."
        }
      },
      {
        "@type": "Question",
        "name": "Mengapa menggunakan TugasMu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TugasMu dirancang khusus untuk memahami konteks siswa Indonesia sehingga hasil parafrase terdengar lebih natural dan disesuaikan dengan tingkat sekolah."
        }
      }
    ]
  };

  return (
    <div className="w-full bg-surface min-h-screen">
      <SchemaMarkup schema={schema} />
      <SchemaMarkup schema={faqSchema} />
      
      <section className="max-w-[1200px] mx-auto w-full px-margin md:px-margin-desktop py-space-lg">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm mb-space-md">
          <Link className="hover:text-primary transition-colors flex items-center gap-1" href="/">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Beranda</span>
          </Link>
          <span className="text-outline-variant font-medium">/</span>
          <Link className="hover:text-primary transition-colors" href="/tools">Tools AI</Link>
          <span className="text-outline-variant font-medium">/</span>
          <span className="text-on-surface font-semibold">Parafrase Teks &amp; Makalah</span>
        </nav>

        {/* Tool Header & Badges */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-sm mb-space-lg relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-primary-container/10 blur-2xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg relative z-10">
            <div className="space-y-space-xs max-w-3xl">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>thumb_up</span>
                  Rekomendasi
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                  Lolos Turnitin
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Parafrase Teks &amp; Makalah
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Ubah susunan kalimat tugas agar terdengar natural, santun, dan bebas plagiasi tanpa mengubah inti materi akademik.
              </p>
            </div>
            {/* Tool Quick Actions */}
            <div className="flex items-center flex-wrap gap-space-xs shrink-0 self-start lg:self-center">
              <button className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>Panduan Tool</span>
              </button>
            </div>
          </div>
        </div>

        <ParafraseClient />

      <RelatedTools toolIds={["kti-builder","makalah-builder","grammar-eyd"]} />

        <FAQAccordion 
          title="Panduan & FAQ: Tool Parafrase TugasMu"
          description="Pertanyaan yang sering diajukan seputar penulisan ulang teks akademik untuk jenjang SD, SMP, SMA, dan sederajat."
          faqs={[
            {
              question: "Apa itu tool parafrase online gratis dari TugasMu?",
              answer: (
                <>
                  <p>Tool parafrase TugasMu adalah kecerdasan buatan (AI) yang dirancang khusus untuk pelajar Indonesia dalam menyusun ulang struktur kalimat dari sebuah teks atau makalah tanpa mengubah makna aslinya. Alat ini sangat cocok bagi siswa SD, SMP, dan SMA dalam mengerjakan tugas Kurikulum Merdeka agar terhindar dari plagiasi.</p>
                </>
              )
            },
            {
              question: "Bagaimana cara memparafrase teks tugas agar lolos Turnitin dan tidak plagiat?",
              answer: (
                <>
                  <p>Untuk memastikan hasil parafrasemu aman dari deteksi plagiarisme seperti Turnitin, cukup salin teks dari sumber referensi (buku cetak, jurnal, atau website) lalu tempelkan ke dalam kotak input. AI TugasMu akan secara otomatis mengganti sinonim, mengubah struktur kalimat aktif-pasif, dan menyesuaikan gaya bahasa sehingga teks tersebut terbaca original dan otentik 100%.</p>
                </>
              )
            },
            {
              question: "Apakah hasil parafrase TugasMu aman untuk membuat makalah Kurikulum Merdeka?",
              answer: (
                <>
                  <p>Sangat aman! Berbeda dengan tool terjemahan atau parafrase robotik pada umumnya, TugasMu sudah dilatih untuk memahami pedoman Ejaan Yang Disempurnakan (EYD) dan konteks pendidikan Indonesia. Khusus untuk <strong>Kurikulum Merdeka</strong>, hasil teks yang dikeluarkan didesain untuk mendorong bernalar kritis dan bahasa yang santun, sehingga sangat layak diserahkan kepada guru.</p>
                </>
              )
            },
            {
              question: "Berapa batasan kata atau kalimat yang bisa diparafrase sekaligus?",
              answer: (
                <>
                  <p>Saat ini kamu dapat memparafrase paragraf, rangkuman, maupun bagian-bagian penting dari makalah dalam satu kali proses (umumnya hingga 500-1000 kata tergantung ketersediaan limit AI). Jika kamu memiliki dokumen yang sangat panjang, kami menyarankan untuk membaginya menjadi beberapa paragraf agar hasil tulisan ulang lebih akurat dan terstruktur rapi.</p>
                </>
              )
            },
            {
              question: "Apa bedanya mode santai, formal, dan akademik pada parafrase otomatis ini?",
              answer: (
                <>
                  <p>TugasMu memahami bahwa setiap tugas memiliki gaya bahasanya sendiri. Mode <strong>Formal/Akademik</strong> sangat direkomendasikan untuk pembuatan Karya Ilmiah Remaja (KIR), Laporan Praktikum, dan Makalah. Sedangkan mode <strong>Santai</strong> lebih cocok digunakan untuk menyusun skrip presentasi lisan, esai opini, atau artikel blog sekolah agar lebih mudah dipahami oleh teman sebaya.</p>
                </>
              )
            }
          ]}
        />
      </section>
    </div>
  );
}

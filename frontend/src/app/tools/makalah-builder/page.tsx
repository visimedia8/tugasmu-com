/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import MakalahBuilderClient from './MakalahBuilderClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { BookOpen, CheckCircle } from 'lucide-react';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Generator Struktur Makalah Otomatis (Bab I - III) - TugasMu',
  description: 'Buat struktur makalah sekolah otomatis. Latar belakang, rumusan masalah, dan pembahasan disusun rapi sesuai topik dan mata pelajaranmu.',
  alternates: { canonical: '/tools/makalah-builder' },
};

export default function MakalahBuilderPage() {
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Pembuat Struktur Makalah (Otomatis)
        </h1>
        <p className="text-slate-600 text-lg">
          Mentok mau nulis makalah mulai dari mana? Masukkan topik tugasmu, dan AI kami akan membuatkan draf terstruktur dari Bab 1 (Latar Belakang) sampai Bab 3 (Penutup) dalam hitungan detik.
        </p>
      </div>

      <MakalahBuilderClient />

      <RelatedTools toolIds={["kti-builder","parafrase","grammar-eyd"]} />

      {/* SEO Helpful Content Section */}
      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-sky-500" />
            Cara Membuat Makalah yang Sesuai Standar Sekolah (SMP & SMA)
          </h2>
          <p>
            Membuat makalah adalah tugas klasik yang pasti akan sering kamu temui di jenjang SMP hingga SMA (terutama untuk mata pelajaran Bahasa Indonesia, PPKn, Sejarah, atau Biologi). Namun, banyak siswa yang mendapat nilai jelek karena tidak memahami struktur dasar penulisan makalah yang baku.
          </p>
          
          <h3>Struktur Makalah yang Wajib Ada</h3>
          <p>
            Makalah yang baik tidak sekadar "kopi-paste" dari Wikipedia. Makalah memiliki sistematika 3 Bab utama yang saling berhubungan:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Bab I: Pendahuluan.</strong> Berisi <em>Latar Belakang</em> (mengapa kamu memilih topik ini), <em>Rumusan Masalah</em> (pertanyaan yang akan dibahas, biasanya menggunakan kata tanya "Bagaimana" atau "Mengapa"), dan <em>Tujuan Penulisan</em>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Bab II: Pembahasan.</strong> Ini adalah jantung makalahmu. Jumlah sub-bab di sini harus sama dengan jumlah Rumusan Masalah di Bab I. Di sinilah kamu menguraikan teori dan analisismu.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Bab III: Penutup.</strong> Berisi <em>Kesimpulan</em> (rangkuman singkat dari Bab II) dan <em>Saran</em> (rekomendasi untuk pembaca atau peneliti selanjutnya).</span>
            </li>
          </ul>

          <h3>Jangan Lupakan Daftar Pustaka</h3>
          <p>
            Satu kesalahan fatal yang sering dilakukan siswa adalah lupa menyertakan Daftar Pustaka. Setiap teori yang kamu masukkan di Bab II harus memiliki sumber rujukan yang jelas di bagian akhir agar kamu tidak dianggap melakukan plagiarisme.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQAccordion
          title="Pertanyaan Seputar Pembuatan Makalah"
          description="Panduan tentang bagaimana tool ini membantu meringankan tugas makalahmu."
          faqs={[
            {
              question: 'Apakah hasil tool ini langsung bisa di-print jadi makalah?',
              answer: (
                <p><strong>Tidak sepenuhnya.</strong> Tool ini berfungsi memberikan "kerangka dan draf tulisan". Kamu tetap harus memindahkannya ke Microsoft Word, menambahkan cover (halaman judul), kata pengantar, dan daftar isi. Kamu juga sangat disarankan untuk memperluas isi di bagian Bab II (Pembahasan) sesuai dengan buku cetak yang kamu pelajari di sekolah.</p>
              )
            },
            {
              question: 'Apakah ini akan terdeteksi plagiat?',
              answer: (
                <p>Karena AI ini melakukan generasi kata demi kata yang unik, hasilnya kemungkinan besar lolos dari deteksi plagiarisme (Turnitin). Namun, untuk menjaga kejujuran akademis, pastikan kamu menambahkan opini pribadi dan merujuk pada buku pelajaranmu.</p>
              )
            },
            {
              question: 'Topik apa saja yang bisa dibuat?',
              answer: (
                <p>Topik apa saja bisa! Mulai dari "Sejarah Kemerdekaan", "Dampak Pergaulan Bebas", "Globalisasi", hingga "Analisis Novel". Cukup ketik topik yang diberikan gurumu dengan jelas.</p>
              )
            }
          ]}
        />
      </div>

      {/* Related Tools Section */}
      <div className="mt-12 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Lengkapi Makalahmu dengan Tools Ini</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/tools/parafrase" className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">Parafrase Makalah</h4>
            </div>
            <p className="text-sm text-slate-600">Punya sumber dari blog? Parafrase dulu agar kalimatnya berubah dan tidak ketahuan copy-paste.</p>
          </Link>
          <Link href="/tools/grammar-eyd" className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Cek Ejaan (EYD)</h4>
            </div>
            <p className="text-sm text-slate-600">Pastikan makalahmu bebas dari typo dan menggunakan bahasa Indonesia yang baku sesuai PUEBI.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

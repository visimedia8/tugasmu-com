/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import GrammarCheckerClient from './GrammarCheckerClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { BookOpen, CheckCircle } from 'lucide-react';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Korektor Grammar & Essay Bahasa Inggris - Pengecekan AI Otomatis',
  description: 'Cek tata bahasa, tenses, dan ejaan tulisan esai bahasa Inggris kamu. Dapatkan saran vocabulary yang lebih natural dan penjelasan kesalahan dalam bahasa Indonesia.',
  alternates: { canonical: '/tools/grammar-checker' },
};

export default function GrammarCheckerPage() {
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Korektor Grammar & Essay Bahasa Inggris
        </h1>
        <p className="text-slate-600 text-lg">
          Jangan biarkan tugas essay atau PR bahasa Inggrismu penuh coretan merah. AI kami akan memperbaiki grammar, tenses, dan memberikan saran kosakata yang bikin tulisanmu terlihat lebih pro.
        </p>
      </div>

      <GrammarCheckerClient />

      <RelatedTools toolIds={["kti-builder","makalah-builder","parafrase"]} />

      {/* SEO Helpful Content Section */}
      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-indigo-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-500" />
            Pentingnya Mengecek Grammar Sebelum Mengumpulkan Tugas
          </h2>
          <p>
            Menulis dalam Bahasa Inggris (English writing) adalah salah satu tantangan terbesar bagi siswa SMP, SMA, maupun mahasiswa. Seringkali, kita menerjemahkan kalimat secara mentah-mentah dari Bahasa Indonesia ke Bahasa Inggris di kepala kita. Hasilnya? Susunan kata (<em>syntax</em>) menjadi aneh, dan <strong>tenses</strong> yang digunakan berantakan.
          </p>
          
          <h3>Kesalahan Grammar yang Paling Sering Terjadi</h3>
          <p>
            Berdasarkan analisis jutaan tugas siswa, berikut adalah kesalahan yang paling sering mengurangi nilai essay kamu:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Subject-Verb Agreement:</strong> Ketidaksesuaian antara subjek dan kata kerja. Contoh salah: <em>"She go to school."</em> (Seharusnya <em>"She goes"</em>).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Tenses yang Tertukar:</strong> Menceritakan pengalaman liburan masa lalu (Recount Text) tetapi menggunakan Present Tense (V1) alih-alih Past Tense (V2).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Penggunaan Artikel (a, an, the):</strong> Menulis <em>"an university"</em> padahal seharusnya <em>"a university"</em> karena pelafalannya diawali huruf konsonan /j/.</span>
            </li>
          </ul>

          <h3>Lebih dari Sekadar Mengecek Kesalahan</h3>
          <p>
            Tool Grammar Checker TugasMu tidak hanya berfungsi seperti Grammarly yang menggarisbawahi teks yang salah. AI kami dirancang khusus sebagai <strong>Tutor Virtual</strong>. Setelah memperbaiki teksmu, AI akan memberikan penjelasan <em>mengapa</em> kalimatmu salah dalam Bahasa Indonesia yang mudah dipahami. Selain itu, kamu akan mendapat rekomendasi <strong>kosakata tingkat lanjut (Advanced Vocabulary)</strong> untuk meningkatkan level CEFR tulisanmu dari A2/B1 menjadi B2/C1.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQAccordion
          title="Pertanyaan Seputar Pengecekan Grammar"
          description="Panduan singkat tentang cara kerja korektor grammar ini."
          faqs={[
            {
              question: 'Apakah hasil perbaikan teks bisa mengubah makna cerita saya?',
              answer: (
                <p>Tidak. AI kami dirancang hanya untuk memperbaiki struktur tata bahasa (grammar), tanda baca, dan pilihan kata tanpa mengubah inti cerita atau makna dari opini yang kamu tuliskan.</p>
              )
            },
            {
              question: 'Berapa panjang teks maksimal yang bisa diperiksa?',
              answer: (
                <p>Kamu bisa memasukkan hingga sekitar 3.000 kata sekaligus dalam satu kali pengecekan. Jika tugasmu berupa makalah panjang atau skripsi, kami sarankan untuk membaginya menjadi beberapa bagian (misal per paragraf atau per bab).</p>
              )
            },
            {
              question: 'Apakah tool ini gratis digunakan?',
              answer: (
                <p>Ya, fitur Grammar Checker gratis digunakan hingga batas harian tertentu untuk pengguna non-login. Untuk batas yang lebih besar, kamu bisa mendaftar akun gratis atau berlangganan paket Premium.</p>
              )
            },
            {
              question: 'Apa bedanya memilih jenjang SMP, SMA, atau Mahasiswa?',
              answer: (
                <p>Pilihan jenjang mempengaruhi <strong>tingkat formalitas dan kompleksitas vocabulary</strong> yang akan disarankan oleh AI. Untuk jenjang SMP, AI akan menjaga kalimat tetap sederhana namun benar. Untuk level Mahasiswa, AI akan merekomendasikan gaya bahasa akademik (Academic English) yang cocok untuk jurnal atau paper.</p>
              )
            }
          ]}
        />
      </div>

      {/* Related Tools Section */}
      <div className="mt-12 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Coba Tools Bermanfaat Lainnya</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/tools/parafrase" className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Parafrase Makalah</h4>
            </div>
            <p className="text-sm text-slate-600">Ubah susunan kalimat teks yang terdeteksi plagiat menjadi tulisan yang segar dan orisinil.</p>
          </Link>
          <Link href="/tools/penerjemah-daerah" className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">Translator Kontekstual</h4>
            </div>
            <p className="text-sm text-slate-600">Terjemahkan bahasa daerah atau teks asing dengan hasil yang jauh lebih natural.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

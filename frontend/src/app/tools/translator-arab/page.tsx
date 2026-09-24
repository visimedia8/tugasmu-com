/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import TranslatorArabClient from './TranslatorArabClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { BookOpen, CheckCircle, Lightbulb } from 'lucide-react';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Translator Arab ↔ Indonesia Kontekstual Madrasah (Dengan Penjelasan Nahwu)',
  description: 'Penerjemah Bahasa Arab ke Indonesia khusus anak Madrasah. Dapatkan terjemahan akurat (Fusha) lengkap dengan penjelasan gramatikal Nahwu & Shorof singkat.',
  alternates: { canonical: '/tools/translator-arab' },
};

export default function TranslatorArabPage() {
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Translator Arab ↔ Indonesia (Kontekstual)
        </h1>
        <p className="text-slate-600 text-lg">
          Google Translate sering ngawur untuk tugas sekolah? Gunakan AI TugasMu yang dirancang khusus untuk memahami teks pelajaran Agama Islam, lengkap dengan penjelasan kaidah <strong>Nahwu & Shorof</strong>-nya.
        </p>
      </div>

      <TranslatorArabClient />

      <RelatedTools toolIds={["kitab-kuning","nahwu-shorof","muhafazhah"]} />

      {/* SEO Helpful Content Section */}
      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-emerald-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            Mengapa Terjemahan Mesin Biasa Gagal dalam Bahasa Arab?
          </h2>
          <p>
            Bagi siswa <strong>Madrasah Tsanawiyah (MTs)</strong> maupun <strong>Madrasah Aliyah (MA)</strong>, Bahasa Arab adalah salah satu mata pelajaran inti. Namun, saat diberi tugas menerjemahkan teks bacaan (<em>Qira'ah</em>) atau percakapan (<em>Hiwar</em>), banyak siswa yang mengandalkan Google Translate dan berujung pada terjemahan yang berantakan atau bahkan salah makna.
          </p>
          
          <h3>Perbedaan Fusha dan Ammiyah</h3>
          <p>
            Alasan utamanya adalah perbedaan antara Bahasa Arab Resmi (<strong>Fusha</strong>) yang dipelajari di sekolah, dengan Bahasa Arab Pasaran (<strong>Ammiyah</strong>) yang sering menjadi basis data mesin penerjemah umum. Di sekolah atau pesantren, kamu dituntut untuk menerjemahkan sesuai dengan kaidah keagamaan dan literatur akademik.
          </p>

          <h3>Pentingnya Memahami Konteks Kalimat</h3>
          <p>
            Bahasa Arab sangat bergantung pada konteks kalimat dan letak kata (kedudukan kata dalam kalimat). Perubahan satu harakat (misalnya <em>Fathah</em> menjadi <em>Kasrah</em>) bisa mengubah makna subjek menjadi objek. Tool Translator TugasMu mengatasi hal ini dengan:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Mengenali Konteks:</strong> AI kami paham apakah kata <em>Dzaraba</em> (ضرب) bermaksud "memukul" secara fisik, atau "membuat perumpamaan" (dalam konteks Al-Quran).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Penjelasan Kedudukan Kata:</strong> Tidak sekadar memberi arti, tool ini menjelaskan apakah sebuah kata berkedudukan sebagai <em>Mubtada</em>, <em>Khabar</em>, <em>Fa'il</em>, atau <em>Maf'ul Bih</em>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Identifikasi Dhomir:</strong> Sangat membantu untuk tugas menerjemahkan cerita yang memiliki banyak kata ganti (Dia laki-laki, Mereka perempuan, dsb).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQAccordion
          title="Pertanyaan Seputar Pengecekan Grammar"
          description="Panduan singkat tentang cara kerja korektor grammar ini."
          faqs={[
            {
              question: 'Apakah saya perlu mengetik harakat pada teks Arab?',
              answer: (
                <p><strong>Tidak wajib.</strong> AI kami cukup pintar untuk membaca teks Arab "gundul" (tanpa harakat) dan menerjemahkannya berdasarkan konteks kalimat secara keseluruhan, persis seperti metode membaca Kitab Kuning.</p>
              )
            },
            {
              question: 'Apakah hasil terjemahan (Indo ke Arab) sudah ada harakatnya?',
              answer: (
                <p>Ya. Saat kamu memilih mode terjemahan dari Bahasa Indonesia ke Bahasa Arab, hasil <em>output</em>-nya akan dilengkapi dengan harakat penuh (<em>Tasykil</em>) sehingga kamu tidak akan kesulitan saat harus membacanya di depan kelas.</p>
              )
            },
            {
              question: 'Bisa digunakan untuk menerjemahkan ayat Al-Quran atau Hadits?',
              answer: (
                <p>Bisa. Namun disarankan menggunakannya untuk potongan ayat pendek atau kalimat latihan di buku cetak. Untuk tafsir mendalam tentang suatu ayat, akan lebih baik merujuk langsung ke kitab tafsir yang mu'tabar (terpercaya).</p>
              )
            },
            {
              question: 'Kenapa saya harus memilih jenjang MTs atau MA?',
              answer: (
                <p>Level penjelasan gramatikal akan disesuaikan. Anak MTs akan mendapatkan penjelasan Nahwu dasar, sedangkan anak MA mungkin akan mendapat penjelasan struktur yang sedikit lebih kompleks atau idiomatik.</p>
              )
            }
          ]}
        />
      </div>

      {/* Related Tools Section */}
      <div className="mt-12 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Coba Tools Bermanfaat Lainnya</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/tools/rangkuman" className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">Rangkuman Materi</h4>
            </div>
            <p className="text-sm text-slate-600">Ringkas materi Sejarah Kebudayaan Islam (SKI) atau bab Fikih yang panjang menjadi poin-poin singkat.</p>
          </Link>
          <Link href="/tools/generator-soal" className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">Generator Soal Latihan</h4>
            </div>
            <p className="text-sm text-slate-600">Buat soal latihan bahasa Arab atau mapel lain lengkap dengan kunci jawabannya.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

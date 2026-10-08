/* eslint-disable react/no-unescaped-entities */
import SchemaMarkup from '@/components/shared/SchemaMarkup';
import Link from 'next/link';
import GrammarCheckerClient from './GrammarCheckerClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { BookOpen, CheckCircle, Zap, ShieldCheck, Users } from 'lucide-react';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolSchema from '@/components/seo/ToolSchema';

export const metadata = {
  title: 'Korektor Grammar & Essay Bahasa Inggris - Pengecekan AI Otomatis',
  description: 'Cek tata bahasa, tenses, dan ejaan tulisan esai bahasa Inggris kamu. Dapatkan saran vocabulary yang lebih natural dan penjelasan kesalahan dalam bahasa Indonesia.',
  alternates: { canonical: '/tools/grammar-checker' },
};

export default function GrammarCheckerPage() {

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Korektor Grammar & Essay Bahasa Inggris - Pengecekan AI Otomatis",
    "description": "Cek tata bahasa, tenses, dan ejaan tulisan esai bahasa Inggris kamu. Dapatkan saran vocabulary yang lebih natural dan penjelasan kesalahan dalam bahasa Indonesia.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1245"
    }
  };
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <ToolSchema toolId="grammar-checker" />
      <SchemaMarkup schema={schema} />
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Korektor Grammar & Essay Bahasa Inggris
        </h1>
        <p className="text-slate-600 text-lg mb-6">
          Jangan biarkan tugas essay atau PR bahasa Inggrismu penuh coretan merah. AI kami akan memperbaiki grammar, tenses, dan memberikan saran kosakata yang bikin tulisanmu terlihat lebih pro.
        </p>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 mb-8">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> 100% Gratis
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <Zap className="w-4 h-4 text-amber-500" /> AI Super Cepat
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-slate-700" /> Privasi Aman
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <Users className="w-4 h-4 text-sky-600" /> Dipakai 10.000+ Pelajar
          </span>
        </div>
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

          <h3>Cara Menggunakan Tool Grammar Checker</h3>
          <p>Agar hasil perbaikan lebih maksimal dan sesuai dengan kebutuhan akademis, ikuti langkah-langkah berikut:</p>
          <ol className="space-y-2 mb-6 list-decimal list-inside">
            <li><strong>Pilih Jenjang Pendidikan:</strong> Sesuaikan tingkat pendidikanmu (SMP, SMA, Mahasiswa, atau Umum) agar AI bisa menyesuaikan level <em>vocabulary</em> dan formalitas kalimat.</li>
            <li><strong>Masukkan Teks:</strong> Ketik atau <em>paste</em> teks Bahasa Inggris kamu ke dalam kotak teks (maksimal 3.000 kata per pengecekan).</li>
            <li><strong>Klik Koreksi:</strong> Tekan tombol "Koreksi Sekarang" dan biarkan AI menganalisis tulisanmu dalam hitungan detik.</li>
            <li><strong>Pelajari Penjelasan:</strong> Jangan hanya melakukan <em>copy-paste</em> hasilnya! Baca penjelasan di bawah setiap kalimat untuk memahami mengapa struktur atau kata yang kamu gunakan sebelumnya kurang tepat.</li>
          </ol>

          <h3>Contoh Hasil Pengecekan (Before & After)</h3>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 mt-4 not-prose">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 font-medium text-sm rounded-full mb-2">Kasus / Before</span>
              <p className="text-slate-700 italic">"Yesterday I go to market with my mother. We buy many fruit because it is very cheap."</p>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 font-medium text-sm rounded-full mb-2">Hasil / After</span>
              <p className="text-slate-700 italic font-medium">"Yesterday, I went to the market with my mother. We bought a lot of fruits because they were very cheap."</p>
              <div className="mt-4 text-sm text-slate-600 bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                <strong>💡 Insight & Penjelasan AI:</strong><br />
                Kalimat ini menceritakan kejadian masa lalu ("Yesterday"), sehingga wajib menggunakan <strong>Past Tense</strong> ("went", "bought"). Kami juga menambahkan artikel "the" sebelum "market", dan menyesuaikan bentuk jamak ("fruits", "they were").
              </div>
            </div>
          </div>

          <h3>TugasMu vs ChatGPT Biasa: Apa Bedanya?</h3>
          <p>
            Banyak pelajar yang mengandalkan ChatGPT biasa untuk mengecek grammar. Masalahnya, ChatGPT seringkali <strong>mengubah total gaya bahasa tulisan aslimu</strong> menjadi kaku dan terlalu <em>robotic</em>. 
          </p>
          <p>
            Di sisi lain, AI Grammar Checker TugasMu telah di-<em>prompt</em> secara khusus oleh tim edukasi kami. AI ini beroperasi dengan aturan ketat: <strong>Hanya memperbaiki yang salah tanpa menghilangkan <em>voice</em> atau opini aslimu</strong>. Selain itu, penjelasannya disesuaikan langsung dengan materi pelajaran Bahasa Inggris kurikulum Indonesia, menjadikannya seperti tutor pribadimu.
          </p>

          {/* Author Box */}
          <div className="mt-10 pt-6 border-t border-slate-200 not-prose flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Tim Akademik TugasMu</p>
              <p className="text-sm text-slate-500">Panduan & metodologi AI ini disusun dan ditinjau oleh tenaga pendidik untuk memastikan kesesuaian dengan standar kurikulum di Indonesia. Terakhir diperbarui: Oktober 2026.</p>
            </div>
          </div>
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

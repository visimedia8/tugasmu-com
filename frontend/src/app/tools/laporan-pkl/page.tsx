/* eslint-disable react/no-unescaped-entities */
import SchemaMarkup from '@/components/shared/SchemaMarkup';
import Link from 'next/link';
import LaporanPKLClient from './LaporanPKLClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { FileText, CheckCircle } from 'lucide-react';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Generator Struktur Laporan PKL & Prakerin SMK - Otomatis Sesuai Jurusan',
  description: 'Buat struktur dan draft laporan PKL (Praktik Kerja Lapangan) atau magang SMK dalam hitungan detik. Lengkap dari Latar Belakang sampai Kesimpulan sesuai jurusanmu.',
  alternates: { canonical: '/tools/laporan-pkl' },
};

export default function LaporanPKLPage() {

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Generator Struktur Laporan PKL & Prakerin SMK - Otomatis Sesuai Jurusan",
    "description": "Buat struktur dan draft laporan PKL (Praktik Kerja Lapangan) atau magang SMK dalam hitungan detik. Lengkap dari Latar Belakang sampai Kesimpulan sesuai jurusanmu.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  };
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <SchemaMarkup schema={schema} />
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Generator Laporan PKL SMK (Otomatis)
        </h1>
        <p className="text-slate-600 text-lg">
          Baru selesai magang dan bingung cara nulis laporan? Masukkan jurusan dan tempat PKL-mu, AI akan membuatkan draft struktur laporan resmi bab per bab yang siap kamu lengkapi.
        </p>
      </div>

      <LaporanPKLClient />

      <RelatedTools toolIds={["proposal-usaha","akuntansi-solver","penjelas-kejuruan"]} />

      {/* SEO Helpful Content Section */}
      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-sky-500" />
            Cara Membuat Laporan PKL SMK yang Baik dan Benar
          </h2>
          <p>
            Membuat <strong>Laporan Praktik Kerja Lapangan (PKL)</strong> atau Prakerin seringkali menjadi tugas yang membingungkan bagi siswa SMK kelas 11 atau 12 yang baru menyelesaikan masa magangnya. Laporan ini merupakan syarat wajib untuk kenaikan kelas maupun kelulusan, karena membuktikan bahwa kamu telah benar-benar terjun ke dunia industri (DU/DI).
          </p>
          
          <h3>Mengapa Struktur Laporan PKL Sangat Penting?</h3>
          <p>
            Banyak siswa SMK ditolak laporannya oleh pembimbing karena format penulisan yang berantakan atau isi yang tidak relevan dengan jurusannya. Misalnya, siswa jurusan Teknik Komputer Jaringan (TKJ) namun isi kegiatannya lebih banyak membantu administrasi tata usaha.
          </p>
          <p>Laporan yang baik harus memiliki struktur yang runut:</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>BAB I Pendahuluan:</strong> Latar belakang mengapa PKL diadakan, serta apa tujuan dan manfaat spesifik bagi sekolah maupun industri.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>BAB II Gambaran Umum:</strong> Sejarah dan profil perusahaan tempat kamu magang. Ini bisa didapatkan dari profil instansi.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>BAB III Pelaksanaan PKL:</strong> Ini adalah inti dari laporanmu. Berisi uraian kegiatan harian, kendala teknis yang dihadapi, dan cara penyelesaiannya sesuai kompetensi keahlianmu.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>BAB IV Penutup:</strong> Kesimpulan dari pengalaman magang dan saran perbaikan untuk adik kelas maupun pihak industri.</span>
            </li>
          </ul>

          <h3>Tips Lulus Sidang Laporan PKL</h3>
          <p>
            Setelah laporan tercetak, kamu biasanya akan menghadapi presentasi atau sidang di depan guru pembimbing. Pastikan kamu benar-benar menguasai BAB III, karena pertanyaan penguji akan fokus pada apa yang <em>benar-benar</em> kamu kerjakan selama di industri, bukan sekadar teori.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQAccordion
          title="Pertanyaan Seputar Laporan PKL SMK"
          description="Panduan singkat terkait penyusunan laporan magang dan penggunaan AI Generator ini."
          faqs={[
            {
              question: 'Apakah hasil dari tool ini bisa langsung di-copy paste untuk dikumpulkan?',
              answer: (
                <p><strong>Tidak.</strong> Tool ini menghasilkan <em>draft struktur dan kerangka tulisan (outline)</em>. Kami sudah membuatkan kalimat pembuka, teori dasar, dan struktur bab yang sangat rapi. Namun, untuk detail kegiatan harian dan sejarah spesifik perusahaan, kamu WAJIB mengisinya sendiri sesuai pengalaman aslimu. Ini agar laporanmu tetap otentik dan lolos dari deteksi plagiarisme pembimbing.</p>
              )
            },
            {
              question: 'Tool ini cocok untuk jurusan SMK apa saja?',
              answer: (
                <p>Tool ini menggunakan kecerdasan buatan yang memahami kurikulum SMK. Jadi, alat ini cocok untuk <strong>semua jurusan</strong>, mulai dari TKJ, RPL, Akuntansi (AKL), Otomotif (TKRO/TBSM), Tata Boga, Perhotelan, hingga Multimedia/DKV. Cukup ketik jurusanmu di kolom form, dan AI akan menyesuaikan isi laporannya.</p>
              )
            },
            {
              question: 'Bagaimana jika tempat magang saya bukan perusahaan besar (misal bengkel atau UMKM)?',
              answer: (
                <p>Tidak masalah. Tetap ketik nama UMKM atau bengkel tersebut di kolom &quot;Nama Perusahaan&quot;. Laporan PKL tidak membedakan apakah kamu magang di BUMN atau di toko lokal; yang dinilai adalah kesesuaian antara pekerjaan yang dilakukan dengan jurusan kompetensi keahlianmu.</p>
              )
            },
            {
              question: 'Apakah format laporannya sesuai dengan aturan sekolah saya?',
              answer: (
                <p>Tool ini menggunakan format standar Laporan PKL Nasional yang digunakan 90% SMK di Indonesia (Sistem 4 Bab). Jika sekolahmu memiliki pedoman penulisan khusus (misal 5 Bab), kamu tinggal menyesuaikan kerangka ini dan memindahkan isinya sesuai buku panduan dari sekolah.</p>
              )
            }
          ]}
        />
      </div>

      {/* Related Tools Section */}
      <div className="mt-12 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Coba Tools Bermanfaat Lainnya</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/tools/parafrase" className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">Parafrase Makalah</h4>
            </div>
            <p className="text-sm text-slate-600">Hindari plagiasi saat menyalin teori dari internet ke dalam laporanmu.</p>
          </Link>
          <Link href="/tools/grammar-eyd" className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Cek Ejaan (EYD)</h4>
            </div>
            <p className="text-sm text-slate-600">Pastikan laporan resmimu tidak ada typo dan sesuai kaidah bahasa baku.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

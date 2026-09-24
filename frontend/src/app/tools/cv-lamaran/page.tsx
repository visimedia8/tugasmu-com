/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import CVLamaranClient from './CVLamaranClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { Briefcase, CheckCircle, FileText } from 'lucide-react';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Generator CV & Surat Lamaran Kerja ATS Friendly - Khusus Lulusan SMK',
  description: 'Buat CV dan Surat Lamaran Kerja otomatis yang lolos sistem ATS HRD. Dirancang khusus untuk Fresh Graduate lulusan SMK agar cepat dapat panggilan kerja.',
  alternates: { canonical: '/tools/cv-lamaran' },
};

export default function CVLamaranPage() {
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Generator CV & Surat Lamaran Kerja (Otomatis)
        </h1>
        <p className="text-slate-600 text-lg">
          Baru lulus SMK dan bingung cara melamar kerja? Masukkan jurusan dan tempat PKL-mu, AI HRD kami akan membuatkan draf <em>Cover Letter</em> dan teks CV berstandar ATS yang dilirik oleh perusahaan.
        </p>
      </div>

      <CVLamaranClient />

      <RelatedTools toolIds={["proposal-usaha","akuntansi-solver","penjelas-kejuruan"]} />

      {/* SEO Helpful Content Section */}
      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-sky-500" />
            Rahasia Lolos Seleksi HRD bagi Fresh Graduate SMK
          </h2>
          <p>
            Mencari kerja bagi lulusan baru (<em>Fresh Graduate</em>) SMK memiliki tantangannya sendiri. Kamu bersaing dengan ribuan pelamar lain yang mungkin memiliki jenjang pendidikan lebih tinggi atau pengalaman lebih banyak. Kunci utamanya ada pada dokumen pertamamu: <strong>Surat Lamaran (Cover Letter)</strong> dan <strong>Curriculum Vitae (CV)</strong>.
          </p>
          
          <h3>Apa itu ATS-Friendly?</h3>
          <p>
            Banyak perusahaan besar sekarang menggunakan <em>Applicant Tracking System</em> (ATS). Ini adalah software robot milik HRD yang menyeleksi CV secara otomatis sebelum dibaca oleh manusia. CV yang terlalu banyak desain, warna-warni, atau grafik aneh-aneh (seperti <em>skill bar</em>) akan otomatis <strong>DITOLAK</strong> oleh sistem ini karena tidak terbaca.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Gunakan Template Minimalis:</strong> Hindari template Canva yang terlalu penuh desain. Gunakan format teks standar dengan *bullet points*.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Kata Kunci (Keywords):</strong> Robot ATS mencari kata kunci yang cocok dengan lowongan kerja. Oleh karena itu, penting memasukkan *hard skills* jurusanmu.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Tonjolkan Pengalaman PKL:</strong> Sebagai lulusan SMK, nilai jual utamamu adalah masa magang (Prakerin/PKL). Tuliskan sebagai pengalaman kerja pertamamu.</span>
            </li>
          </ul>

          <h3>Peran Penting Surat Lamaran (Cover Letter)</h3>
          <p>
            Surat lamaran bukan sekadar formalitas "berikut saya lampirkan CV". Surat ini adalah tempat kamu 'menjual diri'. Paragraf pertama harus langsung menarik perhatian, paragraf kedua membuktikan kamu punya *skill* yang dibutuhkan, dan paragraf penutup menunjukkan antusiasme. AI TugasMu sudah merancang struktur psikologis ini secara otomatis.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQAccordion
          title="Pertanyaan Seputar Pembuatan CV & Lamaran"
          description="Panduan tentang cara memaksimalkan tool ini untuk persiapan karirmu."
          faqs={[
            {
              question: 'Apakah CV yang dihasilkan berbentuk PDF/Gambar?',
              answer: (
                <p><strong>Tidak.</strong> Tool ini menghasilkan <em>teks (copywriting)</em> berstandar ATS. Kamu harus menyalin (<em>copy</em>) teks ini dan menempelkannya (<em>paste</em>) ke dalam Microsoft Word, Google Docs, atau template CV minimalis favoritmu.</p>
              )
            },
            {
              question: 'Saya belum pernah bekerja, apa yang harus ditulis di pengalaman?',
              answer: (
                <p>Sebagai siswa SMK, pengalaman Praktik Kerja Lapangan (PKL), magang, atau keterlibatan aktif di Organisasi Siswa (OSIS/Pramuka/Ekskul) sangat dihitung oleh HRD. Ketikkan saja nama tempat PKL-mu beserta kegiatan yang kamu lakukan.</p>
              )
            },
            {
              question: 'Apakah bahasa yang digunakan sudah formal?',
              answer: (
                <p>Tentu saja. AI telah diprogram (sebagai konsultan karir) untuk menggunakan bahasa Indonesia baku yang sangat profesional, bebas dari *typo*, dan terstruktur rapi.</p>
              )
            }
          ]}
        />
      </div>

      {/* Related Tools Section */}
      <div className="mt-12 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Persiapan Kerja Lainnya</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/tools/laporan-pkl" className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">Laporan PKL</h4>
            </div>
            <p className="text-sm text-slate-600">Masih magang? Buat laporan PKL-mu di sini untuk memastikan nilai kelulusanmu maksimal sebelum melamar kerja.</p>
          </Link>
          <Link href="/tools/grammar-eyd" className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Cek Ejaan (EYD)</h4>
            </div>
            <p className="text-sm text-slate-600">Jika kamu mau menyusun email lamaran sendiri, pastikan bebas typo dengan tool ini.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

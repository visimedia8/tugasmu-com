/* eslint-disable react/no-unescaped-entities */
import PenjelasKejuruanClient from './PenjelasKejuruanClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Penjelas Konsep Materi Kejuruan SMK - TugasMu',
  description: 'Tanya teori teknis spesifik jurusanmu. Mulai dari mesin, koding, hingga resep, dijawab dengan bahasa praktikal dunia kerja.',
  alternates: { canonical: '/tools/penjelas-kejuruan' },
};

export default function PenjelasKejuruanPage() {
  const faqs = [
  {
    "q": "Apakah semua jurusan SMK didukung?",
    "a": "<p>Ya! Mulai dari rumpun teknologi, bisnis manajemen, pariwisata, hingga agribisnis. Cukup pilih kategori jurusan terdekat dan tanyakan konsepnya.</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Tanya Jawab Materi Kejuruan SMK (Semua Jurusan)
        </h1>
        <p className="text-slate-600 text-lg">
          Dapatkan penjelasan teori kejuruan yang sering kali tidak ada di buku paket umum. Langsung dari AI Ahli.
        </p>
      </div>

      <PenjelasKejuruanClient />

      <RelatedTools toolIds={["proposal-usaha","akuntansi-solver","cv-lamaran"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">engineering</span>
            Mengapa Anak SMK Harus Kuat di Teori Sebelum Praktik
          </h2>
          <p>Banyak siswa SMK yang tidak sabar ingin langsung memegang alat di bengkel atau lab, tapi sering mengabaikan teori. Padahal di dunia kerja industri (DUDI), pemahaman teori adalah yang membedakan <strong>Teknisi Ahli</strong> dan sekadar <strong>Tukang Suruh</strong>.</p><p>Jika kamu paham cara kerja sistem pembakaran injeksi (Otomotif) atau topologi jaringan (TKJ) secara teori, kamu bisa menganalisis masalah (troubleshooting) saat terjadi kerusakan yang tidak wajar.</p>
        </div>
      </div>

      <div className="mt-12">
        <FAQAccordion
          title="Pertanyaan Seputar Tool Ini"
          description="Panduan singkat penggunaan."
          faqs={faqs.map(f => ({ question: f.q, answer: <div dangerouslySetInnerHTML={{ __html: f.a }} /> }))}
        />
      </div>
    </div>
  );
}
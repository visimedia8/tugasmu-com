/* eslint-disable react/no-unescaped-entities */
import AkuntansiSolverClient from './AkuntansiSolverClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Kalkulator Akuntansi (Jurnal Umum, Penyesuaian) - TugasMu',
  description: 'Bantu mengerjakan soal transaksi akuntansi step-by-step dari Persamaan Dasar hingga Neraca, khusus anak SMK Akuntansi.',
  alternates: { canonical: '/tools/akuntansi-solver' },
};

export default function AkuntansiSolverPage() {
  const faqs = [
  {
    "q": "Apakah alat ini bisa langsung meng-generate laporan keuangan utuh (Neraca Lajur)?",
    "a": "<p>Sangat disarankan memasukkan transaksi satu per satu atau per kelompok kecil agar AI bisa menjelaskan logikanya dengan akurat dan kamu benar-benar paham alurnya.</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Kalkulator & Solver Akuntansi SMK
        </h1>
        <p className="text-slate-600 text-lg">
          Ucapkan selamat tinggal pada tugas akuntansi yang tidak balance. Pahami logika Debit dan Kredit.
        </p>
      </div>

      <AkuntansiSolverClient />

      <RelatedTools toolIds={["proposal-usaha","penjelas-kejuruan","cv-lamaran"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">calculate</span>
            Rahasia Selalu Balance Mengerjakan Soal Akuntansi
          </h2>
          <p>Mimpi buruk terbesar anak SMK Akuntansi atau mahasiswa Ekonomi adalah ketika total Debit dan Kredit di akhir laporan <strong>tidak balance (seimbang)</strong>. Jika tidak balance, berarti ada yang salah sejak pencatatan Jurnal Umum.</p><ul><li><strong>Hafalkan Saldo Normal:</strong> Harta (Debit), Utang (Kredit), Modal (Kredit), Pendapatan (Kredit), Beban (Debit).</li><li><strong>Analisis Efek Ganda:</strong> Setiap transaksi minimal menyentuh dua akun. Beli barang tunai berarti Harta(+) di Debit, dan Kas(-) di Kredit.</li></ul>
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
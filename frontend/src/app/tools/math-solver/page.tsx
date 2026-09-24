import MathSolverClient from './MathSolverClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Penjelas Soal Matematika Step-by-Step — Cara Mengerjakan Soal Cerita',
  description: 'Pahami cara mengerjakan soal matematika SD, SMP, SMA secara bertahap. AI menjelaskan setiap langkah dengan rumus, alasan, dan tips agar tidak salah lagi.',
  alternates: { canonical: '/tools/math-solver' },
};

export default function MathSolverPage() {
  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Penjelas Soal Matematika Step-by-Step
        </h1>
        <p className="text-slate-600 text-lg">
          Ketik soal matematikamu — AI akan menjelaskan setiap langkah penyelesaian secara detail, lengkap dengan rumus dan alasannya.
        </p>
      </div>

      <MathSolverClient />

      <RelatedTools toolIds={["generator-soal","rangkuman","simulasi-utbk"]} />

      <FAQAccordion
        title="Panduan & FAQ: Penjelas Soal Matematika"
        description="Pertanyaan seputar cara menggunakan AI untuk memahami langkah pengerjaan soal matematika."
        faqs={[
          {
            question: 'Jenis soal matematika apa saja yang bisa dijelaskan?',
            answer: (
              <>
                <p>Tool ini bisa menjelaskan hampir semua jenis soal matematika SD hingga SMA, termasuk: <strong>soal cerita</strong> (volume, luas, jarak-waktu-kecepatan), <strong>aljabar</strong> (persamaan linear, kuadrat, sistem persamaan), <strong>geometri</strong> (bangun datar dan ruang), <strong>statistika</strong> (rata-rata, median, modus), <strong>trigonometri</strong>, dan <strong>matriks</strong>. Sertakan semua angka dan konteks dalam soal agar penjelasan lebih akurat.</p>
              </>
            )
          },
          {
            question: 'Kenapa AI membutuhkan waktu lebih lama dari tools lain?',
            answer: (
              <>
                <p>Tool ini menggunakan <strong>AI model reasoning khusus</strong> yang dirancang untuk berpikir langkah demi langkah sebelum menjawab — mirip cara guru matematika memeriksa soal sebelum menjelaskan. Proses ini membutuhkan waktu 10–30 detik, tetapi hasilnya jauh lebih akurat dan terstruktur dibanding model AI biasa.</p>
              </>
            )
          },
          {
            question: 'Apakah penjelasan ini bisa digunakan untuk memahami, bukan sekadar menyalin jawaban?',
            answer: (
              <>
                <p>Inilah tujuan utama TugasMu. Setiap penjelasan mencakup: (1) apa yang diketahui, (2) apa yang ditanya, (3) rumus yang digunakan beserta penjelasan konsepnya, (4) langkah perhitungan bertahap, dan (5) tips agar tidak salah di soal serupa. Pahami konsepnya dulu — baru kerjakan sendiri soal latihan berikutnya.</p>
              </>
            )
          },
          {
            question: 'Bisakah soal dengan foto atau gambar dikirim ke tool ini?',
            answer: (
              <>
                <p>Saat ini tool hanya menerima <strong>input teks</strong>. Jika soalmu berupa foto, ketik ulang teks soalnya secara lengkap termasuk semua angka dan keterangan gambar. Fitur input foto (OCR) sedang dalam pengembangan untuk versi berikutnya.</p>
              </>
            )
          },
        ]}
      />
    </div>
  );
}

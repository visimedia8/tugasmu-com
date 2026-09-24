import GeneratorSoalClient from './GeneratorSoalClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Generator Soal Latihan & Kunci Jawaban',
  description: 'Buat soal latihan otomatis beserta kunci jawabannya untuk SD, SMP, dan SMA.',
  alternates: { canonical: '/tools/generator-soal' },
};

export default function GeneratorSoalPage() {
  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Generator Soal Latihan
        </h1>
        <p className="text-slate-600 text-lg">
          Buat 10 soal latihan (Pilihan Ganda / Essay) lengkap dengan kunci jawabannya dalam hitungan detik.
        </p>
      </div>
      
      <GeneratorSoalClient />

      <RelatedTools toolIds={["rangkuman","math-solver","simulasi-utbk"]} />

      <FAQAccordion 
        title="Panduan & FAQ: Generator Soal AI"
        description="Pertanyaan seputar pembuatan soal otomatis untuk latihan siswa maupun ulangan harian guru tingkat SD-SMA."
        faqs={[
          {
            question: "Bagaimana cara membuat soal HOTS untuk Kurikulum Merdeka?",
            answer: (
              <>
                <p>Cukup masukkan topik materi spesifik pada kolom teks, lalu pilih tingkat kesulitan <strong>Sulit / HOTS</strong>. AI kami yang telah disesuaikan dengan standar Kurikulum Merdeka akan otomatis menyusun pertanyaan yang menguji nalar kritis, kemampuan analisis, dan evaluasi siswa, bukan sekadar hafalan biasa.</p>
              </>
            )
          },
          {
            question: "Apakah guru bisa menggunakan AI pembuat soal ini untuk ulangan harian?",
            answer: (
              <>
                <p>Tentu saja! Banyak guru di Indonesia telah menggunakan Generator Soal TugasMu untuk menyusun bank soal ulangan harian, penilaian tengah semester (PTS), atau kuis dadakan. Setiap set soal yang dihasilkan sudah dilengkapi dengan kunci jawaban dan pembahasan singkat yang bisa langsung disalin ke Microsoft Word atau Google Forms.</p>
              </>
            )
          },
          {
            question: "Mata pelajaran apa saja yang didukung oleh Generator Soal AI TugasMu?",
            answer: (
              <>
                <p>Generator soal kami mendukung hampir seluruh mata pelajaran umum, termasuk Matematika, IPA (Fisika, Kimia, Biologi), IPS (Sejarah, Geografi, Ekonomi), Bahasa Indonesia, Bahasa Inggris, PKn, hingga Pendidikan Agama. Pastikan untuk memilih <strong>Mata Pelajaran</strong> yang tepat pada menu dropdown (atau ketik spesifik di teks) agar konteks soalnya akurat.</p>
              </>
            )
          },
          {
            question: "Bisakah saya membuat soal pilihan ganda lengkap dengan kunci jawaban dan pembahasannya?",
            answer: (
              <>
                <p>Ya. Anda bisa memilih jenis soal <strong>Pilihan Ganda</strong> atau <strong>Essay</strong>. Sistem kami secara bawaan akan mencantumkan opsi A, B, C, D (atau E untuk tingkat SMA), beserta kunci jawaban yang ditebalkan (bold) di akhir setiap soal atau di bagian khusus, sehingga Anda tidak perlu memikirkan pengecoh (distractor) sendiri.</p>
              </>
            )
          },
          {
            question: "Apakah tool ini cocok untuk latihan persiapan SNBT/UTBK siswa SMA?",
            answer: (
              <>
                <p>Sangat cocok. Bagi siswa kelas 12 yang sedang bersiap menghadapi ujian masuk perguruan tinggi (SNBT/UTBK), gunakan tool ini dengan mengetikkan materi spesifik (misal: &quot;Soal Penalaran Matematika atau Literasi Bahasa Indonesia UTBK&quot;) dan atur tingkat kesulitan ke tingkat yang paling menantang. AI akan mensimulasikan model soal analitis standar nasional.</p>
              </>
            )
          }
        ]}
      />
    </div>
  );
}

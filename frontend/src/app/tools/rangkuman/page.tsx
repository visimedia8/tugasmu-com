import type { Metadata } from 'next';
import RangkumanClient from './RangkumanClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Buat Rangkuman Otomatis',
  description: 'Ubah materi panjang jadi poin-poin penting yang gampang dihafal dengan AI TugasMu.',
};

export default function RangkumanPage() {
  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Buat Rangkuman
        </h1>
        <p className="text-slate-600 text-lg">
          Materi kepanjangan? Copy paste ke sini dan dapatkan poin-poin utama yang siap untuk dicatat atau dihafal.
        </p>
      </div>
      
      <RangkumanClient />

      <RelatedTools toolIds={["generator-soal","math-solver","simulasi-utbk"]} />

      <FAQAccordion 
        title="Panduan & FAQ: AI Perangkum Teks"
        description="Pelajari cara terbaik menyingkat materi sekolah, artikel, atau bab buku panjang tanpa kehilangan inti pembahasan."
        faqs={[
          {
            question: "Cara cepat merangkum buku paket sekolah SD, SMP, dan SMA?",
            answer: (
              <>
                <p>Tidak perlu membaca ratusan halaman secara manual. Kamu cukup memfoto atau menyalin teks dari buku digital (PDF) / artikel sumber lalu menempelkannya ke kotak input AI Perangkum Teks TugasMu. Sistem kami akan segera mengekstrak poin-poin utama menjadi daftar ringkas yang langsung bisa dipindahkan ke buku catatan.</p>
              </>
            )
          },
          {
            question: "Apakah AI Perangkum Teks ini bisa meringkas PDF atau materi panjang?",
            answer: (
              <>
                <p>Saat ini kamu bisa mem-paste teks panjang langsung ke kolom yang disediakan. Meskipun upload PDF belum didukung secara langsung, kamu dapat menyalin (copy-paste) bab per bab secara bertahap. Ini lebih disarankan agar poin penting tidak terlewat dan struktur ringkasan tetap jelas sesuai dengan pokok bahasan setiap babnya.</p>
              </>
            )
          },
          {
            question: "Apa keunggulan merangkum materi sejarah atau biologi menggunakan AI?",
            answer: (
              <>
                <p>Mata pelajaran hafalan seperti Sejarah, Biologi, atau Geografi biasanya penuh dengan teks narasi deskriptif. AI Perangkum TugasMu dilatih untuk memisahkan &quot;kata-kata pengisi&quot; dari &quot;konsep esensial&quot;. Untuk Biologi, AI akan langsung membuatkan list tahapan fotosintesis. Untuk Sejarah, AI akan membuatkan garis waktu (timeline) kejadian tanpa membuang tahun dan nama tokoh penting.</p>
              </>
            )
          },
          {
            question: "Apakah hasil rangkuman tetap mempertahankan poin penting Kurikulum Merdeka?",
            answer: (
              <>
                <p>Kurikulum Merdeka menekankan pada pemahaman literasi dan gagasan pokok. Tool ini tidak sekadar &quot;memotong teks di awal dan akhir&quot;, melainkan menganalisis ide pokok setiap paragraf (deduktif/induktif) dan menyajikannya dalam format <em>bullet points</em>. Sehingga konsep esensial yang ingin diuji oleh gurumu dipastikan tidak akan hilang.</p>
              </>
            )
          }
        ]}
      />
    </div>
  );
}

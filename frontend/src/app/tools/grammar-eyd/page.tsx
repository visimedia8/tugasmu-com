import type { Metadata } from 'next';
import GrammarEYDClient from './GrammarEYDClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Cek Grammar & EYD Bahasa Indonesia Online — Koreksi Otomatis',
  description: 'Periksa ejaan, tanda baca, kata baku, dan EYD tulisanmu secara otomatis. Setiap koreksi disertai penjelasan aturan agar kamu benar-benar paham.',
};

export default function GrammarEYDPage() {
  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Cek Grammar & EYD Bahasa Indonesia
        </h1>
        <p className="text-slate-600 text-lg">
          Periksa ejaan, tanda baca, dan kata baku dalam tulisanmu. Setiap koreksi disertai penjelasan aturan PUEBI agar kamu paham — bukan sekadar diperbaiki.
        </p>
      </div>

      <GrammarEYDClient />

      <RelatedTools toolIds={["kti-builder","makalah-builder","parafrase"]} />

      <FAQAccordion
        title="Panduan & FAQ: Cek Grammar & EYD"
        description="Pertanyaan seputar pemeriksaan ejaan dan tanda baca Bahasa Indonesia."
        faqs={[
          {
            question: 'Apa perbedaan EYD dan PUEBI dalam pengecekan ini?',
            answer: (
              <>
                <p>EYD (Ejaan yang Disempurnakan) adalah versi lama yang sudah digantikan oleh <strong>PUEBI (Pedoman Umum Ejaan Bahasa Indonesia)</strong> sejak 2015. Tool TugasMu menggunakan standar PUEBI terbaru. Perbedaan utama ada pada penggunaan huruf kapital, tanda hubung, dan penulisan kata serapan dari bahasa asing.</p>
              </>
            )
          },
          {
            question: 'Apakah tool ini bisa memeriksa karya ilmiah atau makalah panjang?',
            answer: (
              <>
                <p>Tool ini mendukung teks hingga <strong>3.000 karakter per pemeriksaan</strong>. Untuk makalah panjang, pecah tulisanmu per paragraf atau per halaman, lalu periksa satu per satu. Metode ini justru lebih efektif karena kamu bisa fokus memperbaiki bagian demi bagian secara menyeluruh.</p>
              </>
            )
          },
          {
            question: 'Jenis kesalahan apa saja yang bisa terdeteksi?',
            answer: (
              <>
                <p>Tool ini mendeteksi: (1) <strong>Kesalahan ejaan</strong> — huruf kapital, penulisan kata serapan; (2) <strong>Kata tidak baku</strong> — seperti &quot;nggak&quot; vs &quot;tidak&quot;, &quot;udah&quot; vs &quot;sudah&quot;; (3) <strong>Kata depan</strong> — penulisan &quot;di&quot; sebagai kata depan vs awalan; (4) <strong>Tanda baca</strong> — koma, titik, tanda tanya; (5) <strong>Imbuhan</strong> — penulisan me-, di-, ber- yang benar.</p>
              </>
            )
          },
          {
            question: 'Apakah hasilnya sudah menyertakan teks yang sudah dikoreksi?',
            answer: (
              <>
                <p>Ya. Output tool ini terdiri dari dua bagian: pertama, <strong>daftar koreksi</strong> dengan format [SALAH] → [BENAR] beserta alasannya; dan kedua, <strong>teks lengkap yang sudah diperbaiki</strong> yang bisa langsung kamu salin dan gunakan.</p>
              </>
            )
          },
        ]}
      />
    </div>
  );
}

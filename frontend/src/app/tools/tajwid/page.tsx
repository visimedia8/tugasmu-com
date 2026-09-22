/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import TajwidClient from './TajwidClient';
import FAQAccordion from '@/components/shared/FAQAccordion';

export const metadata: Metadata = {
  title: 'Analisis Hukum Tajwid & Tahsin Al-Quran - TugasMu',
  description: 'Cari tahu hukum bacaan tajwid (Idgham, Mad, Ikhfa) pada potongan ayat Al-Quran lengkap dengan cara membacanya.',
};

export default function TajwidPage() {
  const faqs = [
  {
    "q": "Bisakah saya mengetik menggunakan huruf abjad biasa (Latin)?",
    "a": "<p>Bisa. Meskipun hasil terbaik didapat dengan menggunakan teks Arab asli, AI kami cukup cerdas membaca pelafalan huruf latin (transliterasi) seperti \"minhum\" atau \"kufuwan ahad\".</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Penjelas Hukum Ilmu Tajwid
        </h1>
        <p className="text-slate-600 text-lg">
          Tugas Tahsin disuruh mencari hukum bacaan? Ketik potongan ayatnya, AI akan mencari Ikhfa, Idgham, dan Mad-nya.
        </p>
      </div>

      <TajwidClient />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">record_voice_over</span>
            Pentingnya Tajwid: Salah Panjang Pendek, Beda Arti
          </h2>
          <p>Membaca Al-Quran dengan tajwid yang benar (Tahsin) hukumnya wajib. Kesalahan sekecil membaca <em>Amiin</em> (pendek) padahal seharusnya <em>Aamiiin</em> (panjang) bisa mengubah total arti doa tersebut.</p><ul><li><strong>Hukum Nun Mati & Tanwin:</strong> Ikhfa (samar), Idzhar (jelas), Idgham (masuk/dengung), Iqlab (tukar huruf mim).</li><li><strong>Hukum Mad:</strong> Aturan panjang pendek bacaan, dari 2 harakat hingga 6 harakat.</li></ul><p>Tool ini adalah alat bantu bagi kamu yang sedang belajar mengurai (meng-i'rab) hukum tajwid di PR sekolah agama.</p>
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
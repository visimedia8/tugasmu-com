/* eslint-disable react/no-unescaped-entities */
import SimulasiUTBKClient from './SimulasiUTBKClient';
import { School, CheckCircle } from 'lucide-react';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Simulasi Soal UTBK SNBT - Penalaran & Literasi',
  description: 'Latihan soal UTBK SNBT terbaru dengan kunci jawaban dan pembahasan cerdas ala tutor bimbel.',
  alternates: { canonical: '/tools/simulasi-utbk' },
};

export default function SimulasiUTBKPage() {
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Simulasi UTBK & Try Out Instan
        </h1>
        <p className="text-slate-600 text-lg">
          Latih logika dan kecepatanmu untuk SNBT! Pilih subtes yang ingin dikerjakan, dan AI kami akan langsung membuatkan simulasi soal tipe penalaran lengkap dengan pembahasan ala tutor bimbel.
        </p>
      </div>

      <SimulasiUTBKClient />

      <RelatedTools toolIds={["generator-soal","rangkuman","math-solver"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <School className="w-6 h-6 text-sky-500" />
            Tips Menaklukkan Soal Penalaran SNBT
          </h2>
          <p>
            Format seleksi masuk PTN (SNBT) sekarang sangat berbeda dengan SBMPTN zaman dulu. Tidak ada lagi hafalan murni Fisika, Kimia, atau Sejarah (TKA). Semuanya bertumpu pada <strong>Tes Potensi Skolastik (TPS)</strong> dan <strong>Literasi</strong>. Intinya, ujian ini murni mengetes logika dan kemampuan bernalarmu.
          </p>
          
          <h3>Fokus Utama di TPS & Literasi</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Penalaran Matematika:</strong> Bukan sekadar hafal rumus, tapi mengaplikasikan angka ke dalam cerita dunia nyata (misal: menghitung diskon campuran atau probabilitas peluang kejadian majemuk).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Literasi Bahasa Indonesia & Inggris:</strong> Soal panjang-panjang. Triknya: jangan baca teksnya dulu. <strong>Baca soalnya duluan</strong>, temukan kata kunci, baru cari di dalam teks (metode <em>Skimming</em> & <em>Scanning</em>).</span>
            </li>
          </ul>

          <p>
            Biasakan dirimu mengerjakan soal HOTS (High Order Thinking Skills) setiap hari. Semakin sering logika otakmu dipaksa untuk memecahkan masalah, semakin cepat kamu menemukan pola jebakan soal saat hari H UTBK.
          </p>
        </div>
      </div>
    </div>
  );
}

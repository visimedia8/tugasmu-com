/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import KTIBuilderClient from './KTIBuilderClient';
import { Microscope, CheckCircle } from 'lucide-react';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Generator Karya Tulis Ilmiah (KTI) - Bab 1 sampai Bab 3',
  description: 'Buat struktur kerangka Karya Tulis Ilmiah (KTI) otomatis untuk siswa SMA/K. Mulai dari latar belakang hingga metodologi penelitian.',
};

export default function KTIBuilderPage() {
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Pembuat Karya Tulis Ilmiah (KTI)
        </h1>
        <p className="text-slate-600 text-lg">
          Tugas akhir kelas 11/12 yang paling bikin pusing. Masukkan judul KTI-mu, pilih metode, dan AI akan membuatkan kerangka lengkap Latar Belakang (BAB I), Teori (BAB II), dan Metodologi (BAB III) sebagai panduan menulismu.
        </p>
      </div>

      <KTIBuilderClient />

      <RelatedTools toolIds={["makalah-builder","parafrase","grammar-eyd"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Microscope className="w-6 h-6 text-sky-500" />
            Tips Mengerjakan KTI Agar Acc Guru Pembimbing
          </h2>
          <p>
            Karya Tulis Ilmiah (KTI) berbeda jauh dengan makalah biasa. KTI menuntutmu untuk melakukan penelitian mini, mengumpulkan data, dan menganalisisnya secara objektif, bukan sekadar meringkas teori dari buku cetak.
          </p>
          
          <h3>Benang Merah Penelitian (The Golden Thread)</h3>
          <p>
            Kesalahan paling umum siswa saat sidang KTI adalah tidak adanya "Benang Merah". Benang merah berarti:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Apa yang kamu tanyakan di <strong>Rumusan Masalah (Bab I)</strong>...</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Harus ada pisau analisis teorinya di <strong>Tinjauan Pustaka (Bab II)</strong>...</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Harus dijawab secara urut di <strong>Pembahasan (Bab IV)</strong>...</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Dan dirangkum persis urutannya di <strong>Kesimpulan (Bab V)</strong>.</span>
            </li>
          </ul>

          <p>
            Jika rumusan masalahmu ada 2, maka kesimpulanmu juga harus ada 2. Tidak boleh kurang, tidak boleh lebih. Tool ini didesain oleh Dosen Pembimbing untuk mengamankan <em>Golden Thread</em> tersebut sejak awal kamu mengajukan judul.
          </p>
        </div>
      </div>
    </div>
  );
}

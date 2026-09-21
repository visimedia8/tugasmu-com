import type { Metadata } from 'next';
import GeneratorSoalClient from './GeneratorSoalClient';

export const metadata: Metadata = {
  title: 'Generator Soal Latihan & Kunci Jawaban',
  description: 'Buat soal latihan otomatis beserta kunci jawabannya untuk SD, SMP, dan SMA.',
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
    </div>
  );
}

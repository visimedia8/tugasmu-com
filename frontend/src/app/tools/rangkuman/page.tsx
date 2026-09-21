import type { Metadata } from 'next';
import RangkumanClient from './RangkumanClient';

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
    </div>
  );
}

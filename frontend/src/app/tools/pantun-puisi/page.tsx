import type { Metadata } from 'next';
import PantunPuisiClient from './PantunPuisiClient';

export const metadata: Metadata = {
  title: 'Generator Pantun & Puisi',
  description: 'Buat pantun dan puisi seru untuk tugas sastramu otomatis dengan AI TugasMu.',
};

export default function PantunPuisiPage() {
  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Generator Pantun & Puisi
        </h1>
        <p className="text-slate-600 text-lg">
          Tugas bahasa Indonesia membuat pantun atau puisi? Masukkan temanya, dan AI kami akan membuat karya sastra indah sesuai keinginanmu.
        </p>
      </div>
      
      <PantunPuisiClient />
    </div>
  );
}

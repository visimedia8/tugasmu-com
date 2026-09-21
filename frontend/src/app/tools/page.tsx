import type { Metadata } from 'next';
import ToolsGrid from '@/components/home/ToolsGrid';

export const metadata: Metadata = {
  title: 'Direktori Tools AI',
  description: 'Pilih tool AI dari TugasMu untuk membantumu belajar, memparafrase teks, membuat soal, hingga membuat pantun.',
};

export default function ToolsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">Direktori Tools</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Semua alat bantu belajar bertenaga AI yang kami sediakan untuk membantumu mengerjakan tugas lebih cepat dan pintar.
        </p>
      </div>
      
      <ToolsGrid />
    </div>
  );
}

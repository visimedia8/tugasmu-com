import { CheckCircle, Zap, ShieldCheck, Users } from 'lucide-react';
import ToolsHubClient from './ToolsHubClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Direktori Tools AI',
  description: 'Pilih tool AI dari TugasMu untuk membantumu belajar, memparafrase teks, membuat soal, hingga membuat pantun.',
  alternates: { canonical: '/tools' },
};

export default function ToolsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 mb-8 mt-6">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> 100% Gratis
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <Zap className="w-4 h-4 text-amber-500" /> AI Super Cepat
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-slate-700" /> Privasi Aman
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <Users className="w-4 h-4 text-sky-600" /> Dipakai 10.000+ Pelajar
          </span>
        </div>

      <ToolsHubClient />
    </Suspense>
  );
}

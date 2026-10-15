import { CheckCircle, Zap, ShieldCheck, Users } from 'lucide-react';
import ToolsHubClient from './ToolsHubClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Direktori Tools AI Pelajar & Guru Gratis',
  description: 'Pilih 29 tool AI dari TugasMu untuk memparafrase tugas, menghitung rumus matematika, membuat soal kuis, hingga menulis naskah pidato otomatis.',
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Direktori Tools AI Pelajar & Guru Gratis | TugasMu',
    description: 'Pilih 29 tool AI dari TugasMu untuk bantu belajar dan tugas sekolah.',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Direktori%20Tools%20AI%20Gratis&category=Platform%20Edukasi',
        width: 1200,
        height: 630,
        alt: 'Tools AI TugasMu',
      },
    ],
  },
};

export default function ToolsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Direktori Tools AI Belajar Gratis TugasMu",
    "description": "Koleksi 29 alat bantu AI gratis untuk siswa SD, SMP, SMA/SMK dan Guru di Indonesia.",
    "url": "https://tugasmu.com/tools"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Suspense fallback={<div className="py-24 text-center text-slate-500">Memuat direktori tools...</div>}>
        <div className="max-w-7xl mx-auto px-4">
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
        </div>
      </Suspense>
    </>
  );
}

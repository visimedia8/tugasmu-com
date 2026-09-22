"use client";

import { useState } from 'react';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

export default function PenjelasKejuruanClient() {
  const { data: session } = useSession();

  const [jurusan, setJurusan] = useState('Teknik Komputer Jaringan (TKJ)');
  const [pertanyaan, setPertanyaan] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasil, setHasil] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setIsGenerating(true);

    try {
      let token: string | null = null;
      if (session) {
        try {
          const tokenRes = await fetch('/api/auth/token');
          const tokenData = await tokenRes.json() as { token?: string };
          token = tokenData.token ?? null;
        } catch {}
      }

      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://api.tugasmu.com';
      const res = await fetch(`${apiBase}/api/tools/penjelas-kejuruan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          jurusan,
          pertanyaan
        }),
      });

      const data = await res.json() as {
        success: boolean;
        data?: { hasil: string };
        code?: string;
        message?: string;
      };

      if (!res.ok || !data.success) {
        if (data.code === 'RATE_LIMITED') {
          setShowLimitModal(true);
        } else {
          setError(data.message || 'Terjadi kesalahan. Coba lagi.');
        }
        return;
      }

      setHasil(data.data?.hasil || '');
    } catch {
      setError('Koneksi gagal. Periksa internet kamu dan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleGenerate} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-on-surface">Jurusan SMK</label>
          <select
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)}
            disabled={isGenerating}
            className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50 appearance-none"
          >
            <option value="Teknik Komputer Jaringan (TKJ)">Teknik Komputer Jaringan (TKJ)</option>
            <option value="Otomotif (TKR/TSM)">Otomotif (TKR/TSM)</option>
            <option value="Tata Boga / Kuliner">Tata Boga / Kuliner</option>
            <option value="Perhotelan / Pariwisata">Perhotelan / Pariwisata</option>
            <option value="Multimedia / DKV">Multimedia / DKV</option>
            <option value="Farmasi">Farmasi</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-on-surface">Apa yang ingin kamu tanyakan?</label>
          <textarea
            value={pertanyaan}
            onChange={(e) => setPertanyaan(e.target.value)}
            disabled={isGenerating}
            rows={4}
            placeholder="Contoh (TKJ): Tolong jelaskan cara menghitung IP Subnetting /26."
            className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all resize-none disabled:opacity-50"
          />
        </div>
      </div>

      {error && (
        <p className="text-error font-body-sm text-body-sm bg-error-container px-4 py-2 rounded-xl">{error}</p>
      )}

      <button
        type="submit"
        disabled={isGenerating}
        className="w-full h-12 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
            <span>Memproses...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">engineering</span>
            <span>Generate Hasil</span>
          </>
        )}
      </button>

      {hasil && <HasilOutput hasil={hasil} />}

      {showLimitModal && (
        <UsageLimitModal isOpen={showLimitModal} onClose={() => setShowLimitModal(false)} />
      )}
    </form>
  );
}
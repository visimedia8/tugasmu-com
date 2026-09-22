"use client";

import { useState } from 'react';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

export default function AkuntansiSolverClient() {
  const { data: session } = useSession();

  const [transaksi, setTransaksi] = useState('');
  const [metode, setMetode] = useState('Jurnal Umum');
  
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
      const res = await fetch(`${apiBase}/api/tools/akuntansi-solver`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          transaksi,
          metode
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
          <label className="block font-label-md text-label-md text-on-surface">Soal / Daftar Transaksi</label>
          <textarea
            value={transaksi}
            onChange={(e) => setTransaksi(e.target.value)}
            disabled={isGenerating}
            rows={4}
            placeholder="Contoh: Dibeli perlengkapan kantor seharga Rp 5.000.000 secara tunai."
            className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all resize-none disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-on-surface">Jenis Pencatatan</label>
          <select
            value={metode}
            onChange={(e) => setMetode(e.target.value)}
            disabled={isGenerating}
            className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50 appearance-none"
          >
            <option value="Jurnal Umum">Jurnal Umum</option>
            <option value="Jurnal Penyesuaian">Jurnal Penyesuaian</option>
            <option value="Buku Besar">Buku Besar</option>
            <option value="Persamaan Dasar Akuntansi">Persamaan Dasar Akuntansi</option>
          </select>
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
            <span className="material-symbols-outlined text-[20px]">calculate</span>
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
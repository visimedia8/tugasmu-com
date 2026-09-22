"use client";

import { useState } from 'react';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

export default function SlideOutlineClient() {
  const { data: session } = useSession();

  const [topik, setTopik] = useState('');
  const [jumlahSlide, setJumlahSlide] = useState('7');
  const [audiens, setAudiens] = useState('Teman Sekelas & Guru');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasil, setHasil] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!topik.trim()) {
      setError('Tuliskan topik atau materi presentasi.');
      return;
    }

    setError('');
    setIsGenerating(true);

    try {
      let token: string | null = null;
      if (session) {
        try {
          const tokenRes = await fetch('/api/auth/token');
          const tokenData = await tokenRes.json() as { token?: string };
          token = tokenData.token ?? null;
        } catch {
          // guest mode
        }
      }

      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://api.tugasmu.com';
      const res = await fetch(`${apiBase}/api/tools/slide-outline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          topik,
          jumlahSlide,
          audiens,
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
          <label className="block font-label-md text-label-md text-on-surface">Topik Presentasi</label>
          <input
            type="text"
            value={topik}
            onChange={(e) => setTopik(e.target.value)}
            disabled={isGenerating}
            placeholder="Contoh: Sejarah Perang Dunia 2 dan Dampaknya bagi Indonesia"
            className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-on-surface">Jumlah Slide</label>
            <select
              value={jumlahSlide}
              onChange={(e) => setJumlahSlide(e.target.value)}
              disabled={isGenerating}
              className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50 appearance-none"
            >
              <option value="5">5 Slide (Sangat Singkat)</option>
              <option value="7">7 Slide (Standar)</option>
              <option value="10">10 Slide (Lengkap)</option>
              <option value="15">15 Slide (Sangat Lengkap)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-on-surface">Target Audiens</label>
            <select
              value={audiens}
              onChange={(e) => setAudiens(e.target.value)}
              disabled={isGenerating}
              className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50 appearance-none"
            >
              <option value="Teman Sekelas & Guru">Teman Sekelas & Guru Pembimbing</option>
              <option value="Guru Penguji Sidang">Guru Penguji Sidang (Formal)</option>
              <option value="Anak-anak / Junior">Adik Kelas (Santai & Visual)</option>
            </select>
          </div>
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
            <span>Menyusun Outline Slide...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">slideshow</span>
            <span>Buat Outline Presentasi</span>
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

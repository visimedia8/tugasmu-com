"use client";

import { useState } from 'react';
import FilterUniversal, { FilterState } from '@/components/tools/FilterUniversal';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

export default function TranslatorArabClient() {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<FilterState>({
    jenjang: 'Madrasah',
    kelas: '',
    kurikulum: 'merdeka',
    mata_pelajaran: '',
  });

  const [teks, setTeks] = useState('');
  const [mode, setMode] = useState('arab-indo');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasil, setHasil] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!filter.jenjang) {
      setError('Pilih jenjang pendidikan kamu terlebih dahulu.');
      return;
    }
    if (!teks.trim() || teks.trim().length < 2) {
      setError('Tuliskan teks yang ingin diterjemahkan.');
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
      const res = await fetch(`${apiBase}/api/tools/translator-arab`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          teks,
          mode,
          jenjang: filter.jenjang,
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
      <FilterUniversal value={filter} onChange={setFilter} disabled={isGenerating} />

      <div className="flex items-center justify-center gap-2 p-2 bg-surface-container-low rounded-xl border border-outline-variant w-fit mx-auto">
        <button
          type="button"
          onClick={() => setMode('arab-indo')}
          className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-colors ${mode === 'arab-indo' ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container'}`}
        >
          Arab
        </button>
        <span className="material-symbols-outlined text-on-surface-variant text-[18px]">sync_alt</span>
        <button
          type="button"
          onClick={() => setMode('indo-arab')}
          className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-colors ${mode === 'indo-arab' ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container'}`}
        >
          Indonesia
        </button>
      </div>

      <div className="space-y-2">
        <label className="block font-label-md text-label-md text-on-surface">Teks Masukan</label>
        <textarea
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
          disabled={isGenerating}
          dir={mode === 'arab-indo' ? 'rtl' : 'ltr'}
          rows={6}
          placeholder={mode === 'arab-indo' ? 'Masukkan teks Arab di sini...' : 'Masukkan teks Indonesia di sini...'}
          className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all resize-none disabled:opacity-50"
        />
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
            <span>Menerjemahkan...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">translate</span>
            <span>Terjemahkan Sekarang</span>
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

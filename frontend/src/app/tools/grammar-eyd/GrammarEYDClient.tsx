"use client";

import { useState } from 'react';
import FilterUniversal, { FilterState } from '@/components/tools/FilterUniversal';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

export default function GrammarEYDClient() {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<FilterState>({
    jenjang: '',
    kelas: '',
    kurikulum: 'merdeka',
    mata_pelajaran: '',
  });

  const [teks, setTeks] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasil, setHasil] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const MAX_CHARS = 3000;
  const charCount = teks.length;
  const charPct = Math.min((charCount / MAX_CHARS) * 100, 100);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!teks.trim() || teks.trim().length < 10) {
      setError('Teks minimal 10 karakter.');
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
      const res = await fetch(`${apiBase}/api/tools/grammar-eyd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          teks,
          jenjang: filter.jenjang || 'SMP',
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
      {/* Jenjang (opsional untuk konteks) */}
      <FilterUniversal value={filter} onChange={setFilter} disabled={isGenerating} />

      {/* Textarea input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block font-label-md text-label-md text-on-surface">
            Teks yang Ingin Diperiksa
          </label>
          <span className={`font-label-sm text-label-sm ${charCount > MAX_CHARS * 0.9 ? 'text-error' : 'text-on-surface-variant'}`}>
            {charCount}/{MAX_CHARS}
          </span>
        </div>
        <textarea
          value={teks}
          onChange={(e) => setTeks(e.target.value.slice(0, MAX_CHARS))}
          disabled={isGenerating}
          rows={8}
          placeholder="Tempel atau ketik tulisan kamu di sini. Contoh: &#10;&#10;Saya pergi ke sekolah bersama teman-teman saya, kami belajar tentang matematika dan bahasa indonesia. Guru kami sangat baik hati."
          className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all resize-none disabled:opacity-50"
        />
        {/* Progress bar */}
        <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
          <div
            className={`h-full transition-all rounded-full ${charPct > 90 ? 'bg-error' : 'bg-primary-container'}`}
            style={{ width: `${charPct}%` }}
          />
        </div>
      </div>

      {error && (
        <p className="text-error font-body-sm text-body-sm bg-error-container px-4 py-2 rounded-xl">{error}</p>
      )}

      <button
        type="submit"
        disabled={isGenerating || charCount < 10}
        className="w-full h-12 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
            <span>Sedang memeriksa...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">spellcheck</span>
            <span>Cek Grammar & EYD</span>
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

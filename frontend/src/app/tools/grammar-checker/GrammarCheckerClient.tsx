"use client";

import { useState } from 'react';
import FilterUniversal, { FilterState } from '@/components/tools/FilterUniversal';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

export default function GrammarCheckerClient() {
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

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!filter.jenjang) {
      setError('Pilih jenjang pendidikan kamu terlebih dahulu.');
      return;
    }
    if (!teks.trim() || teks.trim().length < 5) {
      setError('Tuliskan teks bahasa Inggris yang ingin diperiksa.');
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
      const res = await fetch(`${apiBase}/api/tools/grammar-checker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          teks,
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
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 mb-12">
      <form onSubmit={handleGenerate} className="space-y-6">
        <FilterUniversal value={filter} onChange={setFilter} disabled={isGenerating} />

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Teks Bahasa Inggris</label>
          <textarea
            value={teks}
            onChange={(e) => setTeks(e.target.value)}
            disabled={isGenerating}
            rows={8}
            placeholder="Paste essay atau tulisan bahasa Inggris kamu di sini..."
            className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:border-brand-navy focus:ring-4 focus:ring-brand-navy/10 outline-none transition-all resize-none disabled:opacity-50"
          />
        </div>

        {error && (
          <p className="text-rose-600 text-sm font-medium bg-rose-50 border border-rose-100 px-4 py-3 rounded-xl">{error}</p>
        )}

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full h-14 rounded-2xl bg-brand-navy hover:bg-slate-800 text-white font-semibold text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
            <span>Memeriksa Grammar...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">spellcheck</span>
            <span>Koreksi Sekarang</span>
          </>
        )}
      </button>

      {hasil && <HasilOutput hasil={hasil} />}

      {showLimitModal && (
        <UsageLimitModal isOpen={showLimitModal} onClose={() => setShowLimitModal(false)} />
      )}
      </form>
    </div>
  );
}

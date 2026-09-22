"use client";

import { useState } from 'react';
import FilterUniversal, { FilterState } from '@/components/tools/FilterUniversal';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

export default function MathSolverClient() {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<FilterState>({
    jenjang: '',
    kelas: '',
    kurikulum: 'merdeka',
    mata_pelajaran: '',
  });

  const [soal, setSoal] = useState('');
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
    if (!soal.trim() || soal.trim().length < 10) {
      setError('Tuliskan soal matematika yang ingin dijelaskan.');
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
      const res = await fetch(`${apiBase}/api/tools/math-solver`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          soal,
          jenjang: filter.jenjang,
          kelas: filter.kelas,
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

      {/* Input soal */}
      <div className="space-y-2">
        <label className="block font-label-md text-label-md text-on-surface">Soal Matematika</label>
        <textarea
          value={soal}
          onChange={(e) => setSoal(e.target.value)}
          disabled={isGenerating}
          rows={5}
          placeholder="Ketik atau tempel soal di sini. Contoh:&#10;&#10;Sebuah kolam renang berbentuk balok dengan panjang 25 m, lebar 10 m, dan kedalaman 2 m. Berapa volume air yang dibutuhkan untuk mengisi penuh kolam tersebut?"
          className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all resize-none disabled:opacity-50"
        />
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          💡 Tuliskan soal selengkap mungkin — sertakan semua angka dan satuan yang diketahui.
        </p>
      </div>

      {error && (
        <p className="text-error font-body-sm text-body-sm bg-error-container px-4 py-2 rounded-xl">{error}</p>
      )}

      {/* AI model notice */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-surface-container border border-slate-100">
        <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">psychology</span>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Tool ini menggunakan <strong className="text-on-surface">AI Reasoning khusus matematika</strong> — lebih akurat untuk soal cerita, aljabar, dan geometri.
        </p>
      </div>

      <button
        type="submit"
        disabled={isGenerating}
        className="w-full h-12 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
            <span>AI sedang berpikir... (maks 30 detik)</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">calculate</span>
            <span>Jelaskan Langkah-langkahnya</span>
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

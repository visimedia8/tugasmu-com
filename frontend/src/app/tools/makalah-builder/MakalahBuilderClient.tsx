"use client";

import { useState } from 'react';
import FilterUniversal, { FilterState } from '@/components/tools/FilterUniversal';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

export default function MakalahBuilderClient() {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<FilterState>({
    jenjang: 'SMA',
    kelas: '',
    kurikulum: 'merdeka',
    mata_pelajaran: '',
  });

  const [topik, setTopik] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasil, setHasil] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!filter.jenjang || !filter.mata_pelajaran) {
      setError('Pilih jenjang pendidikan dan mata pelajaran terlebih dahulu.');
      return;
    }
    if (!topik.trim()) {
      setError('Tuliskan topik atau judul makalah yang ingin dibuat.');
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
      const res = await fetch(`${apiBase}/api/tools/makalah-builder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          topik,
          jenjang: filter.jenjang,
          mataPelajaran: filter.mata_pelajaran,
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

      <div className="space-y-2">
        <label className="block font-label-md text-label-md text-on-surface">Topik / Judul Makalah</label>
        <input
          type="text"
          value={topik}
          onChange={(e) => setTopik(e.target.value)}
          disabled={isGenerating}
          placeholder="Contoh: Dampak Pemanasan Global terhadap Ekosistem Laut"
          className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50"
        />
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Pilih mata pelajaran di atas lalu ketik spesifik topik makalahmu. AI akan menyusunkan struktur dari Latar Belakang hingga Kesimpulan.
        </p>
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
            <span>Menyusun Struktur Makalah...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
            <span>Buat Struktur Makalah</span>
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

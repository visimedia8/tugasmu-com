"use client";

import { useState } from 'react';
import FilterUniversal, { FilterState } from '@/components/tools/FilterUniversal';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

export default function CVLamaranClient() {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<FilterState>({
    jenjang: 'SMK',
    kelas: 'Lulusan',
    kurikulum: 'merdeka',
    mata_pelajaran: '',
  });

  const [namaLengkap, setNamaLengkap] = useState('');
  const [posisiDilamar, setPosisiDilamar] = useState('');
  const [pengalaman, setPengalaman] = useState('');
  const [softSkills, setSoftSkills] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasil, setHasil] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!filter.mata_pelajaran) {
      setError('Pilih jurusan (mata pelajaran keahlian) kamu terlebih dahulu.');
      return;
    }
    if (!namaLengkap || !posisiDilamar) {
      setError('Nama lengkap dan posisi yang dilamar wajib diisi.');
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
      const res = await fetch(`${apiBase}/api/tools/cv-lamaran`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          namaLengkap,
          posisiDilamar,
          pengalaman,
          softSkills,
          jurusan: filter.mata_pelajaran,
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

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-on-surface">Nama Lengkap</label>
            <input
              type="text"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              disabled={isGenerating}
              placeholder="Contoh: Rina Aulia"
              className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-on-surface">Posisi yang Dilamar</label>
            <input
              type="text"
              value={posisiDilamar}
              onChange={(e) => setPosisiDilamar(e.target.value)}
              disabled={isGenerating}
              placeholder="Contoh: Staff Administrasi / Teknisi"
              className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-on-surface">Pengalaman PKL / Organisasi / Magang</label>
          <textarea
            value={pengalaman}
            onChange={(e) => setPengalaman(e.target.value)}
            disabled={isGenerating}
            rows={3}
            placeholder="Contoh: Pernah PKL di PT Maju Mundur sebagai admin input data selama 3 bulan."
            className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all resize-none disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-on-surface">Soft Skills (Opsional)</label>
          <input
            type="text"
            value={softSkills}
            onChange={(e) => setSoftSkills(e.target.value)}
            disabled={isGenerating}
            placeholder="Contoh: Disiplin, Komunikasi baik, Bisa kerja tim"
            className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50"
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
            <span>Menyusun CV & Lamaran...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">work</span>
            <span>Buat Surat Lamaran & CV</span>
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

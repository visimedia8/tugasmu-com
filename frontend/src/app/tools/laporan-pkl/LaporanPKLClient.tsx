"use client";

import { useState } from 'react';
import FilterUniversal, { FilterState } from '@/components/tools/FilterUniversal';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

export default function LaporanPKLClient() {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<FilterState>({
    jenjang: 'SMK',
    kelas: '11',
    kurikulum: 'merdeka',
    mata_pelajaran: '',
  });

  const [namaLengkap, setNamaLengkap] = useState('');
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [divisi, setDivisi] = useState('');
  const [lamaMagang, setLamaMagang] = useState('3 Bulan');

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
    if (!namaLengkap || !namaPerusahaan) {
      setError('Nama lengkap dan nama perusahaan tempat PKL wajib diisi.');
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
      const res = await fetch(`${apiBase}/api/tools/laporan-pkl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          namaLengkap,
          namaPerusahaan,
          divisi,
          lamaMagang,
          jurusan: filter.mata_pelajaran,
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

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-on-surface">Nama Lengkap</label>
          <input
            type="text"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            disabled={isGenerating}
            placeholder="Contoh: Budi Santoso"
            className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-on-surface">Tempat PKL (Nama Perusahaan)</label>
            <input
              type="text"
              value={namaPerusahaan}
              onChange={(e) => setNamaPerusahaan(e.target.value)}
              disabled={isGenerating}
              placeholder="Contoh: PT Telkom Indonesia"
              className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-on-surface">Lama Magang</label>
            <select
              value={lamaMagang}
              onChange={(e) => setLamaMagang(e.target.value)}
              disabled={isGenerating}
              className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50 appearance-none"
            >
              <option value="1 Bulan">1 Bulan</option>
              <option value="2 Bulan">2 Bulan</option>
              <option value="3 Bulan">3 Bulan</option>
              <option value="6 Bulan">6 Bulan</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-on-surface">Divisi/Bagian (Opsional)</label>
          <input
            type="text"
            value={divisi}
            onChange={(e) => setDivisi(e.target.value)}
            disabled={isGenerating}
            placeholder="Contoh: IT Support"
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
            <span>Menyusun Laporan...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">file_copy</span>
            <span>Buat Struktur Laporan</span>
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

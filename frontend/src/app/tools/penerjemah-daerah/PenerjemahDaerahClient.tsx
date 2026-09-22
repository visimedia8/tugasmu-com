"use client";

import { useState } from 'react';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

export default function PenerjemahDaerahClient() {
  const { data: session } = useSession();

  const [bahasaAsal, setBahasaAsal] = useState('Indonesia');
  const [bahasaTujuan, setBahasaTujuan] = useState('Jawa');
  const [tingkatKesopanan, setTingkatKesopanan] = useState('Halus / Sopan (Misal: Krama Alus)');
  const [teks, setTeks] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasil, setHasil] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const bahasaDaerahList = [
    'Indonesia',
    'Jawa',
    'Sunda',
    'Minangkabau',
    'Batak',
    'Bali',
    'Bugis',
    'Madura',
    'Inggris',
    'Jepang',
    'Mandarin'
  ];

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!teks.trim()) {
      setError('Masukkan teks yang ingin diterjemahkan.');
      return;
    }

    if (bahasaAsal === bahasaTujuan) {
      setError('Bahasa asal dan tujuan tidak boleh sama.');
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
      const res = await fetch(`${apiBase}/api/tools/penerjemah-daerah`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          teks,
          bahasaAsal,
          bahasaTujuan,
          tingkatKesopanan
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-on-surface">Dari Bahasa</label>
          <select
            value={bahasaAsal}
            onChange={(e) => setBahasaAsal(e.target.value)}
            disabled={isGenerating}
            className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50 appearance-none"
          >
            {bahasaDaerahList.map((b) => (
              <option key={`asal-${b}`} value={b}>{b}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-on-surface">Ke Bahasa</label>
          <select
            value={bahasaTujuan}
            onChange={(e) => setBahasaTujuan(e.target.value)}
            disabled={isGenerating}
            className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50 appearance-none"
          >
            {bahasaDaerahList.map((b) => (
              <option key={`tujuan-${b}`} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block font-label-md text-label-md text-on-surface">Tingkatan Bahasa (Opsional untuk Daerah)</label>
        <select
          value={tingkatKesopanan}
          onChange={(e) => setTingkatKesopanan(e.target.value)}
          disabled={isGenerating}
          className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50 appearance-none"
        >
          <option value="Halus / Sopan (Misal: Krama Alus)">Halus / Sopan (Kepada Orang Tua/Guru)</option>
          <option value="Menengah / Standar (Misal: Krama Inggil)">Menengah / Standar</option>
          <option value="Kasar / Akrab (Misal: Ngoko)">Akrab / Sehari-hari (Kepada Teman Sebaya)</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block font-label-md text-label-md text-on-surface">Teks Asli</label>
        <textarea
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
          disabled={isGenerating}
          rows={5}
          placeholder="Ketik teks yang ingin diterjemahkan di sini..."
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
            <span>Menerjemahkan Teks...</span>
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

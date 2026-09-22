"use client";

import { useState } from 'react';
import FilterUniversal, { FilterState } from '@/components/tools/FilterUniversal';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

const ACARA_OPTIONS = [
  '17 Agustus (HUT RI)',
  'Hari Guru Nasional',
  'Hari Ibu',
  'Perpisahan Sekolah',
  'Wisuda / Kelulusan',
  'Sumpah Pemuda',
  'Hari Pendidikan Nasional',
  'Hari Kartini',
  'Hari Anak Nasional',
  'Acara Lainnya (Custom)',
];

export default function PidatoClient() {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<FilterState>({
    jenjang: '',
    kelas: '',
    kurikulum: 'merdeka',
    mata_pelajaran: '',
  });

  const [tema, setTema] = useState('');
  const [acara, setAcara] = useState('');
  const [durasi, setDurasi] = useState(5);
  const [gaya, setGaya] = useState('semi-formal');

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasil, setHasil] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!filter.jenjang) {
      setError('Mohon pilih jenjang pendidikan terlebih dahulu.');
      return;
    }
    if (!acara) {
      setError('Mohon pilih jenis acara.');
      return;
    }
    if (!tema.trim()) {
      setError('Tema pidato tidak boleh kosong.');
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
      const res = await fetch(`${apiBase}/api/tools/pidato`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          tema,
          acara,
          durasi_menit: durasi,
          jenjang: filter.jenjang,
          gaya,
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

      {/* Pilih Acara */}
      <div className="space-y-2">
        <label className="block font-label-md text-label-md text-on-surface">Jenis Acara</label>
        <div className="relative">
          <select
            value={acara}
            onChange={(e) => setAcara(e.target.value)}
            disabled={isGenerating}
            required
            className="w-full h-11 px-3.5 pr-10 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all appearance-none disabled:opacity-50"
          >
            <option value="" disabled>Pilih jenis acara</option>
            {ACARA_OPTIONS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-3 top-2.5 text-on-surface-variant text-[20px]">expand_more</span>
        </div>
      </div>

      {/* Tema */}
      <div className="space-y-2">
        <label className="block font-label-md text-label-md text-on-surface">Tema Pidato</label>
        <input
          type="text"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          disabled={isGenerating}
          placeholder="Contoh: Pentingnya literasi digital bagi generasi muda"
          className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all disabled:opacity-50"
        />
      </div>

      {/* Durasi + Gaya */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-on-surface">
            Durasi Pidato: <span className="text-primary font-bold">±{durasi} menit</span>
          </label>
          <input
            type="range"
            min={3} max={15} step={1}
            value={durasi}
            onChange={(e) => setDurasi(Number(e.target.value))}
            disabled={isGenerating}
            className="w-full accent-primary-container"
          />
          <div className="flex justify-between text-body-sm text-on-surface-variant">
            <span>3 menit</span><span>15 menit</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-on-surface">Gaya Bahasa</label>
          <div className="flex flex-col gap-2">
            {[
              { val: 'formal', label: 'Formal (resmi, upacara)' },
              { val: 'semi-formal', label: 'Semi-Formal (sekolah, acara kelas)' },
              { val: 'santai', label: 'Santai (pertemanan, osis)' },
            ].map(({ val, label }) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gaya"
                  value={val}
                  checked={gaya === val}
                  onChange={() => setGaya(val)}
                  disabled={isGenerating}
                  className="w-4 h-4 accent-primary-container"
                />
                <span className="font-body-sm text-body-sm text-on-surface">{label}</span>
              </label>
            ))}
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
            <span>Sedang membuat pidato...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
            <span>Buat Teks Pidato</span>
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

"use client";

import { useState } from 'react';
import FilterUniversal, { FilterState } from '@/components/tools/FilterUniversal';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';

export default function PantunPuisiClient() {
  const [filter, setFilter] = useState<FilterState>({
    jenjang: '',
    kelas: '',
    kurikulum: 'merdeka',
    mata_pelajaran: '',
  });
  
  const [tema, setTema] = useState('');
  const [jenisKarya, setJenisKarya] = useState('pantun');
  const [variasi, setVariasi] = useState('nasional');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasil, setHasil] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!filter.jenjang) {
      setError('Mohon lengkapi pilihan jenjang.');
      return;
    }
    
    if (!tema.trim()) {
      setError('Tema karya sastra tidak boleh kosong.');
      return;
    }

    setError('');
    setIsGenerating(true);
    
    try {
      const res = await fetch('/api/tools/pantun-puisi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...filter, tema, jenis_karya: jenisKarya, variasi })
      });
      
      const data = await res.json();

      if (res.status === 429 && data.code === 'RATE_LIMITED') {
        setShowLimitModal(true);
        return;
      }

      if (!res.ok || !data.success) throw new Error(data.message);
      
      setHasil(data.data.hasil);
    } catch (err: unknown) {
      setError((err as Error).message || 'Sistem sedang sibuk. Coba lagi dalam beberapa saat.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <UsageLimitModal isOpen={showLimitModal} onClose={() => setShowLimitModal(false)} />
      <div>
        <form onSubmit={handleGenerate} className="bg-white border rounded-2xl p-4 md:p-6 shadow-sm">
        <FilterUniversal value={filter} onChange={setFilter} disabled={isGenerating} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-1">
            <label htmlFor="jenisKarya" className="block text-sm font-bold text-slate-700 mb-2">
              Jenis Karya
            </label>
            <select
              id="jenisKarya"
              className="w-full rounded-xl border-slate-300 border p-3 focus:ring-sky-500 focus:border-sky-500 bg-white"
              value={jenisKarya}
              onChange={(e) => setJenisKarya(e.target.value)}
              disabled={isGenerating}
            >
              <option value="pantun">Pantun</option>
              <option value="puisi">Puisi</option>
              <option value="cerpen">Cerita Pendek (Cerpen)</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label htmlFor="variasi" className="block text-sm font-bold text-slate-700 mb-2">
              Gaya Bahasa / Variasi
            </label>
            <select
              id="variasi"
              className="w-full rounded-xl border-slate-300 border p-3 focus:ring-sky-500 focus:border-sky-500 bg-white"
              value={variasi}
              onChange={(e) => setVariasi(e.target.value)}
              disabled={isGenerating}
            >
              <option value="nasional">Indonesia Standar (Nasional)</option>
              <option value="betawi">Gaya Betawi</option>
              <option value="melayu">Gaya Melayu</option>
              <option value="minang">Gaya Minang</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label htmlFor="tema" className="block text-sm font-bold text-slate-700 mb-2">
              Tema (Contoh: Pahlawan, Lingkungan Alam, Persahabatan)
            </label>
            <input
              id="tema"
              type="text"
              className="w-full rounded-xl border-slate-300 border p-3 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Masukkan tema karya sastranya..."
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              disabled={isGenerating}
              required
            />
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isGenerating || !tema.trim()}
          className="w-full bg-sky-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sedang Berkarya...
            </>
          ) : (
            '🎭 Buat Karya Sastra'
          )}
        </button>
      </form>
      
      <HasilOutput 
        hasil={hasil} 
        isGenerating={isGenerating} 
        onRegenerate={() => handleGenerate()} 
      />
    </div>
    </>
  );
}

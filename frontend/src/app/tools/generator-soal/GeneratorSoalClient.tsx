"use client";

import { useState } from 'react';
import FilterUniversal, { FilterState } from '@/components/tools/FilterUniversal';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';

export default function GeneratorSoalClient() {
  const [filter, setFilter] = useState<FilterState>({
    jenjang: '',
    kelas: '',
    kurikulum: 'merdeka',
    mata_pelajaran: '',
  });
  
  const [topik, setTopik] = useState('');
  const [tipeSoal, setTipeSoal] = useState('pilgan');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasil, setHasil] = useState('');
  const [error, setError] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!filter.jenjang || !filter.kelas || !filter.mata_pelajaran) {
      setError('Mohon lengkapi pilihan jenjang, kelas, dan mata pelajaran.');
      return;
    }
    
    if (!topik.trim()) {
      setError('Topik soal tidak boleh kosong.');
      return;
    }

    setError('');
    setIsGenerating(true);
    
    try {
      const res = await fetch('/api/tools/generator-soal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...filter, topik, tipe_soal: tipeSoal })
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
          <div className="md:col-span-2">
            <label htmlFor="topik" className="block text-sm font-bold text-slate-700 mb-2">
              Topik Soal (Contoh: Sistem Pencernaan Manusia)
            </label>
            <input
              id="topik"
              type="text"
              className="w-full rounded-xl border-slate-300 border p-3 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Masukkan topik atau bab..."
              value={topik}
              onChange={(e) => setTopik(e.target.value)}
              disabled={isGenerating}
              required
            />
          </div>
          <div>
            <label htmlFor="tipeSoal" className="block text-sm font-bold text-slate-700 mb-2">
              Tipe Soal
            </label>
            <select
              id="tipeSoal"
              className="w-full rounded-xl border-slate-300 border p-3 focus:ring-sky-500 focus:border-sky-500 bg-white"
              value={tipeSoal}
              onChange={(e) => setTipeSoal(e.target.value)}
              disabled={isGenerating}
            >
              <option value="pilgan">Pilihan Ganda (10 Soal)</option>
              <option value="essay">Essay (5 Soal)</option>
              <option value="campuran">Campuran (5 PG + 2 Essay)</option>
            </select>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isGenerating || !topik.trim()}
          className="w-full bg-sky-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Membuat Soal...
            </>
          ) : (
            '📝 Buat Soal Latihan'
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

"use client";

import { useState } from 'react';
import FilterUniversal, { FilterState } from '@/components/tools/FilterUniversal';
import HasilOutput from '@/components/tools/HasilOutput';

export default function RangkumanClient() {
  const [filter, setFilter] = useState<FilterState>({
    jenjang: '',
    kelas: '',
    kurikulum: 'merdeka',
    mata_pelajaran: '',
  });
  
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasil, setHasil] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!filter.jenjang || !filter.kelas || !filter.mata_pelajaran) {
      setError('Mohon lengkapi pilihan jenjang, kelas, dan mata pelajaran.');
      return;
    }
    
    if (!inputText.trim()) {
      setError('Teks materi tidak boleh kosong.');
      return;
    }

    setError('');
    setIsGenerating(true);
    
    try {
      const res = await fetch('/api/tools/rangkuman', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...filter, input_text: inputText })
      });
      
      if (!res.ok) throw new Error('Gagal menghubungi server TugasMu.');
      
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      
      setHasil(data.data.hasil);
    } catch (err: unknown) {
      setError((err as Error).message || 'Sistem sedang sibuk. Coba lagi dalam beberapa saat.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleGenerate} className="bg-white border rounded-2xl p-4 md:p-6 shadow-sm">
        <FilterUniversal value={filter} onChange={setFilter} disabled={isGenerating} />
        
        <div className="mb-6">
          <label htmlFor="inputText" className="block text-sm font-bold text-slate-700 mb-2">
            Paste Materi yang Ingin Dirangkum
          </label>
          <textarea
            id="inputText"
            rows={8}
            className="w-full rounded-xl border-slate-300 border p-4 focus:ring-sky-500 focus:border-sky-500 text-slate-800"
            placeholder="Salin bab buku, catatan, atau artikel panjang..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isGenerating}
            required
          ></textarea>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isGenerating || !inputText.trim()}
          className="w-full bg-sky-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Merangkum Materi...
            </>
          ) : (
            '📚 Buat Rangkuman'
          )}
        </button>
      </form>
      
      <HasilOutput 
        hasil={hasil} 
        isGenerating={isGenerating} 
        onRegenerate={() => handleGenerate()} 
      />
    </div>
  );
}

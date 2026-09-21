"use client";

import { useState } from 'react';
import FilterUniversal, { FilterState } from '@/components/tools/FilterUniversal';
import HasilOutput from '@/components/tools/HasilOutput';
import UsageLimitModal from '@/components/shared/UsageLimitModal';
import { useSession } from 'next-auth/react';

export default function ParafraseClient() {
  const { data: session } = useSession();
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
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!filter.jenjang || !filter.kelas || !filter.mata_pelajaran) {
      setError('Mohon lengkapi pilihan jenjang, kelas, dan mata pelajaran terlebih dahulu.');
      return;
    }
    
    if (!inputText.trim()) {
      setError('Teks tidak boleh kosong.');
      return;
    }

    if (inputText.length < 10) {
      setError('Teks terlalu pendek. Masukkan minimal 1 kalimat utuh.');
      return;
    }

    setError('');
    setIsGenerating(true);
    
    try {
      let token: string | null = null;
      if (session) {
        try {
          const tokenRes = await fetch('/api/auth/token');
          const tokenData = await tokenRes.json();
          token = tokenData.token;
        } catch (e) {
          console.error(e);
        }
      }
      
      const res = await fetch('/api/tools/parafrase', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ ...filter, input_text: inputText })
      });
      
      const data = await res.json();

      // Handle rate limit — show soft modal instead of hard error
      if (res.status === 429 && data.code === 'RATE_LIMITED') {
        setShowLimitModal(true);
        return;
      }
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Terjadi kesalahan pada AI.');
      }
      
      setHasil(data.data.hasil);
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error).message || 'Maaf, sistem AI TugasMu sedang sibuk. Coba lagi dalam beberapa saat ya!');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <UsageLimitModal isOpen={showLimitModal} onClose={() => setShowLimitModal(false)} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
      {/* Left Column: Input & Configuration */}
      <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-sm space-y-space-lg sticky top-20 border border-slate-100">
        <div className="flex items-center justify-between pb-space-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">tune</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Konfigurasi AI</h2>
          </div>
          <span className="font-label-sm text-label-sm text-primary px-2 py-0.5 rounded-full bg-primary-fixed">AI Mode Pintar</span>
        </div>

        <form onSubmit={handleGenerate} className="space-y-space-md">
          <FilterUniversal value={filter} onChange={setFilter} disabled={isGenerating} />
          
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between">
              <label htmlFor="inputText" className="block font-label-md text-label-md text-on-surface">
                Teks Sumber
              </label>
              <span className="text-outline font-body-sm text-body-sm">Min. 10 karakter</span>
            </div>
            <textarea
              id="inputText"
              rows={6}
              className="w-full p-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline resize-y"
              placeholder="Salin teks tugas atau makalah dari buku/website ke sini..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isGenerating}
              required
            ></textarea>
            <div className="flex justify-end text-xs text-on-surface-variant font-label-sm">
              {inputText.length} / 2000 karakter
            </div>
          </div>
          
          {error && (
            <div className="p-3 bg-error-container text-on-error-container rounded-xl font-label-sm text-label-sm flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              <span>{error}</span>
            </div>
          )}
          
          <div className="pt-space-xs space-y-space-xs">
            <button 
              type="submit" 
              disabled={isGenerating || !inputText.trim()}
              className="w-full py-3.5 px-space-lg rounded-xl bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                  <span>Memproses Teks...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                  <span>Parafrase Sekarang (Gratis)</span>
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-1.5 text-on-secondary-container font-label-sm text-label-sm text-center">
              <span className="material-symbols-outlined text-[15px] text-secondary">bolt</span>
              <span>100% Bebas Kuota Harian • Standar Guru</span>
            </div>
          </div>
        </form>
      </div>
      
      {/* Right Column: Interactive Output Preview */}
      <div className="lg:col-span-7 space-y-space-md">
        <HasilOutput 
          hasil={hasil} 
          isGenerating={isGenerating} 
          onRegenerate={() => handleGenerate()} 
        />
      </div>
    </div>
    </>
  );
}

"use client";

import { useState } from 'react';

interface HasilOutputProps {
  hasil: string;
  onRegenerate?: () => void;
  isGenerating?: boolean;
}

export default function HasilOutput({ hasil, onRegenerate, isGenerating = false }: HasilOutputProps) {
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const handleShare = async () => {
    if (!hasil) return;
    setIsSharing(true);
    try {
      const tokenRes = await fetch('/api/auth/token');
      const { token } = await tokenRes.json();
      if (!token) {
        alert('Silakan login terlebih dahulu untuk membagikan tugas.');
        setIsSharing(false);
        return;
      }
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tool_slug: window.location.pathname.split('/').pop(),
          title: 'Hasil TugasMu',
          output_text: hasil
        })
      });
      const data = await res.json();
      if (data.success) {
        setShareUrl(data.shareUrl);
      } else {
        alert(data.message || 'Gagal membagikan tugas');
      }
    } catch {
      alert('Terjadi kesalahan sistem');
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopy = async () => {
    if (!hasil) return;
    try {
      await navigator.clipboard.writeText(hasil);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!hasil && !isGenerating) return null;

  return (
    <>
      {/* Output Header & Controls Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 border border-slate-200">
        <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
          <button className="px-4 py-1.5 rounded-lg bg-white text-slate-800 font-semibold text-sm shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-brand-sky">school</span>
            <span>Hasil Akhir</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          {onRegenerate && (
            <button 
              onClick={onRegenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all disabled:opacity-50"
              title="Buat Ulang"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              <span className="hidden sm:inline">Regenerate</span>
            </button>
          )}
          <button 
            onClick={handleShare}
            disabled={isGenerating || !hasil || isSharing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all disabled:opacity-50"
            title="Bagikan"
          >
            {isSharing ? (
              <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="material-symbols-outlined text-[18px]">share</span>
            )}
            <span className="hidden sm:inline">Bagikan</span>
          </button>
          <button 
            onClick={handleCopy}
            disabled={isGenerating || !hasil}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-50"
            title="Salin Teks"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check_circle' : 'content_copy'}
            </span>
            <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Salin Teks'}</span>
          </button>
        </div>
      </div>

      {shareUrl && (
        <div className="mt-3 p-4 bg-sky-50 rounded-xl flex items-center justify-between gap-3 border border-sky-100 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-sky-900">Link Berhasil Dibuat</span>
            <span className="text-sm text-sky-600 truncate">{shareUrl}</span>
          </div>
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(shareUrl)
                alert('Link disalin!')
              }} 
              className="px-4 py-2 bg-white border border-sky-200 rounded-lg text-sm text-sky-700 font-semibold hover:bg-sky-50 transition-colors shadow-sm"
            >
              Copy
            </button>
            <a
              href={`https://wa.me/?text=Aku%20baru%20bikin%20tugas%20pakai%20TugasMu%20AI,%20hasilnya%20keren%20banget!%20Lihat%20deh:%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm flex items-center gap-2"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Output Content Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 relative min-h-[300px]">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10 rounded-3xl">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-brand-sky rounded-full animate-spin mb-4"></div>
            <p className="font-semibold text-slate-700 animate-pulse">TugasMu sedang memproses...</p>
          </div>
        ) : null}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-sky/10 text-brand-sky font-semibold text-xs uppercase tracking-wider">Output AI</span>
          </div>
        </div>
        
        <div className="prose prose-slate max-w-none whitespace-pre-wrap text-base text-slate-700 leading-relaxed">
          {hasil}
        </div>

        {hasil && !isGenerating && (
          <div className="mt-10 bg-amber-50 rounded-2xl p-5 flex gap-4 items-start border border-amber-100">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">lightbulb</span>
            </div>
            <div className="space-y-1">
              <div className="text-base text-amber-900 font-bold">Tips Anti-Terkecoh dari Kakak Tutor</div>
              <p className="text-sm text-amber-800/80 leading-relaxed">
                Pastikan untuk membaca ulang hasil dari AI sebelum menyalinnya ke buku tugasmu agar bahasanya benar-benar sesuai dengan gaya penulisanmu sehari-hari.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import { useState } from 'react';

interface HasilOutputProps {
  hasil: string;
  onRegenerate?: () => void;
  isGenerating?: boolean;
}

export default function HasilOutput({ hasil, onRegenerate, isGenerating = false }: HasilOutputProps) {
  const [copied, setCopied] = useState(false);

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
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-wrap items-center justify-between gap-space-sm border border-slate-100">
        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl">
          <button className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">school</span>
            <span>Hasil Akhir</span>
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          {onRegenerate && (
            <button 
              onClick={onRegenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold transition-all disabled:opacity-50"
              title="Buat Ulang"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              <span>Regenerate</span>
            </button>
          )}
          <button 
            onClick={handleCopy}
            disabled={isGenerating || !hasil}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary-container text-on-secondary-container hover:opacity-90 font-label-sm text-label-sm font-semibold transition-all disabled:opacity-50"
            title="Salin Teks"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check_circle' : 'content_copy'}
            </span>
            <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
          </button>
        </div>
      </div>

      {/* Output Content Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-sm space-y-space-md relative min-h-[300px] border border-slate-100">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-container-lowest/80 backdrop-blur-sm z-10 rounded-2xl">
            <div className="w-10 h-10 border-4 border-primary-container border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="font-label-md text-label-md text-on-surface animate-pulse">TugasMu sedang memproses...</p>
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm">Output AI</span>
          </div>
        </div>
        
        <div className="prose prose-slate max-w-none whitespace-pre-wrap font-body-md text-body-md text-on-surface leading-relaxed">
          {hasil}
        </div>

        {hasil && !isGenerating && (
          <div className="mt-8 bg-tertiary-fixed/30 rounded-xl p-space-md flex gap-space-sm items-start">
            <div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            </div>
            <div className="space-y-0.5">
              <div className="font-label-md text-label-md text-on-tertiary-fixed font-bold">Tips Anti-Terkecoh dari Kakak Tutor</div>
              <p className="font-body-sm text-body-sm text-on-tertiary-fixed-variant">
                Pastikan untuk membaca ulang hasil dari AI sebelum menyalinnya ke buku tugasmu agar bahasanya benar-benar sesuai dengan gaya penulisanmu sehari-hari.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

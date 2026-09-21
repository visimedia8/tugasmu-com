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
    <div className="mt-8 border rounded-xl overflow-hidden shadow-sm bg-white">
      <div className="bg-slate-50 border-b px-4 py-3 flex items-center justify-between">
        <h3 className="font-heading font-bold text-slate-800 flex items-center gap-2">
          <span className="text-xl">✨</span> Hasil AI
        </h3>
        <div className="flex gap-2">
          {onRegenerate && (
            <button 
              onClick={onRegenerate}
              disabled={isGenerating}
              className="text-sm px-3 py-1.5 font-medium text-slate-600 bg-white border rounded-md hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              🔄 Buat Ulang
            </button>
          )}
          <button 
            onClick={handleCopy}
            disabled={isGenerating || !hasil}
            className="text-sm px-3 py-1.5 font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-md hover:bg-sky-100 disabled:opacity-50 transition-colors"
          >
            {copied ? '✅ Tersalin' : '📋 Salin Teks'}
          </button>
        </div>
      </div>
      
      <div className="p-6 relative min-h-[200px]">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
            <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium text-slate-600 animate-pulse">TugasMu sedang berpikir keras...</p>
          </div>
        ) : null}
        
        <div className="prose prose-slate max-w-none whitespace-pre-wrap font-sans text-slate-800 leading-relaxed">
          {hasil}
        </div>
      </div>
      
      {/* AdSense Placeholder bawah */}
      <div className="bg-slate-100 border-t p-4 text-center">
        <p className="text-xs text-slate-400 font-mono">-- Tempat Iklan AdSense --</p>
      </div>
    </div>
  );
}

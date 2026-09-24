'use client';

import { useEffect, useRef } from 'react';

interface UsageLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  userTier?: string | null;
}

export default function UsageLimitModal({ isOpen, onClose, userTier }: UsageLimitModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-auto w-[92vw] max-w-md rounded-2xl p-0 shadow-2xl backdrop:bg-black/60 border-0 outline-none"
      onClick={(e) => { if (e.target === dialogRef.current) onClose(); }}
    >
      <div className="flex flex-col gap-0 overflow-hidden rounded-2xl bg-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-secondary p-6 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
          <div className="relative z-10">
            <span className="material-symbols-outlined text-[40px] mb-2 block" style={{ fontVariationSettings: "'FILL' 1" }}>
              rocket_launch
            </span>
            <h2 className="text-xl font-bold leading-tight">
              Kuota Harian Kamu Habis 🎯
            </h2>
            <p className="text-sm text-white/80 mt-1">
              Kamu sudah memakai 3 tools gratis hari ini.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {!userTier && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3 items-start">
              <span className="material-symbols-outlined text-green-600 text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Daftar akun gratis → 20x/hari</p>
                <p className="text-xs text-slate-500 mt-0.5">Login dengan Google, 10 detik. Tidak perlu password.</p>
              </div>
            </div>
          )}
          
          {userTier === 'free' && (
            <div className="text-sm text-slate-600 leading-relaxed mb-2">
              Kamu bisa isi ulang kuota dengan <b>Beli Kredit</b> mulai Rp10rb, atau <b>Upgrade Pro</b> untuk akses tanpa batas. Bisa juga dapat kuota gratis dengan ajak teman!
            </div>
          )}

          {!userTier && (
            <ul className="flex flex-col gap-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                20x generate per hari (dari 3x)
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Input teks lebih panjang (2.000 karakter)
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Semua mode output
              </li>
            </ul>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="px-6 pb-6 flex flex-col gap-3">
          {!userTier ? (
            <>
              <a href="/daftar" className="w-full text-center py-3 px-4 rounded-xl bg-primary text-white font-semibold text-sm shadow-md hover:opacity-90 transition-opacity active:scale-[0.98]">
                Daftar Gratis dengan Google →
              </a>
              <button onClick={onClose} className="w-full text-center py-2.5 px-4 rounded-xl text-slate-500 text-sm hover:bg-slate-100 transition-colors">
                Coba lagi besok
              </button>
            </>
          ) : (
            <>
              <a href="/akun" className="w-full text-center py-3 px-4 rounded-xl bg-primary text-white font-semibold text-sm shadow-md hover:opacity-90 transition-opacity active:scale-[0.98]">
                Beli Kredit (Mulai Rp10.000)
              </a>
              <a href="/harga" className="w-full text-center py-2.5 px-4 rounded-xl bg-sky-50 text-sky-600 font-semibold text-sm border border-sky-200 hover:bg-sky-100 transition-colors">
                Upgrade Pro (Rp29rb/bulan)
              </a>
              <a href="/akun" className="w-full text-center py-2.5 px-4 rounded-xl text-green-600 text-sm hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">group_add</span> Ajak teman, dapat +5 gratis/hari
              </a>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}

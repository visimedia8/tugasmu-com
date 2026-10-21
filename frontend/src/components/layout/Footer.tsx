import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 pt-12 pb-8 mt-auto text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-slate-200/70">
          {/* Brand & Trust Column */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col items-start text-left">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white shadow-sm">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <span className="font-bold text-slate-900 text-lg font-heading tracking-tight">TugasMu.com</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed mb-4">
              Platform AI edukasi gratis untuk siswa SD, SMP, SMA/SMK dan mahasiswa di Indonesia. Belajar mandiri jadi lebih terarah, cepat, dan mudah.
            </p>
            <div className="text-xs text-slate-500 space-y-1.5">
              <p>Email: <a href="mailto:halo@tugasmu.com" className="hover:text-sky-600 transition-colors">halo@tugasmu.com</a> | Telp: <span className="font-mono">089501988223</span></p>
              <p className="pt-0.5 text-slate-500">
                Pembayaran aman via <strong className="font-semibold text-slate-700">Duitku</strong> (QRIS, E-Wallet, VA)
              </p>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
            {/* Layanan & Fitur */}
            <div className="flex flex-col space-y-2.5">
              <span className="font-semibold text-slate-900 text-xs tracking-wider uppercase font-heading">Layanan</span>
              <Link href="/" className="hover:text-slate-900 transition-colors">Beranda</Link>
              <Link href="/tools" className="hover:text-slate-900 transition-colors">Direktori Tools</Link>
              <Link href="/kamus" className="hover:text-slate-900 transition-colors">Kamus Edukasi</Link>
              <Link href="/harga" className="hover:text-slate-900 transition-colors">Paket Premium</Link>
              <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog &amp; Panduan</Link>
            </div>

            {/* Editorial & Standar */}
            <div className="flex flex-col space-y-2.5">
              <span className="font-semibold text-slate-900 text-xs tracking-wider uppercase font-heading">Editorial</span>
              <Link href="/redaksi" className="hover:text-slate-900 transition-colors">Tim Redaksi</Link>
              <Link href="/kebijakan-editorial" className="hover:text-slate-900 transition-colors">Kebijakan Editorial</Link>
              <Link href="/peta-situs" className="hover:text-slate-900 transition-colors">Peta Situs</Link>
              <Link href="/kontak" className="hover:text-slate-900 transition-colors">Kontak</Link>
            </div>

            {/* Legal */}
            <div className="flex flex-col space-y-2.5 col-span-2 sm:col-span-1">
              <span className="font-semibold text-slate-900 text-xs tracking-wider uppercase font-heading">Legal</span>
              <Link href="/privasi" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
              <Link href="/syarat" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-left">
          <p>© 2026 TugasMu.com. Hak cipta dilindungi.</p>
          <p>Jakarta, Indonesia • Standar Kurikulum Merdeka Kemendikbudristek</p>
        </div>
      </div>
    </footer>
  );
}

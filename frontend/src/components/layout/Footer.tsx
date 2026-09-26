import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <span className="font-bold text-slate-900 text-base font-heading">TugasMu.com</span>
            </div>
            <div className="flex flex-col text-xs sm:text-sm text-slate-500">
              <span>© 2026 TugasMu.com. Hak cipta dilindungi.</span>
              <span className="mt-1 flex items-center justify-center sm:justify-start gap-1">
                Pembayaran aman via <strong>Duitku</strong> (QRIS, E-Wallet, VA)
              </span>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">Beranda</Link>
            <Link href="/harga" className="hover:text-slate-900 transition-colors">Premium</Link>
            <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
            <Link href="/privasi" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="/syarat" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link href="/kontak" className="hover:text-slate-900 transition-colors">Kontak</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

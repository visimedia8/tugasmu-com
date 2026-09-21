'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isMoneyPage = pathname.startsWith('/tools');

  return (
    <footer className="border-t bg-slate-50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">TugasMu</h3>
            <p className="text-sm text-slate-600 max-w-xs">
              Platform AI Gratis untuk bantu belajar siswa Indonesia. Bukan tools untuk curang, tapi teman pintar belajarmu.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Fitur</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/tools/parafrase" className="hover:text-slate-900">Parafrase</Link></li>
              <li><Link href="/tools/generator-soal" className="hover:text-slate-900">Latihan Soal</Link></li>
              <li><Link href="/tools/rangkuman" className="hover:text-slate-900">Rangkuman</Link></li>
              <li><Link href="/tools/pantun-puisi" className="hover:text-slate-900">Pantun & Puisi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Perusahaan & Edukasi</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              {!isMoneyPage && (
                <li><Link href="/blog" className="hover:text-slate-900 font-medium text-sky-600">Blog Edukasi</Link></li>
              )}
              <li><Link href="/tentang" className="hover:text-slate-900">Tentang Kami</Link></li>
              <li><Link href="/kontak" className="hover:text-slate-900">Kontak</Link></li>
              <li><Link href="/privasi" className="hover:text-slate-900">Kebijakan Privasi</Link></li>
              <li><Link href="/syarat" className="hover:text-slate-900">Syarat & Ketentuan</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} TugasMu.com. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}

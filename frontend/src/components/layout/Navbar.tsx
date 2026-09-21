'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isMoneyPage = pathname.startsWith('/tools');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-heading text-xl font-bold text-slate-900 tracking-tight">TugasMu</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/tools" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Tools
          </Link>
          {!isMoneyPage && (
            <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Blog
            </Link>
          )}
          <Link href="/tentang" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Tentang
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/guru" className="hidden md:inline-flex text-sm font-medium text-sky-600 hover:text-sky-700">
            Kontributor Guru
          </Link>
        </div>
      </div>
    </header>
  );
}

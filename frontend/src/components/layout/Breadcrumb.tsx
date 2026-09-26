"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;
  
  const segments = pathname.split('/').filter(Boolean);
  
  return (
    <div className="w-full bg-brand-cream border-b border-brand-navy/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex font-body-sm text-body-sm text-brand-navy/60" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Home
              </Link>
            </li>
            {segments.map((segment, index) => {
              const href = `/${segments.slice(0, index + 1).join('/')}`;
              const isLast = index === segments.length - 1;
              const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
              
              return (
                <li key={href}>
                  <div className="flex items-center">
                    <span className="mx-2 text-slate-400">/</span>
                    {isLast ? (
                      <span className="text-slate-900 font-medium" aria-current="page">
                        {title}
                      </span>
                    ) : (
                      <Link href={href} className="hover:text-slate-900 transition-colors">
                        {title}
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}

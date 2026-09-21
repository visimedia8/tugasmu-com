"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;
  
  const segments = pathname.split('/').filter(Boolean);
  
  return (
    <div className="bg-slate-50 border-b">
      <div className="container py-3">
        <nav className="flex text-sm text-slate-500" aria-label="Breadcrumb">
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

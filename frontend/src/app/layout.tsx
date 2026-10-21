/* eslint-disable @next/next/no-page-custom-font */
import { DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://tugasmu.com'),
  title: {
    template: '%s | TugasMu',
    default: 'TugasMu | AI yang ngerti pelajaran kamu',
  },
  description: 'Platform AI Gratis untuk Bantu Belajar Siswa Indonesia',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'TugasMu | AI yang ngerti pelajaran kamu',
    description: 'Platform AI Gratis untuk Bantu Belajar Siswa Indonesia',
    siteName: 'TugasMu',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/api/og?title=AI%20Yang%20Ngerti%20Pelajaran%20Kamu&category=Platform%20Edukasi',
        width: 1200,
        height: 630,
        alt: 'TugasMu Banner',
      },
    ],
  },
  other: {
    'google-adsense-account': 'ca-pub-3593394789144229',
  },
};

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { cn } from "@/lib/utils";
import Providers from '@/components/Providers';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect & DNS-Prefetch for Speed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />

        {/* Google Analytics 4 (Buffered Initialization - Zero Event Loss) */}
        <script
          id="google-analytics-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8K10RNGN76');
            `,
          }}
        />

        {/* Sweet Spot Loader for Third-Party Scripts (GA4 & AdSense) */}
        <script
          id="sweet-spot-loader"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var loaded = false;
                function loadScripts() {
                  if (loaded) return;
                  loaded = true;

                  // 1. Load GA4
                  var gaScript = document.createElement('script');
                  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-8K10RNGN76';
                  gaScript.async = true;
                  document.head.appendChild(gaScript);

                  // 2. Load Google AdSense
                  var adScript = document.createElement('script');
                  adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3593394789144229';
                  adScript.crossOrigin = 'anonymous';
                  adScript.async = true;
                  document.head.appendChild(adScript);
                }

                var events = ['scroll', 'touchstart', 'mousemove', 'keydown', 'click'];
                function trigger() {
                  loadScripts();
                  events.forEach(function(e) { window.removeEventListener(e, trigger); });
                }
                events.forEach(function(e) { window.addEventListener(e, trigger, { passive: true }); });

                if ('requestIdleCallback' in window) {
                  requestIdleCallback(function() { setTimeout(loadScripts, 5000); });
                } else {
                  setTimeout(loadScripts, 6000);
                }
              })();
            `,
          }}
        />

        {/* Global WebSite & Organization Schemas (Koray SSOT Foundation) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TugasMu",
              "url": "https://tugasmu.com",
              "description": "Platform AI Gratis untuk Bantu Belajar Siswa Indonesia",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://tugasmu.com/blog?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TugasMu",
              "url": "https://tugasmu.com",
              "logo": "https://tugasmu.com/logo.png",
              "description": "Platform AI Edukasi Gratis untuk Siswa SD, SMP, SMA/SMK di Indonesia.",
              "email": "halo@tugasmu.com"
            })
          }}
        />
      </head>
      <body className={cn("font-sans bg-brand-cream text-brand-navy flex flex-col min-h-screen", dmSans.variable, fraunces.variable)}>
        <Providers>
          <Navbar />
          <Breadcrumb />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}


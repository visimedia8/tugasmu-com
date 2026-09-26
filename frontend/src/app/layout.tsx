import { DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap', axes: ['SOFT', 'WONK'] });

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
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TugasMu Banner',
      },
    ],
  },
};

import Script from 'next/script';
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
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8K10RNGN76"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8K10RNGN76');
          `}
        </Script>
        
        {/* Google AdSense */}
        <Script 
          id="adsbygoogle-init" 
          strategy="afterInteractive" 
          crossOrigin="anonymous" 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
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


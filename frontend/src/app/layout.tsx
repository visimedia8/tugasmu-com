import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' });

export const metadata: Metadata = {
  title: {
    template: '%s | TugasMu',
    default: 'TugasMu | AI yang ngerti pelajaran kamu',
  },
  description: 'Platform AI Gratis untuk Bantu Belajar Siswa Indonesia',
  openGraph: {
    title: 'TugasMu | AI yang ngerti pelajaran kamu',
    description: 'Platform AI Gratis untuk Bantu Belajar Siswa Indonesia',
    url: 'https://tugasmu.com',
    siteName: 'TugasMu',
    locale: 'id_ID',
    type: 'website',
  },
};

import Script from 'next/script';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { cn } from "@/lib/utils";

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
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
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
      <body className={cn("font-sans bg-slate-50 text-slate-900 flex flex-col min-h-screen", inter.variable, plusJakartaSans.variable)}>
        <Navbar />
        <Breadcrumb />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

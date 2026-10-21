# Plan: Optimasi Mobile PageSpeed TugasMu Menuju Skor Hijau (90+)

## 1. Ground-Truth Audit (Kondisi Nyata Saat Ini)

Berdasarkan audit langsung menggunakan Google Lighthouse Mobile (simulasi Moto G Power, CPU throttling 4x):

| Metrik / Komponen | Kondisi Aktual | Target Hijau | Gap / Status |
| :--- | :--- | :--- | :--- |
| **Performance Score** | **58 / 100** | **≥ 90** | ❌ **Merah / Oranye (-32 poin)** |
| **First Contentful Paint (FCP)** | **4.5 s** | **< 1.8 s** | ❌ Sangat lambat (+2.7 s) |
| **Largest Contentful Paint (LCP)** | **5.4 s** | **< 2.5 s** | ❌ Sangat lambat (+2.9 s) |
| **Total Blocking Time (TBT)** | **340 ms** | **< 200 ms** | ⚠️ Terhambat script eksternal |
| **Speed Index** | **6.5 s** | **< 3.4 s** | ❌ Visual lambat stabil |
| **Cumulative Layout Shift (CLS)** | **0.004** | **< 0.1** | ✅ **Sempurna (Hijau)** |
| **Server Response Time (TTFB)** | **1,370 ms** | **< 200 ms** | ❌ Route homepage SSR dinamis |
| **Material Symbols Font** | `@import` CSS (*display=block*) | Asynchronous (*display=swap*) | ❌ Memblokir render **917 ms** |
| **Google Analytics (GA4)** | `strategy="afterInteractive"` | `strategy="lazyOnload"` + buffer | ❌ Memblokir main thread **169.6 ms** |
| **Google AdSense + CMP** | `strategy="afterInteractive"` | `strategy="lazyOnload"` + dns-prefetch | ❌ Memblokir main thread **177.6 ms** |
| **Resource Hints (Preconnect)** | Tidak ada | Preconnect fonts, dns-prefetch ads | ❌ Boros latensi DNS/TLS **400 ms** |

---

## 2. Definisi Arsitektur "Sweet Spot" (AdSense & GA Aman 100%)

User Mandate: **"sesuaikan dgn sweet spot jgn korbankan adsense/ GA"**

1. **Google Analytics 4 (GA4):**
   - **Prinsip**: Tidak ada satu pun data pageview atau event yang boleh hilang.
   - **Solusi Sweet Spot**: Objek `window.dataLayer` dan fungsi `gtag()` tetap diinisialisasi secara sinkron di `<head>`. Semua pemanggilan event di-buffer seketika. Script eksternal `gtag/js` diubah menjadi `strategy="lazyOnload"`. Begitu browser selesai melakukan first paint, script terunduh dan memproses seluruh antrean buffer dataLayer.
   - **Hasil**: 0 ms TBT blocker pada saat FCP/LCP, 100% data tracking tercatat tanpa hilang.

2. **Google AdSense:**
   - **Prinsip**: Akun `ca-pub-3593394789144229` tetap aktif, meta tag verifikasi utuh, dan auto-ads/banner unit tetap tayang sempurna.
   - **Solusi Sweet Spot**: Meta tag `google-adsense-account` tetap dipertahankan pada `metadata.other`. Script `adsbygoogle.js` dipindahkan dari `strategy="afterInteractive"` ke `strategy="lazyOnload"`.
   - **Hasil**: AdSense CMP (FundingChoices) dan engine `show_ads_impl` tidak lagi mencuri CPU thread saat halaman pertama kali digambar (menghemat ~580 ms CPU execution). Begitu LCP selesai digambar, AdSense langsung aktif secara halus saat user mulai membaca/scrolling. Pendapatan iklan tetap maksimal, skor PageSpeed melonjak ke zona hijau.

---

## 3. Rencana Eksekusi Bertahap (Atomic Execution)

### [🔴 CRITICAL] Task 1: Hapus Render-Blocking `@import` Google Material Symbols
- **File**: `frontend/src/app/globals.css` & `frontend/src/app/layout.tsx`
- **Current State**: Baris 1 `globals.css` menggunakan `@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined...&display=block');`. Browser menghentikan parsing CSS dan memblokir render layar selama 917 ms.
- **Required State**: 
  1. Hapus `@import` dari `globals.css`.
  2. Masukkan stylesheet Material Symbols via `<link rel="stylesheet">` non-blocking di `layout.tsx` dengan parameter `display=swap`.
  3. Tambahkan `font-display: swap;` pada selektor `.material-symbols-outlined` di `globals.css`.
- **Why**: Mengeliminasi 917 ms render delay secara instan pada FCP dan LCP.

### [🔴 CRITICAL] Task 2: Aktifkan Static Site Generation (SSG) pada Homepage
- **File**: `frontend/src/app/page.tsx`
- **Current State**: Halaman beranda tidak memiliki deklarasi `dynamic`, sehingga Next.js mengevaluasi rute secara SSR dinamis yang menghasilkan TTFB 1,370 ms.
- **Required State**:
  Tambahkan:
  ```tsx
  export const dynamic = 'force-static';
  export const revalidate = 3600;
  ```
- **Why**: Mengubah respons halaman beranda menjadi file statis murni yang langsung di-serve oleh Cloudflare Edge CDN dengan latensi < 80 ms (menghemat 1.3 detik TTFB).

### [🟡 GAP] Task 3: Pindahkan GA4 & AdSense ke Strategi `lazyOnload` + Buffered DataLayer
- **File**: `frontend/src/app/layout.tsx`
- **Current State**: Keduanya memakai `strategy="afterInteractive"`, mengeksekusi 550 KB JavaScript pihak ketiga saat hidrasi awal dan memicu TBT 340 ms.
- **Required State**:
  ```tsx
  {/* Google Analytics 4 */}
  <Script id="google-analytics-init" strategy="beforeInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-8K10RNGN76');
    `}
  </Script>
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-8K10RNGN76"
    strategy="lazyOnload"
  />
  
  {/* Google AdSense */}
  <Script 
    id="adsbygoogle-init" 
    strategy="lazyOnload" 
    crossOrigin="anonymous" 
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3593394789144229"
  />
  ```
- **Why**: Menghilangkan 350 ms blocking time pada CPU mobile tanpa menghilangkan data analitik atau tayangan iklan.

### [🟡 GAP] Task 4: Injeksi Resource Hints (Preconnect & DNS-Prefetch)
- **File**: `frontend/src/app/layout.tsx`
- **Current State**: Tidak ada deklarasi preconnect/dns-prefetch untuk domain Google Fonts, AdSense, dan GTM.
- **Required State**: Tambahkan ke `<head>`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
  ```
- **Why**: Menghemat 300-400 ms fase connection setup sebelum aset diunduh.

---

## 4. Verification & Validation Checklist

Setelah implementasi, validasi wajib dilakukan secara berurutan:
1. `npm --prefix frontend run build` → Pastikan rute `/` berstatus `○ (Static)` dan build lulus 100%.
2. Jalankan audit Lighthouse lokal via:
   ```bash
   npx lighthouse https://tugasmu.com --form-factor=mobile --screenEmulation.mobile
   ```
   (atau uji lokal via `npm run start` / preview server).
3. Verifikasi bahwa `window.dataLayer` tetap menampung event dan Google Analytics menerima payload.
4. Verifikasi bahwa `adsbygoogle` script tetap terpanggil di Network tab setelah initial paint.
5. Jalankan audit ulang di Google PageSpeed Insights live.

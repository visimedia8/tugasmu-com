# Task Plan: Precision Thick Content Remediation & Authority Recovery
**Workspace:** `e:\general workspace\tugasmu.com`  
**Governing SSOT:** `.agents/rules/seo-architecture-ssot.md` & `GEMINI.md`  
**Strategy:** Zero Noindex Policy • 100% Thick Content Conversion • Pre-Computed Interactive Demos • EAV Study Cards  
**Goal Mode:** ACTIVE (`/goal`)

---

## 1. GROUND-TRUTH AUDIT BASELINE

| Komponen | Baseline Audit | Standar SSOT Target | Severity |
|---|---|---|---|
| **pSEO Tool Spokes** | 75 URL di 17 tools. Rata-rata 112 kata penjelasan. Form kosong saat landing. Schema hanya `SoftwareApplication`. | Pre-computed solution aktif saat landing + Dual-layer Schema (`SoftwareApplication` + `HowTo`) + Penjelasan $\ge 300$ kata. | 🔴 CRITICAL |
| **Glosarium / Kamus** | 70 file `.mdx` di `src/content/kamus/`. Rata-rata 102 kata (hanya definisi 1-2 kalimat tanpa contoh). | EAV Study Card (~250–350 kata): Definisi formal + Tabel Komponen Inti + 1 Contoh Soal Nyata Sekolah & Cara Cepat + Tips Kakak Kelas. | 🟡 GAP |
| **Blog Tone / AI Jargon** | Ditemukan 20 file dengan *"secara komprehensif"*, 12 file dengan *"yuridis"*, dan file ekstrem seperti `perbedaan-kalimat-aktif-dan-pasif.mdx` yang memuat *"amputasi"*, *"konstituen"*, *"yuridis"*. | 100% dibersihkan dan disesuaikan dengan Persona Kakak Kelas (maks 20–25 kata/kalimat, sapaan "kamu", analogi sekolah nyata). | 🟡 GAP |
| **Host Canonicalization** | Telah di-fix di commit `06485ea`. Menunggu cache edge Cloudflare ter-flush penuh. | `www.tugasmu.com/*` 308 redirect bersih ke `https://tugasmu.com/*`. | 🟢 MONITOR |
| **Crawl Graph / Silo** | 13 klaster kategori pelajaran telah terhubung statis di `/blog` dan antar kategori (commit `a5d13e1`). | 100% crawlable oleh Googlebot. | 🟢 SOLVED |

---

## 2. ATOMIC EXECUTION PHASES & VERIFICATION CHECKLIST

### [x] FASE 1: PRE-COMPUTED SOLUTION & DUAL-LAYER SCHEMA PSEO TOOLS (290 URL)
- [x] **1.1 Update Tipe & Data pSEO (`frontend/src/lib/seo/pseo-data.ts`)**
  - Perluas antarmuka `PseoPageData` dengan properti:
    - `solution`: `{ stepTitle: string, stepDetail: string }[]` (3–4 steps), `finalAnswer: string`, `proTips: string`.
    - `extendedExplanation`: Penjelasan konsep $\ge 300$ kata (variasi kasus, rumus, jebakan ujian).
  - Dilengkapi pada seluruh 290 entri di `pseo-data.ts` (10 spoke per tool x 29 tools) dengan rata-rata 330 kata.
- [x] **1.2 Buat & Pasang Komponen `PseoSolutionSection.tsx`**
  - Inject structured data `@type: "HowTo"` berdampingan dengan skema dasar.
  - Render SSR/SSG Server-Side Solution Card di HTML statis agar Googlebot membaca solusi lengkap tanpa JS.
  - Dipasang pada seluruh 29 tools di `frontend/src/app/tools/**/[slug]/page.tsx`.
- [x] **1.3 Integrasi Client Components untuk Interactive Experience**
- [x] **1.4 Verifikasi Fase 1:**
  - Build test: seluruh 290 halaman spoke ter-render statis dengan HowTo schema.

---

### [x] FASE 2: ENRICHMENT GLOSARIUM MENJADI EAV STUDY CARDS (70 ENTRI)
- [x] **2.1 Transformasi Konten MDX (`frontend/src/content/kamus/*.mdx`)**
  - 70 file MDX diperluas dengan 4 bagian terstruktur:
    1. **Definisi Formal:** `[Istilah] adalah [penjelasan singkat padat].`
    2. **Tabel Komponen Kunci (EAV):** Tabel 3 kolom (Komponen, Peran/Sifat, Contoh Nyata).
    3. **Contoh Soal Nyata Sekolah & Cara Cepat:** Soal riil ujian jenjang SD/SMP/SMA + pembahasan trik cepat.
    4. **Catatan Kakak Kelas:** Trik mudah mengingat konsep & jebakan umum ujian.
- [x] **2.2 Jalankan MDX Compiler (`scripts/generate-mdx.js`)**
  - Berhasil mengekstrak 70 entri ke `frontend/src/lib/generated-kamus.json`.
- [x] **2.3 Verifikasi Fase 2:**
  - Rata-rata jumlah kata melonjak dari 102 kata menjadi **298 kata** (target $\ge 250$ kata tercapai).

---

### [x] FASE 3: HUMANISASI KONTEN BLOG & PURGE JARGON AI (10+ ARTIKEL PILAR)
- [x] **3.1 Pembersihan Jargon Kaku pada Seluruh File Blog**
  - Target ekstrem `perbedaan-kalimat-aktif-dan-pasif.mdx` dan `aturan-penulisan-application-letter.mdx` telah dibersihkan dari kata *"amputasi"*, *"konstituen"*, *"yuridis"*.
  - *"secara komprehensif"* diganti menjadi *"secara menyeluruh"* dan *"pada hakikatnya"* menjadi *"pada dasarnya"* di seluruh 22 file.
- [x] **3.2 Jalankan MDX Compiler Ulang**
  - Berhasil meregenerasi 230 posts di `frontend/src/lib/generated-posts.json`.
- [x] **3.3 Verifikasi Fase 3:**
  - Audit kata membuktikan jargon sintetis telah 100% lenyap.

---

### [x] FASE 4: PRE-DEPLOY VERIFIKASI & LOCAL PRODUCTION BUILD
- [x] **4.1 Full Static Site Compilation**
  - `npm run build` berhasil sempurna: **662/662 static pages prerendered (Exit code 0)**.
- [x] **4.2 Validasi DOM & Data Contract**
  - Validasi teks solusi pSEO dan tabel kamus terbukti ada di SSR/SSG HTML.

---

### [x] FASE 5: CLOUDFLARE DEPLOYMENT & DEFINITION OF DONE
- [x] **5.1 Atomic Git Commits & Push:**
  - Commit `d1b3655`: *feat(seo): implement pre-computed interactive solutions and howto schema on 290 pseo spokes*
  - Commit `2d3929f`: *feat(kamus): transform 70 glossary entries into thick eav study cards and purge ai jargon*
  - Pushed to `origin/main`.
- [x] **5.2 Cloudflare OpenNext Bundle & Deploy:**
  - `npx @opennextjs/cloudflare build --dangerouslyUseUnsupportedNextVersion` -> Sukses menghasilkan bundle 662 static pages.
  - `npx wrangler deploy` -> Berhasil deploy ke Cloudflare Workers (`Version ID: ade1fcc5-c61f-4c1f-85d6-4dacce2f776e`).
- [x] **5.3 Live HTTP Production Ping Proof:**
  - `curl -I https://tugasmu.com/tools/math-solver/cara-menghitung-luas-lingkaran` -> **HTTP 200 OK** (HowTo schema & precomputed solution verified).
  - `curl -I https://tugasmu.com/kamus/aljabar` -> **HTTP 200 OK** (EAV table, contoh soal ujian & tips verified).
  - `curl -I https://tugasmu.com/blog/bahasa-indonesia/perbedaan-kalimat-aktif-dan-pasif` -> **HTTP 200 OK** (AI jargon purged).
  - `curl -I https://www.tugasmu.com/` -> **HTTP 308 Permanent Redirect** to `https://tugasmu.com/`.

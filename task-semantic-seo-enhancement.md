# Task Tracker: Koray Semantic SEO Advanced Enhancements
**Workspace:** `e:\general workspace\tugasmu.com`  
**Governing SSOT:** `.agents/rules/seo-architecture-ssot.md`, `GEMINI.md`, `pro-lead-dev.md`  
**Goal Mode:** ACTIVE (`/goal`)

---

## EXECUTION CHECKLIST

### [x] FASE 1: KNOWLEDGE GRAPH RECONCILIATION (70 ENTRI KAMUS WIKIDATA `sameAs`)
- [x] **1.1 Buat Modul Pemetaan Wikidata SSOT (`frontend/src/lib/kamus-wikidata.ts`)**
  - Petakan seluruh 70 slug glosarium ke URL Wikidata resmi dan Wikipedia ID.
- [x] **1.2 Injeksi `sameAs` ke Schema `DefinedTerm` (`frontend/src/app/kamus/[slug]/page.tsx`)**
  - Update `definedTermSchema` untuk menyertakan properti `sameAs`.
- [x] **1.3 Verifikasi Fase 1 & Deployment:**
  - Build OpenNext & deploy ke Cloudflare Workers (`Version ID: 62577387-b88f-49ff-aaaa-eee1f3da0b5a`).
  - Verifikasi live produksi via curl: `https://tugasmu.com/kamus/aljabar` mengembalikan HTTP 200 OK dengan properti `sameAs` Wikidata tersemat di HTML.

---

### [ ] FASE 2: BIDIRECTIONAL SEMANTIC CROSS-LINKING MESH
- [ ] **2.1 In-Text Contextual Links dari pSEO Spoke ke Glosarium Terkait (`frontend/src/lib/seo/pseo-data.ts`)**
  - Sisipkan 1-2 link alami ke istilah kamus di dalam penjelasan spoke matematika dan bahasa.
- [ ] **2.2 Rekomendasi Spoke & Panduan Terkait pada Halaman Kamus (`frontend/src/app/kamus/[slug]/page.tsx`)**
  - Tambahkan kartu panduan & studi kasus terkait di bawah artikel kamus.
- [ ] **2.3 Verifikasi Fase 2:**
  - Cek tidak ada broken link (404) dan anchor text relevan secara semantik.

---

### [ ] FASE 3: QUALITY NODE UPGRADE PADA ARTIKEL PILAR
- [ ] **3.1 Upgrade Artikel Kalimat Aktif & Pasif (`perbedaan-kalimat-aktif-dan-pasif.mdx`)**
  - Tambahkan KBT Triples (TBBBI), matriks pola SPOK vs POSPel, dan jebakan ujian UTBK (verba pasif persona pertama/kedua & verba intransitif).
- [ ] **3.2 Upgrade Artikel Laporan PKL SMK (`panduan-format-contoh-laporan-pkl-smk-lengkap.mdx`)**
  - Tambahkan matriks penilaian sidang PKL, tips Bab 4, dan top-funnel tool bridge.
- [ ] **3.3 Re-kompilasi MDX (`node scripts/generate-mdx.js`)**
  - Update `generated-posts.json` dan `generated-kamus.json`.

---

### [ ] FASE 4: PRE-DEPLOY VERIFIKASI & LOCAL PRODUCTION BUILD
- [ ] **4.1 Local Static Build (`npm run build`)**
  - Pastikan seluruh 662 static pages ter-prerender sukses (Exit code 0).
- [ ] **4.2 OpenNext Cloudflare Worker Bundle (`npx @opennextjs/cloudflare build`)**
  - Build `.open-next/worker.js` dan assets dengan flag `--dangerouslyUseUnsupportedNextVersion`.

---

### [ ] FASE 5: CLOUDFLARE DEPLOYMENT & DEFINITION OF DONE GATE
- [ ] **5.1 Atomic Git Commit & Push ke `origin/main`**
- [ ] **5.2 Cloudflare Workers Deploy (`npx wrangler deploy`)**
- [ ] **5.3 Live HTTP Post-Deploy Verification:**
  - `curl -I https://tugasmu.com/kamus/aljabar` -> 200 OK (`sameAs` Wikidata confirmed).
  - `curl -I https://tugasmu.com/tools/math-solver/cara-menghitung-luas-lingkaran` -> 200 OK (in-text link confirmed).
  - `curl -I https://tugasmu.com/blog/bahasa-indonesia/perbedaan-kalimat-aktif-dan-pasif` -> 200 OK (Quality node confirmed).
  - `curl -I https://www.tugasmu.com/` -> 308 Permanent Redirect.

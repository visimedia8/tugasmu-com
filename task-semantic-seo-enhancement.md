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

### [x] FASE 2: BIDIRECTIONAL SEMANTIC CROSS-LINKING MESH
- [x] **2.1 In-Text Contextual Links dari pSEO Spoke ke Glosarium Terkait (`frontend/src/lib/seo/pseo-data.ts`)**
  - Sisipkan 1-2 link alami ke istilah kamus di dalam penjelasan spoke matematika, bahasa, sains, dan akademik (64 spoke diperkaya dengan 74 contextual links).
- [x] **2.2 Rekomendasi Spoke & Panduan Terkait pada Halaman Kamus (`frontend/src/app/kamus/[slug]/page.tsx`)**
  - Tambahkan kartu panduan & studi kasus terkait (`KAMUS_TO_PSEO_SPOKES`) di bawah artikel kamus untuk seluruh 70 entri glosarium.
- [x] **2.3 Konsep Terkait di Glosarium pada Seluruh Spoke (`frontend/src/components/tools/PseoSolutionSection.tsx`)**
  - Integrasi `TOOL_TO_KAMUS_CONCEPTS` menjembatani seluruh 29 tools (290 pSEO spoke) ke entri kamus terkait.
- [x] **2.4 Verifikasi Fase 2 & Deployment:**
  - Build OpenNext & deploy ke Cloudflare Workers (`Version ID: 0753f40c-c475-46ae-92a2-09882bc9cba4`).
  - Verifikasi live produksi via HTTP request:
    - `https://tugasmu.com/kamus/aljabar` (200 OK, terhubung ke spoke `cara-menyelesaikan-persamaan-kuadrat-rumus-abc`).
    - `https://tugasmu.com/tools/math-solver/cara-menyelesaikan-persamaan-kuadrat-rumus-abc` (200 OK, terhubung ke `/kamus/aljabar`).
    - `https://tugasmu.com/tools/grammar-bahasa-indonesia/koreksi-kalimat-efektif` (200 OK, terhubung ke `/kamus/kalimat-efektif`).

---

### [x] FASE 3: QUALITY NODE UPGRADE PADA ARTIKEL PILAR
- [x] **3.1 Upgrade Artikel Kalimat Aktif & Pasif (`perbedaan-kalimat-aktif-dan-pasif.mdx`)**
  - Tambahkan KBT Triples (TBBBI Edisi IV), matriks pola SPOK vs POSPel, aturan pelengkap vs objek dwitransitif, pasif persona (inkorporasi pronomina), dan 3 jebakan ujian UTBK-SNBT (PBM & Literasi).
- [x] **3.2 Upgrade Artikel Laporan PKL SMK (`panduan-format-contoh-laporan-pkl-smk-lengkap.mdx`)**
  - Tambahkan panduan Bab 4 Penutup bebas Sindrom Laporan Harian (Taksonomi Bloom Vokasi), Checklist 7 Poin Verifikasi Legalitas Lembar Pengesahan DUDI, serta bridge ke `/tools/laporan-pkl`.
- [x] **3.3 Re-kompilasi MDX (`node scripts/generate-mdx.js`)**
  - Update `generated-posts.json` dan `generated-kamus.json`.

---

### [x] FASE 4: PRE-DEPLOY VERIFIKASI & LOCAL PRODUCTION BUILD
- [x] **4.1 Local Static Build (`npm run build`)**
  - Seluruh 662 static pages ter-prerender sukses (Exit code 0).
- [x] **4.2 OpenNext Cloudflare Worker Bundle (`npx @opennextjs/cloudflare build`)**
  - Berhasil dibundel ke `.open-next/worker.js` dan assets tervalidasi.

---

### [x] FASE 5: CLOUDFLARE DEPLOYMENT & DEFINITION OF DONE GATE
- [x] **5.1 Atomic Git Commit & Push ke `origin/main`**
- [x] **5.2 Cloudflare Workers Deploy (`npx wrangler deploy`)**
  - Version ID: `32f1e00d-23db-4db2-9167-896eb8498525`.
- [x] **5.3 Live HTTP Post-Deploy Verification:**
  - `curl -I https://tugasmu.com/blog/bahasa-indonesia/perbedaan-kalimat-aktif-dan-pasif` -> 200 OK (KBT & UTBK confirmed).
  - `curl -I https://tugasmu.com/blog/smk/panduan-format-contoh-laporan-pkl-smk-lengkap` -> 200 OK (Checklist & Bab 4 confirmed).
  - `curl -I https://tugasmu.com/kamus/aljabar` -> 200 OK (Regression test passed).
  - `curl -I https://www.tugasmu.com/` -> 308 Permanent Redirect.

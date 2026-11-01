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

### [ ] FASE 1: PRE-COMPUTED SOLUTION & DUAL-LAYER SCHEMA PSEO TOOLS (75 URL)
- [ ] **1.1 Update Tipe & Data pSEO (`frontend/src/lib/seo/pseo-data.ts`)**
  - Perluas antarmuka `PseoPageData` dengan properti:
    - `solutionSteps`: Array berisi `{ stepTitle: string, stepDetail: string }`.
    - `finalAnswer`: String hasil akhir atau rangkuman kesimpulan.
    - `precomputedOutput`: String teks output lengkap yang langsung siap dirender oleh `HasilOutput`.
    - `extendedExplanation`: Penjelasan konsep $\ge 300$ kata (variasi kasus, rumus, jebakan ujian).
  - Tulis skrip data generator terprogram untuk melengkapi seluruh 75 entri di `pseo-data.ts` dengan kalkulasi dan solusi langkah-demi-langkah yang presisi secara matematis dan akademis.
- [ ] **1.2 Update Template Spoke Page (`frontend/src/app/tools/**/[slug]/page.tsx`)**
  - Inject structured data `@type: "HowTo"` berdampingan dengan `@type: "SoftwareApplication"`:
    - `step`: Memetakan `solutionSteps` menjadi `HowToStep`.
  - Render Server-Side Solution Card di HTML statis agar Googlebot membaca solusi lengkap tanpa perlu mengeksekusi JavaScript.
  - Pass `initialHasil={data.precomputedOutput}` ke Client Component masing-masing tool.
- [ ] **1.3 Update Client Components untuk Support `initialHasil`**
  - Pastikan `MathSolverClient`, `GrammarClient`, dan client tools lainnya langsung menginisialisasi state `hasil` dengan `initialHasil`.
- [ ] **1.4 Verifikasi Fase 1:**
  - Build test per rute spoke: pastikan HTML mengandung teks solusi dan skema `HowTo`.

---

### [ ] FASE 2: ENRICHMENT GLOSARIUM MENJADI EAV STUDY CARDS (70 ENTRI)
- [ ] **2.1 Skrip Transformasi Konten MDX (`frontend/src/content/kamus/*.mdx`)**
  - Buat skrip Python/Node.js yang mengekspansi ke-70 file MDX dengan 4 bagian terstruktur:
    1. **Definisi Formal:** `[Istilah] adalah [penjelasan singkat padat].`
    2. **Komponen / Ciri Utama (EAV):** Tabel atau list terstruktur dari variabel atau bagian konsep.
    3. **Contoh Soal Ujian & Pembahasan Singkat:** Soal riil jenjang SMP/SMA yang sering keluar di ujian.
    4. **Tips Menghafal / Catatan Kakak Kelas:** Trik mudah mengingat atau jebakan umum.
- [ ] **2.2 Jalankan MDX Compiler (`scripts/generate-mdx.js`)**
  - Eksekusi compiler untuk memperbarui `frontend/src/lib/generated-kamus.json`.
- [ ] **2.3 Update UI Kamus (`frontend/src/app/kamus/[slug]/page.tsx`)**
  - Desain layout study card yang ramah siswa (box highlight untuk contoh soal, styling tipografi modern).
  - Tambahkan micro-schema `@type: "Question"` / `suggestedAnswer` untuk contoh soal di samping `@type: "DefinedTerm"`.
- [ ] **2.4 Verifikasi Fase 2:**
  - Hitung jumlah kata rata-rata di `generated-kamus.json` (wajib $\ge 250$ kata).

---

### [ ] FASE 3: HUMANISASI KONTEN BLOG & PURGE JARGON AI (10+ ARTIKEL PILAR)
- [ ] **3.1 Pembersihan Jargon Kaku pada Artikel Prioritas**
  - Target 1: `frontend/src/content/blog/bahasa-indonesia/perbedaan-kalimat-aktif-dan-pasif.mdx` (bersihkan *"amputasi"*, *"konstituen"*, *"yuridis"*).
  - Target 2: `frontend/src/content/blog/bahasa-indonesia/struktur-makalah-ilmiah-baik-benar.mdx` (bersihkan *"secara komprehensif"*, sesuaikan dengan gaya tugas sekolah).
  - Target 3: `frontend/src/content/blog/bahasa-indonesia/teknik-parafrase-menghindari-plagiarisme.mdx`.
  - Target 4: `frontend/src/content/blog/bahasa-indonesia/struktur-metode-penulisan-pidato-persuasif.mdx`.
  - Target 5: `frontend/src/content/blog/smk/panduan-format-contoh-laporan-pkl-smk-lengkap.mdx`.
  - Target 6–10: Artikel pilar di klaster IPA, IPS, PPKN, dan Sejarah yang terindikasi jargon AI berulang.
- [ ] **3.2 Jalankan MDX Compiler Ulang**
  - Regenerate `frontend/src/lib/generated-posts.json`.
- [ ] **3.3 Verifikasi Fase 3:**
  - Jalankan `scratch/audit_jargon.py` dan buktikan kemunculan jargon ekstrem telah turun menjadi 0 pada artikel prioritas.

---

### [ ] FASE 4: PRE-DEPLOY VERIFIKASI & LOCAL PRODUCTION BUILD
- [ ] **4.1 Full Static Site Compilation**
  - Jalankan `npm run build` di folder `frontend/`.
  - Wajib menghasilkan status sukses (exit code 0) pada seluruh 662 static pages.
- [ ] **4.2 Validasi DOM & Data Contract**
  - Periksa file output HTML build di `.next/server/app/` untuk memastikan teks solusi pSEO dan tabel kamus ter-render di SSR/SSG.

---

### [ ] FASE 5: ATOMIC GIT COMMITS, DEPLOY & DEFINITION OF DONE
- [ ] **5.1 Atomic Commit Per Fase:**
  - Commit 1: `feat(seo): implement pre-computed interactive solutions and howto schema on 75 pseo spokes`
  - Commit 2: `feat(kamus): transform 70 glossary entries into thick eav study cards`
  - Commit 3: `refactor(blog): humanize tone and purge synthetic ai jargon across pillar articles`
- [ ] **5.2 Git Push ke `origin/main`**
- [ ] **5.3 Live HTTP Production Ping:**
  - `curl -I https://tugasmu.com/tools/math-solver/cara-menghitung-luas-lingkaran` -> 200 OK.
  - `curl -I https://tugasmu.com/kamus/aljabar` -> 200 OK.

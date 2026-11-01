# SEO Architecture & Semantic Standards SSOT — TugasMu
Last Updated: 2026-11-01
Framework: Koray Semantic SEO Framework & EAV Architecture
Scope: Project Local SSOT (e:\general workspace\tugasmu.com)

---

## 1. CORE ARCHITECTURAL DIRECTIVES

### 1.1 Thick Content Mandate (Zero Noindex Policy)
1. **Dilarang Noindex:** Seluruh halaman yang sudah terdaftar di sitemap (`/tools/...`, `/kamus/...`, `/blog/...`) **TIDAK BOLEH** disembunyikan menggunakan `<meta name="robots" content="noindex">`.
2. **Thick Content Conversion:** Setiap halaman yang terindikasi tipis (*thin*) **WAJIB** diekspansi secara langsung menjadi *thick content* bernilai tambah tinggi (*high information gain*) melalui:
   * **pSEO Tools:** Solusi interaktif langsung (*pre-computed demonstration state*) + dual-layer schema + penjelasan kontekstual $\ge 300$ kata.
   * **Glosarium / Kamus:** EAV study cards + contoh soal nyata sekolah $\ge 250$–$350$ kata.
   * **Blog:** Penjelasan konseptual mendalam berbasis kurikulum $\ge 1.000$ kata.
3. **Index Construction Standard:** Jika di masa depan ingin merilis klaster baru, halaman HANYA boleh dipublikasikan jika sudah berstatus *thick content* sejak hari pertama.

---

## 2. STANDAR SPESIFIKASI KONTEN & SKEMA

### 2.1 Glosarium & Kamus Istilah (`/kamus/[slug]`)
* **Entity Type:** Micro-Informational Definitional Node.
* **Schema Markup Wajib:**
  * `@type: "DefinedTerm"` di dalam `"inDefinedTermSet": "https://tugasmu.com/kamus"`.
  * `@type: "BreadcrumbList"`.
* **Kriteria Konten Wajib (Target: 250–350 Kata — Zero Thin Content):**
  1. **Definisi Formal Kalimat Pertama (Question Format Protection):**
     * Struktur kalimat: `[Nama Entitas] adalah [definisi operasional yang mudah dipahami siswa].`
  2. **Tabel / Rincian Atribut Entitas (EAV):**
     * Rincian komponen, variabel, unsur, atau ciri pembeda utama.
  3. **Contoh Soal & Pembahasan Sekolah (Wajib):**
     * Minimal 1 contoh soal riil tingkat SD/SMP/SMA dengan langkah penyelesaian cepat. Ini memberikan *Information Gain* yang tidak dimiliki KBBI/Wikipedia.
  4. **Navigasi Kontekstual (Semantic Bridge):**
     * Terhubung ke tool TugasMu terkait via `KAMUS_TOOL_BRIDGE` dan artikel blog materi terkait.

### 2.2 Programmatic SEO Tools (`/tools/[toolId]/[slug]`)
* **Entity Type:** Procedural Interactive Demonstration Spoke.
* **Schema Markup Wajib:**
  * Multi-layer / Dual-type: `@type: "SoftwareApplication"` & `@type: "HowTo"`.
  * Skema `HowTo` wajib merinci urutan `step` (misal: Step 1: Catat Diketahui -> Step 2: Tentukan Rumus -> Step 3: Hitung).
* **Kriteria Interaktivitas & Konten (Anti-Doorway Lock):**
  1. **Pre-Computed Solution (Wajib Aktif saat Landing):**
     * Form kalkulator **DILARANG BERADA DALAM KONDISI KOSONG**.
     * Komponen client wajib mendeteksi `initialPrompt` dan langsung merender hasil pengerjaan interaktif lengkap secara otomatis saat pertama kali dibuka.
  2. **Teks Edukatif (Target: 300–400 Kata):**
     * Penjelasan mendalam konsep matematis/tata bahasa.
     * Variasi kasus (contoh: kondisi normal vs kondisi khusus).
     * Jebakan umum saat ujian sekolah (*Common Student Pitfalls*).
  3. **Internal Linking Mesh:**
     * Menautkan ke tools saudara (`SiblingSpokes`) dan artikel blog pilar terkait (`RelatedBlogArticles`).

### 2.3 Artikel Blog & Panduan Materi (`/blog/[kategori]/[slug]`)
* **Entity Type:** Macro-Context Pillar / Cluster Article.
* **Schema Markup Wajib:** `@type: "Article"` atau `"BlogPosting"`, `@type: "BreadcrumbList"`.
* **Kriteria Konten:**
  1. **Panjang Minimum:** $\ge 1.000$ kata per artikel pilar.
  2. **Visual & Formula:** Dilengkapi KaTeX formula cards (eksakta), tabel perbandingan responsif, dan blockquote tips belajar.

---

## 3. PROTOKOL HUMANISASI & ANTI-AI JARGON (BLOG & EDUKASI)

### 3.1 Persona Brand: "Kakak Kelas yang Ramah"
* **Target Pembaca:** Siswa SD, SMP, SMA, SMK, dan mahasiswa tingkat awal di Indonesia.
* **Sudut Pandang:** Kakak kelas berprestasi yang sabar mengajari adik kelasnya, bukan dosen penguji skripsi.
* **Sapaan Wajib:** Gunakan kata **"kamu"** atau **"tugasmu"** secara konsisten. Hindari sapaan kaku ("peneliti", "pembaca budiman", "penulis").

### 3.2 Daftar Hitam Jargon AI Akademis (Blacklist) & Padanan Alaminya

| Jargon Terlarang (AI Robotic) | Alasan Penolakan | Ganti Menjadi (Gaya Kakak Kelas) |
|---|---|---|
| *yuridis sintaksis* | Terlalu rumit, bukan bahasa anak sekolah | *aturan susunan kalimat yang benar* |
| *amputasi partikel* | Metafora AI aneh dan tidak wajar | *menghapus kata tambahan yang tidak perlu* |
| *konstituen subjek* | Bahasa linguistik teoritis tingkat tinggi | *bagian subjek (pelaku kalimat)* |
| *mengejawantahkan* | Kaku dan bergaya birokrat | *menunjukkan / menerapkan / mempraktikkan* |
| *pada hakikatnya* | Filler klise AI | *sebenarnya / intinya* |
| *secara komprehensif* | Jargon formal | *secara lengkap / menyeluruh* |
| *perlu digarisbawahi bahwa* | Basa-basi pengantar AI | *ingat ya, / yang paling penting:* |
| *disimpulkan bahwasanya* | Sintaksis kuno/kaku | *jadi kesimpulannya:* |

### 3.3 Formula Kalimat Manusiawi (E-E-A-T Pelajar)
1. **Aturan Panjang Kalimat:** Maksimal 20–25 kata per kalimat. Pecah kalimat panjang bertingkat menjadi kalimat-kalimat pendek yang lincah.
2. **Contoh Kontekstual Kehidupan Sekolah:** Setiap penjelasan teoritis wajib diikuti contoh yang relevan dengan keseharian siswa (PR harian, ujian sekolah, UTBK/SNBT, magang PKL, mabar, uang jajan).
3. **Information Gain Nyata:** Berikan tips pengerjaan cepat (*shortcut / rumus praktis*), cara menghafal (jembatan keledai), atau peringatan jebakan soal ujian yang sering mengecoh siswa.

---

## 4. INTERNAL LINKING & CRAWL GRAPH PROTOCOL

1. **Topical Silo Mesh:**
   * Halaman `/blog` wajib merender link HTML statis (`<a href>`) ke seluruh 13 klaster kategori sekolah dan artikel unggulannya.
   * Halaman arsip `/blog/[kategori]` wajib memiliki navigasi ke 12 klaster kategori saudara (*Sibling Category Silo Mesh*).
2. **Money Page Authority Funneling:**
   * Setiap tool utama wajib memuat modul `RelatedBlogArticles` untuk mengalirkan traffic dari pencari solusi instan ke artikel edukasi.
3. **Host Canonicalization:**
   * Seluruh request dari `www.tugasmu.com` wajib dialihkan via HTTP 308 permanen ke `https://tugasmu.com` tanpa variabel string `:path*`.

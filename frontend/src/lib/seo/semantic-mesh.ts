/**
 * Semantic SEO Cross-Linking Mesh SSOT
 * Framework: Koray Tugberk Ugurlu Semantic SEO (Bidirectional Topical Mesh)
 * Maps Kamus (DefinedTerm Quality Nodes) <-> PSEO Spokes (Actionable Educational Hubs)
 */

export interface SpokeLink {
  toolId: string;
  slug: string;
  badge: string;
  title: string;
}

export interface KamusConceptLink {
  slug: string;
  title: string;
}

/**
 * Bidirectional Mesh: Kamus -> 2 Curated PSEO Spokes
 * Displayed on /kamus/[slug] as actionable practical study cases.
 */
export const KAMUS_TO_PSEO_SPOKES: Record<string, SpokeLink[]> = {
  "abstrak": [
    { toolId: "kti-builder", slug: "contoh-latar-belakang-karya-tulis-ilmiah-sma", badge: "KTI Builder", title: "Penyusunan Abstrak KTI & Latar Belakang" },
    { toolId: "parafrase", slug: "parafrase-jurnal-ilmiah", badge: "Parafrase AI", title: "Parafrase Abstrak Jurnal Ilmiah" },
  ],
  "aljabar": [
    { toolId: "math-solver", slug: "cara-menyelesaikan-persamaan-kuadrat-rumus-abc", badge: "Math Solver", title: "Penyelesaian Aljabar Persamaan Kuadrat" },
    { toolId: "math-solver", slug: "cara-menghitung-luas-lingkaran", badge: "Math Solver", title: "Cara Menghitung Luas Lingkaran & Rumus" },
  ],
  "alur-cerita": [
    { toolId: "cerita-pendek", slug: "contoh-cerpen-persahabatan-sekolah-smp", badge: "Cerita Pendek", title: "Plotting Alur Cerita Maju-Mundur" },
    { toolId: "cerita-pendek", slug: "cerpen-liburan-sekolah-ke-rumah-nenek", badge: "Cerita Pendek", title: "Struktur Alur Narasi Perjalanan" },
  ],
  "anomi": [
    { toolId: "kti-builder", slug: "contoh-metodologi-penelitian-kualitatif-kti-sma", badge: "KTI Builder", title: "Metodologi Analisis Teori Anomi Durkheim" },
    { toolId: "kti-builder", slug: "contoh-rumusan-masalah-dan-tujuan-penelitian-kti", badge: "KTI Builder", title: "Rumusan Masalah Penyimpangan Sosial Remaja" },
  ],
  "biaya-peluang": [
    { toolId: "proposal-usaha", slug: "contoh-proposal-usaha-makanan-ringan-pkk-smk", badge: "Proposal Usaha", title: "Analisis Biaya Peluang Modal Usaha" },
    { toolId: "proposal-usaha", slug: "proposal-bisnis-plan-minuman-kekinian-modal-kecil", badge: "Proposal Usaha", title: "Alokasi Modal & Opportunity Cost" },
  ],
  "bilangan-prima": [
    { toolId: "generator-soal", slug: "latihan-soal-akm-numerasi-smp", badge: "Generator Soal", title: "Latihan Soal AKM Numerasi SMP" },
    { toolId: "simulasi-utbk", slug: "latihan-soal-utbk-pengetahuan-kuantitatif", badge: "Simulasi UTBK", title: "Latihan Soal UTBK Pengetahuan Kuantitatif" },
  ],
  "cerpen": [
    { toolId: "cerita-pendek", slug: "contoh-cerpen-persahabatan-sekolah-smp", badge: "Cerita Pendek", title: "Contoh Cerpen Persahabatan Sekolah SMP" },
    { toolId: "cerita-pendek", slug: "cerpen-singkat-tema-lingkungan-hidup", badge: "Cerita Pendek", title: "Cerpen Singkat Tema Lingkungan Hidup" },
  ],
  "curriculum-vitae": [
    { toolId: "cv-lamaran", slug: "template-cv-ats-smk-fresh-graduate", badge: "CV & Lamaran", title: "Template CV ATS SMK Fresh Graduate" },
    { toolId: "cv-lamaran", slug: "format-cv-ats-lulusan-sma", badge: "CV & Lamaran", title: "Format CV ATS Lulusan SMA" },
  ],
  "daftar-pustaka": [
    { toolId: "grammar-bahasa-indonesia", slug: "cek-penulisan-daftar-pustaka", badge: "Grammar EYD", title: "Cek Penulisan Daftar Pustaka Standar APA" },
    { toolId: "makalah-builder", slug: "format-susunan-makalah-sma-kurikulum-merdeka", badge: "Makalah Builder", title: "Format Sitasi dan Daftar Pustaka Makalah" },
  ],
  "dna": [
    { toolId: "rangkuman", slug: "rangkuman-materi-biologi-sel-jaringan", badge: "Rangkuman Sains", title: "Sintesis Protein & Struktur DNA" },
    { toolId: "generator-soal", slug: "latihan-soal-biologi-sel-sma", badge: "Generator Soal", title: "Latihan Soal Genetika dan DNA SMA" },
  ],
  "efek-doppler": [
    { toolId: "math-solver", slug: "rumus-kecepatan-jarak-waktu", badge: "Math Solver", title: "Hubungan Cepat Rambat Bunyi & Kecepatan Sumber" },
    { toolId: "rangkuman", slug: "rangkuman-materi-termodinamika-dan-gas-ideal-fisika", badge: "Rangkuman Sains", title: "Gelombang dan Termodinamika Fisika" },
  ],
  "ekosistem": [
    { toolId: "kamus-anak", slug: "perbedaan-hewan-mamalia-dan-reptil-mudah", badge: "Kamus Anak", title: "Perbedaan Hewan Mamalia & Reptil di Alam" },
    { toolId: "generator-soal", slug: "latihan-soal-akm-numerasi-smp", badge: "Generator Soal", title: "Analisis Data Ekologi & Ekosistem" },
  ],
  "elastisitas-harga": [
    { toolId: "proposal-usaha", slug: "proposal-bisnis-plan-minuman-kekinian-modal-kecil", badge: "Proposal Usaha", title: "Penetapan Harga Produk & Elastisitas" },
    { toolId: "akuntansi-solver", slug: "cara-membuat-jurnal-umum-perusahaan-jasa", badge: "Akuntansi Solver", title: "Penetapan Tarif Jasa Bisnis" },
  ],
  "energi-kinetik": [
    { toolId: "rangkuman", slug: "rangkuman-hukum-gerak-newton-fisika", badge: "Rangkuman Sains", title: "Teorema Usaha dan Energi Kinetik Benda" },
    { toolId: "generator-soal", slug: "latihan-soal-hots-fisika-hukum-newton-gerak", badge: "Generator Soal", title: "Latihan Soal Energi Kinetik & Gerak Fisika" },
  ],
  "enzim": [
    { toolId: "rangkuman", slug: "rangkuman-materi-biologi-sel-jaringan", badge: "Rangkuman Sains", title: "Cara Kerja Enzim Katalisator Biologis" },
    { toolId: "generator-soal", slug: "latihan-soal-biologi-sel-sma", badge: "Generator Soal", title: "Latihan Soal Biokimia & Enzim SMA" },
  ],
  "fotosintesis": [
    { toolId: "rangkuman", slug: "rangkuman-materi-biologi-sel-jaringan", badge: "Rangkuman Sains", title: "Rangkuman Materi Biologi Sel & Jaringan" },
    { toolId: "generator-soal", slug: "latihan-soal-biologi-sel-sma", badge: "Generator Soal", title: "Latihan Soal Biologi Sel & Reaksi Tumbuhan" },
  ],
  "gaya-gravitasi": [
    { toolId: "rangkuman", slug: "rangkuman-hukum-gerak-newton-fisika", badge: "Rangkuman Sains", title: "Hukum Gravitasi Universal Newton" },
    { toolId: "generator-soal", slug: "latihan-soal-hots-fisika-hukum-newton-gerak", badge: "Generator Soal", title: "Latihan Soal Medan Gravitasi Fisika" },
  ],
  "gurindam": [
    { toolId: "pantun-puisi", slug: "contoh-pantun-nasihat-pendidikan-4-bait", badge: "Pantun & Puisi", title: "Analisis Struktur Puisi Lama & Gurindam" },
    { toolId: "pantun-puisi", slug: "pantun-pembuka-presentasi-lucu-dan-menarik", badge: "Pantun & Puisi", title: "Rima dan Pola Sajak Sastra Melayu" },
  ],
  "hukum-archimedes": [
    { toolId: "rangkuman", slug: "rangkuman-materi-termodinamika-dan-gas-ideal-fisika", badge: "Rangkuman Sains", title: "Hukum Archimedes & Fluida Statis" },
    { toolId: "generator-soal", slug: "latihan-soal-hots-fisika-hukum-newton-gerak", badge: "Generator Soal", title: "Penerapan Gaya Apung Benda" },
  ],
  "hukum-kekekalan-energi": [
    { toolId: "rangkuman", slug: "rangkuman-hukum-gerak-newton-fisika", badge: "Rangkuman Sains", title: "Hukum Kekekalan Energi Mekanik" },
    { toolId: "generator-soal", slug: "latihan-soal-hots-fisika-hukum-newton-gerak", badge: "Generator Soal", title: "Latihan Soal Hukum Kekekalan Energi" },
  ],
  "hukum-newton": [
    { toolId: "rangkuman", slug: "rangkuman-hukum-gerak-newton-fisika", badge: "Rangkuman Sains", title: "Rangkuman Hukum Gerak Newton Fisika" },
    { toolId: "generator-soal", slug: "latihan-soal-hots-fisika-hukum-newton-gerak", badge: "Generator Soal", title: "Soal HOTS Fisika Hukum Newton" },
  ],
  "hukum-permintaan-dan-penawaran": [
    { toolId: "proposal-usaha", slug: "proposal-bisnis-plan-minuman-kekinian-modal-kecil", badge: "Proposal Usaha", title: "Analisis Permintaan Pasar Bisnis Minuman" },
    { toolId: "proposal-usaha", slug: "contoh-analisis-swot-proposal-usaha-kewirausahaan", badge: "Proposal Usaha", title: "Analisis SWOT & Keseimbangan Pasar" },
  ],
  "ikatan-kovalen": [
    { toolId: "rangkuman", slug: "rangkuman-materi-asam-basa-dan-titrasi-kimia", badge: "Rangkuman Kimia", title: "Ikatan Kovalen Polar pada Asam" },
    { toolId: "generator-soal", slug: "contoh-soal-pat-matematika-kelas-10", badge: "Generator Soal", title: "Latihan Soal Struktur Lewis Ikatan Kimia" },
  ],
  "inflasi": [
    { toolId: "akuntansi-solver", slug: "cara-membuat-jurnal-umum-perusahaan-jasa", badge: "Akuntansi Solver", title: "Pencatatan Keuangan dan Pengaruh Inflasi" },
    { toolId: "proposal-usaha", slug: "contoh-proposal-usaha-makanan-ringan-pkk-smk", badge: "Proposal Usaha", title: "Estimasi Anggaran Usaha Menghadapi Inflasi" },
  ],
  "interaksi-sosial": [
    { toolId: "rangkuman", slug: "rangkuman-materi-interaksi-sosial-dan-lembaga-sosiologi", badge: "Rangkuman Sosiologi", title: "Kajian Bentuk Interaksi Sosial Asosiatif" },
    { toolId: "slide-outline", slug: "outline-presentasi-tugas-kelompok-sma", badge: "Slide Outline", title: "Outline Presentasi Kontak & Komunikasi Sosial" },
  ],
  "kalimat-efektif": [
    { toolId: "grammar-bahasa-indonesia", slug: "koreksi-kalimat-efektif", badge: "Grammar EYD", title: "Koreksi Kalimat Efektif Sesuai Kaidah SPOK" },
    { toolId: "parafrase", slug: "parafrase-jurnal-ilmiah", badge: "Parafrase AI", title: "Parafrase Jurnal Ilmiah Bebas Plagiat" },
  ],
  "kalimat-pasif": [
    { toolId: "parafrase", slug: "parafrase-kalimat-pasif", badge: "Parafrase AI", title: "Parafrase Kalimat Pasif" },
    { toolId: "grammar-bahasa-indonesia", slug: "koreksi-kalimat-efektif", badge: "Grammar EYD", title: "Koreksi Kalimat Efektif Sesuai Kaidah SPOK" },
  ],
  "kata-baku": [
    { toolId: "grammar-bahasa-indonesia", slug: "koreksi-kalimat-rancu-kontaminasi-dan-pleonasme", badge: "Grammar EYD", title: "Koreksi Kata Rancu & Pemilihan Kata Baku" },
    { toolId: "grammar-bahasa-indonesia", slug: "penulisan-unsur-serapan-bahasa-asing-dan-daerah", badge: "Grammar EYD", title: "Kaidah Kata Baku Serapan Asing" },
  ],
  "kebijakan-fiskal": [
    { toolId: "akuntansi-solver", slug: "cara-menyusun-neraca-saldo-setelah-penutupan", badge: "Akuntansi Solver", title: "Analisis Keuangan & Laporan Fiskal" },
    { toolId: "proposal-usaha", slug: "contoh-analisis-swot-proposal-usaha-kewirausahaan", badge: "Proposal Usaha", title: "Dampak Regulasi Kebijakan Fiskal" },
  ],
  "klorofil": [
    { toolId: "rangkuman", slug: "rangkuman-materi-biologi-sel-jaringan", badge: "Rangkuman Sains", title: "Peran Plastida dan Klorofil pada Sel" },
    { toolId: "generator-soal", slug: "latihan-soal-biologi-sel-sma", badge: "Generator Soal", title: "Latihan Soal Biologi Sel & Jaringan SMA" },
  ],
  "konflik-sosial": [
    { toolId: "rangkuman", slug: "rangkuman-kronologi-perang-dunia-2", badge: "Rangkuman Sejarah", title: "Kajian Konflik Sosial Internasional Perang Dunia" },
    { toolId: "kti-builder", slug: "contoh-rumusan-masalah-dan-tujuan-penelitian-kti", badge: "KTI Builder", title: "Rumusan Masalah Resolusi Konflik Sosial" },
  ],
  "larutan-elektrolit": [
    { toolId: "rangkuman", slug: "rangkuman-materi-asam-basa-dan-titrasi-kimia", badge: "Rangkuman Kimia", title: "Daya Hantar Listrik Larutan Asam Basa" },
    { toolId: "generator-soal", slug: "contoh-soal-pat-matematika-kelas-10", badge: "Generator Soal", title: "Latihan Soal Larutan Elektrolit" },
  ],
  "larutan-penyangga": [
    { toolId: "rangkuman", slug: "rangkuman-materi-asam-basa-dan-titrasi-kimia", badge: "Rangkuman Kimia", title: "Larutan Penyangga (Buffer) & Kurva Titrasi" },
    { toolId: "generator-soal", slug: "contoh-soal-pat-matematika-kelas-10", badge: "Generator Soal", title: "Latihan Soal Kesetimbangan Larutan Buffer" },
  ],
  "latar-belakang": [
    { toolId: "makalah-builder", slug: "contoh-latar-belakang-makalah-pancasila", badge: "Makalah Builder", title: "Contoh Latar Belakang Makalah Pancasila" },
    { toolId: "kti-builder", slug: "contoh-latar-belakang-karya-tulis-ilmiah-sma", badge: "KTI Builder", title: "Contoh Latar Belakang Karya Tulis Ilmiah SMA" },
  ],
  "litosfer": [
    { toolId: "rangkuman", slug: "rangkuman-materi-tata-surya-dan-bumi-ipa-smp", badge: "Rangkuman Sains", title: "Struktur Lapisan Bumi Litosfer & Tata Surya" },
    { toolId: "kamus-anak", slug: "pengertian-metamorfosis-sempurna-anak-sd", badge: "Kamus Anak", title: "Pengenalan Lingkungan Alam Bumi" },
  ],
  "logaritma": [
    { toolId: "simulasi-utbk", slug: "latihan-soal-utbk-pengetahuan-kuantitatif", badge: "Simulasi UTBK", title: "Latihan Soal UTBK Pengetahuan Kuantitatif" },
    { toolId: "generator-soal", slug: "contoh-soal-pat-matematika-kelas-10", badge: "Generator Soal", title: "Latihan Soal PAT Matematika Kelas 10" },
  ],
  "majas": [
    { toolId: "pantun-puisi", slug: "puisi-guru-terima-kasih-singkat-menyentuh-hati", badge: "Pantun & Puisi", title: "Penerapan Majas dalam Puisi Guru" },
    { toolId: "simulasi-utbk", slug: "latihan-soal-utbk-literasi-bahasa-indonesia", badge: "Simulasi UTBK", title: "Analisis Gaya Bahasa & Majas Teks Sastra" },
  ],
  "majas-personifikasi": [
    { toolId: "pantun-puisi", slug: "puisi-guru-terima-kasih-singkat-menyentuh-hati", badge: "Pantun & Puisi", title: "Penerapan Majas Personifikasi dalam Puisi" },
    { toolId: "cerita-pendek", slug: "contoh-cerpen-persahabatan-sekolah-smp", badge: "Cerita Pendek", title: "Penggunaan Gaya Bahasa Majas Cerpen" },
  ],
  "makalah": [
    { toolId: "makalah-builder", slug: "contoh-latar-belakang-makalah-pancasila", badge: "Makalah Builder", title: "Contoh Latar Belakang Makalah Pancasila" },
    { toolId: "makalah-builder", slug: "format-susunan-makalah-sma-kurikulum-merdeka", badge: "Makalah Builder", title: "Format Susunan Makalah SMA Kurikulum Merdeka" },
  ],
  "matriks": [
    { toolId: "math-solver", slug: "sistem-persamaan-linear-dua-variabel-spldv", badge: "Math Solver", title: "Aplikasi Aljabar Linear SPLDV & Matriks" },
    { toolId: "simulasi-utbk", slug: "latihan-soal-utbk-pengetahuan-kuantitatif", badge: "Simulasi UTBK", title: "Latihan Soal UTBK Pengetahuan Kuantitatif" },
  ],
  "meiosis": [
    { toolId: "rangkuman", slug: "rangkuman-materi-biologi-sel-jaringan", badge: "Rangkuman Sains", title: "Tahapan Pembelahan Sel Meiosis vs Mitosis" },
    { toolId: "generator-soal", slug: "latihan-soal-biologi-sel-sma", badge: "Generator Soal", title: "Latihan Soal Pembelahan Sel SMA" },
  ],
  "mitokondria": [
    { toolId: "rangkuman", slug: "rangkuman-materi-biologi-sel-jaringan", badge: "Rangkuman Sains", title: "Struktur Organel Mitokondria & Respirasi Sel" },
    { toolId: "generator-soal", slug: "latihan-soal-biologi-sel-sma", badge: "Generator Soal", title: "Latihan Soal Biologi Sel & Organel SMA" },
  ],
  "mobilitas-sosial": [
    { toolId: "rangkuman", slug: "rangkuman-materi-interaksi-sosial-dan-lembaga-sosiologi", badge: "Rangkuman Sosiologi", title: "Saluran Mobilitas Sosial & Pendidikan" },
    { toolId: "slide-outline", slug: "outline-presentasi-tugas-kelompok-sma", badge: "Slide Outline", title: "Outline Presentasi Gerak Sosial Vertikal-Horizontal" },
  ],
  "orasi": [
    { toolId: "pidato", slug: "teks-pidato-kebersihan-lingkungan-sekolah", badge: "Pidato AI", title: "Teks Pidato Lingkungan & Orasi OSIS" },
    { toolId: "slide-outline", slug: "outline-presentasi-tugas-kelompok-sma", badge: "Slide Outline", title: "Outline Presentasi Retorika Orasi" },
  ],
  "osmosis": [
    { toolId: "rangkuman", slug: "rangkuman-materi-biologi-sel-jaringan", badge: "Rangkuman Sains", title: "Mekanisme Transpor Pasif Osmosis & Difusi" },
    { toolId: "generator-soal", slug: "latihan-soal-biologi-sel-sma", badge: "Generator Soal", title: "Latihan Soal Membran Sel & Transpor Pasif" },
  ],
  "pancasila": [
    { toolId: "makalah-builder", slug: "contoh-latar-belakang-makalah-pancasila", badge: "Makalah Builder", title: "Contoh Latar Belakang Makalah Pancasila" },
    { toolId: "rangkuman", slug: "rangkuman-materi-kedaulatan-negara-ppkn-kelas-9", badge: "Rangkuman PPKn", title: "Rangkuman Nilai Pancasila & Kedaulatan Negara" },
  ],
  "pantun": [
    { toolId: "pantun-puisi", slug: "contoh-pantun-nasihat-pendidikan-4-bait", badge: "Pantun & Puisi", title: "Contoh Pantun Nasihat Pendidikan 4 Bait" },
    { toolId: "pantun-puisi", slug: "pantun-pembuka-presentasi-lucu-dan-menarik", badge: "Pantun & Puisi", title: "Pantun Pembuka Presentasi Lucu & Menarik" },
  ],
  "parafrase": [
    { toolId: "parafrase", slug: "parafrase-jurnal-ilmiah", badge: "Parafrase AI", title: "Parafrase Jurnal Ilmiah Bebas Plagiat" },
    { toolId: "parafrase", slug: "parafrase-jurnal-nasional-sinta-turnitin", badge: "Parafrase AI", title: "Parafrase Jurnal Nasional Sinta & Turnitin" },
  ],
  "pecahan-campuran": [
    { toolId: "math-solver", slug: "persamaan-linear-satu-variabel", badge: "Math Solver", title: "Operasi Pecahan & Persamaan Linear" },
    { toolId: "generator-soal", slug: "latihan-soal-akm-numerasi-smp", badge: "Generator Soal", title: "Latihan Soal AKM Numerasi SMP" },
  ],
  "persamaan-kuadrat": [
    { toolId: "math-solver", slug: "cara-menyelesaikan-persamaan-kuadrat-rumus-abc", badge: "Math Solver", title: "Rumus ABC Persamaan Kuadrat & Contoh Soal" },
    { toolId: "generator-soal", slug: "contoh-soal-pat-matematika-kelas-10", badge: "Generator Soal", title: "Latihan Soal PAT Matematika Kelas 10" },
  ],
  "ph-derajat-keasaman": [
    { toolId: "rangkuman", slug: "rangkuman-materi-asam-basa-dan-titrasi-kimia", badge: "Rangkuman Kimia", title: "Rangkuman Skala pH Asam Basa & Titrasi" },
    { toolId: "generator-soal", slug: "contoh-soal-pat-matematika-kelas-10", badge: "Generator Soal", title: "Latihan Perhitungan pH Larutan Kimia" },
  ],
  "pidato": [
    { toolId: "pidato", slug: "contoh-teks-pidato-perpisahan-sekolah-kelas-9", badge: "Pidato AI", title: "Contoh Teks Pidato Perpisahan Sekolah Kelas 9" },
    { toolId: "pidato", slug: "naskah-pidato-hari-guru-nasional-singkat", badge: "Pidato AI", title: "Naskah Pidato Hari Guru Nasional Singkat" },
  ],
  "plagiarisme": [
    { toolId: "parafrase", slug: "parafrase-jurnal-ilmiah", badge: "Parafrase AI", title: "Teknik Menghindari Plagiarisme pada Skripsi" },
    { toolId: "parafrase", slug: "parafrase-jurnal-nasional-sinta-turnitin", badge: "Parafrase AI", title: "Parafrase Jurnal Nasional Sinta & Turnitin" },
  ],
  "produk-domestik-bruto": [
    { toolId: "proposal-usaha", slug: "contoh-analisis-swot-proposal-usaha-kewirausahaan", badge: "Proposal Usaha", title: "Analisis Makroekonomi & PDB Bisnis" },
    { toolId: "akuntansi-solver", slug: "cara-posting-jurnal-ke-buku-besar-t", badge: "Akuntansi Solver", title: "Laporan Keuangan & Kontribusi Usaha" },
  ],
  "puebi": [
    { toolId: "grammar-bahasa-indonesia", slug: "cek-penggunaan-huruf-kapital", badge: "Grammar EYD", title: "Cek Penggunaan Huruf Kapital Sesuai PUEBI" },
    { toolId: "grammar-bahasa-indonesia", slug: "penggunaan-tanda-titik-koma-dan-titik-dua", badge: "Grammar EYD", title: "Penggunaan Tanda Titik Koma & Titik Dua EYD" },
  ],
  "puisi": [
    { toolId: "pantun-puisi", slug: "puisi-guru-terima-kasih-singkat-menyentuh-hati", badge: "Pantun & Puisi", title: "Puisi Guru Singkat Menyentuh Hati" },
    { toolId: "pantun-puisi", slug: "pantun-perpisahan-sekolah-dan-kenangan-sahabat", badge: "Pantun & Puisi", title: "Puisi & Pantun Perpisahan Sekolah" },
  ],
  "reaksi-redoks": [
    { toolId: "rangkuman", slug: "rangkuman-materi-asam-basa-dan-titrasi-kimia", badge: "Rangkuman Kimia", title: "Reaksi Netralisasi & Redoks Kimia" },
    { toolId: "generator-soal", slug: "contoh-soal-pat-matematika-kelas-10", badge: "Generator Soal", title: "Latihan Soal Penyetaraan Reaksi Kimia" },
  ],
  "retorika": [
    { toolId: "pidato", slug: "contoh-teks-pidato-perpisahan-sekolah-kelas-9", badge: "Pidato AI", title: "Teknik Retorika Persuasif Pidato" },
    { toolId: "slide-outline", slug: "outline-presentasi-tugas-kelompok-sma", badge: "Slide Outline", title: "Outline Presentasi Tugas Kelompok SMA" },
  ],
  "sinonim": [
    { toolId: "parafrase", slug: "parafrase-jurnal-ilmiah", badge: "Parafrase AI", title: "Variasi Diksi & Sinonim Akademik" },
    { toolId: "grammar-bahasa-indonesia", slug: "koreksi-kalimat-efektif", badge: "Grammar EYD", title: "Penggunaan Sinonim Kalimat Efektif" },
  ],
  "sosialisasi": [
    { toolId: "rangkuman", slug: "rangkuman-materi-interaksi-sosial-dan-lembaga-sosiologi", badge: "Rangkuman Sosiologi", title: "Peran Sosialisasi Lembaga Sosial" },
    { toolId: "kti-builder", slug: "contoh-latar-belakang-karya-tulis-ilmiah-sma", badge: "KTI Builder", title: "Kajian Pengaruh Teman Sebaya & Sosialisasi" },
  ],
  "spok": [
    { toolId: "grammar-bahasa-indonesia", slug: "koreksi-kalimat-efektif", badge: "Grammar EYD", title: "Koreksi Kalimat Efektif Sesuai Kaidah SPOK" },
    { toolId: "simulasi-utbk", slug: "latihan-soal-utbk-literasi-bahasa-indonesia", badge: "Simulasi UTBK", title: "Latihan Soal UTBK Literasi Bahasa Indonesia" },
  ],
  "stoikiometri": [
    { toolId: "rangkuman", slug: "rangkuman-materi-asam-basa-dan-titrasi-kimia", badge: "Rangkuman Kimia", title: "Stoikiometri Titrasi & Konsentrasi Molaritas" },
    { toolId: "generator-soal", slug: "contoh-soal-pat-matematika-kelas-10", badge: "Generator Soal", title: "Latihan Soal Konsep Mol & Perhitungan Kimia" },
  ],
  "stratifikasi-sosial": [
    { toolId: "rangkuman", slug: "rangkuman-materi-interaksi-sosial-dan-lembaga-sosiologi", badge: "Rangkuman Sosiologi", title: "Riset Stratifikasi & Lembaga Sosial" },
    { toolId: "slide-outline", slug: "outline-presentasi-tugas-kelompok-sma", badge: "Slide Outline", title: "Outline Presentasi Struktur Kelas Sosial" },
  ],
  "surat-lamaran-kerja": [
    { toolId: "cv-lamaran", slug: "surat-lamaran-kerja-magang-pkl", badge: "CV & Lamaran", title: "Surat Lamaran Kerja Magang PKL" },
    { toolId: "cv-lamaran", slug: "template-cv-ats-smk-fresh-graduate", badge: "CV & Lamaran", title: "Format Surat Lamaran Kerja Lulusan Baru" },
  ],
  "syair": [
    { toolId: "pantun-puisi", slug: "puisi-guru-terima-kasih-singkat-menyentuh-hati", badge: "Pantun & Puisi", title: "Kajian Syair Klasik & Rima Terikat" },
    { toolId: "pantun-puisi", slug: "contoh-pantun-nasihat-pendidikan-4-bait", badge: "Pantun & Puisi", title: "Perbedaan Pantun dan Syair" },
  ],
  "tabel-periodik": [
    { toolId: "rangkuman", slug: "rangkuman-materi-asam-basa-dan-titrasi-kimia", badge: "Rangkuman Kimia", title: "Sifat Keasaman Unsur Tabel Periodik" },
    { toolId: "generator-soal", slug: "contoh-soal-pat-matematika-kelas-10", badge: "Generator Soal", title: "Latihan Soal Karakteristik Kimiawi Unsur" },
  ],
  "tekanan-hidrostatis": [
    { toolId: "rangkuman", slug: "rangkuman-materi-termodinamika-dan-gas-ideal-fisika", badge: "Rangkuman Sains", title: "Prinsip Tekanan Fluida & Gas Ideal" },
    { toolId: "generator-soal", slug: "latihan-soal-hots-fisika-hukum-newton-gerak", badge: "Generator Soal", title: "Aplikasi Gaya & Tekanan Zat" },
  ],
  "teks-prosedur": [
    { toolId: "penjelas-kejuruan", slug: "materi-k3lh-dan-sop-bengkel-otomotif-smk", badge: "Penjelas Kejuruan", title: "SOP Bengkel Otomotif & Prosedur K3LH" },
    { toolId: "cv-lamaran", slug: "surat-lamaran-kerja-magang-pkl", badge: "CV & Lamaran", title: "Langkah Prosedur Mengajukan Lamaran PKL" },
  ],
  "tokoh-protagonis": [
    { toolId: "cerita-pendek", slug: "contoh-cerpen-persahabatan-sekolah-smp", badge: "Cerita Pendek", title: "Karakterisasi Tokoh Protagonis & Antagonis" },
    { toolId: "cerita-pendek", slug: "cerpen-singkat-tema-lingkungan-hidup", badge: "Cerita Pendek", title: "Pengembangan Karakter Cerita Pendek" },
  ],
  "trigonometri": [
    { toolId: "math-solver", slug: "rumus-trigonometri-dasar-sin-cos-tan-segitiga", badge: "Math Solver", title: "Rumus Trigonometri Dasar Sin Cos Tan" },
    { toolId: "simulasi-utbk", slug: "latihan-soal-utbk-pengetahuan-kuantitatif", badge: "Simulasi UTBK", title: "Latihan Soal UTBK Pengetahuan Kuantitatif" },
  ],
};

/**
 * Bidirectional Mesh: Parent Tool -> Curated Kamus Concepts
 * Displayed on PSEO Spoke pages under PseoSolutionSection as foundational glossary concept tags.
 */
export const TOOL_TO_KAMUS_CONCEPTS: Record<string, KamusConceptLink[]> = {
  "akuntansi-solver": [
    { slug: "inflasi", title: "Pengertian Inflasi" },
    { slug: "biaya-peluang", title: "Biaya Peluang (Opportunity Cost)" },
    { slug: "elastisitas-harga", title: "Elastisitas Harga" },
    { slug: "produk-domestik-bruto", title: "Produk Domestik Bruto (PDB)" },
    { slug: "kebijakan-fiskal", title: "Kebijakan Fiskal" },
  ],
  "cerita-pendek": [
    { slug: "cerpen", title: "Pengertian Cerpen" },
    { slug: "alur-cerita", title: "Alur Cerita & Plot" },
    { slug: "tokoh-protagonis", title: "Tokoh Protagonis" },
    { slug: "majas", title: "Gaya Bahasa & Majas" },
    { slug: "majas-personifikasi", title: "Majas Personifikasi" },
  ],
  "cv-lamaran": [
    { slug: "curriculum-vitae", title: "Format Curriculum Vitae (CV)" },
    { slug: "surat-lamaran-kerja", title: "Surat Lamaran Kerja" },
    { slug: "teks-prosedur", title: "Teks Prosedur" },
    { slug: "kata-baku", title: "Penggunaan Kata Baku KBBI" },
  ],
  "essay-english": [
    { slug: "kalimat-efektif", title: "Kalimat Efektif" },
    { slug: "sinonim", title: "Variasi Diksi & Sinonim" },
    { slug: "parafrase", title: "Teknik Parafrase" },
    { slug: "plagiarisme", title: "Pencegahan Plagiarisme" },
  ],
  "generator-soal": [
    { slug: "capaian-pembelajaran", title: "Capaian Pembelajaran (CP)" },
    { slug: "alur-tujuan-pembelajaran", title: "Alur Tujuan Pembelajaran (ATP)" },
    { slug: "asesmen-diagnostik", title: "Asesmen Diagnostik" },
    { slug: "asesmen-formatif", title: "Asesmen Formatif" },
    { slug: "asesmen-sumatif", title: "Asesmen Sumatif" },
    { slug: "taksonomi-bloom", title: "Taksonomi Bloom (C1-C6)" },
    { slug: "diferensiasi-pembelajaran", title: "Diferensiasi Pembelajaran" },
    { slug: "kriteria-ketercapaian-tujuan-pembelajaran", title: "Kriteria KKTP" },
  ],
  "grammar-bahasa-indonesia": [
    { slug: "kalimat-efektif", title: "Struktur Kalimat Efektif" },
    { slug: "kalimat-pasif", title: "Kalimat Pasif" },
    { slug: "kata-baku", title: "Kata Baku vs Tidak Baku" },
    { slug: "puebi", title: "Pedoman Umum Ejaan Bahasa Indonesia (PUEBI)" },
    { slug: "spok", title: "Pola Kalimat SPOK" },
  ],
  "grammar-bahasa-inggris": [
    { slug: "kalimat-efektif", title: "Kalimat Efektif" },
    { slug: "kalimat-pasif", title: "Passive Voice & Kalimat Pasif" },
    { slug: "sinonim", title: "Sinonim & Kosakata" },
    { slug: "kata-baku", title: "Kata Baku Standar" },
  ],
  "kamus-anak": [
    { slug: "ekosistem", title: "Pengertian Ekosistem" },
    { slug: "fotosintesis", title: "Proses Fotosintesis" },
    { slug: "litosfer", title: "Lapisan Bumi Litosfer" },
    { slug: "pantun", title: "Seni Pantun Anak" },
  ],
  "kitab-kuning": [
    { slug: "kata-baku", title: "Istilah Baku" },
    { slug: "retorika", title: "Seni Bahasa Retorika" },
    { slug: "pidato", title: "Naskah Pidato & Ceramah" },
    { slug: "teks-prosedur", title: "Teks Prosedur Pembelajaran" },
  ],
  "kti-builder": [
    { slug: "makalah", title: "Struktur Karya Tulis Ilmiah" },
    { slug: "latar-belakang", title: "Latar Belakang Masalah" },
    { slug: "daftar-pustaka", title: "Format Sitasi Daftar Pustaka" },
    { slug: "abstrak", title: "Abstrak Karya Ilmiah" },
    { slug: "integritas-akademik", title: "Integritas Akademik" },
    { slug: "anomi", title: "Kajian Teori Anomi" },
    { slug: "konflik-sosial", title: "Analisis Konflik Sosial" },
  ],
  "laporan-pkl": [
    { slug: "teks-prosedur", title: "Teks Prosedur Kerja & SOP" },
    { slug: "surat-lamaran-kerja", title: "Surat Permohonan Magang" },
    { slug: "curriculum-vitae", title: "CV Siswa Magang" },
    { slug: "daftar-pustaka", title: "Daftar Pustaka Laporan PKL" },
  ],
  "makalah-builder": [
    { slug: "makalah", title: "Struktur Sistematika Makalah" },
    { slug: "latar-belakang", title: "Latar Belakang Makalah" },
    { slug: "daftar-pustaka", title: "Daftar Pustaka & Sitasi" },
    { slug: "abstrak", title: "Abstrak Makalah" },
    { slug: "pancasila", title: "Nilai Dasar Pancasila" },
  ],
  "materi-pai": [
    { slug: "pancasila", title: "Pendidikan Pancasila & Karakter" },
    { slug: "retorika", title: "Retorika Dakwah" },
    { slug: "pidato", title: "Kaidah Khutbah & Pidato" },
    { slug: "teks-prosedur", title: "Teks Prosedur Praktik Ibadah" },
  ],
  "math-solver": [
    { slug: "teorema-pythagoras", title: "Teorema Pythagoras" },
    { slug: "persamaan-kuadrat", title: "Akar Persamaan Kuadrat" },
    { slug: "fungsi-komposisi", title: "Fungsi Komposisi & Invers" },
    { slug: "matriks-invers", title: "Invers & Determinan Matriks" },
    { slug: "sudut-sehadap", title: "Sudut Sehadap & Garis Sejajar" },
    { slug: "aritmetika-sosial", title: "Aritmetika Sosial Finansial" },
    { slug: "probabilitas", title: "Peluang & Probabilitas" },
    { slug: "statistika", title: "Ukuran Pemusatan Statistika" },
  ],
  "muhafazhah": [
    { slug: "retorika", title: "Kaidah Pelafalan & Retorika" },
    { slug: "kata-baku", title: "Kata Baku & Diksi" },
    { slug: "teks-prosedur", title: "Langkah Prosedur Hafalan" },
  ],
  "nahwu-shorof": [
    { slug: "spok", title: "Pola Subjek-Predikat-Objek (SPOK)" },
    { slug: "kalimat-efektif", title: "Struktur Kalimat Efektif" },
    { slug: "kalimat-pasif", title: "Bentuk Kalimat Pasif" },
    { slug: "kata-baku", title: "Standarisasi Kata Baku" },
  ],
  "pantun-puisi": [
    { slug: "pantun", title: "Seni Pantun Tradisional" },
    { slug: "puisi", title: "Bait Puisi & Diksi" },
    { slug: "gurindam", title: "Struktur Syair Gurindam" },
    { slug: "syair", title: "Kajian Puisi Klasik Syair" },
    { slug: "majas", title: "Gaya Bahasa Majas" },
  ],
  "parafrase": [
    { slug: "paragraf-deduktif", title: "Paragraf Deduktif" },
    { slug: "paragraf-induktif", title: "Paragraf Induktif" },
    { slug: "integritas-akademik", title: "Integritas Akademik" },
    { slug: "turnitin", title: "Uji Similaritas Turnitin" },
    { slug: "parafrase", title: "Metode Parafrase Kalimat" },
    { slug: "plagiarisme", title: "Pencegahan Plagiarisme" },
    { slug: "sinonim", title: "Variasi Diksi & Sinonim" },
  ],
  "penerjemah-daerah": [
    { slug: "sinonim", title: "Persamaan Kata & Sinonim" },
    { slug: "kata-baku", title: "Kata Serapan & Baku" },
    { slug: "kalimat-efektif", title: "Kalimat Efektif Bahasa Daerah" },
    { slug: "pantun", title: "Pantun Bahasa Daerah" },
  ],
  "penjelas-hadits": [
    { slug: "retorika", title: "Gaya Bahasa Retorika" },
    { slug: "pidato", title: "Struktur Teks Ceramah" },
    { slug: "kata-baku", title: "Pedoman Kata Baku KBBI" },
    { slug: "teks-prosedur", title: "Sistematika Prosedur" },
  ],
  "penjelas-kejuruan": [
    { slug: "teks-prosedur", title: "SOP Bengkel & Teks Prosedur" },
    { slug: "curriculum-vitae", title: "CV Kejuruan SMK Standar ATS" },
    { slug: "surat-lamaran-kerja", title: "Surat Lamaran Kerja Industri" },
    { slug: "biaya-peluang", title: "Kalkulasi Biaya Peluang Produksi" },
  ],
  "pidato": [
    { slug: "pidato", title: "Struktur Teks Pidato" },
    { slug: "orasi", title: "Teknik Orasi Membakar Semangat" },
    { slug: "retorika", title: "Retorika Persuasif (Ethos, Pathos, Logos)" },
    { slug: "kalimat-efektif", title: "Kalimat Efektif Pidato" },
    { slug: "majas", title: "Majas & Gaya Bahasa" },
  ],
  "proposal-usaha": [
    { slug: "hukum-permintaan-dan-penawaran", title: "Permintaan & Penawaran Pasar" },
    { slug: "biaya-peluang", title: "Biaya Peluang (Opportunity Cost)" },
    { slug: "elastisitas-harga", title: "Elastisitas Harga Produk" },
    { slug: "inflasi", title: "Dampak Inflasi terhadap Usaha" },
    { slug: "produk-domestik-bruto", title: "Makroekonomi & PDB" },
  ],
  "rangkuman": [
    { slug: "fotosintesis", title: "Reaksi Fotosintesis" },
    { slug: "mitokondria", title: "Organel Sel Mitokondria" },
    { slug: "dna", title: "Struktur DNA & Genetika" },
    { slug: "osmosis", title: "Osmosis & Difusi Sel" },
    { slug: "enzim", title: "Katalisator Reaksi Enzim" },
    { slug: "hukum-newton", title: "Hukum Gerak Newton" },
    { slug: "hukum-kekekalan-energi", title: "Hukum Kekekalan Energi" },
    { slug: "efek-doppler", title: "Efek Doppler Gelombang" },
  ],
  "simulasi-utbk": [
    { slug: "item-response-theory", title: "Item Response Theory (IRT)" },
    { slug: "silogisme", title: "Silogisme & Logika Analitik" },
    { slug: "penalaran-deduktif", title: "Penalaran Deduktif" },
    { slug: "penalaran-induktif", title: "Penalaran Induktif" },
    { slug: "daya-pembeda", title: "Daya Pembeda Butir Soal" },
    { slug: "tingkat-kesukaran", title: "Tingkat Kesukaran Soal" },
    { slug: "modus-ponens", title: "Modus Ponens" },
    { slug: "modus-tollens", title: "Modus Tollens" },
  ],
  "slide-outline": [
    { slug: "modul-ajar", title: "Modul Ajar Kurikulum Merdeka" },
    { slug: "profil-pelajar-pancasila", title: "Profil Pelajar Pancasila (P5)" },
    { slug: "interaksi-sosial", title: "Interaksi Sosial Masyarakat" },
    { slug: "stratifikasi-sosial", title: "Stratifikasi Sosial" },
    { slug: "retorika", title: "Sistematika Retorika Presentasi" },
    { slug: "orasi", title: "Teknik Public Speaking & Orasi" },
  ],
  "tafsir-quran": [
    { slug: "retorika", title: "Kajian Balaghah & Retorika" },
    { slug: "pidato", title: "Struktur Naskah Pidato Keagamaan" },
    { slug: "kata-baku", title: "Transliterasi & Kata Baku Resmi" },
  ],
  "tajwid": [
    { slug: "kata-baku", title: "Ketepatan Ejaan & Kata Baku" },
    { slug: "teks-prosedur", title: "Tata Cara & Teks Prosedur Tajwid" },
    { slug: "retorika", title: "Retorika Pembacaan Al-Quran" },
  ],
  "translator-arab": [
    { slug: "sinonim", title: "Variasi Terjemahan & Sinonim" },
    { slug: "kata-baku", title: "Kata Baku Bahasa Indonesia" },
    { slug: "kalimat-efektif", title: "Kaidah Kalimat Efektif" },
    { slug: "kalimat-pasif", title: "Kaidah Bentuk Pasif" },
  ],
};

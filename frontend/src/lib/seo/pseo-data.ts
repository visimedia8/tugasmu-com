export interface PseoPageData {
  slug: string;
  toolId: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  initialPrompt: string;
}

export const PSEO_DATA: PseoPageData[] = [
  // --- MATH SOLVER ---
  {
    slug: 'cara-menghitung-luas-lingkaran',
    toolId: 'math-solver',
    title: 'Cara Menghitung Luas Lingkaran & Rumus Step-by-Step | TugasMu',
    description: 'Pahami cara menghitung luas lingkaran jika diketahui jari-jari atau diameternya. Masukkan soalmu dan dapatkan penjelasan rumus langkah demi langkah.',
    h1: 'Kalkulator Rumus Luas Lingkaran',
    subtitle: 'Masukkan soal luas lingkaranmu di bawah. AI akan membedahnya dengan rumus L = π × r² secara bertahap.',
    initialPrompt: 'Sebuah lingkaran memiliki jari-jari 14 cm. Hitunglah luas lingkaran tersebut secara lengkap!',
  },
  {
    slug: 'cara-mencari-sisi-miring-segitiga-siku-siku',
    toolId: 'math-solver',
    title: 'Rumus Pythagoras: Cara Mencari Sisi Miring Segitiga | TugasMu',
    description: 'Cara mudah menghitung sisi miring (hipotenusa) segitiga siku-siku menggunakan teorema Pythagoras c² = a² + b². Ketik soalmu di sini!',
    h1: 'Kalkulator Rumus Pythagoras (Sisi Miring)',
    subtitle: 'Ketik soal segitiga siku-siku kamu. AI akan merincikan perhitungan akar kuadratnya agar kamu paham konsepnya.',
    initialPrompt: 'Sebuah segitiga siku-siku memiliki panjang alas 6 cm dan tinggi 8 cm. Berapakah panjang sisi miringnya?',
  },
  {
    slug: 'cara-menghitung-volume-kubus',
    toolId: 'math-solver',
    title: 'Cara Menghitung Volume Kubus & Contoh Soal | TugasMu',
    description: 'Pelajari rumus volume kubus (V = s x s x s) beserta cara pengerjaannya. Masukkan panjang rusuk kubus dan dapatkan jawaban lengkap.',
    h1: 'Kalkulator Volume Kubus',
    subtitle: 'Gunakan kalkulator pintar ini untuk membedah soal volume kubusmu step-by-step.',
    initialPrompt: 'Diketahui sebuah kubus memiliki panjang rusuk 12 cm. Berapakah volume kubus tersebut?',
  },
  {
    slug: 'persamaan-linear-satu-variabel',
    toolId: 'math-solver',
    title: 'Penyelesaian Persamaan Linear Satu Variabel (PLSV) | TugasMu',
    description: 'Selesaikan soal Persamaan Linear Satu Variabel (PLSV) dengan mudah. Pahami aturan pindah ruas dan operasi aljabar dasar.',
    h1: 'Kalkulator Persamaan Linear (PLSV)',
    subtitle: 'Ketik persamaan linearmu (misal: 2x + 5 = 15). AI akan menjelaskan aturan pindah ruas baris demi baris.',
    initialPrompt: 'Tentukan nilai x dari persamaan: 3x - 7 = 14',
  },
  {
    slug: 'rumus-kecepatan-jarak-waktu',
    toolId: 'math-solver',
    title: 'Menghitung Kecepatan, Jarak, dan Waktu (Rumus Jokowi) | TugasMu',
    description: 'Cara menyelesaikan soal cerita jarak, kecepatan, dan waktu berpapasan atau menyusul dengan penjelasan paling mudah.',
    h1: 'Pemecah Soal Jarak, Waktu, Kecepatan',
    subtitle: 'Ketik soal cerita kendaraanmu. AI akan menjabarkan rumus Segitiga JKW secara visual dan matematis.',
    initialPrompt: 'Budi mengendarai mobil dari kota A ke kota B dengan kecepatan 60 km/jam. Jarak kedua kota adalah 150 km. Jika ia berangkat pukul 07.00, jam berapa ia tiba?',
  },

  // --- GRAMMAR EYD (BAHASA INDONESIA) ---
  {
    slug: 'cek-penulisan-daftar-pustaka',
    toolId: 'grammar-eyd',
    title: 'Cek Format Penulisan Daftar Pustaka APA/MLA Otomatis | TugasMu',
    description: 'Periksa kebenaran format daftar pustaka (referensi) buku, jurnal, dan website sesuai standar PUEBI dan APA Style.',
    h1: 'Pengecek Format Daftar Pustaka',
    subtitle: 'Paste teks daftar pustakamu di bawah. AI akan mengkoreksi urutan Nama, Tahun, Judul, dan Kota Penerbit.',
    initialPrompt: 'Budi Santoso. 2021. Belajar Bahasa. Jakarta: Penerbit Buku.',
  },
  {
    slug: 'koreksi-kalimat-efektif',
    toolId: 'grammar-eyd',
    title: 'Alat Koreksi Kalimat Efektif & Tidak Baku | TugasMu',
    description: 'Ubah kalimat bertele-tele menjadi kalimat efektif. Alat ini otomatis membuang kata pleonasme dan membetulkan struktur Subjek-Predikat.',
    h1: 'Korektor Kalimat Efektif',
    subtitle: 'Masukkan paragraf yang terasa janggal. AI akan merapikannya menjadi kalimat akademis yang ringkas dan padat.',
    initialPrompt: 'Bagi para siswa-siswa sekalian dimohon untuk segera masuk ke dalam kelas masing-masing dikarenakan waktu ujian akan segera dimulai.',
  },
  {
    slug: 'cek-penggunaan-huruf-kapital',
    toolId: 'grammar-eyd',
    title: 'Pengecek Penggunaan Huruf Kapital & Tanda Baca | TugasMu',
    description: 'Pastikan penulisan huruf kapital pada nama tempat, gelar, dan awal kalimat sudah benar sesuai pedoman EYD V.',
    h1: 'Pendeteksi Kesalahan Huruf Kapital',
    subtitle: 'Jangan biarkan typo merusak esaimu. Biarkan AI memindai seluruh kesalahan huruf kapital dan koma.',
    initialPrompt: 'pada hari minggu kemaren, bapak ir. joko widodo pergi berkunjung ke kota bandung provinsi jawa barat.',
  },

  // --- PARAFRASE ---
  {
    slug: 'parafrase-jurnal-ilmiah',
    toolId: 'parafrase',
    title: 'Parafrase Jurnal Ilmiah (Anti Plagiarisme Turnitin) | TugasMu',
    description: 'Ubah struktur kalimat dari jurnal ilmiah orang lain tanpa mengubah makna aslinya. Solusi aman menghindari deteksi plagiarisme Turnitin.',
    h1: 'Parafrase Jurnal & Karya Ilmiah',
    subtitle: 'Paste potongan jurnal di sini. AI akan merombak strukturnya menggunakan gaya bahasa akademis yang baru.',
    initialPrompt: 'Penelitian ini bertujuan untuk menguji pengaruh media sosial terhadap tingkat stres mahasiswa tingkat akhir dalam menyusun skripsi.',
  },
  {
    slug: 'parafrase-kalimat-pasif',
    toolId: 'parafrase',
    title: 'Ubah Kalimat Aktif Menjadi Pasif Otomatis | TugasMu',
    description: 'Generator otomatis untuk mengubah kalimat aktif menjadi kalimat pasif (atau sebaliknya) guna variasi penulisan.',
    h1: 'Konverter Kalimat Aktif - Pasif',
    subtitle: 'Masukkan kalimatmu. AI akan membalik strukturnya secara sempurna agar esaimu lebih bervariasi.',
    initialPrompt: 'Pemerintah telah membangun jembatan baru itu pada awal tahun 2022 untuk mengatasi kemacetan.',
  }
];

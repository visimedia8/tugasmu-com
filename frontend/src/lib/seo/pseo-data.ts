export interface PseoPageData {
  slug: string;
  toolId: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  initialPrompt: string;
  explanation: string;
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
    explanation: '<h2>Memahami Konsep Dasar Luas Lingkaran</h2><p>Luas lingkaran adalah seluruh area yang berada di dalam kurva lingkaran tersebut. Untuk menemukan luas ini, metematikawan menggunakan konstanta Pi (π), yang bernilai sekitar 3,14 atau 22/7. Rumus absolut penentu luas lingkaran adalah <strong>L = π × r²</strong>. Pada rumus ini, \'L\' merepresentasikan Luas, \'π\' merepresentasikan nilai Pi, dan \'r\' merepresentasikan radius (jari-jari) lingkaran. Apabila soal hanya menyajikan data diameter (garis tengah), radius dapat ditemukan dengan membagi diameter tersebut menjadi dua (r = d ÷ 2).</p><p>Kesalahan paling umum yang sering terjadi dalam ujian adalah melupakan kuadrat pada radius. Siswa sering kali hanya mengalikan Pi dengan jari-jari, alih-alih mengalikan Pi dengan jari-jari yang telah dikuadratkan. Gunakan kalkulator di atas untuk membedah perhitungan secara presisi dan menghindari jebakan logika ini.</p>',
  },
  {
    slug: 'cara-mencari-sisi-miring-segitiga-siku-siku',
    toolId: 'math-solver',
    title: 'Rumus Pythagoras: Cara Mencari Sisi Miring Segitiga | TugasMu',
    description: 'Cara mudah menghitung sisi miring (hipotenusa) segitiga siku-siku menggunakan teorema Pythagoras c² = a² + b². Ketik soalmu di sini!',
    h1: 'Kalkulator Rumus Pythagoras (Sisi Miring)',
    subtitle: 'Ketik soal segitiga siku-siku kamu. AI akan merincikan perhitungan akar kuadratnya agar kamu paham konsepnya.',
    initialPrompt: 'Sebuah segitiga siku-siku memiliki panjang alas 6 cm dan tinggi 8 cm. Berapakah panjang sisi miringnya?',
    explanation: '<h2>Teorema Pythagoras dan Hipotenusa</h2><p>Sisi miring pada segitiga siku-siku, atau yang secara akademis dikenal sebagai hipotenusa, selalu berada tepat di hadapan sudut 90 derajat. Hipotenusa merupakan sisi terpanjang dalam konfigurasi segitiga siku-siku. Filsuf Yunani kuno, Pythagoras, merumuskan postulat mutlak bahwa kuadrat sisi miring selalu sama dengan jumlah kuadrat dari kedua sisi lainnya. Postulat ini direpresentasikan dalam rumus <strong>c² = a² + b²</strong>.</p><p>Dalam pengaplikasian rumus ini, \'c\' selalu merujuk pada sisi miring, sedangkan \'a\' dan \'b\' merujuk pada sisi alas dan sisi tinggi (sisi tegak lurus). Menentukan nilai akhir \'c\' membutuhkan operasi akar kuadrat dari total penjumlahan a² dan b². Alat AI kami dirancang untuk memecah proses kuadrat dan akar kuadrat ini secara visual, memastikan konsep dasar geometri ini terpahami secara utuh.</p>',
  },
  {
    slug: 'cara-menghitung-volume-kubus',
    toolId: 'math-solver',
    title: 'Cara Menghitung Volume Kubus & Contoh Soal | TugasMu',
    description: 'Pelajari rumus volume kubus (V = s x s x s) beserta cara pengerjaannya. Masukkan panjang rusuk kubus dan dapatkan jawaban lengkap.',
    h1: 'Kalkulator Volume Kubus',
    subtitle: 'Gunakan kalkulator pintar ini untuk membedah soal volume kubusmu step-by-step.',
    initialPrompt: 'Diketahui sebuah kubus memiliki panjang rusuk 12 cm. Berapakah volume kubus tersebut?',
    explanation: '<h2>Konstruksi Geometri Volume Kubus</h2><p>Kubus adalah bangun ruang tiga dimensi yang terstruktur atas enam sisi persegi yang identik mutlak. Karakteristik paling mendasar dari kubus adalah seluruh rusuknya memiliki panjang yang sama rata. Keseragaman dimensi ini menyederhanakan kalkulasi kapasitas ruang (volume) di dalamnya. Rumus matematis untuk volume kubus adalah <strong>V = s × s × s</strong> atau <strong>V = s³</strong>.</p><p>Variabel \'s\' dalam rumus tersebut merepresentasikan panjang sisi (atau rusuk). Menghitung volume berarti mengalikan dimensi panjang, lebar, dan tinggi bangun tersebut; yang mana pada kubus, ketiganya bernilai ekuivalen. Hasil akhir dari perhitungan ini menggunakan satuan kubik (misalnya, cm³, m³). Masukkan nilai rusuk ke dalam generator kami untuk melihat pembedahan eksponensialnya.</p>',
  },
  {
    slug: 'persamaan-linear-satu-variabel',
    toolId: 'math-solver',
    title: 'Penyelesaian Persamaan Linear Satu Variabel (PLSV) | TugasMu',
    description: 'Selesaikan soal Persamaan Linear Satu Variabel (PLSV) dengan mudah. Pahami aturan pindah ruas dan operasi aljabar dasar.',
    h1: 'Kalkulator Persamaan Linear (PLSV)',
    subtitle: 'Ketik persamaan linearmu (misal: 2x + 5 = 15). AI akan menjelaskan aturan pindah ruas baris demi baris.',
    initialPrompt: 'Tentukan nilai x dari persamaan: 3x - 7 = 14',
    explanation: '<h2>Logika Aljabar Persamaan Linear</h2><p>Persamaan Linear Satu Variabel (PLSV) adalah pilar fundamental dalam struktur aljabar. Dinamakan \'linear\' karena apabila digambarkan dalam grafik, persamaan ini membentuk garis lurus, dan hanya mengandung satu variabel independen yang berpangkat satu (misalnya hanya ada \'x\', tanpa \'x²\'). Tujuan akhir dari PLSV adalah mengisolasi variabel independen tersebut di satu sisi tanda sama dengan (=) untuk menemukan nilai tunggalnya.</p><p>Metode penyelesaiannya mengandalkan prinsip keseimbangan neraca. Apabila suatu operasi penambahan dilakukan di ruas kiri, ruas kanan harus menerima operasi ekuivalen. Dalam praktiknya, konsep ini sering dipermudah menjadi aturan "pindah ruas", di mana operator positif menjadi negatif saat melintasi tanda sama dengan, dan operasi perkalian bertransisi menjadi pembagian. Alat kami menarasikan perpindahan ruas ini langkah demi langkah.</p>',
  },
  {
    slug: 'rumus-kecepatan-jarak-waktu',
    toolId: 'math-solver',
    title: 'Menghitung Kecepatan, Jarak, dan Waktu (Rumus Jokowi) | TugasMu',
    description: 'Cara menyelesaikan soal cerita jarak, kecepatan, dan waktu berpapasan atau menyusul dengan penjelasan paling mudah.',
    h1: 'Pemecah Soal Jarak, Waktu, Kecepatan',
    subtitle: 'Ketik soal cerita kendaraanmu. AI akan menjabarkan rumus Segitiga JKW secara visual dan matematis.',
    initialPrompt: 'Budi mengendarai mobil dari kota A ke kota B dengan kecepatan 60 km/jam. Jarak kedua kota adalah 150 km. Jika ia berangkat pukul 07.00, jam berapa ia tiba?',
    explanation: '<h2>Dinamika Jarak, Kecepatan, dan Waktu</h2><p>Relasi antara jarak, kecepatan, dan waktu adalah konsep fisika dasar yang paling sering muncul dalam ujian matematika terapan. Ketiga elemen ini terikat dalam satu formula absolut: <strong>Jarak = Kecepatan × Waktu (J = K × W)</strong>. Dari formula dasar ini, kita dapat menarik dua turunan matematis: Kecepatan adalah hasil pembagian Jarak dengan Waktu (K = J / W), dan Waktu adalah turunan dari Jarak dibagi Kecepatan (W = J / K).</p><p>Metodologi mnemonik \'Segitiga JKW\' sering digunakan untuk menghafal posisi pembagian dan perkalian ini. Tingkat kesulitan tertinggi dari materi ini biasanya terletak pada konversi satuan (misalnya mengubah menit ke jam sebelum perhitungan) dan skenario dua objek bergerak (berpapasan atau menyusul). Sistem kami membedah konversi satuan secara otomatis sebelum mengeksekusi kalkulasi utama.</p>',
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
    explanation: '<h2>Standardisasi Format Referensi Akademis</h2><p>Daftar pustaka merupakan tulang punggung integritas dalam karya tulis ilmiah. Setiap institusi pendidikan mensyaratkan standar format tertentu, dengan <em>APA (American Psychological Association) Style</em> dan format PUEBI (Pedoman Umum Ejaan Bahasa Indonesia) sebagai dua kutub paling dominan. Komponen dasar daftar pustaka selalu mencakup identitas penulis, waktu publikasi, judul karya, dan data penerbitan, namun tata letak titik, koma, dan huruf miring (italic) membedakan setiap gaya selingkung.</p><p>Kesalahan fatal yang sering dilakukan penulis adalah ketidakkonsistenan penulisan nama penulis (apakah nama belakang mendahului nama depan) dan ketiadaan format <em>italic</em> pada judul buku atau jurnal. Alat deteksi ejaan kami dirancang khusus untuk memindai sintaksis teks referensi dan menyelaraskannya dengan standar metodologi penelitian yang diakui secara global.</p>',
  },
  {
    slug: 'koreksi-kalimat-efektif',
    toolId: 'grammar-eyd',
    title: 'Alat Koreksi Kalimat Efektif & Tidak Baku | TugasMu',
    description: 'Ubah kalimat bertele-tele menjadi kalimat efektif. Alat ini otomatis membuang kata pleonasme dan membetulkan struktur Subjek-Predikat.',
    h1: 'Korektor Kalimat Efektif',
    subtitle: 'Masukkan paragraf yang terasa janggal. AI akan merapikannya menjadi kalimat akademis yang ringkas dan padat.',
    initialPrompt: 'Bagi para siswa-siswa sekalian dimohon untuk segera masuk ke dalam kelas masing-masing dikarenakan waktu ujian akan segera dimulai.',
    explanation: '<h2>Anatomi Kalimat Efektif dan Ekonomi Bahasa</h2><p>Kalimat efektif adalah kalimat yang mampu menyampaikan gagasan secara presisi tanpa redundansi leksikal. Syarat utama kalimat efektif mencakup kejelasan struktur Subjek-Predikat, kesejajaran bentuk (paralelisme), ketegasan makna, dan kehematan kata. Pelanggaran paling umum terhadap efektivitas kalimat adalah pleonasme—penggunaan kata yang berlebihan dan tumpang tindih maknanya, seperti penggabungan kata "sangat" dengan "sekali".</p><p>Tulisan akademik menuntut ekonomi bahasa tingkat tinggi. Semakin padat suatu kalimat mengantarkan informasi, semakin kredibel karya tersebut di mata penguji. Mesin korektor kami membedah struktur S-P-O-K, memangkas verba yang tumpang tindih, dan merekonstruksi paragraf Anda menjadi bentuk paling tajam tanpa mendistorsi esensi argumen orisinal.</p>',
  },
  {
    slug: 'cek-penggunaan-huruf-kapital',
    toolId: 'grammar-eyd',
    title: 'Pengecek Penggunaan Huruf Kapital & Tanda Baca | TugasMu',
    description: 'Pastikan penulisan huruf kapital pada nama tempat, gelar, dan awal kalimat sudah benar sesuai pedoman EYD V.',
    h1: 'Pendeteksi Kesalahan Huruf Kapital',
    subtitle: 'Jangan biarkan typo merusak esaimu. Biarkan AI memindai seluruh kesalahan huruf kapital dan koma.',
    initialPrompt: 'pada hari minggu kemaren, bapak ir. joko widodo pergi berkunjung ke kota bandung provinsi jawa barat.',
    explanation: '<h2>Regulasi Tipografi dan Ortografi PUEBI</h2><p>Penggunaan huruf kapital (huruf besar) diregulasi secara ketat dalam Pedoman Umum Ejaan Bahasa Indonesia (PUEBI) Edisi V. Fungsi huruf kapital tidak sebatas menjadi penanda awal kalimat, melainkan sebagai indikator entitas khusus (proper noun). Hal ini mencakup nama geografi yang diikuti nama tempat spesifik, gelar kehormatan yang diikuti nama subjek, hari raya, dan instansi resmi. Kesalahan ortografi dalam dokumen formal dapat merusak validitas dokumen tersebut secara institusional.</p><p>Kompleksitas muncul pada area abu-abu, misalnya kata \'presiden\' tidak dikapitalisasi jika berdiri sendiri, namun wajib dikapitalisasi jika merujuk pada individu spesifik (Presiden Republik Indonesia). Algoritma kami bertindak sebagai proofreader digital yang memindai teks Anda berdasarkan aturan kontekstual PUEBI, memastikan dokumen Anda lolos dari audit ejaan paling ketat sekalipun.</p>',
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
    explanation: '<h2>Teknik Sintaksis Penghindar Deteksi Similarity</h2><p>Plagiarisme adalah kejahatan akademis fatal yang dimonitor ketat oleh sistem perangkat lunak seperti Turnitin dan iThenticate. Mesin deteksi ini tidak hanya mencari salinan kata demi kata (copy-paste), tetapi juga memindai kesamaan pola struktur kalimat. Oleh karena itu, mengganti satu atau dua kata dengan sinonim tidak lagi cukup untuk menurunkan persentase similarity. Diperlukan perombakan sintaksis total, yang secara akademis dikenal sebagai teknik parafrase mendalam.</p><p>Parafrase tingkat lanjut mengharuskan penulis untuk menyerap makna teks orisinal, menutup sumber tersebut, dan memformulasikan ulang idenya menggunakan kerangka kalimat yang sepenuhnya baru. Algoritma kami dirancang untuk melakukan tugas ini secara instan: membalik urutan klausa aktif menjadi pasif, mensubstitusi leksikon dengan terminologi akademis tingkat tinggi, namun mengamankan keutuhan data dan variabel penelitian Anda.</p>',
  },
  {
    slug: 'parafrase-kalimat-pasif',
    toolId: 'parafrase',
    title: 'Ubah Kalimat Aktif Menjadi Pasif Otomatis | TugasMu',
    description: 'Generator otomatis untuk mengubah kalimat aktif menjadi kalimat pasif (atau sebaliknya) guna variasi penulisan.',
    h1: 'Konverter Kalimat Aktif - Pasif',
    subtitle: 'Masukkan kalimatmu. AI akan membalik strukturnya secara sempurna agar esaimu lebih bervariasi.',
    initialPrompt: 'Pemerintah telah membangun jembatan baru itu pada awal tahun 2022 untuk mengatasi kemacetan.',
    explanation: '<h2>Dinamika Voice Transformation dalam Tata Bahasa</h2><p>Variasi struktur kalimat adalah elemen kunci yang membedakan tulisan level amatir dari tulisan profesional. Salah satu metode paling efisien untuk menciptakan variasi ini adalah melalui konversi \'voice\'—mengubah kalimat aktif menjadi pasif (atau sebaliknya). Dalam kalimat aktif, subjek melakukan tindakan langsung terhadap objek. Sebaliknya, dalam kalimat pasif, objek menerima tindakan dari subjek, yang sering kali menempatkan fokus utama pada hasil tindakan tersebut daripada pelaku tindakan.</p><p>Konversi ini tidak semata-mata menukar posisi kata. Transformasi aktif-pasif membutuhkan penyesuaian partikel verba (seperti perubahan imbuhan me- menjadi di- dalam bahasa Indonesia) dan penggunaan preposisi secara akurat. Alat konverter kami memastikan transisi gramatikal ini berjalan tanpa mendistorsi waktu (tense) dan nuansa makna dari pernyataan orisinal Anda.</p>',
  }
];

const fs = require('fs');
const path = require('path');

const entries = [
  {
    slug: 'parafrase',
    title: 'Apa itu Parafrase',
    desc: 'Pengertian parafrase, tujuan, dan bagaimana teknik ini digunakan untuk menulis ulang kalimat tanpa mengubah makna aslinya.',
    content: 'Parafrase adalah teknik menulis ulang sebuah gagasan atau kalimat dari sumber asli menggunakan pilihan kata (diksi) dan struktur kalimat yang berbeda, tanpa sedikitpun mengubah makna atau pesan aslinya. Tujuan utama parafrase adalah untuk menyederhanakan teks yang rumit agar lebih mudah dipahami, serta sebagai metode legal dan akademis untuk menghindari plagiarisme saat mengutip karya orang lain.\n\nDalam dunia akademis, kemampuan ini sangat esensial. Jika kamu kesulitan menyusun ulang kalimat untuk tugas esai atau makalah, kamu bisa memanfaatkan Bimbingan AI TugasMu melalui fitur penyempurna kalimat untuk menemukan padanan kata yang tepat.'
  },
  {
    slug: 'plagiarisme',
    title: 'Apa itu Plagiarisme',
    desc: 'Definisi plagiarisme, jenis-jenisnya, dan dampak buruknya dalam dunia akademik dan penulisan karya ilmiah.',
    content: 'Plagiarisme adalah tindakan menjiplak atau mengambil karangan, pendapat, ide, atau karya orang lain dan menjadikannya seolah-olah sebagai karya sendiri tanpa menyertakan referensi atau sitasi yang sah. Tindakan ini dikategorikan sebagai pelanggaran etika akademik dan hak cipta yang berat. \n\nJenis plagiarisme meliputi plagiat kata per kata (direct plagiarism), plagiat mosaik (menyisipkan kata tanpa kutipan), hingga *self-plagiarism* (mendaur ulang karya sendiri tanpa izin). Untuk menghindarinya, mahasiswa dan siswa wajib menguasai teknik parafrase yang baik serta selalu disiplin mencantumkan daftar pustaka.'
  },
  {
    slug: 'sinonim',
    title: 'Apa itu Sinonim',
    desc: 'Pengertian sinonim, fungsi persamaan kata dalam kalimat, dan bagaimana penggunaannya memperkaya kosa kata.',
    content: 'Sinonim adalah bentuk bahasa (bisa berupa kata, frasa, atau kalimat) yang maknanya sama atau sangat mirip dengan bentuk bahasa lain. Secara sederhana, sinonim sering disebut sebagai persamaan kata. Penggunaan sinonim berfungsi untuk memperkaya gaya bahasa, menghindari pengulangan kata yang membosankan (redundansi), dan membuat kalimat menjadi lebih dinamis serta bervariasi.\n\nDalam proses pengeditan teks atau saat melakukan parafrase, menemukan sinonim yang pas adalah kunci utama agar tulisan tidak terdeteksi sebagai plagiat namun tetap mengkomunikasikan pesan yang identik.'
  },
  {
    slug: 'kalimat-pasif',
    title: 'Apa itu Kalimat Pasif',
    desc: 'Pengertian kalimat pasif, ciri-cirinya, dan perbedaan utamanya dengan kalimat aktif dalam tata bahasa Indonesia.',
    content: 'Kalimat pasif adalah jenis kalimat di mana subjek dikenai pekerjaan atau tindakan oleh objek. Ini berbanding terbalik dengan kalimat aktif di mana subjek adalah pelaku tindakan. Ciri utama dari kalimat pasif dalam bahasa Indonesia adalah penggunaan predikat berawalan "di-", "ter-", atau kata kerja yang dipasifkan.\n\nContoh: "Buku itu dibaca oleh Andi" (Pasif) vs "Andi membaca buku itu" (Aktif). Mengubah kalimat aktif menjadi kalimat pasif adalah salah satu metode restrukturisasi kalimat yang paling umum digunakan dalam teknik parafrase untuk memvariasikan gaya penulisan.'
  },
  {
    slug: 'kalimat-efektif',
    title: 'Apa itu Kalimat Efektif',
    desc: 'Definisi kalimat efektif, syarat-syaratnya, dan mengapa penting dalam penulisan karya tulis ilmiah.',
    content: 'Kalimat efektif adalah kalimat yang disusun berdasarkan kaidah-kaidah bahasa yang berlaku (seperti PUEBI) sehingga mampu menyampaikan gagasan penulis kepada pembaca secara tepat, jelas, dan tidak menimbulkan makna ganda (ambigu). \n\nSyarat utama kalimat efektif meliputi kesepadanan struktur (memiliki subjek dan predikat yang jelas), keparalelan bentuk, ketegasan makna, kehematan kata (tidak bertele-tele), dan kelogisan bahasa. Kalimat efektif sangat krusial dalam penulisan esai, makalah, atau jurnal ilmiah agar informasi dapat dicerna pembaca secara akurat.'
  },
  {
    slug: 'puebi',
    title: 'Apa itu PUEBI',
    desc: 'Pengertian PUEBI (Pedoman Umum Ejaan Bahasa Indonesia) sebagai standar resmi penulisan tata bahasa.',
    content: 'PUEBI (Pedoman Umum Ejaan Bahasa Indonesia) adalah panduan resmi yang diterbitkan oleh Badan Pengembangan dan Pembinaan Bahasa, Kementerian Pendidikan dan Kebudayaan Republik Indonesia. Pedoman ini mengatur tata cara penulisan ejaan, penggunaan huruf kapital, tanda baca, serta penulisan kata serapan yang benar.\n\nPUEBI menggantikan standar sebelumnya yaitu EYD (Ejaan Yang Disempurnakan). Setiap karya tulis resmi di instansi pendidikan, mulai dari makalah, skripsi, hingga dokumen negara, wajib tunduk pada aturan PUEBI demi menjaga kelestarian dan kebakuan bahasa Indonesia.'
  },
  {
    slug: 'kata-baku',
    title: 'Apa itu Kata Baku',
    desc: 'Definisi kata baku, fungsi penggunaannya dalam dokumen resmi, dan perbedaannya dengan kata tidak baku.',
    content: 'Kata baku adalah kata yang ejaan dan pengucapannya sesuai dengan pedoman atau kaidah bahasa yang telah ditetapkan (seperti KBBI dan PUEBI). Kata baku digunakan dalam konteks komunikasi resmi, baik lisan (seperti pidato kenegaraan) maupun tulisan (seperti surat resmi, makalah, dan laporan ilmiah).\n\nKebalikan dari kata baku adalah kata tidak baku, yang biasanya dipengaruhi oleh bahasa daerah, bahasa gaul, atau dialek percakapan sehari-hari. Contoh: "Apotek" (baku) vs "Apotik" (tidak baku). Penggunaan kata baku menunjukkan tingkat profesionalisme dan penghormatan terhadap tata bahasa nasional.'
  },
  {
    slug: 'spok',
    title: 'Apa itu SPOK',
    desc: 'Pengertian struktur kalimat SPOK (Subjek, Predikat, Objek, Keterangan) dalam pembentukan kalimat bahasa Indonesia.',
    content: 'SPOK adalah singkatan dari Subjek, Predikat, Objek, dan Keterangan, yaitu elemen-elemen dasar yang membentuk struktur kalimat sempurna dalam tata bahasa Indonesia. \n\nSubjek adalah pelaku, Predikat adalah tindakan atau keadaan, Objek adalah penderita yang dikenai tindakan, dan Keterangan memberikan informasi tambahan tentang waktu, tempat, atau cara. Sebuah kalimat minimal harus memiliki Subjek dan Predikat agar dapat dipahami maknanya secara utuh. Memahami struktur SPOK sangat membantu siswa dalam menganalisis tata bahasa dan menyusun kalimat efektif.'
  },
  {
    slug: 'majas',
    title: 'Apa itu Majas',
    desc: 'Pengertian majas atau gaya bahasa, fungsi, serta jenis-jenisnya dalam karya sastra dan penulisan kreatif.',
    content: 'Majas adalah gaya bahasa yang digunakan oleh penulis untuk menyampaikan sebuah pesan secara imajinatif atau kiasan. Majas bertujuan untuk memberikan efek emosional, memperindah susunan kalimat, dan menghidupkan karya sastra seperti puisi, cerpen, atau novel.\n\nBeberapa jenis majas yang paling umum diajarkan di sekolah meliputi majas personifikasi (mengumpamakan benda mati seolah hidup), majas hiperbola (melebih-lebihkan sesuatu), majas metafora (perbandingan langsung tanpa kata hubung), dan majas ironi (sindiran halus). Penggunaan majas yang tepat akan membuat tulisan fiksi tidak kaku dan lebih menggugah imajinasi pembaca.'
  },
  {
    slug: 'persamaan-kuadrat',
    title: 'Apa itu Persamaan Kuadrat',
    desc: 'Pengertian persamaan kuadrat, bentuk umum, dan metode penyelesaiannya dalam matematika aljabar.',
    content: 'Persamaan kuadrat adalah suatu persamaan polinomial berorde dua, yang berarti pangkat tertinggi dari variabelnya (biasanya x) adalah dua. Bentuk umum dari persamaan kuadrat dinyatakan dengan ax² + bx + c = 0, di mana a, b, dan c adalah konstanta, serta nilai a tidak boleh sama dengan nol.\n\nDalam matematika SMP dan SMA, persamaan kuadrat digunakan untuk memodelkan lintasan proyektil (seperti bola yang ditendang) atau mencari luas maksimum. Nilai variabel (akar-akar persamaan) dapat dicari menggunakan tiga metode utama: pemfaktoran, melengkapkan kuadrat sempurna, atau menggunakan Rumus ABC (Rumus Kuadrat).'
  },
  {
    slug: 'logaritma',
    title: 'Apa itu Logaritma',
    desc: 'Definisi logaritma sebagai operasi kebalikan dari eksponen atau perpangkatan dalam matematika dasar.',
    content: 'Logaritma adalah operasi matematika yang merupakan kebalikan (invers) dari operasi eksponen atau perpangkatan. Jika sebuah bilangan dipangkatkan menghasilkan nilai tertentu, maka logaritma digunakan untuk mencari besar pangkat tersebut jika nilai basis dan hasil pangkatnya diketahui.\n\nBentuk umumnya adalah: Jika a^c = b, maka ^a log b = c. Di mana a adalah basis, b adalah numerus, dan c adalah hasil logaritma. Logaritma sangat aplikatif dalam dunia nyata, seperti untuk mengukur skala Richter pada gempa bumi, tingkat keasaman (pH) dalam kimia, dan desibel pada intensitas suara.'
  },
  {
    slug: 'trigonometri',
    title: 'Apa itu Trigonometri',
    desc: 'Pengertian trigonometri, konsep dasar sinus, cosinus, tangen, dan fungsinya dalam pengukuran sudut segitiga.',
    content: 'Trigonometri adalah cabang ilmu matematika yang secara khusus mempelajari hubungan antara panjang sisi dan sudut pada sebuah segitiga (terutama segitiga siku-siku). Nama ini berasal dari bahasa Yunani "trigonon" (tiga sudut) dan "metron" (mengukur).\n\nKonsep dasar trigonometri dibangun di atas tiga fungsi utama: Sinus (Sin), Cosinus (Cos), dan Tangen (Tan). Trigonometri adalah fondasi utama bagi ilmu astronomi (menghitung jarak bintang), navigasi maritim, arsitektur, hingga rekayasa sipil untuk mengukur ketinggian gedung atau gunung tanpa harus memanjatnya secara fisik.'
  },
  {
    slug: 'matriks',
    title: 'Apa itu Matriks',
    desc: 'Pengertian matriks dalam matematika, susunan baris dan kolom, serta kegunaannya dalam komputasi.',
    content: 'Matriks adalah susunan bilangan, simbol, atau ekspresi matematika yang diatur dalam format baris (horizontal) dan kolom (vertikal), kemudian diapit oleh tanda kurung biasa ( ) atau kurung siku [ ]. Ukuran sebuah matriks disebut ordo, yang dinyatakan dengan m x n (jumlah baris dikali jumlah kolom).\n\nDalam matematika tingkat lanjut, matriks berfungsi untuk menyederhanakan dan menyelesaikan sistem persamaan linear dengan banyak variabel. Selain itu, konsep operasi matriks (penjumlahan, perkalian, invers) adalah fondasi utama dari ilmu komputer, pemrograman grafis 3D, dan algoritma kecerdasan buatan (AI).'
  },
  {
    slug: 'pecahan-campuran',
    title: 'Apa itu Pecahan Campuran',
    desc: 'Definisi pecahan campuran, strukturnya, dan cara mengonversinya menjadi pecahan biasa.',
    content: 'Pecahan campuran adalah sebuah bentuk bilangan pecahan yang terdiri dari gabungan antara bilangan bulat dan bilangan pecahan biasa (bilangan dengan pembilang dan penyebut). Pecahan campuran terbentuk ketika nilai pembilang lebih besar daripada nilai penyebutnya.\n\nContoh pecahan campuran adalah 2 1/4 (dua satu per empat), di mana 2 adalah bilangan bulat, 1 adalah pembilang, dan 4 adalah penyebut. Untuk melakukan operasi hitung seperti perkalian atau pembagian, pecahan campuran wajib diubah terlebih dahulu menjadi pecahan biasa dengan cara mengalikan bilangan bulat dengan penyebut, lalu menjumlahkannya dengan pembilang.'
  },
  {
    slug: 'makalah',
    title: 'Apa itu Makalah',
    desc: 'Pengertian makalah, fungsi, dan struktur baku penulisan karya tulis ilmiah untuk siswa dan mahasiswa.',
    content: 'Makalah adalah salah satu jenis karya tulis ilmiah yang membahas sebuah permasalahan atau topik tertentu secara logis, sistematis, dan objektif berdasarkan hasil kajian pustaka atau observasi lapangan. Makalah sering dijadikan tugas utama bagi siswa SMA dan mahasiswa untuk melatih kemampuan analisis dan literasi.\n\nStruktur baku sebuah makalah biasanya terdiri dari tiga bagian utama: Bagian Awal (Cover, Kata Pengantar, Daftar Isi), Bagian Inti (Bab Pendahuluan, Bab Pembahasan, Bab Penutup/Kesimpulan), dan Bagian Akhir (Daftar Pustaka). Makalah yang baik harus menggunakan bahasa baku, tidak memihak, dan argumennya didukung oleh data atau teori yang valid.'
  }
];

const DIR = path.join(__dirname, '../frontend/src/content/kamus');

entries.forEach(entry => {
  const fileContent = `---
title: "${entry.title}"
description: "${entry.desc}"
date: "2026-10-01T03:00:00Z"
---

${entry.content}
`;
  const filePath = path.join(DIR, `${entry.slug}.mdx`);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Generated: ${entry.slug}`);
});

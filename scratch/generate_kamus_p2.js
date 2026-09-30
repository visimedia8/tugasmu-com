const fs = require('fs');
const path = require('path');

const entries = [
  {
    slug: 'latar-belakang',
    title: 'Apa itu Latar Belakang',
    desc: 'Pengertian latar belakang masalah dalam penyusunan karya tulis ilmiah atau makalah.',
    content: 'Latar belakang adalah bagian pertama dan paling fundamental dalam penyusunan bab pendahuluan pada karya tulis ilmiah (makalah, proposal, atau skripsi). Bagian ini berfungsi untuk menjelaskan alasan logis mengapa seorang penulis memilih topik atau masalah tertentu untuk diteliti atau dibahas.\n\nDalam menulis latar belakang yang baik, penulis harus menggunakan metode piramida terbalik, yaitu memaparkan fakta dari kondisi umum di masyarakat, menuju ke masalah khusus yang terjadi di lapangan, dan diakhiri dengan solusi atau fokus penelitian yang ditawarkan.'
  },
  {
    slug: 'daftar-pustaka',
    title: 'Apa itu Daftar Pustaka',
    desc: 'Definisi daftar pustaka, fungsinya, dan pentingnya mencantumkan sumber referensi dalam tulisan ilmiah.',
    content: 'Daftar pustaka adalah senarai (daftar) yang berisi rujukan atau sumber literatur yang digunakan oleh penulis sebagai landasan teori dalam menyusun karya tulis ilmiah. Sumber ini bisa berupa buku, jurnal ilmiah, artikel internet, maupun dokumen resmi lainnya.\n\nFungsi utama daftar pustaka adalah untuk menghargai hak cipta intelektual penulis asli, menghindari tuduhan plagiarisme, dan memberikan petunjuk bagi pembaca yang ingin menelusuri sumber informasi lebih lanjut. Penulisan daftar pustaka wajib mengikuti format standar internasional tertentu, seperti format APA (American Psychological Association) atau MLA (Modern Language Association).'
  },
  {
    slug: 'abstrak',
    title: 'Apa itu Abstrak',
    desc: 'Pengertian abstrak, fungsinya dalam jurnal ilmiah, dan struktur komponen pembentuknya.',
    content: 'Abstrak adalah ringkasan padat dan representatif dari keseluruhan isi sebuah karya tulis ilmiah. Abstrak selalu diletakkan di halaman paling awal (sebelum bab pendahuluan) dan berfungsi sebagai etalase bagi pembaca untuk memahami inti penelitian tanpa harus membaca dokumen secara penuh.\n\nSebuah abstrak yang standar biasanya terdiri dari 150 hingga 250 kata. Komponen wajib di dalamnya meliputi latar belakang masalah singkat, metode penelitian yang digunakan, hasil temuan (kesimpulan), dan kata kunci (keywords) yang relevan.'
  },
  {
    slug: 'pantun',
    title: 'Apa itu Pantun',
    desc: 'Definisi pantun sebagai puisi lama Melayu, ciri-cirinya, dan aturan sajaknya.',
    content: 'Pantun adalah salah satu jenis puisi lama (sastra klasik) khas Nusantara yang sangat terikat oleh aturan baris dan rima. Pada zaman dahulu, pantun sering digunakan sebagai media komunikasi lisan untuk menyampaikan nasihat, sindiran, humor, hingga ungkapan cinta.\n\nCiri baku dari pantun adalah: satu bait terdiri dari empat baris, setiap baris memiliki 8 hingga 12 suku kata, bersajak silang (a-b-a-b), baris pertama dan kedua merupakan sampiran (pengantar), sedangkan baris ketiga dan keempat adalah isi (makna utama).'
  },
  {
    slug: 'puisi',
    title: 'Apa itu Puisi',
    desc: 'Pengertian puisi sebagai karya sastra, perbedaannya dengan prosa, dan unsur intrinsiknya.',
    content: 'Puisi adalah bentuk karya sastra yang mengungkapkan pikiran, perasaan, atau imajinasi penyair melalui rangkaian kata yang indah, padat makna, dan terikat oleh irama, rima, atau penyusunan bait. Berbeda dengan prosa (seperti cerpen) yang menggunakan paragraf bebas, bahasa puisi sangat kiasan (metaforis) dan mengutamakan estetika.\n\nUnsur intrinsik puisi meliputi diksi (pemilihan kata), imaji (penggambaran panca indera), rima (persamaan bunyi), dan amanat (pesan moral). Puisi dibagi menjadi puisi lama (seperti pantun dan gurindam yang terikat aturan) dan puisi baru (bebas tanpa aturan rima).'
  },
  {
    slug: 'gurindam',
    title: 'Apa itu Gurindam',
    desc: 'Definisi gurindam, ciri-ciri puisi lama ini, dan fungsinya sebagai media nasihat moral.',
    content: 'Gurindam adalah jenis puisi lama yang berasal dari perpaduan sastra Melayu dan budaya India. Nama gurindam sendiri diserap dari bahasa Tamil "kirindam" yang berarti perumpamaan. Fungsi utama gurindam adalah untuk menyampaikan petuah agama, nasihat hidup, atau nilai-nilai moral kepada masyarakat.\n\nBerbeda dengan pantun, gurindam memiliki ciri khas yang jauh lebih padat: satu bait hanya terdiri dari dua baris, bersajak sama (a-a), baris pertama memuat masalah atau syarat, dan baris kedua memuat jawaban atau akibat dari masalah tersebut.'
  },
  {
    slug: 'syair',
    title: 'Apa itu Syair',
    desc: 'Pengertian syair, perbedaannya dengan pantun, dan asal usul pengaruh sastra Arab di Indonesia.',
    content: 'Syair adalah salah satu jenis puisi lama (sastra tradisional) yang masuk ke Nusantara bersamaan dengan datangnya pengaruh agama Islam dari Arab (Persia). Kata syair berasal dari bahasa Arab "syi\'ir" atau "syu\'ur" yang berarti perasaan yang menyadari.\n\nSyair umumnya digunakan untuk menceritakan kisah panjang, sejarah, filsafat, atau ajaran tasawuf. Ciri utama syair adalah: satu bait terdiri dari empat baris, seluruh barisnya merupakan isi cerita (tidak memiliki sampiran seperti pantun), dan memiliki rima yang berakhiran sama persis (a-a-a-a).'
  },
  {
    slug: 'pidato',
    title: 'Apa itu Pidato',
    desc: 'Definisi pidato, tujuan komunikasi publik, dan struktur teks pidato yang baik.',
    content: 'Pidato adalah sebuah kegiatan berbicara di depan umum (orasi) yang dilakukan secara lisan untuk menyampaikan gagasan, pendapat, atau informasi mengenai suatu isu kepada khalayak ramai. Tujuan utama pidato bisa bersifat informatif (memberi tahu), persuasif (mengajak), atau rekreatif (menghibur).\n\nSebuah teks pidato yang baik harus mematuhi tiga struktur dasar: Pembukaan (salam, penghormatan, ucapan syukur), Isi (pemaparan argumen utama), dan Penutup (kesimpulan, harapan, salam penutup). Penyampaian pidato yang sukses sangat bergantung pada teknik retorika dan intonasi sang pembicara.'
  },
  {
    slug: 'orasi',
    title: 'Apa itu Orasi',
    desc: 'Pengertian orasi, perbedaannya dengan pidato biasa, dan konteks penggunaannya.',
    content: 'Orasi adalah bentuk penyampaian pidato formal dan berapi-api yang dilakukan di depan publik atau massa yang besar. Meski sering dianggap bersinonim dengan pidato, istilah orasi memiliki konotasi penyampaian verbal yang jauh lebih emosional, provokatif, dan menggunakan bahasa retorika yang kuat.\n\nOrasi umumnya dilakukan dalam konteks kegiatan politik, demonstrasi mahasiswa, atau kampanye sosial untuk membakar semangat audiens agar segera melakukan suatu tindakan fisik atau perubahan (call to action).'
  },
  {
    slug: 'retorika',
    title: 'Apa itu Retorika',
    desc: 'Definisi retorika sebagai seni berbicara, dan peranannya dalam persuasi publik.',
    content: 'Retorika adalah seni atau ilmu berbicara dan berkomunikasi secara efektif di depan publik. Konsep ini pertama kali dikembangkan pada zaman Yunani Kuno oleh filsuf Aristoteles. Retorika berfokus pada kemampuan seseorang menggunakan struktur bahasa, intonasi, dan logika untuk memengaruhi atau memanipulasi emosi pendengarnya.\n\nMenurut Aristoteles, pilar utama retorika terdiri dari Ethos (kredibilitas pembicara), Pathos (daya tarik emosional), dan Logos (argumen logis). Kemampuan retorika adalah kunci utama bagi seorang orator, politisi, atau pemimpin untuk meyakinkan masyarakat luas.'
  },
  {
    slug: 'cerpen',
    title: 'Apa itu Cerpen',
    desc: 'Pengertian cerpen (cerita pendek), batasan jumlah kata, dan unsur intrinsik pembentuknya.',
    content: 'Cerpen (Cerita Pendek) adalah sebuah karya sastra prosa fiksi yang menceritakan sepenggal kisah kehidupan tokoh secara ringkas dan habis dibaca dalam sekali duduk. Karakteristik utama yang membedakan cerpen dari novel adalah konflik yang bersifat tunggal dan penokohan yang tidak mengalami perubahan nasib secara drastis.\n\nSecara teknis, cerpen dibatasi maksimal 10.000 kata. Cerpen dibangun oleh unsur intrinsik yang meliputi tema, alur (plot), latar (setting waktu dan tempat), tokoh, penokohan (watak), sudut pandang (point of view), dan amanat (pesan moral).'
  },
  {
    slug: 'alur-cerita',
    title: 'Apa itu Alur Cerita',
    desc: 'Definisi alur atau plot dalam karya fiksi, tahapannya, dan jenis-jenis alur.',
    content: 'Alur cerita (sering disebut plot) adalah rangkaian peristiwa dalam sebuah karya sastra fiksi (cerpen atau novel) yang saling memiliki hubungan sebab-akibat (kausalitas). Alur bukan sekadar urutan kejadian waktu, melainkan tulang punggung yang menentukan bagaimana sebuah konflik diselesaikan.\n\nTahapan alur meliputi: pengenalan situasi (orientasi), pemunculan konflik (komplikasi), puncak ketegangan (klimaks), penurunan ketegangan (antiklimaks), dan penyelesaian (resolusi). Alur terbagi menjadi tiga jenis, yaitu alur maju (kronologis), alur mundur (flashback), dan alur campuran.'
  },
  {
    slug: 'tokoh-protagonis',
    title: 'Apa itu Tokoh Protagonis',
    desc: 'Pengertian tokoh protagonis, perannya dalam cerita, dan miskonsepsi umum.',
    content: 'Tokoh protagonis adalah karakter utama dalam sebuah karya cerita, drama, atau film yang menjadi pusat sorotan jalannya plot atau narasi. Protagonis adalah tokoh penggerak cerita, yang biasanya memiliki tujuan, harapan, atau rintangan yang harus diatasi.\n\nMiskonsepsi yang paling umum di sekolah adalah menganggap protagonis selalu berarti "tokoh yang baik (hero)". Kenyataannya, protagonis merujuk pada fokus peran utamanya, bukan sifat moralnya. Seorang penjahat bisa menjadi protagonis jika cerita tersebut memang mengisahkan sudut pandang dan perjalanannya (misalnya film tentang tokoh *villain*).'
  },
  {
    slug: 'curriculum-vitae',
    title: 'Apa itu Curriculum Vitae (CV)',
    desc: 'Pengertian Curriculum Vitae (CV), isi dokumennya, dan kepentingannya untuk melamar kerja.',
    content: 'Curriculum Vitae (CV) atau daftar riwayat hidup adalah dokumen resmi yang memuat ringkasan komprehensif mengenai rekam jejak seseorang, meliputi profil pribadi, riwayat pendidikan, pengalaman kerja, hingga keahlian (skills) yang dimiliki. Istilah ini berasal dari bahasa Latin yang berarti "perjalanan hidup".\n\nCV adalah senjata utama dan kesan pertama bagi seorang pelamar saat melamar pekerjaan, beasiswa, atau program magang. Format CV yang modern (seperti format ATS-friendly) dirancang sangat ringkas dan bebas dari desain grafis yang berlebihan agar mudah dibaca oleh mesin seleksi HRD.'
  },
  {
    slug: 'surat-lamaran-kerja',
    title: 'Apa itu Surat Lamaran Kerja',
    desc: 'Definisi surat lamaran kerja, fungsinya sebagai dokumen pembuka, dan susunan format baku.',
    content: 'Surat lamaran kerja (Cover Letter) adalah surat resmi yang dibuat oleh seorang individu dan ditujukan kepada suatu perusahaan atau instansi dengan tujuan untuk melamar posisi pekerjaan tertentu. Surat ini berfungsi sebagai dokumen pengantar (pembuka) sebelum pihak HRD membaca CV.\n\nBerbeda dengan CV yang berbentuk daftar poin-poin panjang, surat lamaran ditulis dalam bentuk paragraf naratif. Isinya difokuskan pada ketertarikan pelamar terhadap posisi tersebut, dari mana informasi lowongan didapatkan, serta penjelasan singkat mengapa pengalaman yang dimiliki pelamar sangat cocok dengan kualifikasi yang dicari perusahaan.'
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

# Semantic Content Briefs: Matematika SMP & SMA Phase 2 (Nodes 6–10)

## Node 6: Cara Menghitung Pecahan Campuran, Penjumlahan, Perkalian, dan Konversi Desimal
* **Exact First Word Sequence**: "Pecahan campuran adalah bentuk kombinasi bilangan bulat utuh dan pecahan biasa yang perhitungannya melibatkan langkah konversi seperti..."
* **Question Types Typology**: Procedural, Step-by-Step, Elementary-to-Junior Arithmetic.
* **Attribute Typology**:
  * **Unique Attributes**: Format Pecahan Campuran $a \frac{b}{c} = \frac{a \times c + b}{c}$, Menyamakan Penyebut dengan KPK pada Penjumlahan/Pengurangan, Perkalian & Pembagian Pecahan (Invers Pecahan Pembagi), Konversi Pecahan ke Bentuk Desimal dan Persentase.
  * **Root Attributes**: Aritmatika dasar, pembilang dan penyebut, penyederhanaan pecahan (FPB), bilangan rasional.
* **Microsemantics**: Berikan tutorial sistematis langkah demi langkah konversi sebelum dan sesudah operasi aritmatika. Hindari membahas bilangan irasional seperti $\pi$ atau $\sqrt{2}$ (fokus murni pada pecahan rasional).
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

---

## Node 7: Strategi Menyelesaikan Soal Cerita Matematika dengan Pemodelan Aljabar
* **Exact First Word Sequence**: "Menyelesaikan soal cerita matematika membutuhkan kemampuan translasi dari narasi bahasa sehari-hari ke dalam model persamaan matematis melalui tahapan..."
* **Question Types Typology**: Step-by-Step, Cognitive Problem Solving, Analytical.
* **Attribute Typology**:
  * **Unique Attributes**: 4 Langkah George Polya (Memahami Masalah, Merencanakan Solusi, Mengeksekusi Rencana, Memeriksa Kembali Hasil); Menentukan Variabel x dan y; Kata Kunci Operasi ("selisih", "total", "kali lipat", "kebalikan", "usia lebih tua/muda"); Soal Cerita SPLDV dan Aritmatika Sosial (Untung, Rugi, Diskon).
  * **Root Attributes**: Literasi numerasi, penalaran matematis, model aljabar, verifikasi logika jawaban.
* **Microsemantics**: Fokus pada teknik membedah kalimat cerita dan menyusun model matematika. Jangan membahas soal cerita kalkulus laju yang berkaitan atau optimasi turunan (dikhususkan untuk Node 13).
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

---

## Node 8: Persamaan Kuadrat: Pemfaktoran, Melengkapkan Kuadrat Sempurna, dan Rumus ABC
* **Exact First Word Sequence**: "Persamaan kuadrat merupakan persamaan polinomial berderajat dua dengan bentuk umum $ax^2 + bx + c = 0$ yang penyelesaian akarnya dapat ditentukan melalui..."
* **Question Types Typology**: Definitional, Procedural, Comparative Formula.
* **Attribute Typology**:
  * **Unique Attributes**: Bentuk Umum ($a \neq 0$), 3 Metode Akar (Pemfaktoran Bentuk Aljabar, Melengkapkan Kuadrat Sempurna, Rumus Kuadrat/ABC $x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$), Analisis Nilai Diskriminan $D = b^2 - 4ac$ ($D > 0$ dua akar real berlainan, $D = 0$ dua akar kembar, $D < 0$ akar imajiner), Rumus Vieta (Jumlah Akar $x_1 + x_2 = -\frac{b}{a}$, Hasil Kali Akar $x_1 \cdot x_2 = \frac{c}{a}$).
  * **Root Attributes**: Aljabar polinomial, akar-akar persamaan, kurva parabola, titik potong sumbu x.
* **Microsemantics**: Sajikan perbandingan kapan lebih efektif menggunakan pemfaktoran vs rumus ABC. Batasi pembahasan titik puncak grafik fungsi kuadrat parabolik (cukup singgung sekilas sebagai representasi visual).
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

---

## Node 9: Trigonometri Dasar: Perbandingan Sin, Cos, Tan Sudut Istimewa dan Kuadran I-IV
* **Exact First Word Sequence**: "Trigonometri dasar mempelajari perbandingan ukuran panjang sisi segitiga siku-siku terhadap sudut lancipnya yang meliputi fungsi rasio..."
* **Question Types Typology**: Grouping, Definitional, Tabular Reference.
* **Attribute Typology**:
  * **Unique Attributes**: Definisi Rasio Segitiga Siku-Siku (Sinus = Depan/Miring, Cosinus = Samping/Miring, Tangen = Depan/Samping - Sindemi, Cossami, Tandesa); Tabel Nilai Sudut Istimewa ($0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ$); Pembagian Tanda Kuadran I (Semua Positif), Kuadran II (Sin Positif), Kuadran III (Tan Positif), Kuadran IV (Cos Positif); Aturan Sudut Berelasi ($180^\circ \pm \alpha$, $360^\circ - \alpha$).
  * **Root Attributes**: Geometri sudut, lingkaran satuan (*unit circle*), trigonometri analitik, identitas trigonometri Pythagoras ($\sin^2 \alpha + \cos^2 \alpha = 1$).
* **Microsemantics**: Buat mnemonik visual "Semua Sindikat Tangan Kosong" (Semua, Sin, Tan, Cos) untuk mempermudah hafalan tanda kuadran siswa. Simpan grafik gelombang fungsi periodik trigonometri untuk tingkat lanjut.
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

---

## Node 10: Statistika Matematika: Mean, Median, Modus, Kuartil, dan Simpangan Baku
* **Exact First Word Sequence**: "Statistika matematika mencakup metode pengumpulan, pengolahan, penyajian, dan analisis data numerik yang dibagi menjadi ukuran pemusatan dan ukuran penyebaran seperti..."
* **Question Types Typology**: Grouping, Step-by-Step, Tabular Data Analysis.
* **Attribute Typology**:
  * **Unique Attributes**: Ukuran Pemusatan (Mean/Rata-rata hitung $\bar{x} = \frac{\sum x_i}{n}$, Median/Nilai tengah, Modus/Nilai frekuensi terbanyak); Ukuran Letak (Kuartil $Q_1, Q_2, Q_3$, Desil, Persentil); Ukuran Penyebaran (Jangkauan/Range, Jangkauan Interkuartil $QR = Q_3 - Q_1$, Ragam/Varians $s^2$, Simpangan Baku/Standar Deviasi $s = \sqrt{s^2}$); Perbedaan Rumus Data Tunggal vs Data Kelompok (Tabel Distribusi Frekuensi).
  * **Root Attributes**: Analisis data, histogram dan poligon, frekuensi kumulatif, representasi statistik.
* **Microsemantics**: Pisahkan secara jelas rumus data tunggal dan data kelompok (menggunakan titik tengah kelas $x_i$ dan frekuensi $f_i$). Batasi uji hipotesis inferensial regresi (fokus pada materi statistik deskriptif sekolah).
* **Target Conversion Intent**: Generator Soal & Latihan Statistik AI (`/tools/generator-soal`)

# Semantic Content Briefs: Matematika SMP & SMA Phase 3 (Nodes 11–15)

## Node 11: Barisan dan Deret: Perbedaan Aritmatika dan Geometri Beserta Rumus Suku ke-n
* **Exact First Word Sequence**: "Barisan dan deret dalam matematika mengkaji pola urutan bilangan teratur yang diklasifikasikan menjadi barisan aritmatika dan barisan geometri berdasarkan sifat..."
* **Question Types Typology**: Comparative, Procedural, Analytical Formula.
* **Attribute Typology**:
  * **Unique Attributes**: Barisan Aritmatika (Beda Selisih Konstan $b = U_n - U_{n-1}$, Suku ke-n $U_n = a + (n-1)b$, Jumlah n Suku Pertama $S_n = \frac{n}{2}(2a + (n-1)b)$); Barisan Geometri (Rasio Kelipatan Konstan $r = \frac{U_n}{U_{n-1}}$, Suku ke-n $U_n = a \cdot r^{n-1}$, Jumlah Deret $S_n = \frac{a(r^n - 1)}{r-1}$); Deret Geometri Tak Hingga ($S_\infty = \frac{a}{1-r}$, Konvergen $-1 < r < 1$ vs Divergen).
  * **Root Attributes**: Pola bilangan, suku pertama ($a$), pertumbuhan dan peluruhan, deret matematika.
* **Microsemantics**: Buat tabel perbandingan *apple-to-apple* antara ciri pola aritmatika (penjumlahan/pengurangan) dan geometri (perkalian/pembagian). Batasi aplikasi deret pada bunga majemuk anuitas bank (singgung sekilas sebagai contoh nyata).
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

---

## Node 12: Limit Fungsi Aljabar: Metode Substitusi, Pemfaktoran, dan Dalil L'Hopital
* **Exact First Word Sequence**: "Limit fungsi aljabar menggambarkan nilai pendekatan suatu fungsi matematika saat variabel input mendekati nilai batas tertentu yang diselesaikan dengan..."
* **Question Types Typology**: Step-by-Step, Procedural, Foundational Calculus.
* **Attribute Typology**:
  * **Unique Attributes**: Definisi Intuitif $\lim_{x \to c} f(x) = L$, 3 Tahap Eksekusi (1. Metode Substitusi Langsung; 2. Mengatasi Bentuk Tak Tentu $\frac{0}{0}$ dengan Pemfaktoran Aljabar; 3. Mengalikan Bentuk Sekawan Akar); Dalil L'Hopital ($\lim \frac{f(x)}{g(x)} = \lim \frac{f'(x)}{g'(x)}$); Limit Menuju Tak Hingga ($\lim_{x \to \infty} \frac{ax^m + \dots}{px^n + \dots}$ berdasarkan perbandingan derajat pangkat $m$ dan $n$).
  * **Root Attributes**: Kalkulus diferensial pengantar, kontinuitas fungsi, bentuk tak tentu, pendekatan limit.
* **Microsemantics**: Tekankan diagram alur pengambilan keputusan: "Substitusi langsung dulu $\to$ Jika bentuk tentu, selesai $\to$ Jika bentuk $\frac{0}{0}$, pilih faktorkan/akar sekawan/L'Hopital". Simpan pembuktian limit trigonometri khusus untuk materi lanjutan.
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

---

## Node 13: Turunan Fungsi Aljabar: Aturan Diferensial, Nilai Stasioner, dan Aplikasi Maksimum
* **Exact First Word Sequence**: "Turunan fungsi aljabar atau diferensial mengukur laju perubahan sesaat suatu nilai fungsi terhadap variabel bebasnya yang dirumuskan melalui aturan..."
* **Question Types Typology**: Procedural, Definitional, Optimization Application.
* **Attribute Typology**:
  * **Unique Attributes**: Definisi Turunan $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$, Rumus Dasar Polinomial $f(x) = ax^n \implies f'(x) = n \cdot ax^{n-1}$, Aturan Perkalian $(u \cdot v)' = u'v + uv'$ dan Pembagian $(\frac{u}{v})' = \frac{u'v - uv'}{v^2}$, Aturan Rantai $f(g(x))' = f'(g(x)) \cdot g'(x)$, Titik Stasioner ($f'(x) = 0$), Uji Turunan Kedua untuk Nilai Maksimum ($f''(x) < 0$) dan Minimum ($f''(x) > 0$), Aplikasi Soal Cerita Optimasi (Luas Maksimum, Biaya Produksi Minimum).
  * **Root Attributes**: Kalkulus diferensial, gradien garis singgung, garis normal, kecepatan sesaat.
* **Microsemantics**: Uraikan alur pemecahan masalah optimasi maksimum-minimum dalam soal kehidupan nyata secara bertahap. Hindari membahas turunan fungsi implisit multivariat (materi perguruan tinggi).
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

---

## Node 14: Integral Tak Tentu dan Tentu: Rumus Antiturunan dan Cara Menghitung Luas Daerah
* **Exact First Word Sequence**: "Integral dalam kalkulus merupakan operasi kebalikan dari turunan (antidiferensial) yang mencakup integral tak tentu berkonstanta dan integral tentu berbatas untuk..."
* **Question Types Typology**: Definitional, Procedural, Geometric Integration.
* **Attribute Typology**:
  * **Unique Attributes**: Konsep Antiturunan $\int f'(x) dx = f(x) + C$, Rumus Dasar Polinomial $\int ax^n dx = \frac{a}{n+1} x^{n+1} + C$ ($n \neq -1$), Sifat Linearitas Integral, Metode Integral Substitusi $\int f(u) \frac{du}{dx} dx$, Teorema Dasar Kalkulus Integral Tentu $\int_a^b f(x) dx = [F(x)]_a^b = F(b) - F(a)$, Aplikasi Menghitung Luas Daerah di Bawah Kurva Sumbu X dan Luas Antara Dua Kurva $L = \int_a^b (y_{\text{atas}} - y_{\text{bawah}}) dx$.
  * **Root Attributes**: Kalkulus integral, konstanta integrasi ($C$), batas integrasi, luas bidang lengkung.
* **Microsemantics**: Tekankan perbedaan mutlak: integral tak tentu menghasilkan fungsi keluarga kurva $+ C$, sedangkan integral tentu menghasilkan nilai skalar riil (luas daerah). Batasi integral parsial atau substitusi trigonometri rumit untuk tingkat universitas.
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

---

## Node 15: Peluang dan Kombinatorika: Aturan Pencacahan, Permutasi, dan Kombinasi
* **Exact First Word Sequence**: "Peluang dan kombinatorika mengkaji kemungkinan terjadinya suatu peristiwa serta kaidah menghitung susunan objek tanpa perlu mendaftar satu per satu yang meliputi..."
* **Question Types Typology**: Comparative, Procedural, Applied Probability.
* **Attribute Typology**:
  * **Unique Attributes**: Kaidah Pencacahan (Aturan Pengisian Tempat/Filling Slots, Aturan Penjumlahan & Perkalian), Notasi Faktorial ($n!$), Perbedaan Kunci Permutasi vs Kombinasi (Permutasi urutan diperhatikan $P(n,r) = \frac{n!}{(n-r)!}$; Kombinasi urutan tidak diperhatikan $C(n,r) = \frac{n!}{r!(n-r)!}$), Permutasi dengan Unsur Sama, Permutasi Siklis Melingkar $(n-1)!$, Peluang Suatu Kejadian $P(A) = \frac{n(A)}{n(S)}$, Frekuensi Harapan, Peluang Kejadian Majemuk (Saling Lepas $P(A \cup B) = P(A) + P(B)$ vs Saling Bebas $P(A \cap B) = P(A) \cdot P(B)$).
  * **Root Attributes**: Teori peluang, ruang sampel, titik sampel, logika kombinatorik.
* **Microsemantics**: Buat panduan cepat: "Kapan pakai Permutasi (Ketua-Wakil-Sekretaris, nomor antrian) vs Kapan pakai Kombinasi (Memilih 3 delegasi, jabat tangan, mengambil bola warna)". Hindari distribusi probabilitas binomial atau Poisson tingkat lanjut.
* **Target Conversion Intent**: Generator Soal & Kuis Peluang AI (`/tools/generator-soal`)

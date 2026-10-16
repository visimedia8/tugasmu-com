# Semantic Content Briefs: Matematika SMP & SMA Phase 1 (Nodes 1–5)

## Node 1: Aljabar SMP: Pengertian Variabel, Koefisien, Konstanta, dan Sistem Persamaan Linear
* **Exact First Word Sequence**: "Aljabar matematika untuk tingkat SMP memperkenalkan cara memodelkan permasalahan nyata ke dalam bentuk simbolik yang terdiri dari..."
* **Question Types Typology**: Definitional, Analytical, Procedural.
* **Attribute Typology**:
  * **Unique Attributes**: Variabel, Koefisien, Konstanta, Suku Sejenis vs Tak Sejenis, Operasi Bentuk Aljabar, Persamaan Linear Satu Variabel (PLSV), Sistem Persamaan Linear Dua Variabel (SPLDV: Metode Eliminasi, Substitusi, Campuran).
  * **Root Attributes**: Fondasi matematika aljabar, pemodelan matematis, aturan pindah ruas, kesamaan nilai.
* **Microsemantics**: Tekankan pemahaman konsep variabel sebagai besaran belum diketahui. Jangan melompat ke persamaan kuadrat derajat dua atau fungsi kuadrat parabolik (dicadangkan untuk Node 8).
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

---

## Node 2: Cara Memahami Sifat-Sifat Logaritma dan Menyelesaikan Persamaan Logaritma
* **Exact First Word Sequence**: "Logaritma dalam matematika merupakan operasi invers atau kebalikan dari perpangkatan (eksponen) yang didefinisikan sebagai..."
* **Question Types Typology**: Procedural, Definitional, Step-by-Step Calculation.
* **Attribute Typology**:
  * **Unique Attributes**: Bentuk Umum ${}^a\log b = c \iff a^c = b$, Syarat Basis ($a > 0, a \neq 1$) dan Numerus ($b > 0$), 10 Sifat Pokok Logaritma (Penjumlahan Sifat Perkalian, Pengurangan Sifat Pembagian, Pangkat Numerus, Basis Sama), Persamaan Logaritma Sederhana.
  * **Root Attributes**: Eksponensial, fungsi invers, kalkulasi logaritma, penyelesaian aljabar lanjutan.
* **Microsemantics**: Berikan penekanan krusial pada uji syarat numerus setelah menemukan nilai x agar siswa tidak terjebak akar semu. Batasi kalkulus turunan fungsi logaritma natural (masuk ke Node 13).
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

---

## Node 3: Operasi Matriks Lengkap: Penjumlahan, Perkalian, Determinan, dan Invers Matriks
* **Exact First Word Sequence**: "Operasi matriks dalam matematika SMA mencakup susunan bilangan berbentuk persegi panjang dalam baris dan kolom yang meliputi perhitungan..."
* **Question Types Typology**: Grouping, Procedural, Tabular Step-by-Step.
* **Attribute Typology**:
  * **Unique Attributes**: Ordo Matriks ($m \times n$), Syarat Penjumlahan & Pengurangan (Ordo Sama), Syarat Perkalian Matriks (Jumlah Kolom A = Jumlah Baris B), Determinan Matriks Ordo 2x2 ($ad - bc$) dan 3x3 (Metode Sarrus), Matriks Singular ($D=0$), Rumus Invers $A^{-1} = \frac{1}{\det(A)} \text{adj}(A)$.
  * **Root Attributes**: Aljabar linear, array angka, sistem persamaan linear matriks, transformasi geometri.
* **Microsemantics**: Pandu visualisasi baris kali kolom langkah demi langkah untuk mencegah kebingungan orientasi. Jangan masuk ke ruang vektor atau nilai eigen tingkat perguruan tinggi.
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

---

## Node 4: Penerapan Rumus Pythagoras: Cara Mencari Sisi Miring Segitiga Siku-Siku
* **Exact First Word Sequence**: "Teorema Pythagoras menyatakan hubungan matematis mutlak antara panjang sisi alas, sisi tegak, dan sisi miring (hipotenusa) pada segitiga siku-siku yang dirumuskan sebagai..."
* **Question Types Typology**: Step-by-Step, Definitional, Applied Geometry.
* **Attribute Typology**:
  * **Unique Attributes**: Rumus Pokok $c^2 = a^2 + b^2$, Menghitung Hipotenusa $c = \sqrt{a^2 + b^2}$, Menghitung Sisi Tegak $a = \sqrt{c^2 - b^2}$, Daftar Tripel Pythagoras Populer (3-4-5, 5-12-13, 7-24-25, 8-15-17), Pembuktian Segitiga Lancip vs Tumpul ($c^2 < a^2 + b^2$ vs $c^2 > a^2 + b^2$).
  * **Root Attributes**: Geometri bidang datar, sudut 90 derajat, diagonal bidang ruang, akar kuadrat.
* **Microsemantics**: Fokus pada aplikasi geometri 2 dimensi dan perluasan mencari diagonal ruang kubus/balok. Hindari membahas perbandingan rasio sudut istimewa trigonometri secara detail (disimpan untuk Node 9).
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

---

## Node 5: Rumus Bangun Ruang Lengkap: Volume dan Luas Permukaan Sisi Datar dan Lengkung
* **Exact First Word Sequence**: "Rumus bangun ruang matematika mencakup perhitungan volume kapasitas isi dan luas permukaan selimut untuk kategori sisi datar dan sisi lengkung yang meliputi..."
* **Question Types Typology**: Grouping, Listing, Tabular Reference.
* **Attribute Typology**:
  * **Unique Attributes**: Bangun Ruang Sisi Datar (Kubus: $V=s^3, L=6s^2$; Balok: $V=p \cdot l \cdot t$; Prisma: $V=L_{\text{alas}} \cdot t$; Limas: $V=\frac{1}{3} L_{\text{alas}} \cdot t$); Bangun Ruang Sisi Lengkung (Tabung: $V=\pi r^2 t$; Kerucut: $V=\frac{1}{3}\pi r^2 t$; Bola: $V=\frac{4}{3}\pi r^3, L=4\pi r^2$).
  * **Root Attributes**: Geometri 3D, satuan kubik ($cm^3, m^3$), jaring-jaring bangun ruang, jari-jari dan tinggi.
* **Microsemantics**: Susun tabel komparasi formula volume dan luas permukaan agar siswa dapat melihat pola keteraturan rumus secara cepat. Batasi integral untuk menghitung volume benda putar (dicadangkan untuk Node 14).
* **Target Conversion Intent**: Tools Math Solver Step-by-Step (`/tools/math-solver`)

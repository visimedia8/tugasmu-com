import React from 'react';
import Link from 'next/link';

export default function post_single() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-[1200px] mx-auto px-margin-desktop flex items-center justify-between gap-space-lg"><a className="flex items-center gap-space-sm group" data-path="beranda" href="#"><div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-[0_1px_3px_rgba(15,23,42,0.08)]"><span className="material-symbols-outlined text-[22px]">bolt</span></div><div className="flex items-center gap-1.5"><span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">TugasMu</span><span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">AI</span></div></a><nav className="hidden md:flex items-center gap-1" data-active-classes="bg-surface-container text-primary font-bold"><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="beranda" href="#">Beranda</a><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="tools-ai" href="#">Tools AI</a><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="statistik" href="#">Statistik</a><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="guru-kontributor" href="#">Guru Kontributor</a><a aria-current="page" className="px-space-md py-1.5 rounded-xl transition-colors bg-surface-container text-primary font-bold" data-path="blog" href="#">Blog</a></nav><div className="flex items-center gap-space-md"><a className="inline-flex items-center gap-1.5 bg-primary-container hover:bg-primary text-on-primary px-space-lg py-2 rounded-xl font-label-md text-label-md shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition-all active:scale-[0.98]" data-path="coba-gratis" href="#"><span>Coba Gratis</span><span className="material-symbols-outlined text-[16px]">arrow_forward</span></a><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-16 bg-surface"><div className="flex flex-col w-full">

<div className="fixed top-16 left-0 h-1 bg-primary-container z-40 w-0 transition-all duration-150" id="read-progress"></div>

<div className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-desktop py-space-lg md:py-space-xl">

<nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm mb-space-lg overflow-x-auto whitespace-nowrap scrollbar-none">
<a className="hover:text-primary transition-colors flex items-center gap-1" data-path="beranda" href="#">
<span className="material-symbols-outlined text-[16px]">home</span>
<span>Home</span>
</a>
<span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
<a className="hover:text-primary transition-colors" data-path="blog" href="#">Blog</a>
<span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
<span className="text-on-surface font-label-sm text-label-sm">Tips Belajar</span>
<span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
<span className="text-primary truncate max-w-[200px] md:max-w-none font-medium">5 Trik Menggunakan AI untuk Fisika</span>
</nav>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">

<article className="lg:col-span-8 flex flex-col">

<div className="flex flex-wrap items-center gap-space-sm mb-space-md">
<span className="px-space-md py-1 rounded-xl bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm tracking-wide uppercase">
            Tips Belajar
          </span>
<span className="px-space-md py-1 rounded-xl bg-surface-container text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
            5 menit baca
          </span>
<span className="px-space-md py-1 rounded-xl bg-surface-container text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
            Kurikulum Merdeka SMP-SMA
          </span>
</div>

<h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface tracking-tight mb-space-lg leading-tight">
          5 Trik Menggunakan AI untuk Memahami Konsep Fisika yang Sulit Tanpa Sekadar Copy-Paste Jawaban
        </h1>

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md p-space-md md:p-space-lg rounded-xl bg-surface-container-low mb-space-xl">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-full bg-primary-container text-on-primary font-headline-sm text-headline-sm flex items-center justify-center font-bold shadow-sm ring-2 ring-primary-fixed">
              BR
            </div>
<div>
<div className="flex items-center gap-1.5">
<span className="font-label-lg text-label-lg text-on-surface font-bold">Bu Ratna</span>
<span className="material-symbols-outlined text-primary text-[16px]" title="Guru Terverifikasi">verified</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Guru IPA Kontributor SMPN 5 Bandung • 24 Februari 2026
              </p>
</div>
</div>

<div className="flex items-center gap-2 pt-space-xs sm:pt-0">
<button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-secondary font-label-md text-label-md transition-all shadow-sm active:scale-95" onclick="shareWhatsApp()" title="Bagikan ke WhatsApp">
<span className="material-symbols-outlined text-[18px]">chat</span>
<span className="hidden sm:inline">WhatsApp</span>
</button>
<button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all shadow-sm active:scale-95" onclick="shareTwitter()" title="Bagikan ke X/Twitter">
<span className="material-symbols-outlined text-[18px]">share</span>
<span className="hidden sm:inline">X</span>
</button>
<button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md transition-all shadow-sm active:scale-95" id="copy-btn" onclick="copyArticleLink()" title="Salin Link">
<span className="material-symbols-outlined text-[18px]" id="copy-icon">link</span>
<span id="copy-text">Salin</span>
</button>
</div>
</div>

<div className="relative w-full rounded-xl overflow-hidden shadow-md mb-space-xl bg-gradient-to-br from-primary via-primary-container to-surface-tint text-on-primary p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">

<div className="absolute -right-8 -bottom-8 w-64 h-64 opacity-15 pointer-events-none">
<svg className="w-full h-full text-surface-container-lowest" fill="none" viewbox="0 0 200 200">
<circle cx="100" cy="100" r="80" stroke="currentColor" stroke-dasharray="6 6" strokeWidth="2"></circle>
<ellipse cx="100" cy="100" rx="90" ry="35" stroke="currentColor" strokeWidth="2" transform="rotate(30 100 100)"></ellipse>
<ellipse cx="100" cy="100" rx="90" ry="35" stroke="currentColor" strokeWidth="2" transform="rotate(-30 100 100)"></ellipse>
<circle cx="100" cy="100" fill="currentColor" r="12"></circle>
</svg>
</div>
<div className="relative z-10 max-w-lg">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-on-primary font-label-sm text-label-sm mb-3">
<span className="material-symbols-outlined text-[16px]">psychology</span>
<span>Pendekatan Metakognitif • Fisika SMA</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-primary tracking-tight font-bold mb-2">
              Transformasi PR Fisika: Dari Beban Menjadi Laboratorium Nalar
            </h2>
<p className="font-body-md text-body-md text-surface-container-high/90">
              Jangan biarkan bot AI berpikir menggantikanmu. Buat algoritma bekerja untuk melatih insting logikamu saat berhadapan dengan gerak melingkar, termodinamika, dan optika.
            </p>
</div>

<div className="relative z-10 w-full md:w-60 bg-surface-container-lowest/10 backdrop-blur-lg rounded-xl p-4 text-on-primary shadow-inner flex flex-col gap-2">
<div className="flex items-center justify-between text-xs opacity-80 font-label-sm text-label-sm">
<span>Hukum Newton II</span>
<span className="font-mono">F = m · a</span>
</div>
<div className="h-1.5 w-full bg-surface-container-lowest/20 rounded-full overflow-hidden">
<div className="h-full bg-secondary-fixed w-3/4"></div>
</div>
<p className="text-[11px] leading-tight text-surface-container-high">
              "Kekuatan pemahaman fisikamu berbanding lurus dengan kedalaman pertanyaan yang kamu ajukan."
            </p>
</div>
</div>

<div className="prose-content flex flex-col gap-space-lg text-on-surface font-body-lg text-body-lg leading-relaxed">

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
<p>
              Pernahkah kamu menghadapi soal dinamika gerak yang rumit pukul sembilan malam, lalu langsung mengambil ponsel, memotret soal, menyalin bulat-bulat jawaban dari chatbot AI, dan menutup buku dengan rasa lega semu? Jika ya, kamu tidak sendirian.
            </p>
<p>
              Fakta di lapangan berbicara sebaliknya: <strong>lebih dari 72% siswa yang sekadar menyalin jawaban AI mengalami penurunan nilai signifikan saat ulangan harian tatap muka tanpa gawai</strong>. Mengapa? Karena saat kamu hanya memindahkan teks rumus tanpa memproses mengapa variabel tertentu dipilih, otakmu tidak pernah membentuk jalur memori prosedural.
            </p>
<p className="text-on-surface-variant font-body-md text-body-md">
              Fisika bukanlah ilmu menghafal angka akhir. Fisika adalah seni memodelkan realitas alam semesta menjadi bahasa matematika. Di bawah ini, Bu Ratna merangkum lima trik praktis agar AI menjadi mitra debat ilmiahmu, bukan pengganti kepalamu.
            </p>
</div>

<section className="scroll-mt-24 p-space-lg md:p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md" id="poin-1">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                1
              </div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Minta AI Menjelaskan dengan Analogi Sehari-hari
              </h3>
</div>
<p>
              Saat buku teks menulis: <em>"Hukum Kekekalan Energi Mekanik menyatakan bahwa jumlah energi kinetik dan potensial dalam sistem terisolasi bernilai konstan,"</em> siswa sering membayangkan rumus abstrak yang membosankan.
            </p>
<p>
              Manfaatkan fleksibilitas AI untuk mengubah konsep abstrak menjadi skenario yang dekat dengan rutinitasmu. Hindari prompt kaku seperti <em>"Jelaskan hukum kekekalan energi"</em>.
            </p>

<div className="rounded-xl bg-surface-container-low p-space-md flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">terminal</span>
                  CONTOH PROMPT EFEKTIF
                </span>
<button className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1" onclick="copyPrompt(this)">
<span className="material-symbols-outlined text-[14px]">content_copy</span>
<span>Salin Prompt</span>
</button>
</div>
<code className="font-mono text-body-sm text-on-surface bg-surface-container-lowest p-3 rounded-lg block overflow-x-auto">
                "Jelaskan konsep Hukum Kekekalan Energi seperti tukang bakso yang sedang mengayuh gerobak naik-turun tanjakan jalan desa. Jangan sertakan rumus dulu, buat saya memahami perubahan energi kinetik ke potensialnya secara visual."
              </code>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
              Saat otakmu berhasil memvisualisasikan bagaimana tenaga kayuhan (kinetik) berubah menjadi ketinggian tanjakan (potensial), rumus matematisnya akan masuk akal secara natural.
            </p>
</section>

<section className="scroll-mt-24 p-space-lg md:p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md" id="poin-2">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                2
              </div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Uji Pemahamanmu dengan Fitur 'Tebak Langkah'
              </h3>
</div>
<p>
              Ketika menemui soal perhitungan balok di bidang miring dengan koefisien gesek, godaan terbesar adalah meminta: <em>"Hitung percepatan benda ini."</em> Jangan lakukan itu!
            </p>
<p>
              Alih-alih jawaban akhir, minta AI bertindak seperti guru les privat yang membimbing langkah demi langkah tanpa membocorkan kesimpulan.
            </p>
<div className="rounded-xl bg-surface-container-low p-space-md flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">terminal</span>
                  CONTOH PROMPT TEBAK LANGKAH
                </span>
<button className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1" onclick="copyPrompt(this)">
<span className="material-symbols-outlined text-[14px]">content_copy</span>
<span>Salin Prompt</span>
</button>
</div>
<code className="font-mono text-body-sm text-on-surface bg-surface-container-lowest p-3 rounded-lg block overflow-x-auto">
                "Ini soal saya: [Tuliskan Soal]. Jangan berikan jawaban akhir atau rumus langsung. Tanyakan kepada saya: 'Apa diagram gaya pertama yang harus digambar?' Tunggu jawaban saya sebelum memberikan petunjuk berikutnya."
              </code>
</div>

<div className="rounded-xl bg-surface-container p-4 flex flex-col gap-3">
<div className="flex items-center gap-2 text-primary font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px]">forum</span>
<span>Simulasi Alur Interaksi AI TugasMu</span>
</div>
<div className="space-y-2">
<div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs max-w-[85%] text-body-sm">
<span className="font-bold text-primary block text-[11px] uppercase tracking-wider mb-0.5">Kakak AI</span>
                  Bagus! Bidang miring memiliki sudut 30°. Menurutmu, gaya berat benda (w) perlu diuraikan ke sumbu mana dulu?
                </div>
<div className="bg-primary-fixed text-on-primary-fixed p-3 rounded-xl shadow-xs max-w-[85%] ml-auto text-body-sm">
<span className="font-bold block text-[11px] uppercase tracking-wider mb-0.5">Kamu (Siswa)</span>
                  Ke arah sejajar bidang pakai sin Θ, dan tegak lurus bidang pakai cos Θ?
                </div>
<div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs max-w-[85%] text-body-sm">
<span className="font-bold text-secondary block text-[11px] uppercase tracking-wider mb-0.5">Kakak AI • Benar!</span>
                  Tepat sekali! Mengapa kita pakai cos Θ untuk gaya normalnya? Coba jelaskan alasannya.
                </div>
</div>
</div>
</section>

<div className="rounded-xl bg-surface-container-high p-space-lg md:p-space-xl shadow-sm flex flex-col sm:flex-row items-start gap-space-md relative overflow-hidden">
<div className="w-10 h-10 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px]">lightbulb</span>
</div>
<div className="flex flex-col gap-1.5">
<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold uppercase tracking-wider">
                  Tips Kakak Pintar
                </span>
<span className="font-label-md text-label-md text-on-surface font-semibold">Prinsip Kompas Belajar</span>
</div>
<p className="font-body-md text-body-md text-on-surface leading-relaxed">
                AI adalah <strong>kompas</strong>, bukan sepasang kaki yang mengayun untukmu. Kompas menunjukkan arah utara agar kamu tidak tersesat di tengah rimba rumus, tetapi otot pemahaman hanya terbentuk jika kakimu sendiri yang menapak dan melangkah.
              </p>
</div>
</div>

<section className="scroll-mt-24 p-space-lg md:p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md" id="poin-3">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                3
              </div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Minta Dibuatkan Soal Variasi Bertingkat (Scaffolded Practice)
              </h3>
</div>
<p>
              Banyak siswa merasa sudah paham saat membaca kunci jawaban, tetapi mendadak 'blank' saat angka diganti atau variabel yang ditanyakan dibalik (misalnya: dari mencari kecepatan akhir menjadi mencari koefisien gesekan).
            </p>
<p>
              Setelah berhasil memecahkan satu soal di PR, jangan berhenti. Gunakan AI sebagai generator bank soal mandiri bergradasi dari Level Mudah, Sedang, hingga Level Penalaran Analitis (HOTS).
            </p>
<div className="rounded-xl bg-surface-container-low p-space-md flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">terminal</span>
                  CONTOH PROMPT SOAL VARIASI
                </span>
<button className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1" onclick="copyPrompt(this)">
<span className="material-symbols-outlined text-[14px]">content_copy</span>
<span>Salin Prompt</span>
</button>
</div>
<code className="font-mono text-body-sm text-on-surface bg-surface-container-lowest p-3 rounded-lg block overflow-x-auto">
                "Saya baru saja menyelesaikan soal gerak parabola sederhana. Sekarang, buatkan 3 soal serupa: Level 1 ubah sudut elevasinya, Level 2 tambahkan hambatan angin sederhana, dan Level 3 jadikan soal kontekstual tentang atlet tolak peluru."
              </code>
</div>
</section>

<section className="scroll-mt-24 p-space-lg md:p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md" id="poin-4">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                4
              </div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Identifikasi Kesalahan Logika pada Jawaban Sendiri (Error Analysis)
              </h3>
</div>
<p>
              Inilah fitur yang paling mengubah cara belajar siswa berprestasi: alih-alih bertanya <em>"Bagaimana cara menjawabnya?"</em>, kirimkan foto atau coretan pekerjaan tanganmu yang salah, lalu minta AI mendeteksi letak kekeliruan konsepnya.
            </p>
<p>
              Sering kali kesalahannya bukan pada perkalian matematika, melainkan asumsi awal, seperti lupa mengubah satuan cm ke meter atau salah menentukan arah vektor resultan.
            </p>
<div className="p-4 rounded-xl bg-error-container text-on-error-container flex items-center gap-3">
<span className="material-symbols-outlined text-[24px]">troubleshoot</span>
<p className="font-body-md text-body-md">
<strong>Ingat:</strong> Mengetahui <em>mengapa</em> jawabanmu salah memberi dampak pembelajaran 3x lebih mendalam daripada langsung melihat contoh yang sudah benar.
              </p>
</div>
</section>

<section className="scroll-mt-24 p-space-lg md:p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md" id="poin-5">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                5
              </div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Minta AI Membuat Peta Konsep Ringkas Sebelum Tidur
              </h3>
</div>
<p>
              Di penghujung sesi belajar, mintalah AI merangkum seluruh bab yang kamu pelajari menjadi peta konsep visual berbasis teks (Markdown diagram atau tabel keterkaitan rumus).
            </p>
<p>
              Bacalah ringkasan 5 baris tersebut tepat sebelum kamu beristirahat. Otak manusia melakukan konsolidasi memori jangka panjang saat fase tidur nyenyak, dan keterkaitan rumus yang rapi akan tertata jauh lebih kokoh di memorimu.
            </p>
</section>

<div className="p-space-lg md:p-space-xl rounded-xl bg-surface-container-high shadow-sm flex flex-col gap-space-md">
<h3 className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[24px]">task_alt</span>
              Checklist Singkat Sebelum Menutup PR Fisika
            </h3>
<ul className="space-y-2.5 font-body-md text-body-md text-on-surface">
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span>Apakah saya bisa menjelaskan ulang soal ini kepada teman tanpa melihat gawai?</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span>Apakah satuan tiap variabel (meter, kg, sekon) sudah saya periksa dua kali?</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span>Apakah saya tahu fenomena dunia nyata yang diwakili oleh rumus tersebut?</span>
</li>
</ul>
</div>
</div>

<section className="mt-space-xl p-space-lg md:p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-space-lg">
<div className="w-16 h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-lg text-headline-lg font-bold shrink-0 shadow-md ring-4 ring-primary-fixed">
            BR
          </div>
<div className="flex flex-col gap-1.5 flex-1">
<div className="flex flex-wrap items-center gap-2">
<h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Bu Ratna Hendrawati, M.Pd.</h4>
<span className="px-2.5 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm">
                Guru Kontributor Resmi
              </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
              Bu Ratna adalah guru IPA dengan pengalaman mengajar 12+ tahun di SMPN 5 Bandung dan aktif menjadi Guru Kontributor kurikulum edukasi serta penyusun bank soal berbasis nalar di TugasMu.com.
            </p>
<div className="flex items-center gap-3 mt-1 text-primary font-label-sm text-label-sm">
<a className="hover:underline flex items-center gap-1" href="#">
<span>Lihat 18 artikel lainnya</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
</div>
</div>
</section>

<div className="mt-space-lg p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md text-center sm:text-left">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">thumb_up</span>
<span className="font-label-md text-label-md text-on-surface">Apakah tips belajar ini membantumu memahami fisika?</span>
</div>
<div className="flex items-center gap-2">
<button className="px-4 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container font-label-sm text-label-sm text-on-surface transition-all shadow-xs active:scale-95" onclick="voteFeedback(true, this)">
              👍 Ya, sangat jelas
            </button>
<button className="px-4 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container font-label-sm text-label-sm text-on-surface transition-all shadow-xs active:scale-95" onclick="voteFeedback(false, this)">
              Perlu contoh lain
            </button>
</div>
</div>
</article>

<aside className="lg:col-span-4 flex flex-col gap-space-lg lg:sticky lg:top-24">

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
<div className="flex items-center gap-2 text-on-surface font-headline-sm text-headline-sm">
<span className="material-symbols-outlined text-primary text-[20px]">list_alt</span>
<span>Daftar Isi Artikel</span>
</div>
<nav className="flex flex-col space-y-2 font-body-sm text-body-sm text-on-surface-variant">
<a className="hover:text-primary transition-colors flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-surface-container-high" href="#poin-1">
<span className="w-5 h-5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-center shrink-0">1</span>
<span className="truncate">Analogi Sehari-hari</span>
</a>
<a className="hover:text-primary transition-colors flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-surface-container-high" href="#poin-2">
<span className="w-5 h-5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-center shrink-0">2</span>
<span className="truncate">Fitur 'Tebak Langkah'</span>
</a>
<a className="hover:text-primary transition-colors flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-surface-container-high" href="#poin-3">
<span className="w-5 h-5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-center shrink-0">3</span>
<span className="truncate">Soal Variasi Bertingkat</span>
</a>
<a className="hover:text-primary transition-colors flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-surface-container-high" href="#poin-4">
<span className="w-5 h-5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-center shrink-0">4</span>
<span className="truncate">Analisis Kesalahan Logika</span>
</a>
<a className="hover:text-primary transition-colors flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-surface-container-high" href="#poin-5">
<span className="w-5 h-5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-center shrink-0">5</span>
<span className="truncate">Peta Konsep Sebelum Tidur</span>
</a>
</nav>
</div>

<div className="p-space-lg rounded-xl bg-gradient-to-b from-surface-container to-surface-container-high shadow-sm flex flex-col gap-space-md">
<div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
<span className="material-symbols-outlined text-[22px]">auto_awesome</span>
</div>
<div>
<h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Punya PR Fisika Buntu?</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Coba asisten Kakak Pintar AI kami sekarang. Dapatkan petunjuk bertahap tanpa takut dimarahi atau langsung diberi kunci jawaban.
            </p>
</div>
<a className="w-full inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary py-2.5 px-4 rounded-xl font-label-md text-label-md transition-all shadow-sm active:scale-98" data-path="tools-ai" href="#">
<span>Buka Kakak AI Solver</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[24px]">format_quote</span>
<p className="font-body-sm text-body-sm text-on-surface-variant italic">
            "Nilai fisika raporku naik dari 68 ke 89 berkat trik tebak langkah ini!" — <strong>Dimas</strong>, SMAN 3 Bandung
          </p>
</div>
</aside>
</div>

<section className="mt-space-xl pt-space-xl border-t-0 flex flex-col gap-space-lg">
<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
<div>
<span className="text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">Rekomendasi Lanjutan</span>
<h3 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-0.5">
            Artikel Terkait yang Sering Dibaca Siswa
          </h3>
</div>
<a className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1" data-path="blog" href="#">
<span>Lihat Semua Artikel Blog</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">

<a className="group p-space-lg rounded-xl bg-surface-container-lowest hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="#">
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                Strategi Ujian
              </span>
<span className="text-on-surface-variant font-body-sm text-body-sm">6 mnt baca</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-bold line-clamp-2">
              Strategi Mengerjakan 50 Soal UTBK Fisika dalam Waktu 45 Menit
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Taktik eliminasi opsi cepat dan urutan pengerjaan soal kinematika agar waktu ujianmu tidak habis di satu nomor jebakan.
            </p>
</div>
<div className="flex items-center gap-2 font-label-md text-label-md text-primary font-semibold">
<span>Baca Panduan</span>
<span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</a>

<a className="group p-space-lg rounded-xl bg-surface-container-lowest hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="#">
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                Produktivitas
              </span>
<span className="text-on-surface-variant font-body-sm text-body-sm">4 mnt baca</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-bold line-clamp-2">
              Teknik Pomodoro 25/5 yang Dimodifikasi untuk Siswa dengan Jadwal Padat
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Menjaga fokus otak tetap tajam saat mengerjakan tugas sekolah yang menumpuk tanpa kelelahan mata berlebih.
            </p>
</div>
<div className="flex items-center gap-2 font-label-md text-label-md text-primary font-semibold">
<span>Baca Panduan</span>
<span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</a>

<a className="group p-space-lg rounded-xl bg-surface-container-lowest hover:bg-surface-container transition-all shadow-sm flex flex-col justify-between gap-space-md" href="#">
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                Etika Digital
              </span>
<span className="text-on-surface-variant font-body-sm text-body-sm">5 mnt baca</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-bold line-clamp-2">
              Etika Penggunaan AI di Sekolah: Kapan Boleh dan Kapan Dilarang Keras?
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Panduan kejujuran akademik bagi pelajar Indonesia dalam menyikapi integrasi kecerdasan buatan di ruang kelas modern.
            </p>
</div>
<div className="flex items-center gap-2 font-label-md text-label-md text-primary font-semibold">
<span>Baca Panduan</span>
<span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</a>
</div>
</section>

<div className="mt-space-xl p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-lg">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">mark_email_unread</span>
</div>
<div>
<h5 className="font-headline-sm text-headline-sm text-on-surface font-bold">Dapatkan Tips Belajar AI Mingguan</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant">Rangkuman trik kurikulum sekolah langsung ke inbox kamu setiap hari Minggu.</p>
</div>
</div>
<div className="w-full sm:w-auto flex items-center gap-2">
<input className="h-10 px-3 rounded-xl bg-surface-container text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary w-full sm:w-64" placeholder="Ketik email pelajarmu..." type="email"/>
<button className="h-10 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shrink-0 transition-all">
          Langganan
        </button>
</div>
</div>
</div>

<script>
    // 1. Reading Progress Bar Updater
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const bar = document.getElementById('read-progress');
      if (bar) bar.style.width = scrolled + '%';
    });

    // 2. Clipboard Link Sharing
    function copyArticleLink() {
      const dummyUrl = window.location.href;
      navigator.clipboard.writeText(dummyUrl).then(() => {
        const btnText = document.getElementById('copy-text');
        const btnIcon = document.getElementById('copy-icon');
        if (btnText && btnIcon) {
          btnText.innerText = 'Tersalin!';
          btnIcon.innerText = 'check';
          setTimeout(() => {
            btnText.innerText = 'Salin';
            btnIcon.innerText = 'link';
          }, 2000);
        }
      }).catch(() => {
        alert('Link artikel berhasil disalin!');
      });
    }

    // 3. Social Share Mock Handlers
    function shareWhatsApp() {
      const title = encodeURIComponent(document.title || '5 Trik Menggunakan AI untuk Fisika');
      window.open('https://api.whatsapp.com/send?text=' + title + ' ' + encodeURIComponent(window.location.href), '_blank');
    }

    function shareTwitter() {
      const title = encodeURIComponent(document.title || '5 Trik Menggunakan AI untuk Fisika');
      window.open('https://twitter.com/intent/tweet?text=' + title + '&url=' + encodeURIComponent(window.location.href), '_blank');
    }

    // 4. Prompt Copying Helper
    function copyPrompt(buttonElement) {
      const container = buttonElement.closest('div').parentElement;
      const codeBlock = container.querySelector('code');
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.innerText.trim()).then(() => {
          const originalHTML = buttonElement.innerHTML;
          buttonElement.innerHTML = '<span className="material-symbols-outlined text-[14px]">check</span><span>Tersalin!</span>';
          setTimeout(() => {
            buttonElement.innerHTML = originalHTML;
          }, 2000);
        });
      }
    }

    // 5. Voting Interaction
    function voteFeedback(helpful, btn) {
      const parent = btn.parentElement;
      if (helpful) {
        parent.innerHTML = '<span className="text-secondary font-label-md text-label-md flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">check_circle</span> Terima kasih atas tanggapanmu!</span>';
      } else {
        parent.innerHTML = '<span className="text-on-surface-variant font-label-md text-label-md">Terima kasih, catatan perbaikan diterima tim kurikulum.</span>';
      }
    }
  </script>
</div></main><footer className="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.02)] mt-auto"><div className="max-w-[1200px] mx-auto px-margin-desktop py-12 flex flex-col md:flex-row items-center justify-between gap-6"><div className="flex items-center gap-space-sm"><div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-on-primary"><span className="material-symbols-outlined text-[18px]">bolt</span></div><span className="font-headline-sm text-headline-sm text-on-surface">TugasMu<span className="font-label-sm text-label-sm text-primary ml-1 font-bold">AI</span></span><span className="text-on-surface-variant font-body-sm text-body-sm ml-3 hidden sm:inline">© 2026 TugasMu.com. Hak cipta dilindungi.</span></div><nav className="flex flex-wrap items-center justify-center gap-space-lg"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="panduan-pelajar" href="#">Panduan Pelajar</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="hubungi-kami" href="#">Hubungi Kami</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="terms-of-service" href="#">Terms of Service</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="privacy-policy" href="#">Privacy Policy</a></nav><div className="sm:hidden text-center text-on-surface-variant font-body-sm text-body-sm">© 2026 TugasMu.com. Hak cipta dilindungi.</div></div></footer>
    </>
  );
}

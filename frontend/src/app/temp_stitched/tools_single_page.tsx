import React from 'react';
import Link from 'next/link';

export default function tools_single_page() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-[1200px] mx-auto px-margin-desktop flex items-center justify-between gap-space-lg"><a className="flex items-center gap-space-sm group" data-path="beranda" href="#"><div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-[0_1px_3px_rgba(15,23,42,0.08)]"><span className="material-symbols-outlined text-[22px]">bolt</span></div><div className="flex items-center gap-1.5"><span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">TugasMu</span><span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">AI</span></div></a><nav className="hidden md:flex items-center gap-1" data-active-classes="bg-surface-container text-primary font-bold"><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="beranda" href="#">Beranda</a><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="tools-ai" href="#">Tools AI</a><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="statistik" href="#">Statistik</a><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="guru-kontributor" href="#">Guru Kontributor</a><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="blog" href="#">Blog</a></nav><div className="flex items-center gap-space-md"><a className="inline-flex items-center gap-1.5 bg-primary-container hover:bg-primary text-on-primary px-space-lg py-2 rounded-xl font-label-md text-label-md shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition-all active:scale-[0.98]" data-path="coba-gratis" href="#"><span>Coba Gratis</span><span className="material-symbols-outlined text-[16px]">arrow_forward</span></a><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-16 bg-surface"><div className="flex flex-col w-full">
<section className="max-w-[1200px] mx-auto w-full px-margin md:px-margin-desktop py-space-lg">

<nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm mb-space-md">
<a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
<span className="material-symbols-outlined text-[16px]">home</span>
<span>Beranda</span>
</a>
<span className="text-outline-variant font-medium">/</span>
<a className="hover:text-primary transition-colors" href="#">Tools AI</a>
<span className="text-outline-variant font-medium">/</span>
<span className="text-on-surface font-semibold">Generator Soal &amp; Kuis</span>
</nav>

<div className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-sm mb-space-lg relative overflow-hidden">
<div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-primary-container/10 blur-2xl pointer-events-none"></div>
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg relative z-10">
<div className="space-y-space-xs max-w-3xl">
<div className="flex flex-wrap items-center gap-space-xs">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[13px]">local_fire_department</span>
              Terpopuler
            </span>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[13px]">verified</span>
              Kurikulum Merdeka Ready
            </span>
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              SD, SMP &amp; SMA
            </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Generator Soal &amp; Kuis Interaktif
          </h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Buat paket soal latihan pilihan ganda atau esai lengkap dengan kisi-kisi, kunci jawaban berpenalaran, dan pembahasan langkah demi langkah dalam hitungan detik.
          </p>
</div>

<div className="flex items-center flex-wrap gap-space-xs shrink-0 self-start lg:self-center">
<button className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm" id="btn-reset">
<span className="material-symbols-outlined text-[16px]">restart_alt</span>
<span>Reset Form</span>
</button>
<button className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm">
<span className="material-symbols-outlined text-[16px]">menu_book</span>
<span>Panduan Pembuatan</span>
</button>
<button className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-primary-fixed text-on-primary-fixed hover:bg-primary-container hover:text-on-primary transition-all font-label-md text-label-md shadow-sm">
<span className="material-symbols-outlined text-[16px]">bookmark_add</span>
<span>Simpan Koleksi</span>
</button>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

<div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-sm space-y-space-lg sticky top-20">
<div className="flex items-center justify-between pb-space-sm">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[16px]">tune</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Konfigurasi Soal</h2>
</div>
<span className="font-label-sm text-label-sm text-primary px-2 py-0.5 rounded-full bg-primary-fixed">AI Mode Pintar</span>
</div>

<div className="space-y-space-xs">
<label className="block font-label-md text-label-md text-on-surface">Jenjang Pendidikan</label>
<div className="grid grid-cols-4 gap-1.5 bg-surface-container-low p-1 rounded-xl" id="grade-selector">
<button className="grade-btn py-1.5 rounded-lg text-center font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" data-grade="sd" type="button">SD</button>
<button className="grade-btn py-1.5 rounded-lg text-center font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" data-grade="smp" type="button">SMP</button>
<button className="grade-btn py-1.5 rounded-lg text-center font-label-sm text-label-sm bg-primary-container text-on-primary font-bold shadow-sm" data-grade="sma" type="button">SMA/SMK</button>
<button className="grade-btn py-1.5 rounded-lg text-center font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" data-grade="utbk" type="button">UTBK/SNBT</button>
</div>
</div>

<div className="space-y-space-xs">
<label className="block font-label-md text-label-md text-on-surface" htmlFor="subject-select">Mata Pelajaran</label>
<div className="relative">
<select className="w-full h-11 px-3.5 pr-10 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all appearance-none cursor-pointer" id="subject-select">
<option selected="" value="fisika">Fisika Terapan</option>
<option value="matematika">Matematika Wajib</option>
<option value="biologi">Biologi Seluler &amp; Ekosistem</option>
<option value="kimia">Kimia Analitik</option>
<option value="indonesia">Bahasa Indonesia (Literasi Teks)</option>
<option value="sejarah">Sejarah Indonesia &amp; Dunia</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-3 top-2.5 text-on-surface-variant text-[20px]">expand_more</span>
</div>
</div>

<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<label className="block font-label-md text-label-md text-on-surface" htmlFor="topic-input">Topik / Materi Spesifik</label>
<span className="text-outline font-body-sm text-body-sm">Contoh instan</span>
</div>
<div className="relative">
<input className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-outline" id="topic-input" placeholder="Masukkan bab atau ketik kata kunci..." type="text" value="Hukum Newton, Dinamika Gerak &amp; Gaya Gesek"/>
</div>

<div className="flex flex-wrap gap-1.5 pt-1">
<button className="topic-chip text-left px-2 py-1 rounded-lg bg-surface-container-high hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface-variant font-label-sm text-label-sm transition-colors" type="button">
              + Sistem Peredaran Darah
            </button>
<button className="topic-chip text-left px-2 py-1 rounded-lg bg-surface-container-high hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface-variant font-label-sm text-label-sm transition-colors" type="button">
              + Trigonometri Analitik
            </button>
<button className="topic-chip text-left px-2 py-1 rounded-lg bg-surface-container-high hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface-variant font-label-sm text-label-sm transition-colors" type="button">
              + Reaksi Redoks
            </button>
</div>
</div>

<div className="space-y-space-xs">
<label className="block font-label-md text-label-md text-on-surface">Tingkat Kesulitan Kognitif</label>
<div className="grid grid-cols-3 gap-2">
<button className="diff-btn py-2 px-1 text-center rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-all" type="button">
<span className="block font-label-md text-label-md">Mudah</span>
<span className="block font-label-sm text-label-sm text-outline">C1 - C2</span>
</button>
<button className="diff-btn py-2 px-1 text-center rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-all" type="button">
<span className="block font-label-md text-label-md">Sedang</span>
<span className="block font-label-sm text-label-sm text-outline">C3 Aplikasi</span>
</button>
<button className="diff-btn py-2 px-1 text-center rounded-xl bg-tertiary-container text-on-tertiary font-bold shadow-sm transition-all ring-2 ring-tertiary-container/30" type="button">
<span className="block font-label-md text-label-md">Sukar / HOTS</span>
<span className="block font-label-sm text-label-sm opacity-90">C4 - C6 Nalar</span>
</button>
</div>
</div>

<div className="space-y-space-md">
<div className="space-y-space-xs">
<label className="block font-label-md text-label-md text-on-surface">Format Soal</label>
<div className="grid grid-cols-3 gap-2">
<label className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
<input checked="" className="w-4 h-4 accent-primary-container cursor-pointer" name="format_soal" type="radio"/>
<span className="font-label-sm text-label-sm text-on-surface">Pilgan 5 Opsi</span>
</label>
<label className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
<input className="w-4 h-4 accent-primary-container cursor-pointer" name="format_soal" type="radio"/>
<span className="font-label-sm text-label-sm text-on-surface">Esai Nalar</span>
</label>
<label className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
<input className="w-4 h-4 accent-primary-container cursor-pointer" name="format_soal" type="radio"/>
<span className="font-label-sm text-label-sm text-on-surface">Campuran</span>
</label>
</div>
</div>
<div className="space-y-space-xs">
<div className="flex justify-between items-center">
<label className="font-label-md text-label-md text-on-surface" htmlFor="question-count-range">Jumlah Butir Soal</label>
<span className="px-2.5 py-0.5 rounded-lg bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm" id="question-count-badge">5 Soal Terpilih</span>
</div>
<div className="flex items-center gap-3">
<input className="w-full accent-primary-container cursor-pointer h-2 bg-surface-container-high rounded-lg" id="question-count-range" max="15" min="3" step="1" type="range" value="5"/>
</div>
<div className="flex justify-between text-outline font-label-sm text-label-sm px-1">
<span>3 Soal</span>
<span>5 Soal (Rekomendasi)</span>
<span>10 Soal</span>
<span>15 Soal</span>
</div>
</div>
</div>

<div className="space-y-space-xs pt-space-xs">
<label className="block font-label-md text-label-md text-on-surface">Kebutuhan Output</label>
<div className="space-y-2 bg-surface-container-low p-3 rounded-xl">
<label className="flex items-center gap-2.5 cursor-pointer">
<input checked="" className="w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface">Sertakan Pembahasan Runtut &amp; Teori Kunci</span>
</label>
<label className="flex items-center gap-2.5 cursor-pointer">
<input checked="" className="w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface">Buat Kisi-kisi Kurikulum Merdeka (Capaian Pembelajaran)</span>
</label>
<label className="flex items-center gap-2.5 cursor-pointer">
<input checked="" className="w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface">Tambahkan "Tips Kakak Pintar" Anti-Terkecoh</span>
</label>
</div>
</div>

<div className="pt-space-xs space-y-space-xs">
<button className="w-full py-3.5 px-space-lg rounded-xl bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]" id="generate-trigger">
<span className="material-symbols-outlined text-[22px]">auto_awesome</span>
<span>Generate Soal Sekarang (Gratis)</span>
</button>
<div className="flex items-center justify-center gap-1.5 text-on-secondary-container font-label-sm text-label-sm text-center">
<span className="material-symbols-outlined text-[15px] text-secondary">bolt</span>
<span>100% Bebas Kuota Harian • Standar Guru Penggerak</span>
</div>
</div>
</div>

<div className="lg:col-span-7 space-y-space-md">

<div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-wrap items-center justify-between gap-space-sm">
<div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl">
<button className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm transition-colors flex items-center gap-1.5" id="tab-student">
<span className="material-symbols-outlined text-[16px]">school</span>
<span>Preview Siswa</span>
</button>
<button className="px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1.5" id="tab-teacher">
<span className="material-symbols-outlined text-[16px]">psychology</span>
<span>Kunci Jawaban &amp; Guru</span>
</button>
</div>
<div className="flex items-center gap-1.5">
<button className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors flex items-center justify-center" title="Salin Soal">
<span className="material-symbols-outlined text-[18px]">content_copy</span>
</button>
<button className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors flex items-center justify-center" title="Cetak / Unduh PDF">
<span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
</button>
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary-container text-on-secondary-container hover:opacity-90 font-label-sm text-label-sm font-semibold transition-all">
<span className="material-symbols-outlined text-[16px]">play_circle</span>
<span>Mode Kuis Live</span>
</button>
</div>
</div>

<div className="bg-primary-fixed/40 rounded-xl p-space-md flex flex-wrap items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold">
<span className="material-symbols-outlined text-[20px]">science</span>
</div>
<div>
<div className="font-headline-sm text-headline-sm text-on-primary-fixed">Paket Latihan Fisika Fase E (Kelas 10)</div>
<div className="font-body-sm text-body-sm text-on-primary-fixed-variant">Topik: Hukum II Newton, Perlambatan &amp; Gaya Gesekan Ban Kendaraan</div>
</div>
</div>
<span className="font-label-sm text-label-sm bg-surface-container-lowest text-primary px-3 py-1 rounded-full shadow-sm">
            Target Waktu: 15 Menit
          </span>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="px-2.5 py-0.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm">Soal #1</span>
<span className="px-2 py-0.5 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Pilihan Ganda HOTS (Analisis Kontekstual)</span>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">stars</span> 4 Poin
            </span>
</div>

<div className="space-y-space-sm">
<p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
              Sebuah mobil bermassa <strong className="font-semibold">1.200 kg</strong> melaju kencang di jalan aspal mendatar dengan kelajuan awal konstan <strong className="font-semibold">20 m/s (72 km/jam)</strong>. Tiba-tiba pengemudi melihat genangan air dan rintangan pada jarak <strong className="font-semibold">50 meter</strong> di depannya, lalu menginjak rem secara maksimal hingga roda terkunci dan mengalami gaya gesek kinetis sebesar <strong className="font-semibold">6.000 N</strong> dari permukaan jalan.
            </p>
<p className="font-body-md text-body-md text-on-surface-variant italic">
              Berdasarkan prinsip Hukum Newton dan konsep kinematika perlambatan, analisis apakah mobil tersebut akan menabrak rintangan sebelum berhenti total, serta tentukan jarak henti tepatnya!
            </p>
</div>

<div className="space-y-2 pt-space-xs" id="quiz-options-group">
<button className="w-full text-left p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface flex items-start gap-3 transition-colors" type="button">
<span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm shrink-0 mt-0.5">A</span>
<span className="font-body-md text-body-md">Mobil menabrak rintangan, karena jarak henti mobil adalah 65 meter.</span>
</button>
<button className="w-full text-left p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface flex items-start gap-3 transition-colors" type="button">
<span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm shrink-0 mt-0.5">B</span>
<span className="font-body-md text-body-md">Mobil menabrak rintangan, karena gaya pengereman hanya mampu menghentikan mobil setelah 52 meter.</span>
</button>

<button className="w-full text-left p-3.5 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-start gap-3 transition-colors shadow-sm ring-1 ring-primary-container" type="button">
<span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm shrink-0 mt-0.5">C</span>
<div className="flex-1">
<span className="font-body-md text-body-md font-semibold">Mobil berhenti tepat pada jarak 40 meter, sehingga aman tidak menabrak rintangan.</span>
<span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[13px]">check_circle</span> Kunci Tepat
                </span>
</div>
</button>
<button className="w-full text-left p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface flex items-start gap-3 transition-colors" type="button">
<span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm shrink-0 mt-0.5">D</span>
<span className="font-body-md text-body-md">Mobil berhenti tepat di jarak 50 meter, menyentuh tepi rintangan tanpa benturan parah.</span>
</button>
<button className="w-full text-left p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface flex items-start gap-3 transition-colors" type="button">
<span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm shrink-0 mt-0.5">E</span>
<span className="font-body-md text-body-md">Data massa mobil tidak mempengaruhi jarak henti, mobil meluncur lebih dari 70 meter.</span>
</button>
</div>

<div className="bg-surface-container-low rounded-xl p-space-md space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">psychology_alt</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Penalaran &amp; Langkah Pembahasan</h3>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Langkah Sistematis</span>
</div>
<div className="space-y-space-sm pl-2 border-l-2 border-primary-container">

<div>
<span className="font-label-sm text-label-sm text-primary uppercase tracking-wider block">Langkah 1: Tentukan Perlambatan (Hukum II Newton)</span>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                  Gaya berlawanan arah dengan gerak, sehingga tanda bernilai negatif:
                  <br/>
<code className="px-2 py-1 bg-surface-container-lowest rounded font-mono text-sm inline-block my-1 text-on-surface">a = ΣF / m = -6.000 N / 1.200 kg = -5 m/s²</code>
</p>
</div>

<div>
<span className="font-label-sm text-label-sm text-primary uppercase tracking-wider block">Langkah 2: Hitung Jarak Henti (Kinematika GLBB)</span>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                  Mobil berhenti total (<code className="font-mono text-sm">v_t = 0</code>), dengan kelajuan awal <code className="font-mono text-sm">v_0 = 20 m/s</code>:
                  <br/>
<code className="px-2 py-1 bg-surface-container-lowest rounded font-mono text-sm inline-block my-1 text-on-surface">v_t² = v_0² + 2 · a · s → 0 = (20)² + 2 · (-5) · s → 10s = 400 → s = 40 meter</code>
</p>
</div>

<div>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">Langkah 3: Komparasi Kontekstual</span>
<p className="font-body-md text-body-md text-on-surface">
                  Karena jarak rintangan adalah <strong className="font-semibold">50 m</strong> dan mobil sudah berhenti total di jarak <strong className="font-semibold">40 m</strong>, maka tersisa selisih ruang aman <strong className="font-semibold">10 meter</strong>. Mobil dipastikan selamat tidak menabrak rintangan. Jawaban <strong>(C)</strong> mutlak tepat!
                </p>
</div>
</div>

<div className="bg-tertiary-fixed/30 rounded-xl p-space-md flex gap-space-sm items-start">
<div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">lightbulb</span>
</div>
<div className="space-y-0.5">
<div className="font-label-md text-label-md text-on-tertiary-fixed font-bold">Tips Anti-Terkecoh dari Kakak Tutor</div>
<p className="font-body-sm text-body-sm text-on-tertiary-fixed-variant">
                  Jangan lupa konversi kecepatan jika di soal tertulis km/jam (bagi 3,6 jadi m/s). Banyak siswa langsung mengalikan kelajuan dengan jarak tanpa menghitung gaya hambat terlebih dahulu!
                </p>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="px-2.5 py-0.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm">Soal #2</span>
<span className="px-2 py-0.5 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Esai Pemecahan Masalah Ilmiah</span>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">stars</span> 6 Poin
            </span>
</div>
<div className="space-y-space-sm">
<p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
              Jelaskan bagaimana pengaruh kondisi permukaan jalan yang licin (akibat tumpahan oli dengan koefisien gesek kinetis yang turun drastis dari 0,5 menjadi 0,1) terhadap keselamatan berkendara pada jalan menikung, serta berikan usulan solusi teknis dari sudut pandang fisika gerak melingkar!
            </p>
</div>

<div className="rounded-xl overflow-hidden bg-surface-container-low">
<button className="w-full p-space-md flex items-center justify-between hover:bg-surface-container transition-colors text-left" id="rubric-toggle-btn" type="button">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">assignment_turned_in</span>
<span className="font-label-md text-label-md text-on-surface">Lihat Rubrik Penilaian Guru &amp; Jawaban Ideal</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant text-[20px] transition-transform" id="rubric-icon">expand_more</span>
</button>
<div className="hidden p-space-md pt-0 space-y-space-sm text-body-sm font-body-sm text-on-surface" id="rubric-content">
<div className="p-3 bg-surface-container-lowest rounded-xl space-y-2">
<div className="font-semibold text-primary">Kriteria Penilaian Kurikulum Merdeka (Skor 0-6):</div>
<ul className="list-disc list-inside space-y-1 text-on-surface-variant">
<li><strong>Skor 2:</strong> Mengaitkan gaya gesek sebagai penyedia gaya sentripetal (<code className="text-xs">F_gesek = F_sentripetal</code>).</li>
<li><strong>Skor 2:</strong> Menjelaskan bahwa jika koefisien gesek turun, kecepatan kritis maksimum agar kendaraan tidak tergelincir (<code className="text-xs">v_maks = √(μ · g · R)</code>) juga berkurang drastis.</li>
<li><strong>Skor 2:</strong> Memberikan solusi teknis konkret: kemiringan sudut jalan (cant/superelevasi) sehingga gaya normal membantu menahan mobil.</li>
</ul>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-space-md md:p-space-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md">
<div className="space-y-0.5 text-center sm:text-left">
<div className="font-label-md text-label-md text-on-surface">Apakah paket soal ini relevan dengan silabus belajarmu?</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Bantu AI TugasMu belajar untuk menyusun bank soal yang semakin akurat.</div>
</div>
<div className="flex items-center gap-2 shrink-0">
<button className="px-3 py-1.5 rounded-xl bg-secondary-container text-on-secondary-container hover:opacity-90 font-label-md text-label-md flex items-center gap-1 transition-all">
<span className="material-symbols-outlined text-[16px]">thumb_up</span>
<span>Sangat Cocok</span>
</button>
<button className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1 transition-all">
<span className="material-symbols-outlined text-[16px]">tune</span>
<span>Perlu Disesuaikan</span>
</button>
</div>
</div>
</div>
</div>

<div className="mt-space-xl pt-space-lg grid grid-cols-1 md:grid-cols-3 gap-space-lg">

<a className="group block p-space-lg bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all" href="#">
<div className="flex items-center justify-between mb-space-sm">
<div className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]">calculate</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px]">arrow_forward</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
          Solver Rumus Fisika &amp; Matematika
        </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Uraikan persamaan kompleks dengan rumus visual interaktif dan grafik parameter otomatis.
        </p>
</a>

<a className="group block p-space-lg bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all" href="#">
<div className="flex items-center justify-between mb-space-sm">
<div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]">summarize</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors text-[20px]">arrow_forward</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
          Rangkuman Materi &amp; Mind Map
        </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Ubah bab buku pelajaran tebal menjadi lembar contekan visual esensial yang gampang dipahami.
        </p>
</a>

<div className="p-space-lg bg-surface-container rounded-2xl shadow-sm flex flex-col justify-between">
<div className="space-y-space-xs">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">format_quote</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Catatan Guru Penggerak</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface italic leading-relaxed">
            “Latihan soal HOTS bukan tentang menghafal rumus cepat, melainkan melatih kepekaan membaca fenomena di sekitar lalu menerjemahkannya ke variabel penalaran logis.”
          </p>
</div>
<div className="flex items-center gap-space-sm pt-space-sm">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
            BR
          </div>
<div>
<div className="font-label-md text-label-md text-on-surface">Bu Ratna Trihapsari, M.Pd.</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Kontributor Kurikulum Fisika SMA</div>
</div>
</div>
</div>
</div>
</section>
</div>
<script>
  // Simple interactive logic for tabs, range slider, chips, and accordions
  document.addEventListener('DOMContentLoaded', () => {
    // Slider count update
    const slider = document.getElementById('question-count-range');
    const badge = document.getElementById('question-count-badge');
    if (slider && badge) {
      slider.addEventListener('input', (e) => {
        badge.textContent = `${e.target.value} Soal Terpilih`;
      });
    }

    // Grade selection pills
    const gradeButtons = document.querySelectorAll('.grade-btn');
    gradeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        gradeButtons.forEach((b) => {
          b.className = 'grade-btn py-1.5 rounded-lg text-center font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors';
        });
        btn.className = 'grade-btn py-1.5 rounded-lg text-center font-label-sm text-label-sm bg-primary-container text-on-primary font-bold shadow-sm';
      });
    });

    // Topic quick suggestions chips
    const topicInput = document.getElementById('topic-input');
    const topicChips = document.querySelectorAll('.topic-chip');
    topicChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.replace('+', '').trim();
        if (topicInput) {
          topicInput.value = text;
          topicInput.focus();
        }
      });
    });

    // Rubric accordion toggle
    const rubricToggle = document.getElementById('rubric-toggle-btn');
    const rubricContent = document.getElementById('rubric-content');
    const rubricIcon = document.getElementById('rubric-icon');
    if (rubricToggle && rubricContent && rubricIcon) {
      rubricToggle.addEventListener('click', () => {
        const isHidden = rubricContent.classList.contains('hidden');
        if (isHidden) {
          rubricContent.classList.remove('hidden');
          rubricIcon.style.transform = 'rotate(180deg)';
        } else {
          rubricContent.classList.add('hidden');
          rubricIcon.style.transform = 'rotate(0deg)';
        }
      });
    }

    // Reset Form button action
    const btnReset = document.getElementById('btn-reset');
    if (btnReset && topicInput) {
      btnReset.addEventListener('click', () => {
        topicInput.value = '';
        topicInput.placeholder = 'Ketik topik materi baru...';
        topicInput.focus();
      });
    }

    // Generate CTA Micro-feedback
    const generateBtn = document.getElementById('generate-trigger');
    if (generateBtn) {
      generateBtn.addEventListener('click', () => {
        const originalText = generateBtn.innerHTML;
        generateBtn.innerHTML = `
          <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
          <span>Menyusun Butir Soal AI...</span>
        `;
        setTimeout(() => {
          generateBtn.innerHTML = originalText;
        }, 1200);
      });
    }
  });
</script></main><footer className="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.02)] mt-auto"><div className="max-w-[1200px] mx-auto px-margin-desktop py-12 flex flex-col md:flex-row items-center justify-between gap-6"><div className="flex items-center gap-space-sm"><div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-on-primary"><span className="material-symbols-outlined text-[18px]">bolt</span></div><span className="font-headline-sm text-headline-sm text-on-surface">TugasMu<span className="font-label-sm text-label-sm text-primary ml-1 font-bold">AI</span></span><span className="text-on-surface-variant font-body-sm text-body-sm ml-3 hidden sm:inline">© 2026 TugasMu.com. Hak cipta dilindungi.</span></div><nav className="flex flex-wrap items-center justify-center gap-space-lg"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="panduan-pelajar" href="#">Panduan Pelajar</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="hubungi-kami" href="#">Hubungi Kami</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="terms-of-service" href="#">Terms of Service</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="privacy-policy" href="#">Privacy Policy</a></nav><div className="sm:hidden text-center text-on-surface-variant font-body-sm text-body-sm">© 2026 TugasMu.com. Hak cipta dilindungi.</div></div></footer>
    </>
  );
}

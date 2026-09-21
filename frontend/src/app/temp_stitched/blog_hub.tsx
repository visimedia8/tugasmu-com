import React from 'react';
import Link from 'next/link';

export default function blog_hub() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-[1200px] mx-auto px-margin-desktop flex items-center justify-between gap-space-lg"><a className="flex items-center gap-space-sm group" data-path="beranda" href="#"><div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-[0_1px_3px_rgba(15,23,42,0.08)]"><span className="material-symbols-outlined text-[22px]">bolt</span></div><div className="flex items-center gap-1.5"><span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">TugasMu</span><span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">AI</span></div></a><nav className="hidden md:flex items-center gap-1" data-active-classes="bg-surface-container text-primary font-bold"><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="beranda" href="#">Beranda</a><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="tools-ai" href="#">Tools AI</a><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="statistik" href="#">Statistik</a><a className="px-space-md py-1.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="guru-kontributor" href="#">Guru Kontributor</a><a aria-current="page" className="px-space-md py-1.5 rounded-xl transition-colors bg-surface-container text-primary font-bold" data-path="blog" href="#">Blog</a></nav><div className="flex items-center gap-space-md"><a className="inline-flex items-center gap-1.5 bg-primary-container hover:bg-primary text-on-primary px-space-lg py-2 rounded-xl font-label-md text-label-md shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition-all active:scale-[0.98]" data-path="coba-gratis" href="#"><span>Coba Gratis</span><span className="material-symbols-outlined text-[16px]">arrow_forward</span></a><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-16 bg-surface"><div className="flex flex-col w-full">

<section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-high/60 via-surface to-surface py-12 md:py-16">
<div className="max-w-[1200px] mx-auto px-margin md:px-margin-desktop relative z-10 flex flex-col items-center text-center">

<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest shadow-sm mb-4">
<span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
<span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">Pusat Bacaan &amp; Edukasi</span>
</div>

<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight max-w-3xl">
        Blog &amp; Tips Belajar TugasMu
      </h1>

<p className="mt-3 font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl">
        Kumpulan tips belajar efektif, panduan Kurikulum Merdeka, trik ngerjain PR cepat, dan kabar seputar dunia edukasi Indonesia.
      </p>

<div className="w-full max-w-2xl mt-8">
<div className="relative flex items-center bg-surface-container-lowest rounded-xl shadow-md p-1.5 transition-all focus-within:shadow-xl focus-within:ring-2 focus-within:ring-primary-container/40">
<div className="pl-3 pr-2 text-outline">
<span className="material-symbols-outlined text-[24px]">search</span>
</div>
<input className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none py-2.5" id="article-search-input" placeholder="Cari artikel, tips belajar, atau panduan tugas..." type="text"/>
<button className="hidden sm:inline-flex items-center gap-1.5 bg-primary-container hover:bg-primary text-on-primary px-space-lg py-2.5 rounded-xl font-label-md text-label-md transition-all active:scale-[0.98] shadow-sm" id="search-btn" type="button">
<span>Cari</span>
</button>
</div>
</div>

<div className="w-full max-w-4xl mt-6 flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar" id="category-filter-container">
<button className="category-chip px-4 py-2 rounded-xl font-label-md text-label-md bg-primary-container text-on-primary shadow-sm transition-all whitespace-nowrap" data-category="all">
          Semua Artikel
        </button>
<button className="category-chip px-4 py-2 rounded-xl font-label-md text-label-md bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-all shadow-sm whitespace-nowrap" data-category="tips">
          Tips Belajar &amp; Produktivitas
        </button>
<button className="category-chip px-4 py-2 rounded-xl font-label-md text-label-md bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-all shadow-sm whitespace-nowrap" data-category="merdeka">
          Kurikulum Merdeka
        </button>
<button className="category-chip px-4 py-2 rounded-xl font-label-md text-label-md bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-all shadow-sm whitespace-nowrap" data-category="trik">
          Trik PR &amp; Ujian
        </button>
<button className="category-chip px-4 py-2 rounded-xl font-label-md text-label-md bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-all shadow-sm whitespace-nowrap" data-category="ai">
          Seputar AI &amp; Teknologi
        </button>
</div>
</div>
</section>

<section className="max-w-[1200px] w-full mx-auto px-margin md:px-margin-desktop -mt-2 mb-12">
<div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl group">
<div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">

<div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
<div>

<div className="flex flex-wrap items-center gap-2.5 mb-4">
<span className="font-label-sm text-label-sm px-2.5 py-1 rounded-lg bg-surface-container-high text-primary tracking-wide">
                Tips Belajar
              </span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">schedule</span>
                5 menit baca
              </span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">
                24 Feb 2026
              </span>
</div>

<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface group-hover:text-primary transition-colors leading-tight">
              5 Trik Menggunakan AI untuk Memahami Konsep Fisika yang Sulit Tanpa Sekadar Copy-Paste Jawaban
            </h2>

<p className="mt-4 font-body-lg text-body-md md:text-body-lg text-on-surface-variant leading-relaxed">
              Kecerdasan buatan bukan hanya alat pemberi jawaban instan, melainkan mitra belajar layaknya kakak kelas yang siap membedah konsep sampai kamu paham dasarnya. Simak teknik prompt belajar yang tepat.
            </p>
</div>

<div className="pt-8 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-label-md text-label-md shadow-sm">
                BR
              </div>
<div>
<div className="font-label-md text-label-md text-on-surface">Bu Ratna</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Guru IPA Kontributor</div>
</div>
</div>
<a className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary group-hover:text-primary-container transition-all self-start sm:self-auto" href="#">
<span>Baca Selengkapnya</span>
<span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
</a>
</div>
</div>

<div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-surface-container overflow-hidden flex items-center justify-center p-6">
<img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="An Indonesian high school student sitting at a tidy desk studying modern physics with an illuminated holographic tablet showing atomic models, warm ambient study lamp, soft daylight, soft modern illustration style with sky blue and slate tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEdE4uCYgVNsm5kyj2yqKf5LLj336xCcVOaRxr_zxuY1CFUWVLuwgpAEyA2wMMKyITC8Iz9WteyCEY5EbPxvRoNSv1AZTb_CJIjtAvXKCP4SJVyGhGqzgMUROYUPhk4hDgg6rMe-OPDhLSbIpOD5d_Iany_lKXqvtADAyMi9eqDouFFM-G4SJjReiFq-TO2AIqRVV-1xQ6I0wRdHzj5bwPOyxmMNb5KnPNMf3pC5B7OFrQ7Hjpo4APuw"/>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent"></div>

<div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md p-3.5 rounded-xl shadow-sm flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">science</span>
</div>
<div className="min-w-0">
<div className="font-label-sm text-label-sm text-tertiary uppercase">Studi Kasus Pembelajaran</div>
<div className="font-body-sm text-body-sm text-on-surface truncate font-semibold">Prompt generator Fisika Kuantum kelas 12</div>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="max-w-[1200px] w-full mx-auto px-margin md:px-margin-desktop mb-16">

<div className="flex items-center justify-between mb-8">
<div>
<h3 className="font-headline-md text-headline-md text-on-surface">Artikel Terbaru &amp; Populer</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Dipilih dan diperiksa langsung oleh dewan pengajar terdaftar</p>
</div>
<div className="hidden sm:flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
<span>Menampilkan</span>
<span className="font-semibold text-primary" id="article-count">6</span>
<span>Materi</span>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="article-grid">

<article className="article-card flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group" data-category="merdeka">
<div className="h-48 w-full relative overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Indonesian students collaborating on a colorful sustainable school project poster with recycled items, smiling cheerfully in a bright classroom under soft morning sunlight, realistic modern educational photography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcspHSYm6mBISkOZd8Mi60BbiqyJX5VHT3hwOAH2lI6Gt5N2fnzDEkjL3r0H14TpCgtZBtnj7iiNo8ywOCBpcvHc9Nf9KnxuDe12uzLzrLG29CGSJHq52w30bnipDiFW22cu7pTDpxtWRZ82rPMtAeuwJUcZ9zI3i6w0vzx8BKeLpx7pTdvw9REZckEtkhEuLi50_6Q0bkgQUanplXlfTjkQwPkDpPbSI1X_yp42xO4Jt9jrdBtKGOGA"/>
<div className="absolute top-3 left-3">
<span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container shadow-sm font-semibold">
              Kurikulum Merdeka
            </span>
</div>
</div>
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant mb-2.5">
<span className="material-symbols-outlined text-[15px]">schedule</span>
<span>4 menit baca</span>
<span className="mx-1">•</span>
<span>22 Feb 2026</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">
              Cara Menyusun Rangkuman P5 yang Rapi dan Disukai Guru Pembimbing
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 line-clamp-3 leading-relaxed">
              Panduan lengkap membuat laporan proyek P5 mulai dari tema, latar belakang, dokumentasi hingga refleksi.
            </p>
</div>
<div className="pt-5 mt-4 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">verified</span>
              Panduan Guru
            </span>
<a className="font-label-md text-label-md text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-all" href="#">
<span>Baca</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</article>

<article className="article-card flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group" data-category="trik">
<div className="h-48 w-full relative overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A focused high school student practicing logic diagram problem solving with a mechanical pencil and timer on an organized wooden desk, warm study environment, high detail realistic photography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBItdyFsM_g4_pqRrByCXdLyS_e6giUmGkX_vrndaQCBbAOCFnytEWV9WX_9XlTbCzfQJuzyT6CL1gBdPYrqxhH2aPAmyyc-TZKRazGV1PYzdS9RPhAQl_6hSVpsaDkvwlEg5xwQZYetAdlxF2BEwTJccmT-wQAhKs_vDjiEVH9sF_WU_zGhrGXGDQRAXcc2Bb5HPfdwSdiRXDir3m61r0MAm2iKd2gKBedU8aGyxIGb97hCG8DicskGg"/>
<div className="absolute top-3 left-3">
<span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow-sm font-semibold">
              Trik PR &amp; Ujian
            </span>
</div>
</div>
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant mb-2.5">
<span className="material-symbols-outlined text-[15px]">schedule</span>
<span>6 menit baca</span>
<span className="mx-1">•</span>
<span>19 Feb 2026</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">
              Strategi Mengerjakan 50 Soal UTBK Penalaran Umum dalam Waktu Singkat
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 line-clamp-3 leading-relaxed">
              Ketahui pola soal jebakan dan cara mengeliminasi jawaban salah dengan cepat agar skor skolastik maksimal.
            </p>
</div>
<div className="pt-5 mt-4 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">insights</span>
              Target SNBT
            </span>
<a className="font-label-md text-label-md text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-all" href="#">
<span>Baca</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</article>

<article className="article-card flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group" data-category="ai">
<div className="h-48 w-full relative overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="An open notebook alongside an AI tablet interface showing neural network patterns and Indonesian essay outlines, modern clean studio lighting, calm blue tones, educational editorial aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5J21E5fbWbXCvU2RDyDwq8ToLKd3UyAz-SfN8NRob-nZ5kks68rw65yAqwYOIOVlqN8PhOxmthcbhD7h-WkI2nP4O_f4TTGd0BY-6jnUMbFFABb2gfiGNfXhGNfCmAB6f4NwG7ypkRidsBtye4EE2LHvpdkEXwEHc1xC3Pw3o2a5rqDWvU5JXUlMk9F8NVccmCpR7LHkJYohbxycGebandLJqguwCNfvL6TCQp1mvY6TTHHGaN6pvSg"/>
<div className="absolute top-3 left-3">
<span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-variant text-primary font-semibold shadow-sm">
              Seputar AI
            </span>
</div>
</div>
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant mb-2.5">
<span className="material-symbols-outlined text-[15px]">schedule</span>
<span>5 menit baca</span>
<span className="mx-1">•</span>
<span>16 Feb 2026</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">
              Etika Penggunaan AI di Sekolah: Kapan Boleh dan Kapan Harus Murni Usaha Sendiri?
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 line-clamp-3 leading-relaxed">
              Tanggapan guru kontributor tentang batasan sehat memakai AI dalam pengerjaan makalah dan pekerjaan rumah.
            </p>
</div>
<div className="pt-5 mt-4 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">psychology</span>
              Literasi Digital
            </span>
<a className="font-label-md text-label-md text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-all" href="#">
<span>Baca</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</article>

<article className="article-card flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group" data-category="tips">
<div className="h-48 w-full relative overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="An artistic composition of an Indonesian classic literature book, vintage fountain pen, handwritten poetry sheet with rhyming structure, warm golden natural light from a window, cozy desk ambiance" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIChjRlmHUbPbFQ9HDFLg6BTKTDjJT9VfJERH6RgVQEjVudIT4L0GWF8gvbOrejBM1faMISDeIZW7zr_fwClRFdT4ikenM0E47k_WpfBMjC7rtFZI9OEBAwIZvLpjRQF03c42Fxkbvq89ov62PSQs1NyIRQsjWwthL4wdLb4PY8Gi2TUjDkkNhCUtsP02yFtokuv6qTTMG1fFbMUMv86iSghTzVQWYsEN-R--KwlFY5WoCikuYnqnZxg"/>
<div className="absolute top-3 left-3">
<span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold shadow-sm">
              Bahasa Indonesia
            </span>
</div>
</div>
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant mb-2.5">
<span className="material-symbols-outlined text-[15px]">schedule</span>
<span>3 menit baca</span>
<span className="mx-1">•</span>
<span>12 Feb 2026</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">
              Perbedaan Rima a-b-a-b dan a-a-a-a pada Pantun Nasihat serta Contohnya
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 line-clamp-3 leading-relaxed">
              Kumpulan 20 contoh pantun bahasa Indonesia beserta kaidah sampiran dan isi yang benar.
            </p>
</div>
<div className="pt-5 mt-4 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">menu_book</span>
              Sastra &amp; Bahasa
            </span>
<a className="font-label-md text-label-md text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-all" href="#">
<span>Baca</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</article>

<article className="article-card flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group" data-category="tips">
<div className="h-48 w-full relative overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A clean minimalist study space with an analog tomato-style timer, headphones, aesthetic bullet journal, soft pink and blue tones, productive calm atmosphere for high school students" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKL6Ny9GhcoWPQSBQvH3DHAYV0CTg0hvqf13Hq6D7NIv1MMc_81gL4E8_hQwFT4qqUNhjeLFAQKp1K-ngiaVbbl40_EfPF-xfH3_aaJiwAnB4xwNuqdCjXg3CEC6xKLQI_9sEc2NlGhA8LFK33FZqAynsOGrxXBXXz34G9xv7lmjub5q_3oAgNsXtD7ODfDUG1G9pvyFBVT1b9qAVfVGtcspaOjYwJgj-zcB5-IRzfvvK6uGrqtAlqqA"/>
<div className="absolute top-3 left-3">
<span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-error-container text-error font-semibold shadow-sm">
              Tips Belajar
            </span>
</div>
</div>
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant mb-2.5">
<span className="material-symbols-outlined text-[15px]">schedule</span>
<span>4 menit baca</span>
<span className="mx-1">•</span>
<span>09 Feb 2026</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">
              Teknik Pomodoro 25/5: Cara Ampuh Tetap Fokus Belajar Saat HP Penuh Notifikasi
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 line-clamp-3 leading-relaxed">
              Cara mengatur ritme belajar agar otak tidak cepat lelah saat musim ujian akhir semester.
            </p>
</div>
<div className="pt-5 mt-4 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-error font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">timer</span>
              Manajemen Waktu
            </span>
<a className="font-label-md text-label-md text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-all" href="#">
<span>Baca</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</article>

<article className="article-card flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group" data-category="trik">
<div className="h-48 w-full relative overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A high school math notebook with neat handwriting of calculus, quadratic equations, and geometric graph sketches, accompanied by a scientific calculator and neat ruler, bright overhead lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYVp2RK-v_sGjgIkwV8opmm2Q2OzGGHqt-ZIFju_ibLhYG-lygY2RLeJ_0iIqnR_boSQJgcHarOyB-bvwZ1w_mhyoMmy8LKsVFbgDO9xv84Xd3CH6Wo52AZmEIa3fLzKBp9bDougT_b2llHVcQyegYbRbAyRK4sC03uFSyhhewMEXU7cFK71-XeEmoO8GCmbqbIGMjCOJuNYQzNKTA4udOdxxKbpWGJDALP0q81JQ6z6PrE0UkMoUkaA"/>
<div className="absolute top-3 left-3">
<span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow-sm font-semibold">
              Trik PR &amp; Ujian
            </span>
</div>
</div>
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant mb-2.5">
<span className="material-symbols-outlined text-[15px]">schedule</span>
<span>7 menit baca</span>
<span className="mx-1">•</span>
<span>05 Feb 2026</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">
              Kumpulan Rumus Cepat Matematika SMP &amp; SMA yang Sering Keluar di Ujian Harian
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 line-clamp-3 leading-relaxed">
              Daftar ringkas rumus penting trigonometri, aljabar, dan statistika dasar siap hafal.
            </p>
</div>
<div className="pt-5 mt-4 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">calculate</span>
              Rumus Sakti
            </span>
<a className="font-label-md text-label-md text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-all" href="#">
<span>Baca</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</article>
</div>

<div className="hidden py-16 text-center bg-surface-container-lowest rounded-xl shadow-sm mt-6" id="no-results-view">
<div className="w-12 h-12 rounded-full bg-surface-container-high mx-auto flex items-center justify-center text-on-surface-variant mb-3">
<span className="material-symbols-outlined text-[24px]">search_off</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Tidak ada artikel yang cocok</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Coba gunakan kata kunci lain seperti 'Rumus', 'P5', atau 'UTBK'.</p>
<button className="mt-4 px-4 py-2 rounded-xl bg-primary-fixed text-on-primary-fixed font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors" id="reset-filter-btn">
        Tampilkan Semua Artikel
      </button>
</div>
</section>

<section className="max-w-[1200px] w-full mx-auto px-margin md:px-margin-desktop mb-16">
<div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary to-primary-container text-on-primary shadow-xl p-8 md:p-12">

<div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
<div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
<div className="relative z-10 max-w-2xl mx-auto text-center">

<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm mb-4">
<span className="material-symbols-outlined text-[16px]">mark_email_read</span>
<span>Newsletter Mingguan Pelajar</span>
</div>
<h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary font-bold tracking-tight">
          Dapatkan Tips Belajar &amp; Kisi-Kisi Ujian Setiap Minggu
        </h3>
<p className="mt-3 font-body-md text-body-md text-on-primary/85 max-w-lg mx-auto">
          Rangkuman panduan Kurikulum Merdeka, trik ngerjain tugas, serta inspirasi belajar langsung di inbox email kamu.
        </p>

<form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" id="newsletter-form" onsubmit="event.preventDefault(); handleSubscribe();">
<div className="relative flex-1">
<input className="w-full h-11 px-4 rounded-xl bg-surface text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-fixed" id="newsletter-email" placeholder="Masukkan email kamu..." required="" type="email"/>
</div>
<button className="h-11 px-6 rounded-xl bg-primary-container hover:bg-sky-600 text-on-primary font-label-md text-label-md shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 whitespace-nowrap" type="submit">
<span>Langganan Gratis</span>
<span className="material-symbols-outlined text-[16px]">send</span>
</button>
</form>

<p className="mt-3 font-body-sm text-body-sm text-on-primary/75">
          🔒 Tanpa spam. Bisa berhenti berlangganan kapan saja.
        </p>

<div className="hidden mt-4 p-3 bg-white/20 backdrop-blur-md rounded-xl text-on-primary font-label-md text-label-md animate-fade-in" id="newsletter-success">
          🎉 Terima kasih! Kamu telah terdaftar untuk menerima tips belajar mingguan TugasMu.
        </div>
</div>
</div>
</section>

<script>
    // Search and category filter behavior
    const searchInput = document.getElementById('article-search-input');
    const categoryChips = document.querySelectorAll('.category-chip');
    const articleCards = document.querySelectorAll('.article-card');
    const articleCount = document.getElementById('article-count');
    const noResultsView = document.getElementById('no-results-view');
    const resetFilterBtn = document.getElementById('reset-filter-btn');

    let currentCategory = 'all';

    function filterArticles() {
      const query = (searchInput?.value || '').toLowerCase().trim();
      let visibleCount = 0;

      articleCards.forEach(card => {
        const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
        const excerpt = card.querySelector('p')?.textContent.toLowerCase() || '';
        const category = card.getAttribute('data-category') || '';

        const matchesQuery = query === '' || title.includes(query) || excerpt.includes(query);
        const matchesCategory = currentCategory === 'all' || category === currentCategory;

        if (matchesQuery && matchesCategory) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (articleCount) {
        articleCount.textContent = visibleCount;
      }

      if (noResultsView) {
        if (visibleCount === 0) {
          noResultsView.classList.remove('hidden');
        } else {
          noResultsView.classList.add('hidden');
        }
      }
    }

    // Category button click handling
    categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        categoryChips.forEach(c => {
          c.classList.remove('bg-primary-container', 'text-on-primary');
          c.classList.add('bg-surface-container-lowest', 'text-on-surface-variant');
        });

        chip.classList.remove('bg-surface-container-lowest', 'text-on-surface-variant');
        chip.classList.add('bg-primary-container', 'text-on-primary');

        currentCategory = chip.getAttribute('data-category');
        filterArticles();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', filterArticles);
    }

    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        currentCategory = 'all';
        categoryChips.forEach((c, idx) => {
          if (idx === 0) {
            c.classList.remove('bg-surface-container-lowest', 'text-on-surface-variant');
            c.classList.add('bg-primary-container', 'text-on-primary');
          } else {
            c.classList.remove('bg-primary-container', 'text-on-primary');
            c.classList.add('bg-surface-container-lowest', 'text-on-surface-variant');
          }
        });
        filterArticles();
      });
    }

    // Newsletter subscribe interaction
    function handleSubscribe() {
      const emailInput = document.getElementById('newsletter-email');
      const successEl = document.getElementById('newsletter-success');
      if (emailInput && emailInput.value.includes('@')) {
        emailInput.value = '';
        if (successEl) {
          successEl.classList.remove('hidden');
          setTimeout(() => {
            successEl.classList.add('hidden');
          }, 6000);
        }
      }
    }
  </script>
</div></main><footer className="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.02)] mt-auto"><div className="max-w-[1200px] mx-auto px-margin-desktop py-12 flex flex-col md:flex-row items-center justify-between gap-6"><div className="flex items-center gap-space-sm"><div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-on-primary"><span className="material-symbols-outlined text-[18px]">bolt</span></div><span className="font-headline-sm text-headline-sm text-on-surface">TugasMu<span className="font-label-sm text-label-sm text-primary ml-1 font-bold">AI</span></span><span className="text-on-surface-variant font-body-sm text-body-sm ml-3 hidden sm:inline">© 2026 TugasMu.com. Hak cipta dilindungi.</span></div><nav className="flex flex-wrap items-center justify-center gap-space-lg"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="panduan-pelajar" href="#">Panduan Pelajar</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="hubungi-kami" href="#">Hubungi Kami</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="terms-of-service" href="#">Terms of Service</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="privacy-policy" href="#">Privacy Policy</a></nav><div className="sm:hidden text-center text-on-surface-variant font-body-sm text-body-sm">© 2026 TugasMu.com. Hak cipta dilindungi.</div></div></footer>
    </>
  );
}

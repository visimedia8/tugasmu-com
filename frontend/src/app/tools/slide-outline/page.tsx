/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import SlideOutlineClient from './SlideOutlineClient';
import { Presentation, CheckCircle } from 'lucide-react';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Pembuat Presentasi & Slide Outline Otomatis',
  description: 'Ubah topik tugasmu menjadi susunan slide presentasi Canva/PowerPoint lengkap dengan catatan pembicara (speaker notes).',
};

export default function SlideOutlinePage() {
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Pembuat Outline Presentasi (Slide PPT/Canva)
        </h1>
        <p className="text-slate-600 text-lg">
          Ada tugas presentasi besok pagi tapi belum nyentuh PowerPoint atau Canva? Masukkan topik tugasmu, tentukan jumlah slide, dan AI kami akan menyusunkan apa saja isi tiap slide-nya beserta contekan naskah bicara (<em>speaker notes</em>).
        </p>
      </div>

      <SlideOutlineClient />

      <RelatedTools toolIds={["generator-soal","rangkuman","math-solver"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Presentation className="w-6 h-6 text-sky-500" />
            Rahasia Bikin Guru Terpukau Saat Kamu Presentasi
          </h2>
          <p>
            Masalah terbesar siswa (dan mahasiswa) saat membuat presentasi adalah memasukkan semua teks panjang dari makalah/buku cetak ke dalam slide. Ini bukan presentasi namanya, ini <strong>Slide-ument (Slide + Document)</strong>. Penonton akan sibuk membaca dan mengabaikan kamu yang sedang bicara.
          </p>
          
          <h3>Aturan Emas: Less is More</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Maksimal 6 Poin Per Slide:</strong> Jangan buat penonton membaca paragraf. Tulis poin utamanya saja. Penjelasan detailnya? Ucapkan lewat mulutmu. Itulah fungsinya fitur <em>Speaker Notes</em> yang dibuat oleh AI kami.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Visual yang Kuat:</strong> Satu gambar yang relevan jauh lebih baik daripada satu layar penuh tulisan Arial ukuran 12. Di output AI, kami memberikan saran visual apa yang sebaiknya kamu cari di Canva untuk setiap slide.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Punya Struktur Hook:</strong> Jangan buka dengan "Assalamualaikum kami dari kelompok 3 akan membahas sejarah kemerdekaan." Buka dengan kalimat <em>Hook</em> (pancingan) seperti "Tahukah kalian bahwa Indonesia hampir tidak merdeka pada tanggal 17 Agustus jika bukan karena satu kejadian ini?"</span>
            </li>
          </ul>

          <p>
            Dengan tool ini, kamu tidak perlu lagi bengong di depan layar putih Canva. Tinggal <em>copy-paste</em> instruksi yang diberikan, pilih template favoritmu, dan mulailah latihan berbicara dengan pede.
          </p>
        </div>
      </div>
    </div>
  );
}

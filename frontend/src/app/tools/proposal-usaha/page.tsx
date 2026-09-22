/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import ProposalUsahaClient from './ProposalUsahaClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Generator Proposal Usaha Sederhana (SMK / Kewirausahaan)',
  description: 'Buat proposal bisnis tugas sekolah dengan analisis SWOT dan Rencana Anggaran secara otomatis.',
};

export default function ProposalUsahaPage() {
  const faqs = [
  {
    "q": "Apakah bisa digunakan untuk pengajuan modal beneran?",
    "a": "<p>Proposal ini didesain untuk standar akademis (tugas sekolah). Jika untuk investor sungguhan, pastikan merevisi bagian rincian angka dan anggaran secara spesifik.</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Pembuat Proposal Usaha Sederhana
        </h1>
        <p className="text-slate-600 text-lg">
          Tugas Kewirausahaan / Prakarya jadi lebih gampang. Dapatkan outline proposal lengkap siap presentasi.
        </p>
      </div>

      <ProposalUsahaClient />

      <RelatedTools toolIds={["akuntansi-solver","penjelas-kejuruan","cv-lamaran"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">storefront</span>
            Cara Membuat Proposal Usaha yang Disukai Guru / Investor
          </h2>
          <p>Proposal usaha bukan sekadar "ngarang" ide jualan. Guru Kewirausahaan ingin melihat apakah logikamu masuk akal dalam menganalisis pasar. Dua hal paling penting dalam proposal adalah:</p><ul><li><strong>Analisis SWOT:</strong> Menunjukkan kamu sadar akan kekuatan dan kelemahan produkmu, serta siap menghadapi ancaman kompetitor.</li><li><strong>Rencana Anggaran:</strong> Tidak perlu rumit, yang penting logis. Berapa harga bahan baku, berapa harga jual, dan marginnya.</li></ul><p>AI TugasMu membantu menyusun bahasanya, kamu tinggal menyesuaikan angkanya.</p>
        </div>
      </div>

      <div className="mt-12">
        <FAQAccordion
          title="Pertanyaan Seputar Tool Ini"
          description="Panduan singkat penggunaan."
          faqs={faqs.map(f => ({ question: f.q, answer: <div dangerouslySetInnerHTML={{ __html: f.a }} /> }))}
        />
      </div>
    </div>
  );
}
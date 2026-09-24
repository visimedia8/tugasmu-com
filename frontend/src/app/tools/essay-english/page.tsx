/* eslint-disable react/no-unescaped-entities */
import EssayEnglishClient from './EssayEnglishClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Academic English Essay Writer (IGCSE, IELTS, TOEFL) Outline',
  description: 'Generate high-scoring academic essay structures automatically using PEEL methodology for Cambridge, IB, and IELTS students.',
  alternates: { canonical: '/tools/essay-english' },
};

export default function EssayEnglishPage() {
  const faqs = [
  {
    "q": "Apakah hasilnya langsung full essay?",
    "a": "<p>Tidak, tool ini menghasilkan <strong>Outline (Kerangka)</strong> yang sangat detail. Menyerahkan essay yang di-generate full oleh AI sangat berisiko terkena deteksi plagiarisme dan AI-checker di universitas. Dengan kerangka ini, kamu menulis essay-mu sendiri namun dengan alur logika level dunia.</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Academic English Essay Outline Builder
        </h1>
        <p className="text-slate-600 text-lg">
          Conquer the blank page. Get a perfectly structured thesis and body paragraphs in seconds.
        </p>
      </div>

      <EssayEnglishClient />

      <RelatedTools toolIds={["generator-soal","rangkuman","math-solver"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">edit_document</span>
            How to Score Band 8.0+ in Academic Essay Writing
          </h2>
          <p>Menulis essay bahasa Inggris untuk kurikulum internasional (Cambridge IGCSE, IB) atau ujian sertifikasi (IELTS, TOEFL) sangat berbeda dengan mengarang bebas. Penguji mencari <strong>struktur logika yang rigid</strong>.</p><ul><li><strong>Thesis Statement is King:</strong> Kalimat terakhir di paragraf pertamamu harus menyatakan opinimu secara mutlak. Jika tidak ada <em>thesis statement</em>, nilai <em>Task Response</em>-mu otomatis anjlok.</li><li><strong>PEEL Method:</strong> Setiap paragraf isi (Body Paragraph) wajib memiliki Point (Kalimat Utama), Evidence (Bukti/Contoh), Explain (Penjelasan rasional), dan Link (Kaitkan kembali ke Thesis).</li></ul><p>Tool ini berfungsi layaknya tutor IELTS pribadi yang menyusunkan kerangka pikiranmu sebelum kamu mulai mengetik kata per kata.</p>
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
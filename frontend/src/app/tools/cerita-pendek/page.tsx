/* eslint-disable react/no-unescaped-entities */
import CeritaPendekClient from './CeritaPendekClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Pembuat Cerita Pendek & Pengalaman Pribadi (Anak SD/SMP)',
  description: 'Otomatis membuat cerita pendek fabel, pengalaman liburan, atau dongeng untuk tugas Bahasa Indonesia.',
  alternates: { canonical: '/tools/cerita-pendek' },
};

export default function CeritaPendekPage() {
  const faqs = [
  {
    "q": "Berapa panjang cerita yang dihasilkan?",
    "a": "<p>AI akan menghasilkan cerita pendek berukuran sekitar 3-4 paragraf (sekitar 200-300 kata), ukuran yang sangat pas untuk dibaca atau disalin ke buku tulis anak SD/SMP.</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Pembuat Cerita Pendek & Dongeng Anak
        </h1>
        <p className="text-slate-600 text-lg">
          Buntu saat disuruh guru menulis cerita pengalaman liburan? AI kami siap merangkai cerita yang seru.
        </p>
      </div>

      <CeritaPendekClient />

      <RelatedTools toolIds={["kamus-anak","pantun-puisi","pidato"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">auto_stories</span>
            Cara Mendapat Nilai Bagus di Tugas Mengarang
          </h2>
          <p>Tugas mengarang atau menulis pengalaman pribadi biasanya menjadi tugas rutin setelah liburan sekolah. Untuk mendapat nilai A dari guru Bahasa Indonesia, tulisanmu tidak boleh sekadar "Aku bangun, mandi, lalu main game."</p><ul><li><strong>Gunakan Panca Indera:</strong> Deskripsikan apa yang kamu lihat, dengar, dan cium. (Contoh: "Bau tanah basah setelah hujan di desa nenek sangat menenangkan.")</li><li><strong>Berikan Emosi:</strong> Ceritakan perasaanmu, apakah senang, kaget, atau sedih saat kejadian tersebut terjadi.</li></ul>
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
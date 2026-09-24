/* eslint-disable react/no-unescaped-entities */
import KamusAnakClient from './KamusAnakClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Kamus Penjelas Kata Sulit untuk Anak SD - TugasMu',
  description: 'Kamus pintar yang menjelaskan kata-kata sulit dari buku pelajaran SD menggunakan perumpamaan sehari-hari yang mudah dipahami anak.',
  alternates: { canonical: '/tools/kamus-anak' },
};

export default function KamusAnakPage() {
  const faqs = [
  {
    "q": "Apakah orang tua bisa menggunakan ini?",
    "a": "<p>Sangat direkomendasikan! Tool ini justru sering digunakan oleh ayah/bunda saat mendampingi anak belajar PR di rumah agar bisa menjelaskan dengan bahasa yang tidak membosankan.</p>"
  }
];
  
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Kamus Pintar & Ramah Anak
        </h1>
        <p className="text-slate-600 text-lg">
          Penjelasan KBBI terlalu pusing? Gunakan kamus ini untuk mengubah kata rumit menjadi perumpamaan yang seru.
        </p>
      </div>

      <KamusAnakClient />

      <RelatedTools toolIds={["cerita-pendek","pantun-puisi","pidato"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 text-[32px]">menu_book</span>
            Mengapa Anak Kesulitan Memahami Kata Baku?
          </h2>
          <p>Buku pelajaran sekolah (Buku Tema Tematik) sering kali menggunakan kosakata akademis atau baku yang belum pernah didengar anak di lingkungan rumahnya. Jika anak bertanya kepada orang tua dan dijawab dengan penjelasan dari Kamus Besar Bahasa Indonesia (KBBI), anak justru akan semakin bingung.</p><p>Kuncinya adalah <strong>Analogi Konkret</strong>. Anak SD masih berada di tahap pemikiran konkret. Mereka mengerti sebuah konsep jika disamakan dengan benda yang bisa mereka pegang atau lihat sehari-hari. Itulah yang dilakukan AI TugasMu di halaman ini.</p>
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
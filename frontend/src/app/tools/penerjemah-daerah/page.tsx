/* eslint-disable react/no-unescaped-entities */
import SchemaMarkup from '@/components/shared/SchemaMarkup';
import PenerjemahDaerahClient from './PenerjemahDaerahClient';
import { Languages, CheckCircle } from 'lucide-react';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Penerjemah Bahasa Daerah (Jawa, Sunda, Minang) - TugasMu',
  description: 'Penerjemah bahasa daerah Indonesia lengkap dengan tingkatan bahasa (Krama, Ngoko, Lemes) dan penjelasan budaya lokal.',
  alternates: { canonical: '/tools/penerjemah-daerah' },
};

export default function PenerjemahDaerahPage() {

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Penerjemah Bahasa Daerah (Jawa, Sunda, Minang) - TugasMu",
    "description": "Penerjemah bahasa daerah Indonesia lengkap dengan tingkatan bahasa (Krama, Ngoko, Lemes) dan penjelasan budaya lokal.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  };
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <SchemaMarkup schema={schema} />
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Penerjemah Bahasa Daerah & Asing
        </h1>
        <p className="text-slate-600 text-lg">
          Ada tugas Muatan Lokal (Mulok) atau ingin ngobrol dengan teman beda daerah? Terjemahkan bahasa Indonesia ke Jawa, Sunda, Minang, Batak, dll lengkap dengan tingkat kesopanannya.
        </p>
      </div>

      <PenerjemahDaerahClient />

      <RelatedTools toolIds={["generator-soal","rangkuman","math-solver"]} />

      <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-sky-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Languages className="w-6 h-6 text-sky-500" />
            Pentingnya Memahami "Tingkatan" Bahasa Daerah
          </h2>
          <p>
            Berbeda dengan bahasa Indonesia, banyak bahasa daerah di Nusantara memiliki "tingkatan kesopanan" atau yang disebut dengan <em>Undak-Usuk Basa</em>. Menggunakan tingkatan yang salah bisa membuat kita dianggap tidak sopan oleh orang yang lebih tua.
          </p>
          
          <h3>Contoh di Bahasa Jawa dan Sunda</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Bahasa Kasar / Akrab (Ngoko):</strong> Digunakan saat berbicara dengan teman sebaya atau orang yang lebih muda. Contoh: <em>"Kowe arep nang endi?"</em> (Jawa) atau <em>"Maneh rek ka mana?"</em> (Sunda).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Bahasa Halus / Sopan (Krama Alus / Lemes):</strong> Wajib digunakan saat berbicara dengan orang tua, guru, atau orang yang baru dikenal. Contoh: <em>"Panjenengan badhe tindak pundi?"</em> (Jawa) atau <em>"Bade angkat ka mana?"</em> (Sunda).</span>
            </li>
          </ul>

          <p>
            AI TugasMu tidak hanya menerjemahkan kata demi kata seperti Google Translate, tetapi juga menyesuaikan grammar dan konteks budaya lokal agar terjemahanmu terasa natural seperti penutur asli (<em>native speaker</em>).
          </p>
        </div>
      </div>
    </div>
  );
}

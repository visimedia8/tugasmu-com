import SchemaMarkup from '@/components/shared/SchemaMarkup';
import PantunPuisiClient from './PantunPuisiClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Generator Pantun & Puisi',
  description: 'Buat pantun dan puisi seru untuk tugas sastramu otomatis dengan AI TugasMu.',
  alternates: { canonical: '/tools/pantun-puisi' },
};

export default function PantunPuisiPage() {

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Generator Pantun & Puisi",
    "description": "Buat pantun dan puisi seru untuk tugas sastramu otomatis dengan AI TugasMu.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  };
  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <SchemaMarkup schema={schema} />
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Generator Pantun & Puisi
        </h1>
        <p className="text-slate-600 text-lg">
          Tugas bahasa Indonesia membuat pantun atau puisi? Masukkan temanya, dan AI kami akan membuat karya sastra indah sesuai keinginanmu.
        </p>
      </div>
      
      <PantunPuisiClient />

      <RelatedTools toolIds={["cerita-pendek","kamus-anak","pidato"]} />

      <FAQAccordion 
        title="Panduan & FAQ: Generator Pantun & Puisi"
        description="Pelajari cara membuat karya sastra instan yang orisinil untuk tugas Bahasa Indonesia dan kesenianmu."
        faqs={[
          {
            question: "Bagaimana cara membuat pantun pendidikan dengan AI secara instan?",
            answer: (
              <>
                <p>Cukup pilih tipe sastra &quot;Pantun&quot;, lalu tuliskan topik yang kamu inginkan (contoh: &quot;Pantun tentang rajin belajar agar disayang guru&quot;). Sistem kami akan langsung membuatkan 4 baris pantun yang terdiri dari 2 baris sampiran (pembuka) dan 2 baris isi yang nyambung secara makna dan berirama indah.</p>
              </>
            )
          },
          {
            question: "Bisakah membuat puisi tentang guru, sekolah, atau perpisahan dengan gaya bahasa tertentu?",
            answer: (
              <>
                <p>Bisa banget! Pilih opsi &quot;Puisi&quot; dan tuliskan instruksi spesifikmu (contoh: &quot;Puisi perpisahan sekolah SMP 4 bait, gaya bahasa sedih dan menyentuh hati&quot;). Kamu juga bisa meminta AI menyisipkan majas-majas tertentu seperti personifikasi atau metafora agar nilaimu semakin bagus di mata guru Bahasa Indonesia.</p>
              </>
            )
          },
          {
            question: "Apakah AI ini bisa menghasilkan rima pantun a-b-a-b yang sempurna?",
            answer: (
              <>
                <p>Tentu saja. Berbeda dengan AI generik dari luar negeri, model AI TugasMu telah dilatih khusus menggunakan literatur sastra Indonesia. Sehingga struktur rima <strong>a-b-a-b</strong> khas pantun Melayu dan Indonesia dapat dipenuhi dengan akhiran suku kata yang pas dan tidak terkesan dipaksakan.</p>
              </>
            )
          },
          {
            question: "Apakah hasil puisi atau pantun dari TugasMu murni karya original AI?",
            answer: (
              <>
                <p>Ya. Setiap bait pantun dan puisi yang dihasilkan (di-generate) secara langsung pada saat itu juga (real-time) sehingga peluang kesamaan dengan karya temanmu sangat kecil. Namun, kami selalu menyarankanmu untuk memodifikasi kembali 1 atau 2 baris sesuai dengan gaya bahasamu sendiri agar terasa lebih personal.</p>
              </>
            )
          }
        ]}
      />
    </div>
  );
}

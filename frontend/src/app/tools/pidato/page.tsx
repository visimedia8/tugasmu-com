import PidatoClient from './PidatoClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata = {
  title: 'Generator Teks Pidato Otomatis — Semua Acara & Jenjang',
  description: 'Buat teks pidato untuk 17 Agustus, Hari Guru, Perpisahan, dan acara sekolah lainnya secara otomatis. Pilih tema, durasi, dan gaya bahasa.',
  alternates: { canonical: '/tools/pidato' },
};

export default function PidatoPage() {
  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
          Generator Teks Pidato
        </h1>
        <p className="text-slate-600 text-lg">
          Buat teks pidato lengkap untuk berbagai acara sekolah — dari 17 Agustus hingga perpisahan — dalam hitungan detik.
        </p>
      </div>

      <PidatoClient />

      <RelatedTools toolIds={["cerita-pendek","kamus-anak","pantun-puisi"]} />

      <FAQAccordion
        title="Panduan & FAQ: Generator Teks Pidato"
        description="Pertanyaan seputar pembuatan teks pidato otomatis untuk siswa dan guru SD, SMP, SMA."
        faqs={[
          {
            question: 'Bisakah generator ini membuat pidato untuk acara 17 Agustus yang panjang?',
            answer: (
              <>
                <p>Bisa. Gunakan slider durasi untuk mengatur panjang pidato hingga 15 menit (sekitar 2.000 kata). Sistem AI TugasMu akan otomatis menyesuaikan jumlah poin isi dan elaborasi berdasarkan durasi yang kamu pilih. Untuk pidato resmi upacara, pilih gaya bahasa <strong>Formal</strong>.</p>
              </>
            )
          },
          {
            question: 'Apakah hasil pidato ini bisa langsung dibacakan di acara sekolah?',
            answer: (
              <>
                <p>Ya, teks pidato yang dihasilkan sudah memiliki struktur lengkap: pembuka (salam + ucapan terima kasih), isi (minimal 3 poin utama), dan penutup (kesimpulan + doa). Kamu hanya perlu mengganti bagian <strong>[nama pembicara]</strong> dan <strong>[nama sekolah]</strong> sesuai dengan identitasmu.</p>
              </>
            )
          },
          {
            question: 'Bagaimana cara membuat pidato perpisahan yang menyentuh hati?',
            answer: (
              <>
                <p>Pilih acara <strong>Perpisahan Sekolah</strong> dan gaya bahasa <strong>Semi-Formal</strong>. Isi tema dengan detail spesifik, misalnya: &quot;Kenangan tiga tahun bersama, harapan untuk masa depan yang cerah.&quot; Semakin spesifik tema yang kamu tuliskan, semakin personal dan menyentuh hasil pidatonya.</p>
              </>
            )
          },
          {
            question: 'Apakah generator ini bisa digunakan oleh guru untuk membuat naskah MC?',
            answer: (
              <>
                <p>Tentu saja. Guru dapat menggunakan fitur ini untuk membuat naskah pembawa acara (MC) dengan memilih acara yang sesuai dan mengatur tema pada format acara yang diinginkan. Untuk naskah MC, disarankan memilih gaya <strong>Semi-Formal</strong> agar terdengar natural saat dibawakan.</p>
              </>
            )
          },
        ]}
      />
    </div>
  );
}

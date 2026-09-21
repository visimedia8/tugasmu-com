import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Syarat dan Ketentuan Penggunaan TugasMu.com',
};

export default function SyaratPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-heading font-bold text-slate-900 mb-8">Syarat & Ketentuan Penggunaan</h1>
      
      <div className="prose prose-slate max-w-none">
        <p className="text-sm text-slate-500 mb-8">Terakhir Diperbarui: September 2026</p>
        
        <p>
          Dengan mengakses dan menggunakan website TugasMu.com (&quot;Layanan&quot;), Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari syarat-syarat ini, Anda tidak diperkenankan untuk menggunakan Layanan ini.
        </p>

        <h2>1. Deskripsi Layanan</h2>
        <p>
          TugasMu.com menyediakan berbagai alat bantu edukasi berbasis Artificial Intelligence (AI) seperti alat parafrase, pembuat soal latihan, dan pembuat ringkasan. Layanan ini ditujukan sebagai alat bantu belajar dan pemahaman materi, <strong>bukan</strong> sebagai sarana untuk melakukan kecurangan akademik.
        </p>

        <h2>2. Aturan Penggunaan</h2>
        <p>Anda setuju untuk menggunakan Layanan hanya untuk tujuan yang sah dan sesuai dengan Syarat ini. Anda secara spesifik setuju untuk tidak:</p>
        <ul>
          <li>Menggunakan Layanan untuk melakukan plagiarisme atau mengumpulkan karya hasil AI sebagai karya asli Anda sendiri kepada institusi pendidikan.</li>
          <li>Menyalahgunakan batasan sistem (rate limits) yang kami terapkan, misalnya dengan menggunakan bot, skrip otomatis, atau VPN berulang untuk melampaui batas harian.</li>
          <li>Memasukkan teks yang melanggar hak cipta, memuat ujaran kebencian, atau konten ilegal lainnya ke dalam sistem kami.</li>
        </ul>

        <h2>3. Sifat Konten AI (Disclaimer)</h2>
        <p>
          Layanan ini ditenagai oleh model bahasa AI yang kompleks. Meskipun kami berusaha menyajikan hasil yang akurat:
        </p>
        <ul>
          <li>Kami tidak dapat menjamin keakuratan, kebenaran mutlak, atau kelengkapan dari setiap hasil teks yang di-generate (halusinasi AI mungkin terjadi).</li>
          <li>Pengguna bertanggung jawab penuh untuk memverifikasi ulang hasil (terutama jawaban soal atau fakta sejarah/sains) sebelum menggunakannya.</li>
          <li>Kami tidak bertanggung jawab atas nilai akademik yang buruk atau sanksi dari pihak sekolah akibat penggunaan langsung (copas) dari hasil AI kami.</li>
        </ul>

        <h2>4. Ketersediaan Layanan</h2>
        <p>
          Kami berhak untuk mengubah, menangguhkan, atau menghentikan Layanan (atau bagian mana pun darinya) kapan saja tanpa pemberitahuan sebelumnya. Kami menerapkan batasan (rate limit) harian per pengguna yang dapat berubah sewaktu-waktu.
        </p>

        <h2>5. Kekayaan Intelektual</h2>
        <p>
          Desain, kode, dan konten (blog) di TugasMu.com adalah milik kami dan dilindungi hak cipta. Hasil teks yang di-generate oleh AI melalui prompt Anda disediakan tanpa klaim hak cipta dari kami, namun Anda bertanggung jawab atas penggunaannya.
        </p>

        <h2>6. Hukum yang Berlaku</h2>
        <p>
          Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.
        </p>
      </div>
    </div>
  );
}

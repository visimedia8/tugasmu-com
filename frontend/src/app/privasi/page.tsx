
export const metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan Privasi TugasMu.com - Bagaimana kami melindungi dan menggunakan data Anda.',
  alternates: { canonical: '/privasi' },
};

export default function PrivasiPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-heading font-bold text-slate-900 mb-8">Kebijakan Privasi</h1>
      
      <div className="prose prose-slate max-w-none">
        <p className="text-sm text-slate-500 mb-8">Terakhir Diperbarui: September 2026</p>
        
        <p>
          Selamat datang di TugasMu.com. Privasi Anda sangat penting bagi kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan website dan layanan kami.
        </p>
        
        <h2>1. Informasi yang Kami Kumpulkan</h2>
        <p>
          Saat Anda menggunakan TugasMu.com, kami mungkin mengumpulkan beberapa jenis informasi:
        </p>
        <ul>
          <li><strong>Informasi Penggunaan:</strong> Teks yang Anda masukkan ke dalam tools kami (seperti teks untuk diparafrase atau topik soal). Kami menggunakan ini <em>hanya</em> untuk diproses oleh API AI kami dan mengembalikan hasilnya kepada Anda. Teks ini tidak disimpan secara permanen di database kami.</li>
          <li><strong>Informasi Log & Analitik:</strong> Alamat IP, jenis browser, halaman yang Anda kunjungi, dan waktu kunjungan. Ini digunakan untuk analitik dan keperluan keamanan (rate-limiting).</li>
          <li><strong>Informasi yang Diberikan Langsung:</strong> Jika Anda mendaftar sebagai Guru Kontributor atau menghubungi kami, kami akan menyimpan nama, email, dan pesan Anda.</li>
        </ul>

        <h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
        <p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
        <ul>
          <li>Menyediakan dan menjalankan layanan kami (misalnya, memproses teks dengan AI).</li>
          <li>Mencegah penyalahgunaan layanan kami (membatasi jumlah request per hari).</li>
          <li>Meningkatkan kualitas layanan dan memahami bagaimana pengguna berinteraksi dengan website kami melalui analitik.</li>
          <li>Berkomunikasi dengan Anda (jika Anda menghubungi kami).</li>
        </ul>

        <h2>3. Penggunaan Google Analytics & AdSense</h2>
        <p>
          Kami menggunakan <strong>Google Analytics</strong> untuk menganalisis lalu lintas website. Google Analytics dapat menggunakan cookie untuk mengumpulkan informasi anonim tentang kunjungan Anda.
        </p>
        <p>
          Kami juga menggunakan <strong>Google AdSense</strong> untuk menampilkan iklan. Vendor pihak ketiga, termasuk Google, menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan Anda sebelumnya ke website kami atau website lain di internet. Anda dapat menyisih dari iklan yang dipersonalisasi dengan mengunjungi <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Pengaturan Iklan Google</a>.
        </p>

        <h2>4. Keamanan Data</h2>
        <p>
          Kami mengambil langkah-langkah yang wajar secara komersial untuk melindungi informasi Anda. Komunikasi antara browser Anda dan server kami dienkripsi menggunakan HTTPS. Namun, perlu diingat bahwa tidak ada transmisi data melalui internet yang 100% aman.
        </p>

        <h2>5. Perubahan Kebijakan Privasi</h2>
        <p>
          Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diposting di halaman ini beserta tanggal pembaruan di bagian atas dokumen.
        </p>

        <h2>6. Hubungi Kami</h2>
        <p>
          Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui halaman <a href="/kontak">Kontak</a> atau kirim email ke support@tugasmu.com.
        </p>
      </div>
    </div>
  );
}

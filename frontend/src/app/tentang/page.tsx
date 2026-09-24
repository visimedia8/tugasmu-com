
export const metadata = {
  title: 'Tentang Kami',
  description: 'Misi TugasMu untuk membantu siswa Indonesia belajar lebih cerdas dengan bantuan AI.',
  alternates: { canonical: '/tentang' },
};

export default function TentangPage() {
  return (
    <div className="container py-12 md:py-20 max-w-3xl">
      <h1 className="text-4xl font-heading font-bold text-slate-900 mb-8">Tentang TugasMu</h1>
      
      <div className="prose prose-slate prose-lg max-w-none">
        <p>
          Selamat datang di <strong>TugasMu</strong>, platform edukasi berbasis Artificial Intelligence (AI) yang dirancang khusus untuk pelajar Indonesia.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Misi Kami</h2>
        <p>
          Kami percaya bahwa AI bukanlah alat untuk sekadar mencontek, melainkan <strong>teman belajar yang pintar</strong>. Banyak siswa merasa kesulitan saat belajar mandiri di rumah tanpa ada guru atau tutor yang mendampingi. TugasMu hadir untuk mengisi kekosongan tersebut.
        </p>
        <p>
          Misi kami sederhana: Membantu siswa Indonesia belajar lebih cerdas, memahami materi lebih cepat, dan menyelesaikan tugas sekolah tanpa stres berlebihan, terlepas dari latar belakang ekonomi mereka. Itulah mengapa fitur utama TugasMu akan selalu gratis untuk digunakan.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Bukan Tools Curang</h2>
        <p>
          Kami sangat menentang penggunaan AI untuk kecurangan akademik (plagiarisme murni). Tools yang kami bangun, seperti <em>Parafrase</em>, <em>Generator Soal</em>, dan <em>Rangkuman</em>, didesain untuk merangsang pemahaman siswa. Kami merancang prompt internal kami agar AI memberikan penjelasan, bukan sekadar jawaban instan (terutama untuk pelajaran eksakta).
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Dukungan Guru & Sekolah</h2>
        <p>
          TugasMu tidak akan bisa berdiri tanpa dukungan para pendidik. Kami menyediakan program <strong>Guru Kontributor</strong> agar para guru dapat menyumbangkan materi, modul, dan soal latihan yang sesuai dengan kurikulum nasional (K13 & Kurikulum Merdeka). Ini memastikan konten kami selalu relevan, akurat, dan dapat dipertanggungjawabkan.
        </p>
        
        <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 mt-12">
          <h3 className="font-heading font-bold text-lg text-sky-900 mb-2">Punya Saran atau Masukan?</h3>
          <p className="text-sky-800 text-sm mb-0">
            Kami masih terus berkembang dan menyempurnakan platform ini. Jika kamu memiliki ide fitur baru atau menemukan error, jangan ragu untuk menghubungi kami lewat halaman <a href="/kontak" className="underline font-semibold">Kontak</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

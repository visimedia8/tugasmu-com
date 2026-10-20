import Link from 'next/link';

export const metadata = {
  title: 'Kebijakan Editorial & Integritas Akademik — Standar Konten TugasMu',
  description: 'Pedoman standar verifikasi fakta, rujukan Kurikulum Merdeka, etika pemanfaatan AI, dan komitmen integritas anti-plagiarisme TugasMu.',
  alternates: { canonical: '/kebijakan-editorial' },
};

export default function KebijakanEditorialPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Kebijakan Editorial & Integritas Akademik TugasMu",
    "description": "Pedoman standar verifikasi fakta, rujukan kurikulum resmi, etika AI, dan integritas konten edukasi TugasMu.",
    "url": "https://tugasmu.com/kebijakan-editorial",
    "publisher": {
      "@type": "Organization",
      "name": "TugasMu",
      "url": "https://tugasmu.com"
    }
  };

  return (
    <div className="container py-12 md:py-16 max-w-3xl mx-auto px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 flex items-center space-x-2">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Kebijakan Editorial</span>
      </nav>

      {/* Header */}
      <div className="mb-10 border-b border-slate-200 pb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 inline-block mb-3">
          Standar Kualitas & Etika
        </span>
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-4 tracking-tight">
          Kebijakan Editorial & Integritas Akademik
        </h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          TugasMu berkomitmen menyediakan materi edukasi berkualitas tinggi yang dapat diandalkan oleh siswa, guru, dan orang tua di seluruh Indonesia. Halaman ini menjelaskan prinsip dan metodologi kurasi kami.
        </p>
      </div>

      {/* Body Content */}
      <div className="prose prose-slate prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-heading font-bold text-slate-900 mb-3">
            1. Filosofi AI: Mitra Berpikir, Bukan Jalan Pintas Curang
          </h2>
          <p className="text-slate-600 leading-relaxed">
            TugasMu memegang teguh prinsip bahwa teknologi kecerdasan buatan (AI) harus digunakan untuk <strong>merangsang nalar kritis dan pemahaman mandiri</strong> siswa, bukan untuk memfasilitasi kecurangan akademis atau joki tugas.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Setiap fitur dan materi yang kami susun dirancang agar memberikan penjelasan bertahap (*step-by-step reasoning*), menyoroti rumus dasar, dan melatih siswa menyelesaikan masalah serupa secara independen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-slate-900 mb-3">
            2. Sumber Rujukan & Kesesuaian Kurikulum Nasional
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Seluruh panduan materi mengacu pada standar resmi yang berlaku di Indonesia:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
            <li><strong>Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP) Kemendikbudristek</strong> untuk pemetaan fase Capaian Pembelajaran Kurikulum Merdeka dan Kurikulum 2013 Revisi.</li>
            <li><strong>Pedoman Umum Ejaan Bahasa Indonesia (PUEBI / EYD Edisi V)</strong> dan Kamus Besar Bahasa Indonesia (KBBI) daring resmi Badan Pengembangan dan Pembinaan Bahasa.</li>
            <li><strong>Buku Teks Utama Kemendikbudristek</strong> dan jurnal ilmiah terakreditasi untuk verifikasi data sejarah, geografi, dan konsep sains.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-slate-900 mb-3">
            3. Protokol Supervisi Manusia (Human-in-the-Loop)
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Kami tidak menerbitkan konten yang dihasilkan mesin secara mentah (*unsupervised AI generation*). Setiap artikel dan dataset tool melalui proses <strong>Human-in-the-Loop (HITL)</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600 text-sm">
            <li><strong>Drafting Awal</strong>: Penyusunan draf awal dengan struktur entitas semantik yang padat informasi.</li>
            <li><strong>Verifikasi Ahli</strong>: Ditinjau oleh pendidik berpengalaman di bidang studi terkait (lihat <Link href="/redaksi" className="text-sky-600 underline font-semibold">Tim Redaksi</Link>).</li>
            <li><strong>Uji Komparasi Rumus</strong>: Pembuktian kebenaran hitungan angka pada contoh soal eksakta.</li>
            <li><strong>Penambahan Miskonsepsi</strong>: Identifikasi kesalahan umum yang sering dialami siswa saat ujian.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-slate-900 mb-3">
            4. Kebijakan Koreksi & Pembaruan Materi
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Ilmu pengetahuan dan regulasi pendidikan terus berkembang. Jika pembaca menemukan ketidakakuratan data, typo formula, atau perubahan aturan kurikulum terbaru, tim redaksi kami menerapkan standar koreksi cepat:
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700">
            Koreksi materi dapat dilaporkan melalui email redaksi di <strong className="text-slate-900">halo@tugasmu.com</strong> dengan subjek <em>Koreksi Materi [Judul Artikel]</em>. Laporan yang terverifikasi akan diperbarui dalam waktu 1x24 jam kerja disertai catatan revisi tanggal modifikasi.
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-slate-900 mb-3">
            5. Independensi & Transparansi
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Konten editorial TugasMu disusun secara independen dan bebas dari intervensi komersial pihak ketiga. Ulasan tools edukasi dan rekomendasi metode belajar murni didasarkan pada efektivitas pedagogis demi kemajuan pendidikan anak bangsa.
          </p>
        </section>
      </div>

      {/* Footer Navigation Link */}
      <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between text-sm">
        <Link href="/redaksi" className="text-sky-600 hover:underline font-semibold">
          ← Lihat Tim Redaksi & Kurator
        </Link>
        <Link href="/peta-situs" className="text-slate-500 hover:text-slate-900">
          Peta Situs Lengkap →
        </Link>
      </div>
    </div>
  );
}

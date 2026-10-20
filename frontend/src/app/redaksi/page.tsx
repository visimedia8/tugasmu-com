import Link from 'next/link';

export const metadata = {
  title: 'Dewan Redaksi & Tim Kurasi Materi Edukasi — Standar E-E-A-T TugasMu',
  description: 'Profil tim kurator konten, pendidik ahli, dan reviewer materi pelajaran TugasMu. Menjamin akurasi rumus, kesesuaian Kurikulum Merdeka, dan integritas akademik.',
  alternates: { canonical: '/redaksi' },
};

const EDITORS = [
  {
    name: 'Ahmad Fauzi, S.Pd.',
    role: 'Lead Content Specialist & Kurikulum Merdeka',
    subjects: 'Kurikulum Merdeka, Modul Ajar P5, Pedoman Asesmen Rapor',
    bio: 'Praktisi kurikulum nasional dan pengembang perangkat ajar dengan pengalaman lebih dari 8 tahun dalam pemetaan capaian pembelajaran (CP) dan alur tujuan pembelajaran (ATP) lintas jenjang SD hingga SMA.',
    education: 'S1 Pendidikan Kurikulum & Teknologi Pendidikan — Universitas Negeri Jakarta',
    initials: 'AF',
    color: 'bg-sky-600',
  },
  {
    name: 'Nurul Hidayati, M.Pd.',
    role: 'Spesialis Bahasa Indonesia & Tata Ejaan EYD',
    subjects: 'Tata Bahasa PUEBI/EYD V, Analisis Sastra, Struktur Karya Ilmiah',
    bio: 'Magister pendidikan bahasa yang berfokus pada standardisasi kaidah penulisan ilmiah, pedoman ejaan resmi Badan Bahasa Kemendikbudristek, dan etika parafrase pencegahan plagiarisme akademik.',
    education: 'S2 Pendidikan Bahasa & Sastra Indonesia — Universitas Pendidikan Indonesia',
    initials: 'NH',
    color: 'bg-emerald-600',
  },
  {
    name: 'Bambang Prakoso, S.Si.',
    role: 'Lead Reviewer Matematika & Sains (STEM)',
    subjects: 'Aljabar, Geometri Ruang, Kalkulus, Fisika Terapan, Numerasi UTBK',
    bio: 'Mentor olimpiade matematika dan sains yang menguji validasi algoritma pemecahan rumus step-by-step Math Solver TugasMu agar setiap pembuktian rumus logis dan akurat bagi siswa.',
    education: 'S1 Sains Matematika Murni — Institut Teknologi Bandung',
    initials: 'BP',
    color: 'bg-indigo-600',
  },
  {
    name: 'Dimas Arya Pratama, S.Kom.',
    role: 'Spesialis Vokasi SMK & Karir Industri',
    subjects: 'Laporan PKL Industri, Kurikulum Vokasi SMK, Standarisasi CV ATS',
    bio: 'Praktisi industri teknologi informasi dan konsultan pendamping program vokasi SMK Pusat Keunggulan. Mengkurasi panduan laporan magang industri dan tata tulis dokumen profesional.',
    education: 'S1 Ilmu Komputer — Universitas Gadjah Mada',
    initials: 'DA',
    color: 'bg-amber-600',
  },
  {
    name: 'Siti Rahmawati, S.Pd.I.',
    role: 'Konsultan Materi PAI & Kajian Keagamaan',
    subjects: 'Hukum Tajwid, Fikih Ibadah Sekolah, Sejarah Kebudayaan Islam (SKI)',
    bio: 'Pendidik pendidikan agama Islam yang menelaah keabsahan kaidah bacaan tajwid latin, sanad riwayat, dan konteks penulisan hadits tematik untuk materi jenjang dasar dan menengah.',
    education: 'S1 Pendidikan Agama Islam — UIN Syarif Hidayatullah Jakarta',
    initials: 'SR',
    color: 'bg-purple-600',
  },
];

export default function RedaksiPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Dewan Redaksi & Tim Kurasi Materi TugasMu",
    "description": "Profil tim kurator dan pendidik ahli yang meninjau seluruh materi pelajaran dan alat belajar AI di TugasMu.",
    "url": "https://tugasmu.com/redaksi",
    "mainEntity": {
      "@type": "Organization",
      "name": "TugasMu",
      "url": "https://tugasmu.com",
      "member": EDITORS.map(editor => ({
        "@type": "Person",
        "name": editor.name,
        "jobTitle": editor.role,
        "description": editor.bio,
        "alumniOf": editor.education,
        "knowsAbout": editor.subjects
      }))
    }
  };

  return (
    <div className="container py-12 md:py-16 max-w-4xl mx-auto px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 flex items-center space-x-2">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Tim Redaksi</span>
      </nav>

      {/* Header Section */}
      <div className="mb-12 border-b border-slate-200 pb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 inline-block mb-3">
          Prinsip E-E-A-T & Kredibilitas Akademik
        </span>
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-4 tracking-tight">
          Dewan Redaksi & Kurasi Materi
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Setiap panduan belajar, rumus matematika, dan ringkasan kurikulum di TugasMu dikurasi dan ditinjau secara ketat oleh pendidik profesional dan akademisi berpengalaman untuk memastikan informasi yang akurat, mutakhir, dan bebas miskonsepsi.
        </p>
      </div>

      {/* 3-Tier Review Process */}
      <section className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100">
        <h2 className="text-xl font-heading font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span className="text-sky-600">🛡️</span>
          Proses Kurasi & Verifikasi Fakta 3 Lapis
        </h2>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Kami menjamin seluruh konten tidak hanya dibuat berbasis kecerdasan buatan, melainkan melalui supervisi manusia yang komprehensif:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm mb-2">1</div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Riset Standar BSKAP</h3>
            <p className="text-xs text-slate-600">Materi disesuaikan dengan Capaian Pembelajaran resmi Kemendikbudristek dan buku teks rujukan utama.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm mb-2">2</div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Uji Validasi Eksakta</h3>
            <p className="text-xs text-slate-600">Setiap formula matematika, reaksi kimia, dan kaidah ejaan diuji secara independen baris demi baris.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm mb-2">3</div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Audit Miskonsepsi</h3>
            <p className="text-xs text-slate-600">Pemberian peringatan miskonsepsi umum agar siswa terhindar dari kekeliruan konsep fundamental.</p>
          </div>
        </div>
      </section>

      {/* Editor Profiles */}
      <section className="mb-14">
        <h2 className="text-2xl font-heading font-bold text-slate-900 mb-8 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-sky-600 rounded-full inline-block"></span>
          Daftar Kurator & Reviewer Ahli
        </h2>
        <div className="space-y-6">
          {EDITORS.map((editor) => (
            <div
              key={editor.name}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-sky-300 transition-all flex flex-col sm:flex-row items-start gap-5"
            >
              <div className={`w-14 h-14 rounded-2xl ${editor.color} text-white font-heading font-bold text-xl flex items-center justify-center shrink-0 shadow-sm`}>
                {editor.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="text-lg font-heading font-bold text-slate-900">
                    {editor.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                    Reviewer Terverifikasi
                  </span>
                </div>
                <div className="text-xs font-semibold text-sky-600 mb-2">
                  {editor.role}
                </div>
                <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                  {editor.bio}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-700">Pendidikan:</span> {editor.education}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Bidang Keahlian:</span> {editor.subjects}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Policy Link CTA */}
      <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-bold text-slate-900 text-base">Ingin mempelajari standar penyusunan konten kami?</h3>
          <p className="text-xs text-slate-600 mt-1">Baca pedoman etika penggunaan AI dan standar integritas akademik TugasMu.</p>
        </div>
        <Link
          href="/kebijakan-editorial"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
        >
          <span>Kebijakan Editorial</span>
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}

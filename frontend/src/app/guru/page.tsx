import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Program Guru Kontributor',
  description: 'Bergabunglah menjadi Guru Kontributor di TugasMu dan bantu ribuan siswa Indonesia belajar dengan konten yang kredibel.',
};

export default function GuruHubPage() {
  return (
    <div className="container py-12 md:py-20 max-w-4xl">
      <div className="text-center mb-16">
        <span className="bg-sky-100 text-sky-800 text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4">
          Segera Hadir
        </span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
          Bantu Ribuan Siswa Belajar,<br className="hidden md:block" /> Jadilah Guru Kontributor
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          TugasMu sedang membangun ekosistem di mana konten pendidikan divalidasi langsung oleh ahlinya. Bagikan soal latihan, modul, dan tips belajar buatan Anda sendiri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white border rounded-2xl p-6 text-center shadow-sm">
          <div className="text-4xl mb-4">🌟</div>
          <h3 className="font-heading font-bold text-lg mb-2">Dampak Luas</h3>
          <p className="text-sm text-slate-600">Konten Anda akan diakses oleh ribuan siswa dari seluruh Indonesia yang membutuhkan bahan belajar berkualitas.</p>
        </div>
        <div className="bg-white border rounded-2xl p-6 text-center shadow-sm">
          <div className="text-4xl mb-4">🏅</div>
          <h3 className="font-heading font-bold text-lg mb-2">Profil Terverifikasi</h3>
          <p className="text-sm text-slate-600">Dapatkan halaman profil publik khusus yang menampilkan karya dan dedikasi Anda sebagai pendidik.</p>
        </div>
        <div className="bg-white border rounded-2xl p-6 text-center shadow-sm">
          <div className="text-4xl mb-4">🎁</div>
          <h3 className="font-heading font-bold text-lg mb-2">Akses Premium</h3>
          <p className="text-sm text-slate-600">Guru kontributor aktif akan mendapatkan akses gratis ke semua fitur premium TugasMu selamanya.</p>
        </div>
      </div>

      <div className="bg-sky-50 border border-sky-100 rounded-2xl p-8 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Tertarik Bergabung?</h2>
        <p className="text-slate-600 mb-6">
          Program Guru Kontributor saat ini sedang dalam tahap pengembangan. Tinggalkan email Anda, dan kami akan menghubungi Anda saat program ini resmi dibuka.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Alamat Email Anda" 
            className="flex-1 rounded-lg border-slate-300 border p-3 focus:ring-sky-500 focus:border-sky-500"
            required
          />
          <button type="submit" className="bg-sky-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors whitespace-nowrap">
            Kabari Saya
          </button>
        </form>
      </div>
    </div>
  );
}

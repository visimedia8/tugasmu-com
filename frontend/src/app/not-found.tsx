import Link from 'next/link';

export const metadata = {
  title: 'Halaman Tidak Ditemukan | TugasMu',
  description: 'Maaf, halaman yang kamu cari tidak dapat ditemukan.',
};

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] py-16 text-center">
      <h1 className="text-8xl font-heading font-black text-slate-200 mb-6">404</h1>
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Waduh, Kesasar Ya?</h2>
      <p className="text-lg text-slate-600 max-w-md mx-auto mb-8">
        Halaman yang kamu cari mungkin sudah dihapus, dipindahkan, atau memang tidak pernah ada.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="bg-sky-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-sky-700 transition-colors"
        >
          Kembali ke Beranda
        </Link>
        <Link 
          href="/tools" 
          className="bg-white border-2 border-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors"
        >
          Jelajahi Tools AI
        </Link>
      </div>
    </div>
  );
}

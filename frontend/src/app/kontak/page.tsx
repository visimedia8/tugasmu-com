
export const metadata = {
  title: 'Kontak',
  description: 'Hubungi tim TugasMu untuk pertanyaan, saran, atau laporan masalah.',
  alternates: { canonical: '/kontak' },
};

export default function KontakPage() {
  return (
    <div className="container py-12 md:py-20 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-heading font-bold text-slate-900 mb-6">Hubungi Kami</h1>
          <p className="text-slate-600 mb-8 text-lg">
            Ada pertanyaan, masalah, atau ingin memberi saran fitur baru? Jangan ragu untuk menghubungi kami.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-slate-900">Email</h3>
              <p className="text-slate-600">support@tugasmu.com</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Waktu Operasional</h3>
              <p className="text-slate-600">Senin - Jumat: 09:00 - 17:00 WIB</p>
              <p className="text-sm text-slate-500 mt-1">Kami berusaha membalas pesanmu dalam 1-2 hari kerja.</p>
            </div>
            <div className="pt-6 border-t">
              <h3 className="font-bold text-slate-900 mb-2">Untuk Kemitraan & Media</h3>
              <p className="text-slate-600">
                Tertarik bekerja sama atau meliput TugasMu? Email kami di <span className="font-medium">partners@tugasmu.com</span>.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-heading font-bold mb-6">Kirim Pesan</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
              <input type="text" id="name" className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-sky-500 focus:border-sky-500" placeholder="Cth: Budi Santoso" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" id="email" className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-sky-500 focus:border-sky-500" placeholder="budi@example.com" required />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subjek</label>
              <select id="subject" className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-sky-500 focus:border-sky-500">
                <option>Pertanyaan Umum</option>
                <option>Laporan Bug / Error</option>
                <option>Saran Fitur Baru</option>
                <option>Pertanyaan Guru Kontributor</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Pesan</label>
              <textarea id="message" rows={4} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-sky-500 focus:border-sky-500" placeholder="Tulis pesanmu di sini..." required></textarea>
            </div>
            <button type="submit" className="w-full bg-sky-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors">
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

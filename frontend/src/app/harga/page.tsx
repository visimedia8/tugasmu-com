import PricingClient from './PricingClient';

export const metadata = {
  title: 'Harga & Paket Berlangganan',
  description: 'Pilih paket berlangganan TugasMu AI untuk akses fitur premium tanpa batas.',
};

export default function HargaPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-heading tracking-tight">
          Investasi Kecil untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Masa Depan</span>
        </h1>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
          Mulai dari gratis selamanya, atau upgrade ke Pro untuk fitur tanpa batas. Batalkan kapan saja tanpa syarat.
        </p>
      </div>

      <PricingClient />

      <div className="max-w-3xl mx-auto px-4 mt-20 text-center">
        <h4 className="text-lg font-bold text-slate-900 mb-4">Pembayaran Aman & Mudah</h4>
        <p className="text-sm text-slate-500 mb-6">Mendukung GoPay, OVO, Dana, ShopeePay, QRIS, Virtual Account, dan Kartu Kredit.</p>
        <div className="flex justify-center items-center gap-4 flex-wrap opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
          {/* eslint-disable @next/next/no-img-element */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_Dana.png/640px-Logo_Dana.png" alt="Dana" className="h-6 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Gen_QRIS_logo.svg/1024px-Gen_QRIS_logo.svg.png" alt="QRIS" className="h-6 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png" alt="GoPay" className="h-6 object-contain" />
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PricingClient() {
  const { data: session } = useSession();
  const isSignedIn = !!session;
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (tier: string) => {
    if (!isSignedIn) {
      router.push('/masuk');
      return;
    }

    setLoading(tier);
    try {
      // 1. Dapatkan token JWT internal untuk backend Hono
      const tokenRes = await fetch('/api/auth/token');
      const tokenData = await tokenRes.json();
      
      if (!tokenData.token) {
        alert('Gagal mendapatkan akses token. Silakan login ulang.');
        setLoading(null);
        return;
      }

      // 2. Buat transaksi Duitku di Backend
      const res = await fetch('/api/payment/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify({ tier })
      });

      const data = await res.json();
      if (!data.success) {
        alert('Gagal membuat transaksi: ' + (data.message || 'Error tidak diketahui'));
        setLoading(null);
        return;
      }

      // 3. Redirect ke Duitku Payment URL
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert('Gagal mendapatkan URL pembayaran Duitku.');
        setLoading(null);
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan sistem.');
      setLoading(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4 mt-8">
        
        {/* Free Tier */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Gratis</h3>
          <p className="text-slate-500 mb-6 text-sm">Coba fitur dasar TugasMu selamanya.</p>
          <div className="text-4xl font-black text-slate-900 mb-8">Rp 0<span className="text-base font-normal text-slate-500">/bulan</span></div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex gap-3 text-slate-700 text-sm"><span className="text-sky-500">✓</span> 20x generate per hari</li>
            <li className="flex gap-3 text-slate-700 text-sm"><span className="text-sky-500">✓</span> Input teks s/d 2.000 karakter</li>
            <li className="flex gap-3 text-slate-700 text-sm"><span className="text-sky-500">✓</span> Semua mode bahasa</li>
          </ul>
          
          <button 
            onClick={() => !isSignedIn && router.push('/masuk')}
            disabled={isSignedIn}
            className={`w-full py-3 px-4 rounded-xl font-semibold ${
              isSignedIn 
                ? 'bg-slate-100 text-slate-500 cursor-not-allowed' 
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors'
            }`}
          >
            {isSignedIn ? 'Plan Saat Ini' : 'Daftar Gratis'}
          </button>
        </div>

        {/* Pro Tier */}
        <div className="bg-sky-50 rounded-3xl p-8 border-2 border-sky-500 shadow-lg relative flex flex-col transform md:-translate-y-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Paling Populer
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Pro Pelajar</h3>
          <p className="text-slate-500 mb-6 text-sm">Untuk kamu yang ambis dan butuh bantuan penuh.</p>
          <div className="text-4xl font-black text-slate-900 mb-8">Rp 29rb<span className="text-base font-normal text-slate-500">/bulan</span></div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex gap-3 text-slate-700 text-sm font-semibold"><span className="text-sky-500">✓</span> 500x generate per hari (lebih dari cukup)</li>
            <li className="flex gap-3 text-slate-700 text-sm"><span className="text-sky-500">✓</span> Input teks s/d 5.000 karakter</li>
            <li className="flex gap-3 text-slate-700 text-sm"><span className="text-sky-500">✓</span> Hasil lebih cepat (Prioritas Server)</li>
          </ul>
          
          <button 
            onClick={() => handleCheckout('pro')}
            disabled={loading === 'pro'}
            className="w-full py-3 px-4 rounded-xl font-semibold bg-sky-500 text-white hover:bg-sky-600 transition-colors shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading === 'pro' && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            Pilih Pro
          </button>
        </div>

        {/* Guru Tier */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Guru / Tutor</h3>
          <p className="text-slate-500 mb-6 text-sm">Cocok untuk guru pengajar, bimbel, dan sekolah.</p>
          <div className="text-4xl font-black text-slate-900 mb-8">Rp 99rb<span className="text-base font-normal text-slate-500">/bulan</span></div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex gap-3 text-slate-700 text-sm font-semibold"><span className="text-sky-500">✓</span> Semua fitur Pro Pelajar</li>
            <li className="flex gap-3 text-slate-700 text-sm"><span className="text-sky-500">✓</span> Fitur &quot;Kelas&quot; (Segera Hadir)</li>
            <li className="flex gap-3 text-slate-700 text-sm"><span className="text-sky-500">✓</span> Kelola tugas murid otomatis</li>
            <li className="flex gap-3 text-slate-700 text-sm"><span className="text-sky-500">✓</span> Export hasil ke PDF/Word</li>
          </ul>
          
          <button 
            onClick={() => handleCheckout('guru')}
            disabled={loading === 'guru'}
            className="w-full py-3 px-4 rounded-xl font-semibold bg-white border border-sky-500 text-sky-600 hover:bg-sky-50 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading === 'guru' && <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>}
            Pilih Guru
          </button>
        </div>

      </div>
    </>
  );
}

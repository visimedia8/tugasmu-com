'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function MasukPage() {
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    await signIn('google', { callbackUrl: '/tools' })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 max-w-sm w-full flex flex-col items-center gap-6 relative overflow-hidden">
        
        <div className="w-14 h-14 rounded-2xl bg-brand-navy flex items-center justify-center shadow-sm">
          <svg className="w-8 h-8 fill-brand-cream" viewBox="0 0 24 24">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Selamat Datang di TugasMu</h1>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Masuk sekarang untuk mendapatkan <strong className="text-slate-700">20x akses gratis</strong> setiap harinya.
          </p>
        </div>

        <div className="w-full mt-2">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mb-3"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            {loading ? 'Menyiapkan...' : 'Lanjutkan dengan Google'}
          </button>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs">Atau</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const formData = new FormData(e.currentTarget);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            
            const res = await signIn('credentials', { email, password, redirect: false });
            if (res?.error) {
              alert("Email atau password salah");
              setLoading(false);
            } else {
              window.location.href = '/tools';
            }
          }} className="flex flex-col gap-3">
            <input type="email" name="email" placeholder="Email" required className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
            <input type="password" name="password" placeholder="Password" required className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-slate-900 border border-slate-900 text-white font-semibold py-3 px-4 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Masuk dengan Email
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm text-slate-500">
            Belum punya akun? <a href="/daftar" className="text-sky-600 font-semibold hover:underline">Daftar di sini</a>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center mt-4">
          Dengan masuk, kamu menyetujui <a href="/syarat" className="underline hover:text-slate-600">Syarat & Ketentuan</a> serta <a href="/privasi" className="underline hover:text-slate-600">Kebijakan Privasi</a> TugasMu.
        </p>
      </div>
    </div>
  )
}

'use client'
import { signIn } from 'next-auth/react'

export default function DaftarPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 max-w-sm w-full flex flex-col items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center text-white text-2xl">⚡</div>
        <h1 className="text-2xl font-bold text-slate-900 text-center">Masuk ke TugasMu</h1>
        <p className="text-slate-500 text-sm text-center">Daftar/masuk gratis. Dapatkan 20x generate per hari.</p>
        <button
          onClick={() => signIn('google', { callbackUrl: '/tools' })}
          className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors font-semibold text-slate-700"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Lanjutkan dengan Google
        </button>
      </div>
    </div>
  )
}

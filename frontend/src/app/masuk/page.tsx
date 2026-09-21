'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function MasukPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await signIn('credentials', {
      email,
      name: name || 'Tester',
      callbackUrl: '/tools'
    })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 max-w-sm w-full flex flex-col items-center gap-6 relative overflow-hidden">
        
        {/* Development Badge */}
        <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
          Dev Bypass
        </div>

        <div className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center text-white text-2xl">⚡</div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Masuk ke TugasMu</h1>
          <p className="text-slate-500 text-sm mt-1">Daftar/masuk gratis. Dapatkan 20x generate per hari.</p>
        </div>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama (Opsional)</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Dummy</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tester@tugasmu.com"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors font-semibold disabled:opacity-70"
          >
            {loading ? 'Masuk...' : 'Masuk Instan (Bypass)'}
          </button>
        </form>
      </div>
    </div>
  )
}

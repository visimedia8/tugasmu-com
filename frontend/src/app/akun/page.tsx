'use client'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AkunPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<{ tier: string; used: number; limit: number } | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/masuk')
  }, [status, router])

  useEffect(() => {
    if (session) {
      // Fetch user info from backend
      fetch('/api/auth/token')
        .then(r => r.json())
        .then(data => {
            if (data.token) {
                return fetch('/api/user/me', {
                    headers: { 'Authorization': `Bearer ${data.token}` }
                })
            }
        })
        .then(r => r && r.json())
        .then(data => data && setUserInfo(data.user))
        .catch(() => {})
    }
  }, [session])

  if (status === 'loading') return <div className="flex justify-center py-20">Memuat...</div>
  
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <img src={session?.user?.image ?? 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt="" className="w-16 h-16 rounded-full border-2 border-sky-200" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">{session?.user?.name}</h1>
              <p className="text-slate-500 text-sm">{session?.user?.email}</p>
            </div>
          </div>

          <div className="bg-sky-50 rounded-2xl p-5">
            <p className="text-sm text-slate-600 font-medium">Paket Kamu</p>
            <p className="text-2xl font-black text-sky-600 capitalize">{userInfo?.tier ?? 'Free'}</p>
          </div>

          <div className="flex gap-3">
            <a href="/harga" className="flex-1 py-3 rounded-xl bg-sky-500 text-white text-center font-semibold text-sm hover:bg-sky-600 transition-colors">
              Upgrade Paket
            </a>
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

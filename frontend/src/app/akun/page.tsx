/* eslint-disable @next/next/no-img-element */
'use client'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AkunPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<{ tier: string; used: number; limit: number } | null>(null)
  const [creditBalance, setCreditBalance] = useState<number | null>(null)
  const [buyingBundle, setBuyingBundle] = useState<string | null>(null)
  
  const [referralData, setReferralData] = useState<{ code: string; link: string; bonusPerDay: number; successfulReferrals: number } | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/masuk')
  }, [status, router])

  useEffect(() => {
    if (session) {
      // Fetch user info from backend
      fetch('/api/auth/token')
        .then(r => r.json())
        .then(async data => {
            if (data.token) {
                const headers = { 'Authorization': `Bearer ${data.token}` }
                
                // Get user info
                fetch('/api/user/me', { headers })
                  .then(r => r.json())
                  .then(d => d && setUserInfo(d.user))
                  .catch(() => {})
                  
                // Get credit balance
                fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/credits/balance`, { headers })
                  .then(r => r.json())
                  .then(d => d.success && setCreditBalance(d.balance))
                  .catch(() => {})
                  
                // Get referral code
                fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/referral/my-code`, { headers })
                  .then(r => r.json())
                  .then(d => d.success && setReferralData(d))
                  .catch(() => {})
            }
        })
        .catch(() => {})
    }
  }, [session])

  const handleBuyCredit = async (bundle: 'starter' | 'value' | 'semester') => {
    setBuyingBundle(bundle)
    try {
      const tokenRes = await fetch('/api/auth/token')
      const { token } = await tokenRes.json()
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/credits/buy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ bundle })
      })
      const data = await res.json()
      if (data.paymentUrl) window.location.href = data.paymentUrl
      else alert('Gagal: ' + (data.message ?? 'Error'))
    } catch { 
      alert('Terjadi kesalahan sistem') 
    } finally { 
      setBuyingBundle(null) 
    }
  }

  const copyReferral = () => {
    if (referralData?.link) {
      navigator.clipboard.writeText(referralData.link)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  if (status === 'loading') return <div className="flex justify-center py-20">Memuat...</div>
  
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <img src={session?.user?.image ?? 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt="" className="w-16 h-16 rounded-full border-2 border-sky-200" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">{session?.user?.name}</h1>
              <p className="text-slate-500 text-sm">{session?.user?.email}</p>
            </div>
          </div>

          {/* Paket */}
          <div className="bg-sky-50 rounded-2xl p-5">
            <p className="text-sm text-slate-600 font-medium">Paket Kamu</p>
            <p className="text-2xl font-black text-sky-600 capitalize">{userInfo?.tier ?? 'Free'}</p>
          </div>
          
          {/* Kredit */}
          <div className="border-t border-slate-100 pt-6">
            <div className="mb-4">
              <p className="text-sm text-slate-600 font-medium">Saldo Kredit</p>
              <p className="text-3xl font-black text-slate-800">
                {creditBalance !== null ? creditBalance : '...'} <span className="text-base font-normal text-slate-500">Kredit</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">1 Kredit = 1x pakai tools (berlaku 1 tahun)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button 
                onClick={() => handleBuyCredit('starter')}
                disabled={buyingBundle !== null}
                className="py-3 px-4 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-colors text-left flex flex-col relative"
              >
                <span className="text-xs text-slate-500">Starter</span>
                <span className="font-bold text-slate-800">150 Kredit</span>
                <span className="text-sm text-sky-600 mt-1">Rp 10.000</span>
                {buyingBundle === 'starter' && <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-xl"><div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div></div>}
              </button>
              
              <button 
                onClick={() => handleBuyCredit('value')}
                disabled={buyingBundle !== null}
                className="py-3 px-4 rounded-xl border-2 border-sky-500 bg-sky-50 transition-colors text-left flex flex-col relative"
              >
                <span className="text-xs text-sky-600 font-semibold absolute top-0 right-0 bg-sky-100 px-2 py-0.5 rounded-bl-lg rounded-tr-lg">Populer</span>
                <span className="text-xs text-slate-500">Value</span>
                <span className="font-bold text-slate-800">350 Kredit</span>
                <span className="text-sm text-sky-600 mt-1">Rp 19.000</span>
                {buyingBundle === 'value' && <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-xl"><div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div></div>}
              </button>
              
              <button 
                onClick={() => handleBuyCredit('semester')}
                disabled={buyingBundle !== null}
                className="py-3 px-4 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-colors text-left flex flex-col relative"
              >
                <span className="text-xs text-slate-500">Semester</span>
                <span className="font-bold text-slate-800">700 Kredit</span>
                <span className="text-sm text-sky-600 mt-1">Rp 35.000</span>
                {buyingBundle === 'semester' && <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-xl"><div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div></div>}
              </button>
            </div>
          </div>
          
          {/* Referral */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Ajak Teman, Dapat Bonus! 🎁</h3>
            <p className="text-sm text-slate-600 mb-4">Setiap 1 teman yang daftar pakai link kamu, kamu dapat <span className="font-semibold text-green-600">+5 kuota gratis setiap hari</span> secara permanen.</p>
            
            {referralData ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <input type="text" readOnly value={referralData.link} className="flex-1 bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-600 outline-none" />
                  <button onClick={copyReferral} className="px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors shrink-0">
                    {isCopied ? 'Dicopy!' : 'Copy'}
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <a href={`https://wa.me/?text=Aku%20lagi%20pakai%20TugasMu%20AI%20buat%20bantu%20nugas,%20gampang%20banget%20dan%20gratis!%20Cobain%20deh%20lewat%20link%20ini:%20${referralData.link}`} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[120px] text-center py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
                    Share ke WA
                  </a>
                </div>
                
                <div className="flex gap-4 border-t border-slate-200 pt-3">
                  <div>
                    <p className="text-xs text-slate-500">Teman Bergabung</p>
                    <p className="text-lg font-bold text-slate-800">{referralData.successfulReferrals} <span className="text-sm font-normal text-slate-500">orang</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Bonus Kuotamu</p>
                    <p className="text-lg font-bold text-green-600">+{referralData.bonusPerDay} <span className="text-sm font-normal text-slate-500">req/hari</span></p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-pulse bg-slate-100 h-32 rounded-xl"></div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <a href="/harga" className="flex-1 py-3 rounded-xl bg-sky-500 text-white text-center font-semibold text-sm hover:bg-sky-600 transition-colors">
              Upgrade Pro Bulanan
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

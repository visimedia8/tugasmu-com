/* eslint-disable @next/next/no-img-element */
'use client'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function AkunPage() {
  const { data: session, status } = useSession()
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://api.tugasmu.com";
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<{user?: {tier: string, name?: string, jenjang_default?: string, kelas_default?: string}, quota?: {limit: number}} | null>(null)
  const [creditBalance, setCreditBalance] = useState<number | null>(null)
  const [buyingBundle, setBuyingBundle] = useState<string | null>(null)
  
  const [referralData, setReferralData] = useState<{ code: string; link: string; bonusPerDay: number; successfulReferrals: number } | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  // Profile Form States
  const [name, setName] = useState('')
  const [jenjang, setJenjang] = useState('')
  const [kelas, setKelas] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)
  const [profileMessage, setProfileMessage] = useState('')

  const [deletingAccount, setDeletingAccount] = useState(false)

  const handleDeleteAccount = async () => {
    if(!confirm("Anda yakin ingin menghapus akun? Semua kredit dan langganan akan hangus.")) return;
    setDeletingAccount(true)
    try {
      const tokenRes = await fetch("/api/auth/token")
      const tokenData = await tokenRes.json()
      const token = tokenData.token
      
      const res = await fetch(`${apiBase}/api/user/me`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      })
      
      if(res.ok) {
        alert("Akun berhasil dihapus.");
        signOut({ callbackUrl: "/" });
      } else {
        alert("Gagal menghapus akun.");
      }
    } catch {
      alert("Terjadi kesalahan.");
    } finally {
      setDeletingAccount(false)
    }
  }


  useEffect(() => {
    if (status === 'unauthenticated') { alert('Sesi kamu telah berakhir. Mengalihkan ke halaman masuk...'); router.push('/masuk'); }
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
                fetch(`${apiBase}/api/user/me`, { headers })
                  .then(r => r.json())
                  .then(res => {
                    if (res.success) {
                      setUserInfo(res)
                      setName(res.user?.name || session.user?.name || '')
                      setJenjang(res.user?.jenjang_default || '')
                      setKelas(res.user?.kelas_default || '')
                    }
                  })

                // Get Credits
                fetch(`${apiBase}/api/credits`, { headers })
                  .then(r => r.json())
                  .then(res => setCreditBalance(res.balance ?? 0))
                  
                // Get Referral
                fetch(`${apiBase}/api/referral`, { headers })
                  .then(r => r.json())
                  .then(res => {
                    if (res.success) setReferralData(res.data)
                  })
            }
        })
    }
  }, [session])

  const handleBuyCredit = async (bundle: string) => {
    setBuyingBundle(bundle)
    try {
      const tokenRes = await fetch('/api/auth/token')
      const tokenData = await tokenRes.json()
      const token = tokenData.token
      
      const res = await fetch(`${apiBase}/api/payment/create-transaction`, {
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

  const saveProfile = async () => {
    setSavingProfile(true)
    setProfileMessage('')
    try {
      const tokenRes = await fetch('/api/auth/token')
      const tokenData = await tokenRes.json()
      const token = tokenData.token

      const res = await fetch(`${apiBase}/api/user/preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name, jenjang_default: jenjang, kelas_default: kelas })
      })
      if (res.ok) {
        setProfileMessage('Profil berhasil disimpan!')
      } else {
        setProfileMessage('Gagal menyimpan profil.')
      }
    } catch {
      setProfileMessage('Terjadi kesalahan.')
    } finally {
      setSavingProfile(false)
      setTimeout(() => setProfileMessage(''), 3000)
    }
  }

  if (status === 'loading') return <div className="flex justify-center py-20">Memuat...</div>
  if (!session) return null
  
  
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Pengaturan Akun</h1>
          <p className="text-slate-500 mt-1">Kelola preferensi, tagihan, dan keamanan akun kamu di sini.</p>
        </div>

        <Tabs defaultValue="profil" className="w-full">
          <div className="flex overflow-x-auto pb-4 md:pb-0 mb-6">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-xl h-auto shrink-0 shadow-sm">
              <TabsTrigger value="profil" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-sky-50 data-[state=active]:text-sky-700 data-[state=active]:shadow-none font-medium">Profil & Preferensi</TabsTrigger>
              <TabsTrigger value="tagihan" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-sky-50 data-[state=active]:text-sky-700 data-[state=active]:shadow-none font-medium">Paket & Kredit</TabsTrigger>
              <TabsTrigger value="keamanan" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-red-50 data-[state=active]:text-red-700 data-[state=active]:shadow-none font-medium">Keamanan</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profil" className="mt-0 outline-none">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-6 mb-8">
                <img src={session?.user?.image ?? 'https://www.gravatar.com/avatar/0?d=mp'} alt="" className="w-20 h-20 rounded-full border-4 border-slate-100" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{name || session?.user?.name}</h2>
                  <p className="text-slate-500">{session?.user?.email}</p>
                  <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 capitalize">
                    Tier: {userInfo?.user?.tier ?? 'free'}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Pengaturan Default</h3>
                <p className="text-sm text-slate-500 mb-6">Isi data kelasmu agar otomatis terpilih saat menggunakan AI.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nama Panggilan</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Jenjang Pendidikan</label>
                    <select value={jenjang} onChange={(e) => setJenjang(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white">
                      <option value="">-- Pilih --</option>
                      <option value="SD">SD</option>
                      <option value="SMP">SMP</option>
                      <option value="SMA">SMA</option>
                      <option value="SMK">SMK</option>
                      <option value="Kuliah">Kuliah (Mahasiswa)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Kelas / Semester</label>
                    <input type="text" value={kelas} onChange={(e) => setKelas(e.target.value)} placeholder="Contoh: 12 IPA 2" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <Button onClick={saveProfile} disabled={savingProfile} className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-xl">
                    {savingProfile ? 'Menyimpan...' : 'Simpan Profil'}
                  </Button>
                  {profileMessage && <span className="text-sm text-green-600 font-medium">{profileMessage}</span>}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tagihan" className="mt-0 outline-none">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col gap-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kuota Bulanan/Harian */}
                <div className="bg-sky-50 rounded-2xl p-6">
                  <p className="text-sm text-slate-600 font-medium">Status Langganan</p>
                  <p className="text-3xl font-black text-sky-600 capitalize mt-1 mb-2">{userInfo?.user?.tier ?? 'Free'}</p>
                  <div className="bg-white/60 rounded-xl p-3 mt-4">
                    <p className="text-xs text-slate-500">Batas Kuota Harian</p>
                    <p className="text-sm font-bold text-slate-800">{userInfo?.quota?.limit ?? 20} requests / hari</p>
                  </div>
                </div>
                
                {/* Saldo Kredit */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                  <p className="text-sm text-slate-600 font-medium">Saldo Kredit Permanen</p>
                  <p className="text-3xl font-black text-slate-800 mt-1 mb-2">
                    {creditBalance !== null ? creditBalance : '...'} <span className="text-base font-normal text-slate-500">Kredit</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                    1 Kredit = 1x pakai tools (tidak hangus).<br/>Kredit akan terpakai jika kuota harian habis.
                  </p>
                </div>
              </div>

              {/* Beli Kredit Bundles */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Beli Tambahan Kredit</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => handleBuyCredit('starter')} disabled={buyingBundle !== null} className="p-5 rounded-2xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-colors text-left relative group">
                    <span className="block text-sm text-slate-500 mb-1">Starter</span>
                    <span className="block text-xl font-bold text-slate-800 mb-2">150 Kredit</span>
                    <span className="block text-base text-sky-600 font-semibold">Rp 10.000</span>
                    {buyingBundle === 'starter' && <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl"><div className="w-5 h-5 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div></div>}
                  </button>
                  
                  <button onClick={() => handleBuyCredit('value')} disabled={buyingBundle !== null} className="p-5 rounded-2xl border-2 border-sky-500 bg-sky-50 transition-colors text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-sky-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">POPULER</div>
                    <span className="block text-sm text-sky-700 mb-1">Value</span>
                    <span className="block text-xl font-bold text-slate-800 mb-2">350 Kredit</span>
                    <span className="block text-base text-sky-600 font-semibold">Rp 19.000</span>
                    {buyingBundle === 'value' && <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl"><div className="w-5 h-5 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div></div>}
                  </button>
                  
                  <button onClick={() => handleBuyCredit('semester')} disabled={buyingBundle !== null} className="p-5 rounded-2xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-colors text-left relative">
                    <span className="block text-sm text-slate-500 mb-1">Semester</span>
                    <span className="block text-xl font-bold text-slate-800 mb-2">700 Kredit</span>
                    <span className="block text-base text-sky-600 font-semibold">Rp 35.000</span>
                    {buyingBundle === 'semester' && <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl"><div className="w-5 h-5 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div></div>}
                  </button>
                </div>
              </div>

              
                {/* Manual Transfer Notice */}
                <div className="mt-8 bg-sky-50 border border-sky-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-sky-600 text-3xl">account_balance</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Pembayaran Transfer Bank (Manual)</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Sistem pembayaran otomatis (Duitku) kami sedang dalam proses aktivasi. Untuk sementara, kamu bisa melakukan 
                        pembelian Paket atau Kredit dengan transfer manual ke rekening berikut:
                      </p>
                      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Bank Jago</p>
                          <p className="text-xl font-mono font-bold text-slate-800">102071668801</p>
                          <p className="text-sm text-slate-600 font-medium">a.n. Johan Martino Anggo</p>
                        </div>
                        <a href="https://wa.me/6289675491214?text=Halo%20Admin%20TugasMu,%20saya%20sudah%20transfer%20untuk%20pembelian%20kredit/paket." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors text-sm">
                          <span className="material-symbols-outlined text-sm">chat</span>
                          Konfirmasi via WA
                        </a>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Referral */}
              <div className="border-t border-slate-100 pt-8">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Ajak Teman, Dapat Bonus! 🎁</h3>
                <p className="text-sm text-slate-600 mb-4">Setiap 1 teman yang daftar pakai link kamu, kamu dapat <span className="font-semibold text-green-600">+5 kuota gratis setiap hari</span> permanen.</p>
                
                {referralData ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <input type="text" readOnly value={referralData.link} className="flex-1 bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-sm text-slate-600 outline-none" />
                      <button onClick={copyReferral} className="px-5 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors shrink-0">
                        {isCopied ? 'Dicopy!' : 'Copy'}
                      </button>
                    </div>
                    
                    <div className="flex gap-6 border-t border-slate-200 pt-4 mt-2">
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Teman Bergabung</p>
                        <p className="text-xl font-bold text-slate-800">{referralData.successfulReferrals}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Bonus Kuotamu</p>
                        <p className="text-xl font-bold text-green-600">+{referralData.bonusPerDay}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-pulse bg-slate-100 h-32 rounded-xl max-w-xl"></div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="keamanan" className="mt-0 outline-none">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 border-t-4 border-t-red-500">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Zona Berbahaya</h2>
              <p className="text-sm text-slate-500 mb-8">Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan.</p>
              
              <div className="flex items-center justify-between py-4 border-t border-slate-100">
                <div>
                  <h3 className="font-semibold text-slate-800">Hapus Akun</h3>
                  <p className="text-sm text-slate-500 mt-1">Hapus semua data pribadi, riwayat, dan sisa saldo secara permanen.</p>
                </div>
                <Dialog>
                  <DialogTrigger>
                    <div className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md inline-flex items-center justify-center">Hapus Akun Saya</div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apakah kamu yakin?</DialogTitle>
                      <DialogDescription>
                        Tindakan ini tidak bisa dibatalkan. Semua sisa saldo kredit, histori tagihan, dan data pribadi akan dihapus permanen dari server kami.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                      <Button variant="outline" className="mr-2">Batal</Button>
                      <Button variant="destructive" disabled={deletingAccount} onClick={handleDeleteAccount}>{deletingAccount ? "Menghapus..." : "Ya, Hapus Permanen"}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

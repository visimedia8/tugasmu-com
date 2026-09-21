import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolGeneratorSoal = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolGeneratorSoal.use('*', authMiddleware)

toolGeneratorSoal.post('/', async (c) => {
  try {
    const authUser = c.get('authUser')
    const rateLimitResult = await checkRateLimit(c.env, c.req.raw, authUser)
    if (!rateLimitResult.allowed) {
      return c.json({
        success: false,
        code: 'RATE_LIMITED',
        message: authUser 
          ? `Batas harian kamu (${rateLimitResult.limit}x) sudah habis. Upgrade ke Pro untuk unlimited!` 
          : 'Kamu sudah memakai 3 tools hari ini. Daftar akun gratis untuk 20x/hari.',
        used: rateLimitResult.used,
        limit: rateLimitResult.limit,
      }, 429)
    }

    const body = await c.req.json()
    const { jenjang, kelas, kurikulum, mata_pelajaran, topik, tipe_soal } = body

    if (!jenjang || !topik) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Data tidak lengkap' }, 400)
    }

    let detailTipe = '10 soal Pilihan Ganda (A,B,C,D)'
    if (tipe_soal === 'essay') detailTipe = '5 soal Essay'
    if (tipe_soal === 'campuran') detailTipe = '5 soal Pilihan Ganda dan 2 soal Essay'

    const systemPrompt = `Kamu adalah guru ${mata_pelajaran || 'Umum'} TugasMu yang ahli dalam membuat soal latihan berbobot untuk siswa Indonesia.
Konteks:
- Jenjang: ${jenjang} (${kelas ? `Kelas ${kelas}` : 'Semua kelas'})
- Kurikulum: ${kurikulum === 'merdeka' ? 'Kurikulum Merdeka' : 'Kurikulum 2013'}
- Topik Pembelajaran: ${topik}

Tugas: Buatlah ${detailTipe} berdasarkan topik di atas.
Aturan:
1. Pastikan tingkat kesulitan sesuai dengan jenjang ${jenjang} kelas ${kelas}.
2. Tuliskan soal dengan jelas dan tidak ambigu.
3. Setelah semua soal selesai, tuliskan KUNCI JAWABAN di bagian paling bawah. Untuk soal essay, berikan poin-poin jawaban yang diharapkan.`

    const userPrompt = `Buatkan soal tentang: ${topik}`
    
    const hasil = await callOpenRouter(systemPrompt, userPrompt, c.env)

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'generator-soal', { jenjang, kelas, kurikulum, mata_pelajaran })
    )

    return c.json({ success: true, data: { hasil } })

  } catch (err) {
    console.error('Generator Soal error:', err)
    return c.json({ 
      success: false, 
      code: 'AI_ERROR', 
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.' 
    }, 500)
  }
})

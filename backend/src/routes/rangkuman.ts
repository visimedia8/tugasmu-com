import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolRangkuman = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolRangkuman.use('*', authMiddleware)

toolRangkuman.post('/', async (c) => {
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
    const { jenjang, kelas, kurikulum, mata_pelajaran, input_text } = body

    if (!jenjang || !input_text) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Data tidak lengkap' }, 400)
    }

    const systemPrompt = `Kamu adalah asisten ahli ${mata_pelajaran || 'Umum'} TugasMu.
Konteks siswa:
- Jenjang: ${jenjang} (${kelas ? `Kelas ${kelas}` : 'Semua kelas'})
- Kurikulum: ${kurikulum === 'merdeka' ? 'Kurikulum Merdeka' : 'Kurikulum 2013'}

Tugas: Buat rangkuman dari teks materi berikut.
Aturan:
1. Buat 5-7 poin utama yang paling penting.
2. Jelaskan menggunakan bahasa yang mudah dipahami oleh siswa ${jenjang}.
3. Jika ada konsep sulit, berikan contoh singkat.
4. (Opsional) Buat tabel konsep di akhir jika materi mendukung untuk dibuat tabel perbandingan/klasifikasi.`

    const aiRes = await callOpenRouter(systemPrompt, input_text, c.env, { temperature: 0.5 })
    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'rangkuman', { jenjang, kelas, kurikulum, mata_pelajaran }, {
      model: aiRes.model,
      prompt_tokens: aiRes.usage.prompt_tokens,
      completion_tokens: aiRes.usage.completion_tokens
    })
    )

    return c.json({ success: true, data: { hasil } })

  } catch (err) {
    console.error('Rangkuman error:', err)
    return c.json({ 
      success: false, 
      code: 'AI_ERROR', 
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.' 
    }, 500)
  }
})

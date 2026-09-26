import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolMuhafazhah = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolMuhafazhah.use('*', authMiddleware)

toolMuhafazhah.post('/', async (c) => {
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
    const { materi, tingkat } = body

    if (!materi) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Masukkan kitab atau surat yang ingin dites.' }, 400) }

    const systemPrompt = `Kamu adalah Penguji Hafalan (Musyrif) di Pesantren Tahfidz/Kitab.\nMateri Ujian: ${materi}\nTingkat Kesulitan: ${tingkat || 'Sedang'}\n\nTugas: Buatkan 5 soal isian/sambung ayat/bait dari materi tersebut untuk mengetes hafalan santri.\n\nFormat Output WAJIB:\n# UJIAN HAFAZHAN: ${materi.toUpperCase()}\n\n## SOAL LATIHAN:\n1. (Tulis awalan ayat/bait) ..... (biarkan titik-titik untuk dijawab)\n2. (Soal 2)\n3. (Soal 3)\n4. (Soal 4)\n5. (Soal 5)\n\n---\n\n## KUNCI JAWABAN:\n1. (Lanjutan ayat/bait yang benar)\n(Seterusnya sampai 5)`

    const aiRes = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'muhafazhah', { materi }, {
      model: aiRes.model,
      prompt_tokens: aiRes.usage.prompt_tokens,
      completion_tokens: aiRes.usage.completion_tokens
    })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Generator Ujian Hafalan (Muhafazhah) error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

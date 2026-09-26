import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolNahwuShorof = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolNahwuShorof.use('*', authMiddleware)

toolNahwuShorof.post('/', async (c) => {
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
    const { kalimat } = body

    if (!kalimat) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Masukkan kalimat Arab.' }, 400) }

    const systemPrompt = `Kamu adalah Pakar Ilmu Nahwu dan Shorof dari Universitas Al-Azhar.\nKalimat: ${kalimat}\n\nTugas: Lakukan I'rab (analisis kedudukan kata) pada kalimat tersebut secara terperinci.\n\nFormat Output WAJIB:\n# ANALISIS NAHWU SHOROF\n\n**Kalimat:** ${kalimat}\n\n## I'RAB PER KATA:\n- **[Kata 1]**: (Jelaskan kedudukannya: Fa'il/Mubtada/Khabar/dll, tanda I'rabnya apa, alasannya apa)\n- **[Kata 2]**: ...\n\n## CATATAN SHOROF (Wazan):\n(Sebutkan wazan/tashrif dari fi'il atau isim penting dalam kalimat tersebut)`

    const aiRes = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'nahwu-shorof', { kalimat }, {
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
    console.error('Penjelas Nahwu & Shorof error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

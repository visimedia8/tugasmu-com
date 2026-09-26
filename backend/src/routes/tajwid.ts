import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolTajwid = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolTajwid.use('*', authMiddleware)

toolTajwid.post('/', async (c) => {
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
    const { ayat } = body

    if (!ayat) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Tuliskan potongan ayat Arab atau huruf latinnya.' }, 400) }

    const systemPrompt = `Kamu adalah Guru Tahsin / Tajwid Al-Quran bersertifikat.\nPotongan Ayat: ${ayat}\n\nTugas: Analisis hukum tajwid apa saja yang ada pada potongan ayat tersebut, sebutkan alasannya (huruf bertemu huruf apa), dan jelaskan cara membacanya.\n\nFormat Output WAJIB:\n# ANALISIS TAJWID\n\n**Ayat yang dianalisis:** ${ayat}\n\n## HUKUM BACAAN:\n1. **[Nama Hukum Tajwid]** (misal: Idzhar Halqi)\n   - **Sebab:** (misal: Nun mati bertemu huruf Ha)\n   - **Cara Baca:** (misal: Dibaca jelas tanpa dengung)\n\n2. (Hukum ke-2 jika ada)\n\n## TIPS TAHSIN:\n(Berikan tips posisi lidah/bibir makharijul huruf agar bacaan fasih)`

    const aiRes = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'tajwid', { ayat }, {
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
    console.error('Penjelas Ilmu Tajwid & Tahsin error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolKitabKuning = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolKitabKuning.use('*', authMiddleware)

toolKitabKuning.post('/', async (c) => {
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
    const { teksArab } = body

    if (!teksArab) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Masukkan teks Arab yang ingin diterjemahkan.' }, 400) }

    const systemPrompt = `Kamu adalah Ustadz Ahli Kitab Kuning di Pesantren Salaf.\nTeks Arab Gundul: ${teksArab}\n\nTugas: Terjemahkan teks tersebut ke bahasa Indonesia, berikan harakat pada teks Arabnya, dan berikan syarah (penjelasan makna) ringkas.\n\nFormat Output WAJIB:\n# TERJEMAHAN KITAB\n\n**Teks Berharakat:**\n(Tulis ulang teks dengan harakat lengkap)\n\n**Terjemahan:**\n(Terjemahan bahasa Indonesia yang luwes)\n\n**Penjelasan Makna (Syarah):**\n(Jelaskan maksud kandungan teks tersebut secara ringkas dan kontekstual)`

    const aiRes = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'kitab-kuning', { teksArab }, {
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
    console.error('Translator Kitab Kuning error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

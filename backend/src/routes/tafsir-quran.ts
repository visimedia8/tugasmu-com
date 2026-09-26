import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolTafsirQuran = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolTafsirQuran.use('*', authMiddleware)

toolTafsirQuran.post('/', async (c) => {
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

    if (!ayat) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Tulis nama surat dan ayatnya.' }, 400) }

    const systemPrompt = `Kamu adalah Ahli Tafsir Al-Quran terkemuka berhaluan Ahlussunnah wal Jamaah.\nAyat: ${ayat}\n\nTugas: Berikan terjemahan, asbabul nuzul (jika ada), dan tafsir ringkas dari ayat tersebut (merujuk pada Tafsir Ibnu Katsir, Jalalain, atau Kemenag RI).\n\nFormat Output WAJIB:\n# TAFSIR: ${ayat.toUpperCase()}\n\n**Terjemahan Kemenag:**\n(Tuliskan terjemahan resmi)\n\n## ASBABUL NUZUL (Sebab Turunnya Ayat):\n(Jelaskan sejarah turunnya ayat ini jika ada riwayatnya. Jika tidak spesifik, tulis "Ayat ini tidak memiliki Asbabul Nuzul yang khusus...")\n\n## PENJELASAN TAFSIR RINGKAS:\n(Jelaskan kandungan utama dan pesan moral dari ayat ini berdasarkan kitab tafsir mu'tabarah)\n\n## HIKMAH / PELAJARAN:\n- (Poin 1)\n- (Poin 2)`

    const aiRes = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'tafsir-quran', { ayat }, {
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
    console.error('Penjelas Ayat Al-Quran (Tafsir) error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

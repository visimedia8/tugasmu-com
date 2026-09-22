import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolPenjelasHadits = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolPenjelasHadits.use('*', authMiddleware)

toolPenjelasHadits.post('/', async (c) => {
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
    const { hadits } = body

    if (!hadits) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Tuliskan hadits atau kata kuncinya.' }, 400) }

    const systemPrompt = `Kamu adalah Ahli Hadits (Muhaddits) dan Pakar Syarah.\nHadits/Tema: ${hadits}\n\nTugas: Jelaskan derajat hadits (Shahih/Dhaif), konteks/asbabul wurud, dan syarah kandungannya.\n\nFormat Output WAJIB:\n# SYARAH HADITS\n\n**Matan & Terjemahan:**\n(Tulis redaksi hadits atau maknanya jika hanya diberi tema)\n\n**Derajat & Takhrij:**\n(Contoh: Hadits Shahih, diriwayatkan oleh Bukhari & Muslim)\n\n## PENJELASAN (SYARAH):\n(Jelaskan maksud hadits ini, konteks saat Nabi mengucapkannya, dan penjelasan ulama)\n\n## PELAJARAN (FIQhul Hadits):\n- (Poin pelajaran 1)\n- (Poin pelajaran 2)`

    const hasil = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'penjelas-hadits', { hadits })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Penjelas Hadits & Konteksnya error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

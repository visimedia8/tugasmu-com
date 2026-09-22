import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolCeritaPendek = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolCeritaPendek.use('*', authMiddleware)

toolCeritaPendek.post('/', async (c) => {
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
    const { tema, tokoh, gayaBahasa } = body

    if (!tema) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Tema cerita wajib diisi.' }, 400) }

    const systemPrompt = `Kamu adalah Penulis Buku Cerita Anak yang kreatif.\nTema Cerita: ${tema}\nTokoh Utama: ${tokoh || 'Aku'}\nGaya Bahasa: ${gayaBahasa || 'Buku Harian / Pengalaman Pribadi'}\n\nTugas: Buatkan cerita pendek (sekitar 3-4 paragraf) yang menarik, mendidik, dan menggunakan kosakata yang mudah dipahami anak SD/SMP.\n\nFormat Output WAJIB:\n# CERITA: [Buat Judul yang Menarik]\n\n[Tuliskan Paragraf 1: Pengenalan tokoh dan latar/tempat]\n\n[Tuliskan Paragraf 2 & 3: Konflik atau kejadian seru yang dialami tokoh]\n\n[Tuliskan Paragraf 4: Penyelesaian dan pesan moral yang tersirat]\n\n---\n**Pesan Moral:** [Tulis 1 kalimat pesan moral positif dari cerita ini]`

    const hasil = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'cerita-pendek', { tema })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Pembuat Cerita Pendek error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

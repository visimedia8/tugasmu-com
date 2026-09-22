import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolPenjelasKejuruan = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolPenjelasKejuruan.use('*', authMiddleware)

toolPenjelasKejuruan.post('/', async (c) => {
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
    const { jurusan, pertanyaan } = body

    if (!jurusan || !pertanyaan) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Lengkapi jurusan dan pertanyaanmu.' }, 400) }

    const systemPrompt = `Kamu adalah Instruktur/Praktisi Ahli di bidang ${jurusan}.\nPertanyaan Siswa SMK: ${pertanyaan}\n\nTugas: Jelaskan konsep teknis atau cara kerja dari pertanyaan di atas dengan bahasa yang sangat praktikal, langsung ke intinya, seakan kamu sedang mengajari di lab/bengkel/dapur.\n\nFormat Output WAJIB:\n# PENJELASAN PRAKTIS: ${jurusan.toUpperCase()}\n\n## KONSEP DASAR:\n(Jelaskan secara sederhana apa itu dan fungsinya)\n\n## CARA KERJA / LANGKAH-LANGKAH:\n(Jika berupa proses, jelaskan langkah kerjanya 1, 2, 3)\n\n## TIPS PRO DI LAPANGAN:\n(Berikan 1 rahasia atau tips industri yang jarang ada di buku teks tapi sangat berguna di dunia kerja nyata)`

    const hasil = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'penjelas-kejuruan', { jurusan })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Penjelas Materi Kejuruan error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

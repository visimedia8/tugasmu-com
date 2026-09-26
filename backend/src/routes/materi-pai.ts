import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolMateriPai = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolMateriPai.use('*', authMiddleware)

toolMateriPai.post('/', async (c) => {
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
    const { topik, mapel } = body

    if (!topik) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Masukkan topik bahasan.' }, 400) }

    const systemPrompt = `Kamu adalah Guru PAI (Pendidikan Agama Islam) di Madrasah/SMA.\nTopik: ${topik}\nMata Pelajaran: ${mapel || 'Pendidikan Agama Islam'}\n\nTugas: Buat rangkuman materi ajar yang terstruktur, lengkap dengan dalil Al-Quran/Hadits jika relevan, dengan bahasa yang mudah dipahami remaja.\n\nFormat Output WAJIB:\n# MATERI: ${topik.toUpperCase()}\n\n## 1. PENGERTIAN & KONSEP DASAR\n(Jelaskan definisinya secara bahasa dan istilah syariat)\n\n## 2. DALIL (AL-QURAN / HADITS)\n(Sebutkan dalil pendukung beserta artinya)\n\n## 3. RANGKUMAN INTI MATERI\n(Jelaskan rincian/syarat/rukun/sejarah tergantung topiknya)\n\n## 4. HIKMAH / MANFAAT\n(Apa hikmahnya dipelajari di kehidupan sehari-hari siswa?)`

    const aiRes = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'materi-pai', { topik }, {
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
    console.error('Generator Materi PAI (Fikih/SKI) error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

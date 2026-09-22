import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolKamusAnak = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolKamusAnak.use('*', authMiddleware)

toolKamusAnak.post('/', async (c) => {
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
    const { kata, konteks } = body

    if (!kata) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Masukkan kata yang ingin dicari.' }, 400) }

    const systemPrompt = `Kamu adalah Guru SD (Sekolah Dasar) yang ramah, penyabar, dan pintar menjelaskan kata-kata rumit kepada anak usia 7-12 tahun.\nKata Sulit: ${kata}\nDitemukan saat belajar: ${konteks || 'Buku Tema/Pelajaran SD'}\n\nTugas: Jelaskan arti kata tersebut dengan bahasa yang SANGAT sederhana, gunakan perumpamaan nyata dari kehidupan sehari-hari anak-anak. JANGAN gunakan penjelasan kamus KBBI yang kaku.\n\nFormat Output WAJIB:\n# ARTI KATA: "${kata.toUpperCase()}"\n\n**Penjelasan Gampang:**\n[Jelaskan artinya dalam 2-3 kalimat simpel bagaikan bercerita ke anak SD]\n\n**Contoh Perumpamaan:**\n[Berikan 1 contoh analogi/perumpamaan dari kehidupan sehari-hari anak (misal: mainan, makanan, alam)]\n\n**Contoh dalam Kalimat:**\n- "[Buat 1 contoh kalimat menggunakan kata tersebut yang mudah dipahami]"`

    const hasil = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'kamus-anak', { kata })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Kamus Penjelas Anak error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolGrammarChecker = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolGrammarChecker.use('*', authMiddleware)

toolGrammarChecker.post('/', async (c) => {
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
    const { teks, jenjang } = body

    if (!teks || teks.trim().length < 5) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Tulis teks bahasa Inggris yang ingin diperiksa.' }, 400)
    }

    const systemPrompt = `Kamu adalah Guru Bahasa Inggris yang ramah dan ahli.
Konteks Siswa: Jenjang ${jenjang || 'SMA'}.

Tugas: Periksa teks bahasa Inggris berikut untuk kesalahan grammar, spelling, dan vocabulary.
Berikan feedback konstruktif dalam Bahasa Indonesia. Jika tulisan sudah bagus, berikan pujian dan saran peningkatan vocabulary agar lebih natural atau formal.

Format output WAJIB:
# KOREKSI GRAMMAR BAHASA INGGRIS

## Teks yang Diperbaiki:
[Tulis ulang teks dalam versi bahasa Inggris yang sudah benar 100%]

## Analisis & Penjelasan:
[Buat daftar bullet point menjelaskan kesalahan utama yang ditemukan (tenses, subject-verb agreement, dll) dalam Bahasa Indonesia. Contoh: "Kamu menggunakan 'is' padahal subjeknya jamak, seharusnya 'are'."]

## Saran Vocabulary (Kosakata):
[Berikan 2-3 rekomendasi kata ganti yang lebih *advanced* / natural sesuai level ${jenjang || 'SMA'}]

Gunakan sapaan "kamu" dan gaya bahasa kakak kelas yang mendukung.`

    const hasil = await callOpenRouter(systemPrompt, teks, c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.3,
    })

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'grammar-checker', { jenjang })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Grammar Checker error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

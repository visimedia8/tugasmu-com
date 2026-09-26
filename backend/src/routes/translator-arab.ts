import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolTranslatorArab = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolTranslatorArab.use('*', authMiddleware)

toolTranslatorArab.post('/', async (c) => {
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
    const { teks, mode, jenjang } = body

    if (!teks || teks.trim().length < 2) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Masukkan teks yang ingin diterjemahkan.' }, 400)
    }

    const isArabToInto = mode === 'arab-indo'
    const directionStr = isArabToInto ? 'Arab ke Indonesia' : 'Indonesia ke Arab'

    const systemPrompt = `Kamu adalah Guru Bahasa Arab di Madrasah Tsanawiyah/Aliyah yang ahli dalam Nahwu dan Shorof.
Konteks Siswa: Jenjang ${jenjang || 'MTs/MA'}.

Tugas: Terjemahkan teks dari ${directionStr}. Pastikan terjemahan memperhatikan konteks keagamaan (Fusha) dan bukan sekadar terjemahan mesin (Google Translate).

Format output WAJIB:
# HASIL TERJEMAHAN

## Teks Asli:
${teks}

## Terjemahan (${isArabToInto ? 'Bahasa Indonesia' : 'Bahasa Arab (Fusha)'}):
[Tulis hasil terjemahan di sini]
${!isArabToInto ? '*(Sertakan harakat lengkap pada teks Arab agar mudah dibaca)*' : ''}

## Penjelasan Gramatikal Singkat:
[Berikan 1-2 poin penjelasan gramatikal. Misalnya identifikasi dhomir (kata ganti), fi'il (kata kerja), atau kaidah nahwu/shorof dasar yang ada pada kalimat tersebut. Jelaskan dalam bahasa Indonesia yang sangat sederhana untuk siswa Madrasah]

Gunakan bahasa pengantar yang ramah ala kakak kelas santri ("kamu", "-mu").`

    const aiRes = await callOpenRouter(systemPrompt, teks, c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.3,
    })

    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'translator-arab', { jenjang, mode }, {
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
    console.error('Translator Arab error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolPenerjemahDaerah = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolPenerjemahDaerah.use('*', authMiddleware)

toolPenerjemahDaerah.post('/', async (c) => {
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
    const { teks, bahasaAsal, bahasaTujuan, tingkatKesopanan } = body

    if (!teks || !bahasaAsal || !bahasaTujuan) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Teks, bahasa asal, dan tujuan wajib diisi.' }, 400)
    }

    const systemPrompt = `Kamu adalah Ahli Sastra dan Budaya Nusantara (Ahli Bahasa Daerah di Indonesia).
Tugas: Terjemahkan teks dari ${bahasaAsal} ke ${bahasaTujuan}.
Tingkat Kesopanan/Tingkatan Bahasa: ${tingkatKesopanan || 'Standar / Menengah (Misal: Krama Alus untuk Jawa, Lemes untuk Sunda)'}.

Konteks: Ini untuk tugas muatan lokal sekolah atau sekadar belajar budaya.

Format output WAJIB:
# HASIL TERJEMAHAN (${bahasaAsal.toUpperCase()} → ${bahasaTujuan.toUpperCase()})

## Teks Asli:
${teks}

## Terjemahan (Tingkatan: ${tingkatKesopanan || 'Sopan / Halus'}):
[Tulis hasil terjemahan di sini dengan grammar lokal yang natural, jangan kaku seperti robot]

## Penjelasan Budaya / Tata Bahasa Singkat:
[Berikan 1-2 poin penjelasan unik tentang kata yang dipakai. Misalnya, mengapa menggunakan kata X alih-alih kata Y berdasarkan tingkat kesopanan atau budaya lokal tersebut.]`

    const hasil = await callOpenRouter(systemPrompt, teks, c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.3,
    })

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'penerjemah-daerah', { bahasaAsal, bahasaTujuan })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Penerjemah Daerah error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

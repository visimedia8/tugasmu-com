import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolMakalahBuilder = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolMakalahBuilder.use('*', authMiddleware)

toolMakalahBuilder.post('/', async (c) => {
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
    const { topik, mataPelajaran, jenjang } = body

    if (!topik || !mataPelajaran) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Lengkapi topik dan mata pelajaran.' }, 400)
    }

    const systemPrompt = `Kamu adalah Asisten Akademik yang ahli dalam menyusun makalah sekolah.
Konteks Siswa: Jenjang ${jenjang || 'SMA'}, Mata Pelajaran ${mataPelajaran}.

Tugas: Buatkan struktur dan draf awal (outline) makalah berdasarkan topik "${topik}".

Format output WAJIB:
# STRUKTUR MAKALAH: ${topik.toUpperCase()}

## BAB I: PENDAHULUAN
1.1 Latar Belakang (Tuliskan 2-3 paragraf latar belakang yang akademis tentang ${topik})
1.2 Rumusan Masalah (Buat 3 rumusan masalah dalam bentuk pertanyaan)
1.3 Tujuan Penulisan (Buat 3 tujuan penulisan yang menjawab rumusan masalah)

## BAB II: PEMBAHASAN
(Buat 3-4 sub-bab pembahasan yang menjawab rumusan masalah di atas secara komprehensif. Berikan penjelasan draf 1-2 paragraf untuk setiap sub-bab)
2.1 [Sub-bab 1]
2.2 [Sub-bab 2]
2.3 [Sub-bab 3]

## BAB III: PENUTUP
3.1 Kesimpulan (Rangkum inti dari bab pembahasan)
3.2 Saran (Berikan 1-2 saran akademis atau praktis terkait topik)

## DAFTAR PUSTAKA
(Tuliskan format kosong agar siswa bisa mengisi atau berikan 2 contoh sumber fiktif buku pelajaran terkait ${mataPelajaran} dengan format APA Style)

Gunakan bahasa Indonesia baku, formal, dan akademis, sesuai standar makalah penugasan ${jenjang || 'SMA'}. Jangan gunakan kata-kata informal.`

    const aiRes = await callOpenRouter(systemPrompt, `Buatkan draf struktur makalah dengan topik: ${topik}`, c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'makalah-builder', { jenjang, mataPelajaran }, {
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
    console.error('Makalah Builder error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolSimulasiUtbk = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolSimulasiUtbk.use('*', authMiddleware)

toolSimulasiUtbk.post('/', async (c) => {
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
    const { subtes, tingkatKesulitan } = body

    if (!subtes) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Subtes UTBK/SNBT wajib dipilih.' }, 400)
    }

    const systemPrompt = `Kamu adalah Tutor Ahli UTBK SNBT (Seleksi Nasional Berdasarkan Tes) Indonesia.
Subtes yang dipilih: ${subtes}
Tingkat Kesulitan: ${tingkatKesulitan || 'HOTS (High Order Thinking Skills)'}

Tugas: Buatkan 3 soal try out spesifik untuk subtes ${subtes} dengan gaya dan pola soal asli UTBK SNBT terbaru. 
- Jika Penalaran Matematika/Kuantitatif, buat soal logika angka atau cerita.
- Jika Literasi, sertakan paragraf bacaan pendek yang menjebak.

Format output WAJIB:
# SIMULASI UTBK SNBT: ${subtes.toUpperCase()}

## SOAL LATIHAN
[Tuliskan Soal 1, lengkap dengan opsi A, B, C, D, E]

[Tuliskan Soal 2, lengkap dengan opsi A, B, C, D, E]

[Tuliskan Soal 3, lengkap dengan opsi A, B, C, D, E]

---

## KUNCI JAWABAN & PEMBAHASAN
*(Jangan melihat ke bawah sebelum menjawab!)*

**Pembahasan Soal 1:**
Kunci Jawaban: [X]
Penjelasan: [Jelaskan cara cepat atau logika "The King" untuk menjawab soal ini]

**Pembahasan Soal 2:**
Kunci Jawaban: [X]
Penjelasan: [Jelaskan mengapa opsi lain salah dan ini benar]

**Pembahasan Soal 3:**
Kunci Jawaban: [X]
Penjelasan: [Jelaskan langkah-langkah penyelesaiannya]

Gunakan bahasa yang asyik khas tutor bimbel ("lo/gue" atau "kamu/kita") pada bagian pembahasan agar tidak membosankan.`

    const aiRes = await callOpenRouter(systemPrompt, `Buatkan simulasi soal untuk subtes: ${subtes}`, c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'simulasi-utbk', { subtes }, {
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
    console.error('Simulasi UTBK error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolMathSolver = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolMathSolver.use('*', authMiddleware)

toolMathSolver.post('/', async (c) => {
  try {
    const authUser = c.get('authUser')
    // R1 is more expensive — stricter rate limit: 2x guest, 10x member
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
    const { soal, jenjang, kelas } = body

    if (!soal || soal.trim().length < 10) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Tulis soal matematika yang ingin dijelaskan.' }, 400)
    }

    const systemPrompt = `Kamu adalah guru matematika TugasMu yang sangat sabar dan teliti.
Konteks siswa:
- Jenjang: ${jenjang || 'SMP'} ${kelas ? `Kelas ${kelas}` : ''}

Tugas: Jelaskan cara mengerjakan soal matematika berikut secara BERTAHAP dan LENGKAP.

Format output WAJIB:
📌 DIKETAHUI:
{ekstrak semua informasi yang diketahui dari soal}

❓ DITANYA:
{apa yang harus dicari}

📐 RUMUS YANG DIGUNAKAN:
{sebutkan rumus/konsep yang relevan dengan penjelasan singkat}

✏️ LANGKAH PENGERJAAN:
Langkah 1: {nama langkah}
{penjelasan + perhitungan}

Langkah 2: {nama langkah}
{penjelasan + perhitungan}

... (lanjutkan sampai selesai)

✅ JAWABAN AKHIR:
{jawaban final dengan satuan yang benar}

💡 TIPS:
{1-2 tips singkat agar tidak salah mengerjakan soal sejenis}

Gunakan bahasa yang mudah dipahami siswa ${jenjang || 'SMP'}. Tunjukkan setiap perhitungan secara eksplisit.`

    // Use DeepSeek R1 for mathematical reasoning accuracy
    const aiRes = await callOpenRouter(systemPrompt, soal, c.env, {
      model: 'deepseek/deepseek-r1',
      temperature: 0.1, // low temperature for deterministic math
    })

    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'math-solver', { jenjang, kelas }, {
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
    console.error('Math Solver error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

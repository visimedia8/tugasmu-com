import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkAndIncrementRateLimit } from '../services/rateLimit'

export const toolParafrase = new Hono<{ Bindings: Bindings }>()

toolParafrase.post('/', async (c) => {
  try {
    // --- Rate Limit Check ---
    const rateLimitResult = await checkAndIncrementRateLimit(c.env, c.req.raw)
    if (!rateLimitResult.allowed) {
      return c.json({
        success: false,
        code: 'RATE_LIMITED',
        message: 'Kamu sudah memakai 3 tools hari ini. Daftar akun gratis untuk 20x/hari.',
        used: rateLimitResult.used,
        limit: rateLimitResult.limit,
      }, 429)
    }

    const body = await c.req.json()
    const { jenjang, kelas, kurikulum, mata_pelajaran, input_text } = body

    if (!jenjang || !input_text) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Data tidak lengkap' }, 400)
    }

    const systemPrompt = `Kamu adalah asisten belajar TugasMu untuk siswa Indonesia.
Konteks siswa:
- Jenjang: ${jenjang} (${kelas ? `Kelas ${kelas}` : 'Semua kelas'})
- Kurikulum: ${kurikulum === 'merdeka' ? 'Kurikulum Merdeka' : 'Kurikulum 2013'}
- Mata Pelajaran: ${mata_pelajaran || 'Umum'}

Tugas: Parafrase teks berikut menjadi versi unik dengan makna yang sama. 
Pertahankan alur logika. Sesuaikan gaya bahasa untuk siswa ${jenjang}. Jangan berikan pembukaan atau penutup, langsung berikan hasil parafrasenya.`

    const hasil = await callOpenRouter(systemPrompt, input_text, c.env)

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'parafrase', { jenjang, kelas, kurikulum, mata_pelajaran })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Parafrase error:', err)
    return c.json({ 
      success: false, 
      code: 'AI_ERROR', 
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.' 
    }, 500)
  }
})

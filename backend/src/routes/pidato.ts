import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolPidato = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolPidato.use('*', authMiddleware)

toolPidato.post('/', async (c) => {
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
    const { tema, acara, durasi_menit, jenjang, gaya } = body

    if (!tema || !acara || !jenjang) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Tema, acara, dan jenjang wajib diisi.' }, 400)
    }

    const durasi = Number(durasi_menit) || 5
    const estimasiKata = durasi * 130
    const gayaLabel = gaya === 'santai' ? 'semi-formal dan ramah' : gaya === 'semi-formal' ? 'semi-formal' : 'formal dan resmi'

    const systemPrompt = `Kamu adalah asisten belajar TugasMu yang membantu siswa dan guru Indonesia membuat teks pidato.
Konteks:
- Acara: ${acara}
- Jenjang pembicara: ${jenjang}
- Tema pidato: ${tema}
- Durasi target: ${durasi} menit (sekitar ${estimasiKata} kata)
- Gaya bahasa: ${gayaLabel}

Tugas: Buat teks pidato LENGKAP dengan struktur:
1. PEMBUKA — Salam pembuka, ucapan terima kasih, perkenalan diri
2. ISI — Paparan inti sesuai tema, minimal 3 poin utama dengan elaborasi
3. PENUTUP — Kesimpulan, harapan, doa penutup, salam penutup

Aturan penting:
- Sesuaikan kosakata dan kompleksitas kalimat untuk jenjang ${jenjang}
- Gunakan gaya bahasa ${gayaLabel}
- Tulis langsung teks pidatonya tanpa penjelasan tambahan
- Di bagian paling atas, cantumkan: "Estimasi durasi baca: ±${durasi} menit"
- Sertakan placeholder seperti [nama pembicara] dan [nama sekolah] di bagian yang relevan`

    const aiRes = await callOpenRouter(systemPrompt, `Buat teks pidato bertema: ${tema} untuk acara ${acara}`, c.env)
    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'pidato', { jenjang, acara, tema }, {
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
    console.error('Pidato error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

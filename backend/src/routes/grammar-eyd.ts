import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolGrammarEyd = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolGrammarEyd.use('*', authMiddleware)

toolGrammarEyd.post('/', async (c) => {
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

    if (!teks || teks.trim().length < 10) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Teks minimal 10 karakter.' }, 400)
    }

    if (teks.length > 3000) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Teks maksimal 3.000 karakter per cek.' }, 400)
    }

    const systemPrompt = `Kamu adalah guru Bahasa Indonesia TugasMu yang ahli EYD dan PUEBI.
Jenjang siswa: ${jenjang || 'SMP'}

Tugas: Periksa teks berikut dan temukan semua kesalahan ejaan, tanda baca, kata baku, kata depan, dan imbuhan.

Format output WAJIB seperti ini untuk setiap kesalahan yang ditemukan:
[SALAH] {kata atau kalimat yang salah} → [BENAR] {koreksinya} — Alasan: {penjelasan singkat aturannya}

Setelah semua koreksi, tambahkan baris kosong lalu tampilkan:
---
TEKS YANG SUDAH DIKOREKSI:
{tampilkan seluruh teks yang sudah diperbaiki}

Jika tidak ada kesalahan, tulis: "Tidak ditemukan kesalahan ejaan atau tanda baca. Teks sudah sesuai EYD/PUEBI."`

    const hasil = await callOpenRouter(systemPrompt, teks, c.env)

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'grammar-eyd', { jenjang })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Grammar EYD error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

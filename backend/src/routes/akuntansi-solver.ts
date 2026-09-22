import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolAkuntansiSolver = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolAkuntansiSolver.use('*', authMiddleware)

toolAkuntansiSolver.post('/', async (c) => {
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
    const { transaksi, metode } = body

    if (!transaksi) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Masukkan soal transaksi.' }, 400) }

    const systemPrompt = `Kamu adalah Guru Akuntansi SMK yang sangat teliti.\nMetode: ${metode || 'Jurnal Umum'}\n\nTugas: Selesaikan soal/transaksi akuntansi berikut secara terstruktur.\nSoal Transaksi:\n${transaksi}\n\nFormat Output WAJIB:\n# PENYELESAIAN AKUNTANSI (${metode || 'Jurnal Umum'})\n\n## TABEL ANALISIS:\n(Jelaskan akun apa yang bertambah/berkurang, dan posisinya di Debit/Kredit)\n\n## PENCATATAN FINAL:\n(Tuliskan format penjurnalan baku)\n**[TANGGAL]**\n- [Nama Akun Debit] ... Rp [Nominal]\n  - [Nama Akun Kredit] ... Rp [Nominal]\n\n## PENJELASAN GURU:\n(Berikan tips singkat kenapa dicatat seperti itu agar siswa paham logikanya)`

    const hasil = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'akuntansi-solver', { transaksi })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Kalkulator Jurnal Akuntansi error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

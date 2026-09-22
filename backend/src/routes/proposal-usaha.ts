import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolProposalUsaha = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolProposalUsaha.use('*', authMiddleware)

toolProposalUsaha.post('/', async (c) => {
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
    const { namaUsaha, jenisProduk, targetPasar } = body

    if (!namaUsaha || !jenisProduk) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Lengkapi nama usaha dan jenis produk.' }, 400) }

    const systemPrompt = `Kamu adalah Konsultan Bisnis Profesional dan Guru Kewirausahaan.\nTugas: Buatkan struktur Proposal Usaha yang formal dan realistis.\nNama Usaha: ${namaUsaha}\nJenis Produk/Jasa: ${jenisProduk}\nTarget Pasar: ${targetPasar || 'Umum'}\n\nFormat Output WAJIB (Gunakan Markdown H1, H2, H3):\n# PROPOSAL USAHA: ${namaUsaha.toUpperCase()}\n\n## BAB 1: PENDAHULUAN\n1.1 Latar Belakang (Jelaskan alasan mendirikan usaha ${jenisProduk})\n1.2 Visi & Misi\n\n## BAB 2: ANALISIS PRODUK & PASAR\n2.1 Deskripsi Produk \n2.2 Target Pasar (${targetPasar || 'Umum'})\n2.3 Analisis SWOT (Strengths, Weaknesses, Opportunities, Threats)\n\n## BAB 3: RENCANA PEMASARAN & KEUANGAN\n3.1 Strategi Promosi\n3.2 Rencana Anggaran Awal (Simulasi modal)\n\nGunakan bahasa meyakinkan, formal, dan siap diserahkan ke guru.`

    const hasil = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'proposal-usaha', { namaUsaha })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Pembuat Proposal Usaha error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

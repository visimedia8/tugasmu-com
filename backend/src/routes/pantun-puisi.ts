import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolPantunPuisi = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolPantunPuisi.use('*', authMiddleware)

toolPantunPuisi.post('/', async (c) => {
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
    const { jenjang, kelas, kurikulum, mata_pelajaran, tema, jenis_karya, variasi } = body

    if (!jenjang || !tema) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Data tidak lengkap' }, 400)
    }

    let instruksi = `Buatlah sebuah ${jenis_karya} bertema "${tema}".`
    
    if (jenis_karya === 'pantun') {
      instruksi += ` Pastikan pantun memiliki sajak a-b-a-b, terdiri dari 4 baris per bait. Buatlah 3 bait pantun.`
    } else if (jenis_karya === 'puisi') {
      instruksi += ` Buatlah puisi yang indah dengan rima yang tertata, terdiri dari 3-4 bait.`
    } else {
      instruksi += ` Buatlah cerita pendek (cerpen) sekitar 3-4 paragraf yang menarik dan memiliki pesan moral.`
    }

    if (variasi && variasi !== 'nasional') {
      instruksi += ` Gunakan gaya bahasa / logat ${variasi} yang kental namun tetap bisa dipahami.`
    }

    const systemPrompt = `Kamu adalah sastrawan ahli dari TugasMu.
Konteks siswa:
- Jenjang: ${jenjang} (${kelas ? `Kelas ${kelas}` : 'Semua kelas'})
- Kurikulum: ${kurikulum === 'merdeka' ? 'Kurikulum Merdeka' : 'Kurikulum 2013'}

Tugas: ${instruksi}
Aturan:
1. Sesuaikan pilihan kata (diksi) dengan jenjang umur siswa ${jenjang}.
2. Jangan menggunakan bahasa yang terlalu vulgar atau tidak pantas untuk anak sekolah.
3. Langsung berikan hasil karyanya tanpa pendahuluan atau penutup basa-basi.`

    const userPrompt = `Buatkan ${jenis_karya} tentang ${tema}`

    const aiRes = await callOpenRouter(systemPrompt, userPrompt, c.env, { temperature: 0.8 })
    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'pantun-puisi', { jenjang, kelas, kurikulum, mata_pelajaran }, {
      model: aiRes.model,
      prompt_tokens: aiRes.usage.prompt_tokens,
      completion_tokens: aiRes.usage.completion_tokens
    })
    )

    return c.json({ success: true, data: { hasil } })

  } catch (err) {
    console.error('Pantun Puisi error:', err)
    return c.json({ 
      success: false, 
      code: 'AI_ERROR', 
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.' 
    }, 500)
  }
})

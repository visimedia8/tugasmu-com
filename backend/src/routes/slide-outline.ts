import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolSlideOutline = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolSlideOutline.use('*', authMiddleware)

toolSlideOutline.post('/', async (c) => {
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
    const { topik, jumlahSlide, audiens } = body

    if (!topik) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Tuliskan topik atau materi presentasi.' }, 400)
    }

    const maxSlides = parseInt(jumlahSlide) || 7
    if (maxSlides > 20) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Jumlah slide maksimal adalah 20.' }, 400)
    }

    const systemPrompt = `Kamu adalah Ahli Pembuat Presentasi (PowerPoint/Canva Designer & Speaker).
Topik Presentasi: ${topik}
Target Audiens: ${audiens || 'Teman Sekelas & Guru'}
Jumlah Slide yang Diminta: ${maxSlides} Slide

Tugas: Buatkan struktur presentasi (slide outline) yang siap di-copy-paste ke PowerPoint atau Canva.
Presentasi harus memiliki alur yang menarik (hook) di awal, isi yang terstruktur, dan call-to-action/penutup yang berkesan.

Format output WAJIB:
# OUTLINE PRESENTASI: ${topik.toUpperCase()}

*(Kamu bisa langsung menyalin teks per slide ini ke Canva atau PowerPoint)*

---
**Slide 1: [Judul / Title Slide]**
- **Teks Besar:** [Tulis judul yang menarik/clickbait namun akademis]
- **Teks Kecil (Subtitle):** [Tulis sub-judul atau "Oleh: Kelompok X"]
- **Visual Ide:** [Saran gambar/ikon yang cocok untuk slide ini]

**Slide 2: [Hook / Pembuka Masalah]**
- **Poin-poin di Slide:** [Buat 2-3 poin sangat singkat (jangan panjang-panjang)]
- **Catatan Pembicara (Speaker Notes):** [Tuliskan apa yang harus diucapkan siswa saat menampilkan slide ini]

[...Lanjutkan format yang sama sampai Slide ke-${maxSlides}...]

**Slide Terakhir: [Penutup / Kesimpulan & Q&A]**
- **Teks Besar:** [Teks penutup, misal "Ada Pertanyaan?" atau kutipan relevan]
- **Catatan Pembicara:** [Kalimat penutup yang elegan]

Pastikan isi slide **TIDAK TERLALU BANYAK TEKS**. Presentasi yang baik adalah yang poin-poinnya singkat (bullet points), sementara penjelasannya ada di bagian "Catatan Pembicara".`

    const hasil = await callOpenRouter(systemPrompt, `Buatkan outline slide presentasi untuk topik: ${topik}`, c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'slide-outline', { audiens, jumlahSlide: maxSlides })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Slide Outline error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolKtiBuilder = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolKtiBuilder.use('*', authMiddleware)

toolKtiBuilder.post('/', async (c) => {
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
    const { topik, metode, jenjang } = body

    if (!topik) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Tuliskan topik Karya Tulis Ilmiah (KTI) kamu.' }, 400)
    }

    const systemPrompt = `Kamu adalah Dosen Pembimbing Metode Penelitian yang ahli dalam membimbing Karya Tulis Ilmiah (KTI) siswa sekolah.
Topik/Judul KTI: ${topik}
Metode/Jenis Penelitian: ${metode || 'Kualitatif Deskriptif'}
Level Siswa: ${jenjang || 'SMA'}

Tugas: Buatkan struktur lengkap draf Karya Tulis Ilmiah (KTI) BAB I, BAB II, dan BAB III. Ini akan membantu siswa melihat benang merah penelitiannya.

Format output WAJIB:
# STRUKTUR KARYA TULIS ILMIAH (KTI)
Topik: ${topik}

## ABSTRAK
[Tuliskan 1 paragraf contoh draf abstrak kosong atau panduan apa yang harus diisi di sini setelah penelitian selesai]

## BAB I: PENDAHULUAN
**1.1 Latar Belakang Masalah**
[Tuliskan 2-3 paragraf pembuka yang tajam dan akademis, mengerucut dari masalah umum ke masalah spesifik sesuai topik ${topik}]

**1.2 Rumusan Masalah**
[Buat 2-3 pertanyaan penelitian yang menggunakan metode ${metode || 'Kualitatif Deskriptif'}]

**1.3 Tujuan Penelitian**
[Jawab rumusan masalah di atas dengan kalimat "Untuk mengetahui..."]

**1.4 Manfaat Penelitian**
[Secara teoritis dan praktis]

## BAB II: TINJAUAN PUSTAKA (LANDASAN TEORI)
[Berikan 3 sub-bab teori utama yang harus dicari dan dibaca oleh siswa di perpustakaan terkait topik ini. Berikan penjelasan singkat apa yang harus dibahas di tiap sub-bab]
2.1 [Teori Variabel 1]
2.2 [Teori Variabel 2]
2.3 Kerangka Berpikir (Jelaskan hubungan antar variabel)

## BAB III: METODOLOGI PENELITIAN
**3.1 Jenis Penelitian**
[Jelaskan bahwa ini menggunakan metode ${metode || 'Kualitatif Deskriptif'} dan apa alasannya]

**3.2 Waktu dan Tempat Penelitian**
[Format kosong]

**3.3 Teknik Pengumpulan Data**
[Sebutkan apakah kuesioner, wawancara, atau observasi yang paling cocok untuk judul ini]

Gunakan bahasa akademis tingkat SMA/Kuliah awal. Jangan berikan jawaban akhir, tapi berikan draf berstruktur kokoh.`

    const hasil = await callOpenRouter(systemPrompt, `Buatkan kerangka KTI untuk topik: ${topik}`, c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'kti-builder', { jenjang, metode })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('KTI Builder error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

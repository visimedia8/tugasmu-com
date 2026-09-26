import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolCvLamaran = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolCvLamaran.use('*', authMiddleware)

toolCvLamaran.post('/', async (c) => {
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
    const { namaLengkap, posisiDilamar, jurusan, pengalaman, softSkills } = body

    if (!namaLengkap || !posisiDilamar || !jurusan) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Nama, posisi yang dilamar, dan jurusan wajib diisi.' }, 400)
    }

    const systemPrompt = `Kamu adalah HRD Profesional dan Konsultan Karir spesialis Lulusan SMK/Fresh Graduate.
Data Pelamar:
- Nama: ${namaLengkap}
- Jurusan/Pendidikan Terakhir: ${jurusan}
- Posisi yang Dilamar: ${posisiDilamar}
- Pengalaman PKL/Organisasi: ${pengalaman || 'Belum ada pengalaman (Fresh Graduate)'}
- Keahlian Tambahan/Soft Skills: ${softSkills || '-'}

Tugas: Buatkan teks draf Surat Lamaran Kerja (Cover Letter) dan konten Curriculum Vitae (CV) dengan format ATS-friendly yang memukau HRD, menonjolkan potensi lulusan baru.

Format output WAJIB:
# DRAF SURAT LAMARAN KERJA (COVER LETTER)
[Tulis surat lamaran kerja yang profesional, percaya diri, dan menonjolkan pengalaman praktis/PKL atau semangat belajar. Sesuaikan dengan posisi ${posisiDilamar}]

---

# KONTEN CURRICULUM VITAE (ATS-FRIENDLY)
*(Gunakan teks di bawah ini untuk disalin ke template CV ATS (seperti di Canva/Word, hilangkan grafik atau warna berlebihan)*

## [NAMA LENGKAP: ${namaLengkap.toUpperCase()}]
[Alamat | No HP | Email | LinkedIn (Opsional)]

## TENTANG SAYA (PROFESSIONAL SUMMARY)
[Tulis 3-4 kalimat ringkasan profil yang menjual kekuatan jurusan ${jurusan}, motivasi melamar posisi ${posisiDilamar}, dan menyebutkan soft skill relevan]

## PENDIDIKAN
- **SMK/Sekolah [Nama Sekolah Kamu]**
  Jurusan: ${jurusan} | Tahun Kelulusan: [Tahun]
  *(Opsional: Tuliskan capaian nilai/prestasi akademis)*

## PENGALAMAN (PKL / ORGANISASI / KERJA)
**[Nama Posisi/Peran]** | **[Nama Instansi/Perusahaan]** | [Bulan, Tahun] - [Bulan, Tahun]
- [Tulis poin 1 kontribusi atau tugas menggunakan action verbs (misal: "Menganalisis...", "Membuat...")]
- [Tulis poin 2 hasil atau pengalaman yang didapat (misal: "Berhasil menyelesaikan...")]

## KEAHLIAN (SKILLS)
- **Hard Skills:** [Sebutkan 3-5 hard skill spesifik jurusan ${jurusan} yang relevan dengan posisi ${posisiDilamar}]
- **Soft Skills:** ${softSkills || '[Ketik soft skill seperti Komunikasi, Kerja Tim, Manajemen Waktu]'}

Gunakan bahasa Indonesia profesional, format terstruktur rapi, tanpa basa-basi berlebihan.`

    const aiRes = await callOpenRouter(systemPrompt, 'Buatkan surat lamaran kerja dan isi CV saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'cv-lamaran', { jurusan, posisiDilamar }, {
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
    console.error('CV Lamaran error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

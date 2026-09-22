import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolLaporanPkl = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolLaporanPkl.use('*', authMiddleware)

toolLaporanPkl.post('/', async (c) => {
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
    const { namaLengkap, jurusan, namaPerusahaan, divisi, lamaMagang, kelas } = body

    if (!namaLengkap || !jurusan || !namaPerusahaan) {
      return c.json({ success: false, code: 'INVALID_INPUT', message: 'Lengkapi nama, jurusan, dan nama perusahaan.' }, 400)
    }

    const systemPrompt = `Kamu adalah Asisten Pembimbing PKL/Prakerin SMK.
Konteks Siswa:
- Nama: ${namaLengkap}
- Kelas: ${kelas || '11 SMK'}
- Jurusan: ${jurusan}
- Tempat Magang: ${namaPerusahaan}
- Divisi/Bagian: ${divisi || '-'}
- Lama Magang: ${lamaMagang || '3 Bulan'}

Tugas: Buatkan struktur draft Laporan PKL (Praktik Kerja Lapangan) lengkap yang formal, profesional, dan spesifik sesuai jurusan ${jurusan}.

Format output WAJIB:
# LAPORAN PRAKTIK KERJA LAPANGAN (PKL)
Tempat: ${namaPerusahaan}
Oleh: ${namaLengkap}

## BAB I: PENDAHULUAN
1.1 Latar Belakang (Tuliskan 2-3 paragraf latar belakang perlunya PKL khusus untuk anak SMK jurusan ${jurusan})
1.2 Tujuan PKL (Buat 3-4 poin tujuan)
1.3 Manfaat PKL (Bagi siswa, sekolah, dan perusahaan)

## BAB II: GAMBARAN UMUM PERUSAHAAN
2.1 Sejarah Singkat ${namaPerusahaan} (Tulis template kosong yang harus diisi siswa: [Isi dengan sejarah...])
2.2 Struktur Organisasi (Template kosong)
2.3 Visi dan Misi Perusahaan (Template kosong)

## BAB III: PELAKSANAAN PRAKTIK KERJA LAPANGAN
3.1 Waktu dan Tempat Pelaksanaan (Sebutkan lama magang: ${lamaMagang})
3.2 Bidang Kerja (Jelaskan tugas umum anak magang jurusan ${jurusan} di divisi ${divisi || 'terkait'})
3.3 Uraian Kegiatan Praktik (Buatkan contoh 3-5 kegiatan spesifik jurusan ${jurusan} yang biasa dilakukan saat magang)
3.4 Kendala yang Dihadapi (Berikan 2 contoh kendala teknis umum)
3.5 Cara Mengatasi Kendala (Solusi dari kendala di atas)

## BAB IV: PENUTUP
4.1 Kesimpulan (2 paragraf kesimpulan)
4.2 Saran (Saran untuk pihak sekolah dan pihak industri)

Gunakan bahasa Indonesia baku yang formal dan akademis, cocok untuk laporan resmi sekolah.`

    const hasil = await callOpenRouter(systemPrompt, 'Tolong buatkan draft laporan PKL saya.', c.env, {
      model: 'deepseek/deepseek-chat', // Use V3 for general generation
      temperature: 0.7,
    })

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'laporan-pkl', { kelas, jurusan })
    )

    return c.json({
      success: true,
      used: rateLimitResult.used,
      limit: rateLimitResult.limit,
      data: { hasil }
    })

  } catch (err) {
    console.error('Laporan PKL error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

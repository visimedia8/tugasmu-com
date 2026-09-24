import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

async function getSharedOutput(id: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tugasmu-api.johananggo.workers.dev'
    const res = await fetch(`${apiUrl}/api/share/${id}`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    return await res.json()
  } catch { return null }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const data = await getSharedOutput(params.id)
  if (!data?.success) return { title: 'Output Tidak Ditemukan | TugasMu' }
  return {
    title: `${data.title} | TugasMu`,
    description: data.output_text.substring(0, 160),
    openGraph: {
      title: data.title,
      description: data.output_text.substring(0, 160),
      url: `https://tugasmu.com/s/${params.id}`,
      siteName: 'TugasMu',
    },
  }
}

export default async function SharedOutputPage({ params }: { params: { id: string } }) {
  const data = await getSharedOutput(params.id)
  if (!data?.success) notFound()

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
            {data.tool_slug.replace(/-/g, ' ')}
          </span>
          <span className="text-xs text-slate-400">
            {new Date(data.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-6">{data.title}</h1>
        <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700 text-sm leading-relaxed border-t border-slate-100 pt-6">
          {data.output_text}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="mt-8 bg-sky-50 border border-sky-200 rounded-3xl p-8 text-center shadow-sm relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-200 rounded-full blur-3xl opacity-50"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-sky-500">
            <span className="material-symbols-outlined text-[32px]">auto_awesome</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Mau buat tugas seperti ini? Gratis! 🎯</h2>
          <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
            TugasMu adalah asisten AI pintar yang ngerti pelajaran kamu. Dapatkan 20x generate per hari, 100% gratis selamanya.
          </p>
          <Link
            href="/daftar"
            className="inline-block py-3 px-8 rounded-xl bg-sky-500 text-white font-semibold text-sm hover:bg-sky-600 hover:-translate-y-0.5 transition-all shadow-md"
          >
            Coba TugasMu Sekarang →
          </Link>
        </div>
      </div>
    </div>
  )
}

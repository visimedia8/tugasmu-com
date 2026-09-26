import type { Bindings } from '../index'

export async function logUsage(
  env: Bindings,
  req: Request,
  toolSlug: string,
  params: {
    jenjang?: string
    kelas?: string
    kurikulum?: string
    mata_pelajaran?: string
    [key: string]: any
  }
) {
  try {
    const ip = req.headers.get('cf-connecting-ip') || 'unknown'
    
    // Hash the IP for privacy
    const encoder = new TextEncoder()
    const data = encoder.encode(ip + 'tugasmu-salt')
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const ipHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    const id = crypto.randomUUID()

    await env.DB.prepare(
      `INSERT INTO tools_usage (id, ip_hash, tool_slug, jenjang, kelas, kurikulum, mata_pelajaran) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id, 
      ipHash, 
      toolSlug, 
      params.jenjang || null, 
      params.kelas || null, 
      params.kurikulum || null, 
      params.mata_pelajaran || null
    ).run()
  } catch (error) {
    console.error('Failed to log usage:', error)
  }
}

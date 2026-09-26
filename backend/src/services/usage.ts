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
  },
  aiMetrics?: {
    model: string
    prompt_tokens: number
    completion_tokens: number
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

    let costUsd = 0
    if (aiMetrics) {
      // Calculate cost. Example: DeepSeek Chat is $0.14/M input, $0.28/M output
      if (aiMetrics.model.includes('deepseek-chat')) {
        costUsd = (aiMetrics.prompt_tokens * 0.14 / 1000000) + (aiMetrics.completion_tokens * 0.28 / 1000000)
      } else if (aiMetrics.model.includes('deepseek-r1')) {
        // Deepseek reasoner: $0.55/M input, $2.19/M output
        costUsd = (aiMetrics.prompt_tokens * 0.55 / 1000000) + (aiMetrics.completion_tokens * 2.19 / 1000000)
      }
    }

    await env.DB.prepare(
      `INSERT INTO tools_usage (id, ip_hash, tool_slug, jenjang, kelas, kurikulum, mata_pelajaran, model_slug, prompt_tokens, completion_tokens, cost_usd) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id, 
      ipHash, 
      toolSlug, 
      params.jenjang || null, 
      params.kelas || null, 
      params.kurikulum || null, 
      params.mata_pelajaran || null,
      aiMetrics?.model || null,
      aiMetrics?.prompt_tokens || 0,
      aiMetrics?.completion_tokens || 0,
      costUsd
    ).run()
  } catch (error) {
    console.error('Failed to log usage:', error)
  }
}


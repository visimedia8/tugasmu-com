import type { Bindings } from '../index'

interface AiOptions {
  model?: 'deepseek/deepseek-chat' | 'deepseek/deepseek-r1'
  temperature?: number
}

export async function callOpenRouter(
  systemPrompt: string,
  userPrompt: string,
  env: Bindings,
  options?: AiOptions
): Promise<{ hasil: string, usage: { prompt_tokens: number, completion_tokens: number }, model: string }> {

  const apiKey = env.DEEPSEEK_API_KEY
  if (!apiKey) {
    throw new Error('Missing DEEPSEEK_API_KEY')
  }

  const model = options?.model || 'deepseek/deepseek-chat'
  const temperature = options?.temperature ?? 0.7

  const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://tugasmu.com',
      'X-Title': 'TugasMu',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature,
    })
  })

  if (!aiResponse.ok) {
    throw new Error(`AI API Error: ${aiResponse.status} ${aiResponse.statusText}`)
  }

  const data = await aiResponse.json() as any
  const hasil = data.choices?.[0]?.message?.content || ''
  
  return {
    hasil,
    usage: data.usage || { prompt_tokens: 0, completion_tokens: 0 },
    model: data.model || model
  }
}


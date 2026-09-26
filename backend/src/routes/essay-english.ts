import { Hono } from 'hono'
import type { Bindings } from '../index'
import { callOpenRouter } from '../services/ai'
import { logUsage } from '../services/usage'
import { checkRateLimit } from '../services/rateLimit'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const toolEssayEnglish = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

toolEssayEnglish.use('*', authMiddleware)

toolEssayEnglish.post('/', async (c) => {
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
    const { topik, stance } = body

    if (!topik) { return c.json({ success: false, code: 'INVALID_INPUT', message: 'Tuliskan topik atau pertanyaan essay.' }, 400) }

    const systemPrompt = `You are an expert Cambridge/IB/IELTS English Teacher.\nEssay Prompt / Topic: ${topik}\nStudent's Stance (Opini): ${stance || 'Neutral/Balanced'}\n\nTask: Generate a high-scoring academic essay outline using the PEEL (Point, Evidence, Explain, Link) structure. Use formal, advanced academic vocabulary (C1/C2 level).\n\nFormat Output REQUIRED:\n# ACADEMIC ESSAY OUTLINE\n\n## 1. INTRODUCTION\n- **Hook:** (A compelling opening statement)\n- **Background Information:** (Brief context on the topic)\n- **Thesis Statement:** (A strong, clear thesis reflecting the stance: ${stance || 'Neutral'})\n\n## 2. BODY PARAGRAPH 1 (Strongest Argument)\n- **Point:** (Topic sentence)\n- **Evidence:** (Provide a logical or real-world example)\n- **Explain:** (How does the evidence prove the point?)\n- **Link:** (Connect back to the thesis)\n\n## 3. BODY PARAGRAPH 2 (Secondary Argument)\n- **Point:** (Topic sentence)\n- **Evidence:** \n- **Explain:** \n- **Link:** \n\n## 4. BODY PARAGRAPH 3 (Counter-Argument & Rebuttal)\n- **Counter-Argument:** (Acknowledge the opposing view)\n- **Rebuttal:** (Refute it logically to strengthen the thesis)\n\n## 5. CONCLUSION\n- **Restate Thesis:** (In different words)\n- **Summarize Main Points:** \n- **Final Thought:** (A broader implication or call to action)\n\nWrite the entire output in formal Academic English. Provide brief 1-2 sentence drafts for each bullet point.`

    const aiRes = await callOpenRouter(systemPrompt, 'Tolong bantu saya.', c.env, {
      model: 'deepseek/deepseek-chat',
      temperature: 0.7,
    })

    const hasil = aiRes.hasil

    c.executionCtx.waitUntil(
      logUsage(c.env, c.req.raw, 'essay-english', { topik }, {
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
    console.error('Academic Essay Writer error:', err)
    return c.json({
      success: false,
      code: 'AI_ERROR',
      message: 'Maaf, sistem AI TugasMu sedang sibuk atau terjadi kesalahan.'
    }, 500)
  }
})

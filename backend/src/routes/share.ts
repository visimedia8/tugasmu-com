import { Hono } from 'hono'
import type { Bindings } from '../index'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const share = new Hono<{ Bindings: Bindings; Variables: { authUser: AuthUser | null } }>()
share.use('*', authMiddleware)

share.post('/', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Login untuk share output' }, 401)

  const { tool_slug, title, output_text } = await c.req.json()
  if (!output_text || output_text.trim().length < 10) {
    return c.json({ success: false, message: 'Output terlalu pendek' }, 400)
  }

  const id = crypto.randomUUID()
  await c.env.DB.prepare(
    'INSERT INTO shared_outputs (id, user_id, tool_slug, title, output_text) VALUES (?, ?, ?, ?, ?)'
  ).bind(
    id,
    authUser.userId,
    tool_slug ?? 'unknown',
    (title ?? 'Hasil TugasMu').substring(0, 200),
    output_text.substring(0, 10000)
  ).run()

  return c.json({
    success: true,
    shareId: id,
    shareUrl: `https://tugasmu.com/s/${id}`
  })
})

// Public endpoint — tidak butuh auth
share.get('/:id', async (c) => {
  const id = c.req.param('id')
  const row = await c.env.DB.prepare(
    'SELECT tool_slug, title, output_text, view_count, created_at FROM shared_outputs WHERE id = ? AND is_public = 1'
  ).bind(id).first<{
    tool_slug: string
    title: string
    output_text: string
    view_count: number
    created_at: string
  }>()

  if (!row) return c.json({ success: false, message: 'Output tidak ditemukan atau sudah dihapus' }, 404)

  c.executionCtx.waitUntil(
    c.env.DB.prepare('UPDATE shared_outputs SET view_count = view_count + 1 WHERE id = ?')
      .bind(id).run()
  )

  return c.json({ success: true, ...row })
})

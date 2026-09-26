import { Hono } from 'hono'
import type { Bindings } from '../index'
import { authMiddleware, adminAuthMiddleware, type AuthUser } from '../middleware/auth'

export const admin = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

// Apply auth and admin middleware to all admin routes
admin.use('*', authMiddleware)
admin.use('*', adminAuthMiddleware)

admin.get('/stats', async (c) => {
  const usersCount = await c.env.DB.prepare('SELECT COUNT(*) as count FROM users').first<{count: number}>()
  const subscriptionsCount = await c.env.DB.prepare("SELECT COUNT(*) as count FROM subscriptions WHERE status = 'active'").first<{count: number}>()
  const toolsUsageCount = await c.env.DB.prepare('SELECT COUNT(*) as count FROM tools_usage').first<{count: number}>()

  return c.json({
    success: true,
    stats: {
      totalUsers: usersCount?.count ?? 0,
      activeSubscriptions: subscriptionsCount?.count ?? 0,
      totalToolsUsage: toolsUsageCount?.count ?? 0,
    }
  })
})

admin.get('/users', async (c) => {
  const limit = parseInt(c.req.query('limit') ?? '50', 10)
  const offset = parseInt(c.req.query('offset') ?? '0', 10)

  // Use LIMIT and OFFSET as per rules
  const { results } = await c.env.DB.prepare(
    'SELECT id, email, tier, quota_daily, credit_balance, role, created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).bind(limit, offset).all()

  return c.json({
    success: true,
    users: results
  })
})

admin.put('/users/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()

  // allowed fields to update
  const { tier, quota_daily, credit_balance, role } = body

  try {
    await c.env.DB.prepare(
      'UPDATE users SET tier = ?, quota_daily = ?, credit_balance = ?, role = ? WHERE id = ?'
    ).bind(
      tier ?? 'free',
      quota_daily ?? 20,
      credit_balance ?? 0,
      role ?? 'user',
      id
    ).run()

    return c.json({ success: true })
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 400)
  }
})

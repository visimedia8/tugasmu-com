import { Hono } from 'hono'
import type { Bindings } from '../index'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const user = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

user.use('*', authMiddleware)

user.get('/me', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)

  const today = new Date().toISOString().split('T')[0]
  
  const quotaRow = await c.env.DB.prepare(
    `SELECT count FROM user_quota_log WHERE user_id = ? AND date = ?`
  ).bind(authUser.userId, today).first<{ count: number }>()

  const subscription = await c.env.DB.prepare(
    `SELECT tier, status, expires_at FROM subscriptions WHERE user_id = ? AND status = 'active'`
  ).bind(authUser.userId).first()

  return c.json({
    success: true,
    user: {
      id: authUser.userId,
      email: authUser.email,
      tier: authUser.tier,
    },
    quota: {
      used: quotaRow?.count ?? 0,
      limit: authUser.dailyLimit,
      date: today,
    },
    subscription: subscription ?? null,
  })
})

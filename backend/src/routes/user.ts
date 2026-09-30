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
      name: authUser.name,
      jenjang_default: authUser.jenjang_default,
      kelas_default: authUser.kelas_default,
      tier: authUser.tier,
      role: authUser.role,
    },
    quota: {
      used: quotaRow?.count ?? 0,
      limit: authUser.dailyLimit,
      date: today,
    },
    subscription: subscription ?? null,
  })
})

user.put('/preferences', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)

  try {
    const body = await c.req.json()
    const name = body.name ?? null
    const jenjang_default = body.jenjang_default ?? null
    const kelas_default = body.kelas_default ?? null

    await c.env.DB.prepare(
      `UPDATE users SET name = ?, jenjang_default = ?, kelas_default = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
    ).bind(name, jenjang_default, kelas_default, authUser.userId).run()

    return c.json({ success: true, message: 'Preferences updated successfully' })
  } catch (err) {
    console.error('Failed to update preferences:', err)
    return c.json({ success: false, message: 'Bad request or server error' }, 400)
  }
})

user.delete("/me", async (c) => {
  const authUser = c.get("authUser")
  if (!authUser) return c.json({ success: false, message: "Unauthorized" }, 401)

  try {
    const userId = authUser.userId;
    
    // Hapus secara berurutan
    await c.env.DB.prepare("DELETE FROM subscriptions WHERE user_id = ?").bind(userId).run();
    await c.env.DB.prepare("DELETE FROM user_quota_log WHERE user_id = ?").bind(userId).run();
    await c.env.DB.prepare("DELETE FROM users WHERE id = ?").bind(userId).run();

    return c.json({ success: true, message: "Account deleted successfully" })
  } catch (err) {
    console.error("Delete account error:", err)
    return c.json({ success: false, message: "Server error during deletion" }, 500)
  }
})

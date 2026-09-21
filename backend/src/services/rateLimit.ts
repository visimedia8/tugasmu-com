import type { Bindings } from '../index'
import type { AuthUser } from '../middleware/auth'

const DAILY_LIMIT_ANONYMOUS = 3

export async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(ip + 'tugasmu-salt-v2')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function checkRateLimit(
  env: Bindings,
  req: Request,
  authUser: AuthUser | null
): Promise<{ allowed: boolean; used: number; limit: number }> {
  const today = new Date().toISOString().split('T')[0] // "YYYY-MM-DD"

  try {
    if (authUser) {
      // Authenticated user — pakai user_quota_log
      const limit = authUser.dailyLimit
      
      await env.DB.prepare(`
        INSERT INTO user_quota_log (user_id, date, count) VALUES (?, ?, 1)
        ON CONFLICT(user_id, date) DO UPDATE SET count = count + 1
      `).bind(authUser.userId, today).run()

      const row = await env.DB.prepare(
        `SELECT count FROM user_quota_log WHERE user_id = ? AND date = ?`
      ).bind(authUser.userId, today).first<{ count: number }>()

      const used = row?.count ?? 1
      return { allowed: used <= limit, used, limit }
    }

    // Anonymous user
    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown'
    const ipHash = await hashIP(ip)

    await env.DB.prepare(`
      INSERT INTO ip_rate_limit (ip_hash, date, count)
      VALUES (?, ?, 1)
      ON CONFLICT(ip_hash, date) DO UPDATE SET count = count + 1
    `).bind(ipHash, today).run()

    const row = await env.DB.prepare(
      `SELECT count FROM ip_rate_limit WHERE ip_hash = ? AND date = ?`
    ).bind(ipHash, today).first<{ count: number }>()

    const used = row?.count ?? 1
    return { allowed: used <= DAILY_LIMIT_ANONYMOUS, used, limit: DAILY_LIMIT_ANONYMOUS }
  } catch (err) {
    console.error('Rate limit check failed:', err)
    return { allowed: true, used: 0, limit: DAILY_LIMIT_ANONYMOUS }
  }
}


import type { Bindings } from '../index'

const DAILY_LIMIT_ANONYMOUS = 3

export async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(ip + 'tugasmu-salt-v2')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function checkAndIncrementRateLimit(
  env: Bindings,
  req: Request
): Promise<{ allowed: boolean; used: number; limit: number }> {
  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown'
  const ipHash = await hashIP(ip)
  const today = new Date().toISOString().split('T')[0] // "YYYY-MM-DD"

  try {
    // Upsert: insert or increment counter for today
    await env.DB.prepare(`
      INSERT INTO ip_rate_limit (ip_hash, date, count)
      VALUES (?, ?, 1)
      ON CONFLICT(ip_hash, date) DO UPDATE SET count = count + 1
    `).bind(ipHash, today).run()

    // Read current count after increment
    const row = await env.DB.prepare(
      `SELECT count FROM ip_rate_limit WHERE ip_hash = ? AND date = ?`
    ).bind(ipHash, today).first<{ count: number }>()

    const used = row?.count ?? 1

    if (used > DAILY_LIMIT_ANONYMOUS) {
      return { allowed: false, used, limit: DAILY_LIMIT_ANONYMOUS }
    }

    return { allowed: true, used, limit: DAILY_LIMIT_ANONYMOUS }
  } catch (err) {
    // Fail-open: jika D1 error, izinkan request agar tidak merusak UX
    console.error('Rate limit check failed:', err)
    return { allowed: true, used: 0, limit: DAILY_LIMIT_ANONYMOUS }
  }
}

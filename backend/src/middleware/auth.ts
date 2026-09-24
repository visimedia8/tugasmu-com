import type { Context, Next } from 'hono'
import type { Bindings } from '../index'

export interface AuthUser {
  userId: string
  email: string
  tier: 'anonymous' | 'free' | 'pro' | 'guru' | 'kelas'
  dailyLimit: number
}

const TIER_LIMITS: Record<string, number> = {
  free: 20,
  trial: 150,
  pro: 500,
  guru: 1000,
  kelas: 2000,
}

async function verifyToken(token: string, secret: string): Promise<{ userId: string; email: string } | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const [headerB64, payloadB64, signatureB64] = parts
    
    // Verify HMAC-SHA256 signature
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    
    const signingInput = `${headerB64}.${payloadB64}`
    const signature = Uint8Array.from(
      atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')),
      c => c.charCodeAt(0)
    )
    
    const valid = await crypto.subtle.verify('HMAC', key, signature, new TextEncoder().encode(signingInput))
    if (!valid) return null
    
    // Decode payload
    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')))
    if (payload.exp && Date.now() >= payload.exp * 1000) return null
    
    return { userId: payload.sub, email: payload.email ?? '' }
  } catch {
    return null
  }
}

export async function authMiddleware(c: Context<{ Bindings: Bindings; Variables: { authUser: AuthUser | null } }>, next: Next) {
  const authHeader = c.req.header('Authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    c.set('authUser', null)
    await next()
    return
  }

  const token = authHeader.replace('Bearer ', '')
  const secret = c.env.NEXTAUTH_SECRET
  
  if (!secret) {
    c.set('authUser', null)
    await next()
    return
  }

  const decoded = await verifyToken(token, secret)
  
  if (!decoded?.userId) {
    c.set('authUser', null)
    await next()
    return
  }

  try {
    const user = await c.env.DB.prepare(
      `SELECT id, email, tier, referral_bonus FROM users WHERE id = ?`
    ).bind(decoded.userId).first<{ id: string; email: string; tier: string; referral_bonus: number }>()

    if (!user) {
      await c.env.DB.prepare(
        `INSERT OR IGNORE INTO users (id, email, tier, quota_daily) VALUES (?, ?, 'free', 20)`
      ).bind(decoded.userId, decoded.email).run()
      
      c.set('authUser', {
        userId: decoded.userId,
        email: decoded.email,
        tier: 'free',
        dailyLimit: 20,
      } as AuthUser)
    } else {
      // Lazy trial expiry check
      let currentTier = user.tier
      if (currentTier === 'trial') {
        const trialSub = await c.env.DB.prepare(
          'SELECT expires_at FROM subscriptions WHERE user_id = ? AND tier = ? AND status = ?'
        ).bind(user.id, 'trial', 'active').first<{ expires_at: string }>()

        if (!trialSub || new Date(trialSub.expires_at) < new Date()) {
          // Trial expired → downgrade ke free silently
          await c.env.DB.batch([
            c.env.DB.prepare('UPDATE users SET tier = ? WHERE id = ?').bind('free', user.id),
            c.env.DB.prepare('UPDATE subscriptions SET status = ? WHERE user_id = ? AND tier = ?')
              .bind('expired', user.id, 'trial'),
          ])
          currentTier = 'free'
        }
      }

      const baseLimit = TIER_LIMITS[currentTier] ?? 20
      const referralBonus = currentTier === 'free' ? (user.referral_bonus ?? 0) : 0
      const effectiveLimit = Math.min(baseLimit + referralBonus, currentTier === 'free' ? 70 : baseLimit)

      c.set('authUser', {
        userId: user.id,
        email: user.email,
        tier: currentTier,
        dailyLimit: effectiveLimit,
      } as AuthUser)
    }
  } catch (err) {
    console.error('DB Error in authMiddleware:', err)
    c.set('authUser', null)
  }

  await next()
}

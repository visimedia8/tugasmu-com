import { Hono } from 'hono'
import type { Bindings } from '../index'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const referral = new Hono<{ Bindings: Bindings; Variables: { authUser: AuthUser | null } }>()
referral.use('*', authMiddleware)

const REFERRAL_BONUS_PER_INVITE = 5   // +5 req/hari permanent per referral sukses
const MAX_REFERRAL_BONUS = 50         // cap: free user max 70 req/hari (20 + 50)
const WELCOME_CREDITS = 20            // bonus kredit untuk yang di-refer

function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no confusing chars (0,O,I,1)
  const arr = new Uint8Array(8)
  crypto.getRandomValues(arr)
  return Array.from(arr).map(b => chars[b % chars.length]).join('')
}

// GET kode referral user (lazy generate jika belum ada)
referral.get('/my-code', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)

  let user = await c.env.DB.prepare(
    'SELECT referral_code, referral_bonus FROM users WHERE id = ?'
  ).bind(authUser.userId).first<{ referral_code: string | null; referral_bonus: number }>()

  if (!user?.referral_code) {
    const code = generateReferralCode()
    await c.env.DB.prepare('UPDATE users SET referral_code = ? WHERE id = ?')
      .bind(code, authUser.userId).run()
    user = { referral_code: code, referral_bonus: 0 }
  }

  const countRow = await c.env.DB.prepare(
    'SELECT COUNT(*) as count FROM users WHERE referred_by = ?'
  ).bind(user.referral_code).first<{ count: number }>()

  return c.json({
    success: true,
    code: user.referral_code,
    link: `https://tugasmu.com/daftar?ref=${user.referral_code}`,
    bonusPerDay: user.referral_bonus,
    successfulReferrals: countRow?.count ?? 0,
  })
})

// POST claim referral (dipanggil setelah user baru sign up, ada ?ref=CODE di URL)
referral.post('/claim', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)

  const { code } = await c.req.json()
  if (!code || typeof code !== 'string') {
    return c.json({ success: false, message: 'Kode referral tidak valid' }, 400)
  }

  // Guard: cek user belum punya referrer
  const self = await c.env.DB.prepare(
    'SELECT referred_by, created_at FROM users WHERE id = ?'
  ).bind(authUser.userId).first<{ referred_by: string | null; created_at: string }>()

  if (self?.referred_by) {
    return c.json({ success: false, message: 'Kamu sudah pernah menggunakan kode referral' }, 409)
  }

  // Cek kode valid
  const referrer = await c.env.DB.prepare(
    'SELECT id, referral_bonus FROM users WHERE referral_code = ?'
  ).bind(code.toUpperCase()).first<{ id: string; referral_bonus: number }>()

  if (!referrer) return c.json({ success: false, message: 'Kode tidak ditemukan' }, 404)
  if (referrer.id === authUser.userId) {
    return c.json({ success: false, message: 'Tidak bisa menggunakan kode sendiri' }, 400)
  }

  // Update: claimed user dapat welcome credits
  await c.env.DB.prepare(
    'UPDATE users SET referred_by = ?, credit_balance = credit_balance + ? WHERE id = ?'
  ).bind(code.toUpperCase(), WELCOME_CREDITS, authUser.userId).run()

  // Update: referrer dapat bonus req/hari (capped)
  const newBonus = Math.min(referrer.referral_bonus + REFERRAL_BONUS_PER_INVITE, MAX_REFERRAL_BONUS)
  await c.env.DB.prepare('UPDATE users SET referral_bonus = ? WHERE id = ?')
    .bind(newBonus, referrer.id).run()

  return c.json({ success: true, welcomeCredits: WELCOME_CREDITS })
})

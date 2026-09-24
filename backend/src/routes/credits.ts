import { Hono } from 'hono'
import type { Bindings } from '../index'
import { authMiddleware, type AuthUser } from '../middleware/auth'
import md5 from 'md5'

export const credits = new Hono<{ Bindings: Bindings; Variables: { authUser: AuthUser | null } }>()
credits.use('*', authMiddleware)

export const CREDIT_BUNDLES: Record<string, { credits: number; price: number; label: string }> = {
  starter:  { credits: 150, price: 10000, label: 'TugasMu Starter 150 Kredit' },
  value:    { credits: 350, price: 19000, label: 'TugasMu Value 350 Kredit' },
  semester: { credits: 700, price: 35000, label: 'TugasMu Semester 700 Kredit' },
}

credits.post('/buy', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)

  const body = await c.req.json()
  const bundle = CREDIT_BUNDLES[body.bundle]
  if (!bundle) return c.json({ success: false, message: 'Bundle tidak valid' }, 400)

  const orderId = `TM-credit-${body.bundle}-${authUser.userId}-${Date.now()}`.substring(0, 50)
  const merchantCode = c.env.DUITKU_MERCHANT_CODE
  const merchantKey = c.env.DUITKU_MERCHANT_KEY
  const isProd = c.env.DUITKU_IS_PRODUCTION === 'true'
  const signature = md5(`${merchantCode}${orderId}${bundle.price}${merchantKey}`)

  const duitkuUrl = isProd
    ? 'https://api-prod.duitku.com/api/merchant/createinvoice'
    : 'https://api-sandbox.duitku.com/api/merchant/createinvoice'

  try {
    const response = await fetch(duitkuUrl, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchantCode,
        paymentAmount: bundle.price,
        merchantOrderId: orderId,
        productDetails: bundle.label,
        email: authUser.email,
        callbackUrl: 'https://tugasmu-api.johananggo.workers.dev/api/payment/webhook',
        returnUrl: 'https://tugasmu.com/akun',
        signature,
      }),
    })

    const data = await response.json() as any
    if (data.statusCode !== '00') {
      return c.json({ success: false, message: data.statusMessage ?? 'Gagal membuat transaksi' }, 400)
    }
    return c.json({ success: true, paymentUrl: data.paymentUrl, reference: data.reference })
  } catch (err) {
    console.error('Credit buy error:', err)
    return c.json({ success: false, message: 'Server error' }, 500)
  }
})

credits.get('/balance', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)

  const row = await c.env.DB.prepare(
    'SELECT credit_balance FROM users WHERE id = ?'
  ).bind(authUser.userId).first<{ credit_balance: number }>()

  return c.json({ success: true, balance: row?.credit_balance ?? 0 })
})

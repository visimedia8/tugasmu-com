import { Hono } from 'hono'
import type { Bindings } from '../index'
import { authMiddleware, type AuthUser } from '../middleware/auth'
import md5 from 'md5'

export const payment = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

const PRICES: Record<string, number> = {
  pro: 29000,
  guru: 99000,
  kelas: 299000,
}

payment.post('/create-transaction', authMiddleware, async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) {
    return c.json({ success: false, message: 'Unauthorized' }, 401)
  }

  try {
    const { tier } = await c.req.json()
    if (!PRICES[tier]) {
      return c.json({ success: false, message: 'Invalid tier' }, 400)
    }

    // Format: TM-tier-userId-timestamp
    const orderId = `TM-${tier}-${authUser.userId}-${Date.now()}`.substring(0, 50)
    const amount = PRICES[tier]

    const merchantCode = c.env.DUITKU_MERCHANT_CODE
    const merchantKey = c.env.DUITKU_MERCHANT_KEY
    const isProd = c.env.DUITKU_IS_PRODUCTION === 'true'

    if (!merchantCode || !merchantKey) {
      return c.json({ success: false, message: 'Duitku is not configured' }, 500)
    }

    const duitkuUrl = isProd 
      ? 'https://api-prod.duitku.com/api/merchant/createinvoice' 
      : 'https://api-sandbox.duitku.com/api/merchant/createinvoice'

    const signature = md5(`${merchantCode}${orderId}${amount}${merchantKey}`)
    
    // Asumsikan backend url untuk callback (harus public)
    const callbackUrl = 'https://tugasmu-api.johananggo.workers.dev/api/payment/webhook'
    const returnUrl = 'https://tugasmu.com/akun'

    const payload = {
      merchantCode,
      paymentAmount: amount,
      merchantOrderId: orderId,
      productDetails: `TugasMu ${tier.toUpperCase()}`,
      email: authUser.email,
      callbackUrl,
      returnUrl,
      signature
    }

    const response = await fetch(duitkuUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errTxt = await response.text()
      console.error('Duitku Error:', errTxt)
      return c.json({ success: false, message: 'Failed to create transaction with Duitku' }, 500)
    }

    const data = await response.json()

    if (data.statusCode !== '00') {
      return c.json({ success: false, message: data.statusMessage }, 400)
    }

    return c.json({
      success: true,
      paymentUrl: data.paymentUrl,
      reference: data.reference
    })
  } catch (err) {
    console.error('Create transaction error:', err)
    return c.json({ success: false, message: 'Server error' }, 500)
  }
})

// Webhook from Duitku
payment.post('/webhook', async (c) => {
  try {
    const body = await c.req.parseBody()
    const merchantCode = body.merchantCode as string
    const amount = body.amount as string
    const merchantOrderId = body.merchantOrderId as string
    const signature = body.signature as string
    const reference = body.reference as string
    const resultCode = body.resultCode as string

    const envMerchantCode = c.env.DUITKU_MERCHANT_CODE
    const merchantKey = c.env.DUITKU_MERCHANT_KEY
    
    // Verify signature (MD5(merchantCode + amount + merchantOrderId + merchantKey))
    const expectedSignature = md5(`${envMerchantCode}${amount}${merchantOrderId}${merchantKey}`)

    if (signature !== expectedSignature) {
      return c.json({ success: false, message: 'Invalid signature' }, 401)
    }

    if (resultCode === '00') { // 00 means success
      // Extract tier and userId from orderId (Format: TM-tier-userId-timestamp or TM-credit-bundle-userId-timestamp)
      const parts = merchantOrderId.split('-')
      
      if (parts[1] === 'credit') {
        const bundle = parts[2]
        const userId = parts[3]
        const CREDIT_BUNDLES: Record<string, number> = { starter: 150, value: 350, semester: 700 }
        const creditsToAdd = CREDIT_BUNDLES[bundle] ?? 0
        
        if (creditsToAdd > 0) {
          await c.env.DB.prepare(`
            UPDATE users SET credit_balance = credit_balance + ? WHERE id = ?
          `).bind(creditsToAdd, userId).run()
        }
      } else if (parts.length >= 4) {
        const tier = parts[1]
        const userId = parts[2]
        
        // 1. Calculate expiration date (+30 days)
        const now = new Date()
        const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()
        
        const subId = crypto.randomUUID()
        const paidAmount = parseInt(amount, 10)

        // 2. Insert into subscriptions
        await c.env.DB.prepare(`
          INSERT INTO subscriptions (id, user_id, tier, status, midtrans_order_id, amount, expires_at)
          VALUES (?, ?, ?, 'active', ?, ?, ?)
          ON CONFLICT(user_id) DO UPDATE SET 
            tier = excluded.tier,
            status = 'active',
            midtrans_order_id = excluded.midtrans_order_id,
            amount = excluded.amount,
            expires_at = excluded.expires_at,
            started_at = CURRENT_TIMESTAMP
        `).bind(subId, userId, tier, merchantOrderId, paidAmount, expiresAt).run()

        // 3. Update user tier
        await c.env.DB.prepare(`
          UPDATE users SET tier = ? WHERE id = ?
        `).bind(tier, userId).run()
      }
    }

    return c.json({ success: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return c.json({ success: false, message: 'Webhook processing failed' }, 500)
  }
})

import { Hono } from 'hono'
import type { Bindings } from '../index'
import { hashPassword, verifyPassword } from '../utils/hash'

export const auth = new Hono<{ Bindings: Bindings }>()

auth.post('/register', async (c) => {
  try {
    const { name, email, password } = await c.req.json()

    if (!email || !password) {
      return c.json({ success: false, message: 'Email and password are required' }, 400)
    }

    // Check if user exists
    const existingUser = await c.env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first()
    if (existingUser) {
      return c.json({ success: false, message: 'Email already exists' }, 400)
    }

    const salt = c.env.NEXTAUTH_SECRET || 'default_salt_change_me'
    const passwordHash = await hashPassword(password, salt)
    const userId = crypto.randomUUID()

    await c.env.DB.prepare(
      `INSERT INTO users (id, email, name, password_hash, tier, quota_daily, role) VALUES (?, ?, ?, ?, 'free', 20, 'user')`
    ).bind(userId, email, name, passwordHash).run()

    return c.json({ success: true, message: 'User registered successfully', userId })
  } catch (err) {
    console.error('Register error:', err)
    return c.json({ success: false, message: 'Internal server error' }, 500)
  }
})

auth.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json()

    if (!email || !password) {
      return c.json({ success: false, message: 'Email and password are required' }, 400)
    }

    const user = await c.env.DB.prepare(
      'SELECT id, name, email, password_hash FROM users WHERE email = ?'
    ).bind(email).first<{ id: string, name: string | null, email: string, password_hash: string | null }>()

    if (!user || !user.password_hash) {
      return c.json({ success: false, message: 'Invalid credentials or user uses Google Login' }, 401)
    }

    const salt = c.env.NEXTAUTH_SECRET || 'default_salt_change_me'
    const isValid = await verifyPassword(password, user.password_hash, salt)

    if (!isValid) {
      return c.json({ success: false, message: 'Invalid credentials' }, 401)
    }

    return c.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    console.error('Login error:', err)
    return c.json({ success: false, message: 'Internal server error' }, 500)
  }
})

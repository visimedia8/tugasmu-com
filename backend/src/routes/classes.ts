import { Hono } from 'hono'
import type { Bindings } from '../index'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const classes = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

classes.use('*', authMiddleware)

// Helper to check if user can create class
function canManageClass(tier: string) {
  return tier === 'guru' || tier === 'kelas' || tier === 'pro' // For demo, maybe pro can't? Based on plan, only guru/kelas
}

function generateClassCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Create a new class
classes.post('/', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)
  
  if (authUser.tier !== 'guru' && authUser.tier !== 'kelas') {
    return c.json({ success: false, message: 'Hanya Guru yang dapat membuat kelas. Silakan upgrade.' }, 403)
  }

  const { name } = await c.req.json()
  if (!name) return c.json({ success: false, message: 'Nama kelas wajib diisi' }, 400)

  const classId = crypto.randomUUID()
  const code = generateClassCode()

  try {
    await c.env.DB.prepare(`
      INSERT INTO classes (id, code, name, owner_id) VALUES (?, ?, ?, ?)
    `).bind(classId, code, name, authUser.userId).run()

    // Add owner as teacher in class_members
    await c.env.DB.prepare(`
      INSERT INTO class_members (class_id, user_id, role) VALUES (?, ?, 'teacher')
    `).bind(classId, authUser.userId).run()

    return c.json({ success: true, class: { id: classId, code, name } })
  } catch (err) {
    console.error('Create class error:', err)
    return c.json({ success: false, message: 'Gagal membuat kelas' }, 500)
  }
})

// Join a class
classes.post('/join', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)

  const { code } = await c.req.json()
  if (!code) return c.json({ success: false, message: 'Kode kelas wajib diisi' }, 400)

  try {
    const classRow = await c.env.DB.prepare(`
      SELECT id, name FROM classes WHERE code = ?
    `).bind(code.toUpperCase()).first<{ id: string; name: string }>()

    if (!classRow) {
      return c.json({ success: false, message: 'Kode kelas tidak ditemukan' }, 404)
    }

    await c.env.DB.prepare(`
      INSERT INTO class_members (class_id, user_id, role) VALUES (?, ?, 'student')
      ON CONFLICT(class_id, user_id) DO NOTHING
    `).bind(classRow.id, authUser.userId).run()

    // Cek apakah murid pernah dapat trial sebelumnya
    const existingTrial = await c.env.DB.prepare(
      'SELECT id FROM subscriptions WHERE user_id = ? AND tier = ?'
    ).bind(authUser.userId, 'trial').first()

    if (!existingTrial) {
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      const subId = crypto.randomUUID()

      // Insert trial subscription
      await c.env.DB.prepare(`
        INSERT OR IGNORE INTO subscriptions (id, user_id, tier, status, amount, expires_at)
        VALUES (?, ?, 'trial', 'active', 0, ?)
      `).bind(subId, authUser.userId, expiresAt).run()

      // Update tier ke trial hanya jika saat ini masih free
      await c.env.DB.prepare(
        'UPDATE users SET tier = ? WHERE id = ? AND tier = ?'
      ).bind('trial', authUser.userId, 'free').run()
    }

    return c.json({ 
      success: true, 
      message: 'Berhasil bergabung ke kelas', 
      class: classRow,
      trialGranted: !existingTrial
    })
  } catch (err) {
    console.error('Join class error:', err)
    return c.json({ success: false, message: 'Gagal bergabung ke kelas' }, 500)
  }
})

// List classes
classes.get('/', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)

  try {
    const { results } = await c.env.DB.prepare(`
      SELECT c.id, c.code, c.name, cm.role,
        (SELECT COUNT(*) FROM class_members WHERE class_id = c.id) as member_count
      FROM classes c
      JOIN class_members cm ON c.id = cm.class_id
      WHERE cm.user_id = ?
      ORDER BY c.created_at DESC
    `).bind(authUser.userId).all()

    return c.json({ success: true, classes: results })
  } catch (err) {
    console.error('List classes error:', err)
    return c.json({ success: false, message: 'Gagal mengambil data kelas' }, 500)
  }
})

// Get class detail
classes.get('/:id', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)
  
  const classId = c.req.param('id')

  try {
    // Verify membership
    const member = await c.env.DB.prepare(`
      SELECT role FROM class_members WHERE class_id = ? AND user_id = ?
    `).bind(classId, authUser.userId).first<{ role: string }>()

    if (!member) {
      return c.json({ success: false, message: 'Bukan anggota kelas' }, 403)
    }

    const classData = await c.env.DB.prepare(`
      SELECT id, code, name, owner_id FROM classes WHERE id = ?
    `).bind(classId).first()

    // Get students
    const { results: students } = await c.env.DB.prepare(`
      SELECT cm.user_id, cm.joined_at, u.email
      FROM class_members cm
      LEFT JOIN users u ON cm.user_id = u.id
      WHERE cm.class_id = ? AND cm.role = 'student'
    `).bind(classId).all()

    return c.json({ 
      success: true, 
      class: classData,
      role: member.role,
      students 
    })
  } catch (err) {
    console.error('Class detail error:', err)
    return c.json({ success: false, message: 'Gagal mengambil detail kelas' }, 500)
  }
})

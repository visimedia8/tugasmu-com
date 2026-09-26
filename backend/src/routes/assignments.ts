import { Hono } from 'hono'
import type { Bindings } from '../index'
import { authMiddleware, type AuthUser } from '../middleware/auth'

export const assignments = new Hono<{ Bindings: Bindings, Variables: { authUser: AuthUser | null } }>()

assignments.use('*', authMiddleware)

// Create assignment
assignments.post('/class/:classId', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)
  
  const classId = c.req.param('classId')
  const { tool_slug, title, instructions, due_date } = await c.req.json()

  try {
    const member = await c.env.DB.prepare(`
      SELECT role FROM class_members WHERE class_id = ? AND user_id = ?
    `).bind(classId, authUser.userId).first<{ role: string }>()

    if (member?.role !== 'teacher') {
      return c.json({ success: false, message: 'Hanya pengajar yang dapat membuat tugas' }, 403)
    }

    const id = crypto.randomUUID()
    await c.env.DB.prepare(`
      INSERT INTO assignments (id, class_id, tool_slug, title, instructions, due_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(id, classId, tool_slug, title, instructions, due_date).run()

    return c.json({ success: true, assignment: { id, title } })
  } catch (err) {
    console.error('Create assignment error:', err)
    return c.json({ success: false, message: 'Gagal membuat tugas' }, 500)
  }
})

// List assignments for a class
assignments.get('/class/:classId', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)
  
  const classId = c.req.param('classId')

  try {
    const { results } = await c.env.DB.prepare(`
      SELECT a.*, 
        (SELECT COUNT(*) FROM submissions s WHERE s.assignment_id = a.id AND s.user_id = ?) as is_submitted
      FROM assignments a
      WHERE a.class_id = ?
      ORDER BY a.created_at DESC
      LIMIT 50
    `).bind(authUser.userId, classId).all()

    return c.json({ success: true, assignments: results })
  } catch (err) {
    console.error('List assignments error:', err)
    return c.json({ success: false, message: 'Gagal mengambil tugas' }, 500)
  }
})

// Submit assignment
assignments.post('/:assignmentId/submit', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)

  const assignmentId = c.req.param('assignmentId')
  const { result_text } = await c.req.json()

  try {
    const id = crypto.randomUUID()
    await c.env.DB.prepare(`
      INSERT INTO submissions (id, assignment_id, user_id, result_text)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(assignment_id, user_id) DO UPDATE SET
        result_text = excluded.result_text,
        submitted_at = CURRENT_TIMESTAMP
    `).bind(id, assignmentId, authUser.userId, result_text).run()

    return c.json({ success: true, message: 'Berhasil submit tugas' })
  } catch (err) {
    console.error('Submit assignment error:', err)
    return c.json({ success: false, message: 'Gagal submit tugas' }, 500)
  }
})

// List submissions for an assignment
assignments.get('/:assignmentId/submissions', async (c) => {
  const authUser = c.get('authUser')
  if (!authUser) return c.json({ success: false, message: 'Unauthorized' }, 401)

  const assignmentId = c.req.param('assignmentId')

  try {
    // Check if user is teacher of the class
    const assignment = await c.env.DB.prepare(`
      SELECT class_id FROM assignments WHERE id = ?
    `).bind(assignmentId).first<{ class_id: string }>()

    if (!assignment) return c.json({ success: false, message: 'Tugas tidak ditemukan' }, 404)

    const member = await c.env.DB.prepare(`
      SELECT role FROM class_members WHERE class_id = ? AND user_id = ?
    `).bind(assignment.class_id, authUser.userId).first<{ role: string }>()

    if (member?.role !== 'teacher') {
      return c.json({ success: false, message: 'Hanya pengajar yang dapat melihat hasil' }, 403)
    }

    const { results } = await c.env.DB.prepare(`
      SELECT s.*, u.email
      FROM submissions s
      JOIN users u ON s.user_id = u.id
      WHERE s.assignment_id = ?
      ORDER BY s.submitted_at DESC
      LIMIT 100
    `).bind(assignmentId).all()

    return c.json({ success: true, submissions: results })
  } catch (err) {
    console.error('List submissions error:', err)
    return c.json({ success: false, message: 'Gagal mengambil hasil' }, 500)
  }
})

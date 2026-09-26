/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const tokenRes = await fetch('/api/auth/token')
      const tokenData = await tokenRes.json().catch(() => ({}))
      const token = tokenData.token || ''

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787'}/api/admin/users?limit=50&offset=0`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setUsers(data.users)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function updateUser(id: string, updates: unknown) {
    try {
      const tokenRes = await fetch('/api/auth/token')
      const tokenData = await tokenRes.json().catch(() => ({}))
      const token = tokenData.token || ''

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787'}/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })
      const data = await res.json()
      if (data.success) {
        fetchUsers()
        toast.success('User updated!')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to update user')
    }
  }

  if (loading) return <div>Loading users...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Users</h1>
      <div className="bg-white rounded-md border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">Email</th>
              <th className="px-4 py-3 font-medium text-slate-600">Role</th>
              <th className="px-4 py-3 font-medium text-slate-600">Tier</th>
              <th className="px-4 py-3 font-medium text-slate-600">Quota</th>
              <th className="px-4 py-3 font-medium text-slate-600">Credits</th>
              <th className="px-4 py-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">
                  <select 
                    value={u.role}
                    onChange={(e) => updateUser(u.id, { ...u, role: e.target.value })}
                    className="border rounded p-1 bg-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select 
                    value={u.tier}
                    onChange={(e) => updateUser(u.id, { ...u, tier: e.target.value })}
                    className="border rounded p-1 bg-white"
                  >
                    <option value="free">Free</option>
                    <option value="trial">Trial</option>
                    <option value="pro">Pro</option>
                    <option value="guru">Guru</option>
                    <option value="kelas">Kelas</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <input 
                    type="number" 
                    defaultValue={u.quota_daily}
                    onBlur={(e) => updateUser(u.id, { ...u, quota_daily: parseInt(e.target.value, 10) })}
                    className="border rounded p-1 w-20"
                  />
                </td>
                <td className="px-4 py-3">
                  <input 
                    type="number" 
                    defaultValue={u.credit_balance}
                    onBlur={(e) => updateUser(u.id, { ...u, credit_balance: parseInt(e.target.value, 10) })}
                    className="border rounded p-1 w-20"
                  />
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-slate-400">Auto-saves on blur/change</span>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

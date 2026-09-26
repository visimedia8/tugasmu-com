'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AdminOrganizationsPage() {
  const [orgs, setOrgs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newOrg, setNewOrg] = useState({ name: '', owner_id: '', seat_limit: 50 })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchOrgs()
  }, [])

  async function fetchOrgs() {
    try {
      const tokenRes = await fetch('/api/auth/token')
      const tokenData = await tokenRes.json().catch(() => ({}))
      const token = tokenData.token || ''

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787'}/api/admin/organizations?limit=50&offset=0`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setOrgs(data.organizations)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function createOrg(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const tokenRes = await fetch('/api/auth/token')
      const tokenData = await tokenRes.json().catch(() => ({}))
      const token = tokenData.token || ''

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787'}/api/admin/organizations`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrg)
      })
      const data = await res.json()
      if (data.success) {
        setNewOrg({ name: '', owner_id: '', seat_limit: 50 })
        fetchOrgs() // Refresh list
        toast.success('Organization created successfully!')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to create organization')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div>Loading organizations...</div>

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Manage Organizations (B2B)</h1>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Create New Organization</h2>
        <form onSubmit={createOrg} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">Organization Name</label>
            <input 
              required
              type="text" 
              value={newOrg.name}
              onChange={e => setNewOrg({...newOrg, name: e.target.value})}
              className="w-full border rounded-md p-2"
              placeholder="e.g. SMPN 1 Jakarta"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">Owner ID (User UUID)</label>
            <input 
              required
              type="text" 
              value={newOrg.owner_id}
              onChange={e => setNewOrg({...newOrg, owner_id: e.target.value})}
              className="w-full border rounded-md p-2"
              placeholder="UUID of the Teacher/Admin"
            />
          </div>
          <div className="w-full md:w-32">
            <label className="block text-sm font-medium text-slate-700 mb-1">Seat Limit</label>
            <input 
              required
              type="number" 
              value={newOrg.seat_limit}
              onChange={e => setNewOrg({...newOrg, seat_limit: parseInt(e.target.value, 10)})}
              className="w-full border rounded-md p-2"
              min="1"
            />
          </div>
          <button 
            type="submit" 
            disabled={submitting}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {submitting ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">ID</th>
              <th className="px-4 py-3 font-medium text-slate-600">Name</th>
              <th className="px-4 py-3 font-medium text-slate-600">Owner ID</th>
              <th className="px-4 py-3 font-medium text-slate-600">Seat Limit</th>
              <th className="px-4 py-3 font-medium text-slate-600">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orgs.map(org => (
              <tr key={org.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-mono text-xs truncate max-w-[100px]">{org.id}</td>
                <td className="px-4 py-3 font-medium">{org.name}</td>
                <td className="px-4 py-3 font-mono text-xs truncate max-w-[100px]">{org.owner_id}</td>
                <td className="px-4 py-3">{org.seat_limit}</td>
                <td className="px-4 py-3">{new Date(org.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {orgs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No organizations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

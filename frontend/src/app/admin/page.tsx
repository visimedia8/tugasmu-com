'use client'

import { useEffect, useState } from 'react'
import { Users, Activity, CreditCard } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const tokenRes = await fetch('/api/auth/token')
        const tokenData = await tokenRes.json().catch(() => ({}))
        const token = tokenData.token || ''

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787'}/api/admin/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await res.json()
        if (data.success) {
          setStats(data.stats)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) return <div>Loading stats...</div>
  if (!stats) return <div>Failed to load stats. Are you an admin?</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-row items-center justify-between p-6 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">Total Users</h3>
            <Users className="h-4 w-4 text-slate-500" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-row items-center justify-between p-6 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">Active Subscriptions</h3>
            <CreditCard className="h-4 w-4 text-slate-500" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-row items-center justify-between p-6 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">Tools Usage</h3>
            <Activity className="h-4 w-4 text-slate-500" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{stats.totalToolsUsage}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

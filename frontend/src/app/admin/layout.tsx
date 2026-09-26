import { ReactNode } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Users, Building } from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col hidden md:flex">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-slate-900">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100">
            <Users size={20} />
            Manage Users
          </Link>
          <Link href="/admin/organizations" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100">
            <Building size={20} />
            Organizations (B2B)
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/(auth)/actions'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'super_admin' && profile?.role !== 'ops_admin') {
    redirect('/portal')
  }

  return (
    <div className="min-h-screen bg-chalk flex flex-col md:flex-row font-sans text-slate">
      <aside className="w-full md:w-64 bg-slate text-white shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/admin" className="text-xl font-heading tracking-widest uppercase flex items-center gap-2">
             CA Admin
          </Link>
        </div>
        <nav className="p-4 space-y-2 font-heading tracking-wider uppercase text-sm">
          <Link href="/admin"><Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/10 rounded-sm">Dashboard</Button></Link>
          
          {profile?.role === 'super_admin' && (
            <>
              <Link href="/admin/students"><Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/10 rounded-sm">Students</Button></Link>
              <Link href="/admin/batches"><Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/10 rounded-sm">Batches</Button></Link>
              <Link href="/admin/fees"><Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/10 rounded-sm">Fees</Button></Link>
              <Link href="/admin/content"><Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/10 rounded-sm">Content</Button></Link>
              <Link href="/admin/users"><Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/10 rounded-sm">Users</Button></Link>
            </>
          )}

          {profile?.role === 'ops_admin' && (
            <>
              <Link href="/admin/student-verification"><Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/10 rounded-sm">Student Verification</Button></Link>
              <Link href="/admin/payment-verification"><Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/10 rounded-sm">Payment Verification</Button></Link>
              <Link href="/admin/reports"><Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/10 rounded-sm">Reports</Button></Link>
            </>
          )}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-end px-6 border-b border-slate/10 bg-white shrink-0">
          <form action={logout}>
            <Button variant="ghost" size="sm" type="submit" className="text-crimson hover:text-crimson/80 hover:bg-crimson/10 font-heading uppercase tracking-widest text-xs rounded-sm">Sign Out</Button>
          </form>
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-chalk">
          {children}
        </main>
      </div>
    </div>
  )
}

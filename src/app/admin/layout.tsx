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
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-white/10 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/admin" className="text-xl font-bold text-white flex items-center gap-2">
             CA Admin
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin"><Button variant="ghost" className="w-full justify-start text-white">Dashboard</Button></Link>
          <Link href="/admin/students"><Button variant="ghost" className="w-full justify-start text-white">Students</Button></Link>
          <Link href="/admin/batches"><Button variant="ghost" className="w-full justify-start text-white">Batches</Button></Link>
          <Link href="/admin/fees"><Button variant="ghost" className="w-full justify-start text-white">Fees</Button></Link>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-end px-6 border-b border-white/10 bg-zinc-900 shrink-0">
          <form action={logout}>
            <Button variant="ghost" size="sm" type="submit">Sign Out</Button>
          </form>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

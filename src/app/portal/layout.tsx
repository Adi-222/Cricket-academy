import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/(auth)/actions'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white border-b border-slate/10 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/portal" className="text-xl font-heading text-slate uppercase flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-crimson flex items-center justify-center text-white text-sm tracking-wider">
                CA
              </div>
              Student Portal
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate/60 text-sm hidden sm:block font-sans">
              Parent: <strong className="text-slate">{profile?.full_name || user.email}</strong>
            </span>
            <form action={logout}>
              <Button variant="ghost" size="sm" type="submit" className="text-crimson hover:text-crimson/80 hover:bg-crimson/10 font-heading uppercase tracking-widest text-xs">Sign Out</Button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-12">
        {children}
      </main>
    </div>
  )
}

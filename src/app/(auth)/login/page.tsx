import { login, signup } from '../actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message?: string, tab?: string }> }) {
  const params = await searchParams;
  const isSignup = params?.tab === 'signup'

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-md w-full space-y-8 glass p-8 rounded-3xl border border-white/10">
        <div>
          <Link href="/" className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl">
              CA
            </div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isSignup ? 'Create your account' : 'Log in to your account'}
          </h2>
          {params?.message && (
            <p className="mt-4 text-center text-sm text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {params.message}
            </p>
          )}
        </div>
        <form className="mt-8 space-y-6" action={isSignup ? signup : login}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-4">
            {isSignup && (
              <>
                <div>
                  <label htmlFor="full_name" className="sr-only">Full Name</label>
                  <input id="full_name" name="full_name" type="text" required className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Full Name" />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Phone Number</label>
                  <input id="phone" name="phone" type="tel" required className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Phone Number" />
                </div>
              </>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className={`appearance-none rounded-lg relative block w-full px-4 py-3 border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`} placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} required className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full py-6 text-lg">
              {isSignup ? 'Sign Up' : 'Log In'}
            </Button>
          </div>
          
          <div className="text-center mt-6">
              {isSignup ? (
                  <p className="text-sm text-zinc-400">Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link></p>
              ) : (
                  <p className="text-sm text-zinc-400">Don't have an account? <Link href="/login?tab=signup" className="text-primary hover:underline">Sign up</Link></p>
              )}
          </div>
        </form>
      </div>
    </div>
  )
}

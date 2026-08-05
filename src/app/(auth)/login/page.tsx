import { login, signup } from '../actions'
import Link from 'next/link'
import { SubmitButton } from '@/components/auth/SubmitButton'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message?: string, tab?: string }> }) {
  const params = await searchParams;
  const isSignup = params?.tab === 'signup'

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-pitch">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-sm shadow-sm border-t-4 border-t-crimson">
        <div>
          <Link href="/" className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-slate flex items-center justify-center text-white font-heading text-2xl tracking-wider">
              CA
            </div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-heading text-slate uppercase tracking-wide">
            {isSignup ? 'Academy Registration' : 'Client Portal Login'}
          </h2>
          {params?.message && (
            <p className="mt-4 text-center text-sm font-sans text-crimson bg-crimson/10 p-3 rounded-sm border border-crimson/20">
              {params.message}
            </p>
          )}
        </div>
        <form className="mt-8 space-y-6" action={isSignup ? signup : login}>
          <input type="hidden" name="remember" value="true" />
          <div className="space-y-4">
            {isSignup && (
              <>
                <div className="space-y-1">
                  <label htmlFor="full_name" className="block text-xs font-heading tracking-widest uppercase text-slate/70">Parent / Guardian Name</label>
                  <input id="full_name" name="full_name" type="text" required className="appearance-none rounded-sm relative block w-full px-4 py-3 border border-slate/20 bg-chalk text-slate focus:outline-none focus:ring-1 focus:ring-crimson focus:border-crimson sm:text-sm font-sans" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-xs font-heading tracking-widest uppercase text-slate/70">Phone Number</label>
                  <input id="phone" name="phone" type="tel" required className="appearance-none rounded-sm relative block w-full px-4 py-3 border border-slate/20 bg-chalk text-slate focus:outline-none focus:ring-1 focus:ring-crimson focus:border-crimson sm:text-sm font-sans" placeholder="+91 98765 43210" />
                </div>
              </>
            )}
            <div className="space-y-1">
              <label htmlFor="email-address" className="block text-xs font-heading tracking-widest uppercase text-slate/70">Email Address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-sm relative block w-full px-4 py-3 border border-slate/20 bg-chalk text-slate focus:outline-none focus:ring-1 focus:ring-crimson focus:border-crimson sm:text-sm font-sans" placeholder="parent@example.com" />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="block text-xs font-heading tracking-widest uppercase text-slate/70">Password</label>
              <input id="password" name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} required className="appearance-none rounded-sm relative block w-full px-4 py-3 border border-slate/20 bg-chalk text-slate focus:outline-none focus:ring-1 focus:ring-crimson focus:border-crimson sm:text-sm font-sans" placeholder="••••••••" />
            </div>
          </div>

          {!isSignup && (
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link href="/forgot-password" className="font-sans text-sm text-slate hover:text-crimson transition-colors">
                  Forgot your password?
                </Link>
              </div>
            </div>
          )}

          <div>
            <SubmitButton 
              className="w-full py-6 text-lg bg-crimson hover:bg-crimson/90 text-white font-heading uppercase tracking-widest rounded-sm" 
              defaultText={isSignup ? 'Sign Up' : 'Log In'} 
              loadingText={isSignup ? 'Processing...' : 'Authenticating...'} 
            />
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-slate/10">
              {isSignup ? (
                  <p className="text-sm text-slate/70 font-sans">Already have an account? <Link href="/login" className="text-crimson font-medium hover:underline">Log in</Link></p>
              ) : (
                  <p className="text-sm text-slate/70 font-sans">Don't have an account? <Link href="/login?tab=signup" className="text-crimson font-medium hover:underline">Register now</Link></p>
              )}
          </div>
        </form>
      </div>
    </div>
  )
}

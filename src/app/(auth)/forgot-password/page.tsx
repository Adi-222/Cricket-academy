import { resetPassword } from '../actions'
import Link from 'next/link'
import { SubmitButton } from '@/components/auth/SubmitButton'

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ message?: string, success?: string }> }) {
  const params = await searchParams;

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
            Password Reset
          </h2>
          <p className="mt-2 text-center text-sm font-sans text-slate/70">
            Enter your email address to receive a secure reset link.
          </p>
          {params?.message && (
            <p className="mt-4 text-center text-sm font-sans text-crimson bg-crimson/10 p-3 rounded-sm border border-crimson/20">
              {params.message}
            </p>
          )}
          {params?.success && (
            <p className="mt-4 text-center text-sm font-sans text-eden bg-eden/10 p-3 rounded-sm border border-eden/20">
              {params.success}
            </p>
          )}
        </div>
        
        {!params?.success && (
          <form className="mt-8 space-y-6" action={resetPassword}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="email-address" className="block text-xs font-heading tracking-widest uppercase text-slate/70">Email Address</label>
                <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-sm relative block w-full px-4 py-3 border border-slate/20 bg-chalk text-slate focus:outline-none focus:ring-1 focus:ring-crimson focus:border-crimson sm:text-sm font-sans" placeholder="parent@example.com" />
              </div>
            </div>

            <div>
              <SubmitButton 
                className="w-full py-6 text-lg bg-crimson hover:bg-crimson/90 text-white font-heading uppercase tracking-widest rounded-sm" 
                defaultText="Send Reset Link" 
                loadingText="Sending..." 
              />
            </div>
          </form>
        )}

        <div className="text-center mt-6 pt-6 border-t border-slate/10">
            <p className="text-sm font-sans text-slate/70">
              <Link href="/login" className="text-crimson font-medium hover:underline">Return to log in</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

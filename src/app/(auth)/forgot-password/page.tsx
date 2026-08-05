import { resetPassword } from '../actions'
import Link from 'next/link'
import { SubmitButton } from '@/components/auth/SubmitButton'

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ message?: string, success?: string }> }) {
  const params = await searchParams;

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
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Enter your email address and we will send you a link to reset your password.
          </p>
          {params?.message && (
            <p className="mt-4 text-center text-sm text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {params.message}
            </p>
          )}
          {params?.success && (
            <p className="mt-4 text-center text-sm text-green-500 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
              {params.success}
            </p>
          )}
        </div>
        
        {!params?.success && (
          <form className="mt-8 space-y-6" action={resetPassword}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Email address" />
              </div>
            </div>

            <div>
              <SubmitButton 
                className="w-full py-6 text-lg" 
                defaultText="Send Reset Link" 
                loadingText="Sending..." 
              />
            </div>
          </form>
        )}

        <div className="text-center mt-6">
            <p className="text-sm text-zinc-400">
              <Link href="/login" className="text-primary hover:underline">Return to log in</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

import { updatePassword } from '@/app/(auth)/actions'
import { SubmitButton } from '@/components/auth/SubmitButton'

export default async function UpdatePasswordPage({ searchParams }: { searchParams: Promise<{ message?: string, success?: string }> }) {
  const params = await searchParams;

  return (
    <div className="max-w-md mx-auto space-y-8 mt-12 bg-white p-10 rounded-sm shadow-sm border-t-4 border-t-crimson">
      <div>
        <h2 className="text-3xl font-heading text-slate uppercase tracking-wide">
          Update Password
        </h2>
        <p className="mt-2 text-sm font-sans text-slate/70">
          Please enter your new password below.
        </p>
        
        {params?.message && (
          <p className="mt-4 text-center text-sm font-sans text-crimson bg-crimson/10 p-3 rounded-sm border border-crimson/20">
            {params.message}
          </p>
        )}
      </div>

      <form className="mt-8 space-y-6" action={updatePassword}>
        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="password" className="block text-xs font-heading tracking-widest uppercase text-slate/70">New Password</label>
            <input id="password" name="password" type="password" required className="appearance-none rounded-sm relative block w-full px-4 py-3 border border-slate/20 bg-chalk text-slate focus:outline-none focus:ring-1 focus:ring-crimson focus:border-crimson sm:text-sm font-sans" placeholder="••••••••" minLength={6} />
          </div>
        </div>

        <div>
          <SubmitButton 
            className="w-full py-6 text-lg bg-crimson hover:bg-crimson/90 text-white font-heading uppercase tracking-widest rounded-sm" 
            defaultText="Save Password" 
            loadingText="Saving..." 
          />
        </div>
      </form>
    </div>
  )
}

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // The 'next' param is used to redirect after successful verification.
  // In the password reset flow, this points to /portal/update-password
  const next = searchParams.get('next') ?? '/portal'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If the link is invalid or expired
  return NextResponse.redirect(`${origin}/login?message=Invalid or expired link. Please try again.`)
}

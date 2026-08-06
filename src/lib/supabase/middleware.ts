import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables! Check your .env.local file. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.')
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect portal and admin routes
  if (
    !user &&
    (request.nextUrl.pathname.startsWith('/portal') || request.nextUrl.pathname.startsWith('/admin'))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Role-Based Access Control (RBAC)
  if (user) {
    const isPortalRoute = request.nextUrl.pathname.startsWith('/portal')
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

    if (isPortalRoute || isAdminRoute) {
      // Fetch role from profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      const role = profile?.role || 'client'

      // Admin trying to access portal -> redirect to admin
      if (isPortalRoute && (role === 'super_admin' || role === 'ops_admin')) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin'
        return NextResponse.redirect(url)
      }

      // Client trying to access admin -> redirect to portal
      if (isAdminRoute && role === 'client') {
        const url = request.nextUrl.clone()
        url.pathname = '/portal'
        return NextResponse.redirect(url)
      }

      // Super Admin specific routes protection
      const isSuperAdminRoute = request.nextUrl.pathname.startsWith('/admin/content') || 
                                request.nextUrl.pathname.startsWith('/admin/users')
      if (isSuperAdminRoute && role !== 'super_admin') {
        const url = request.nextUrl.clone()
        url.pathname = '/admin'
        // optionally append an error message
        url.searchParams.set('error', 'Unauthorized access')
        return NextResponse.redirect(url)
      }
    }
  }
  return supabaseResponse
}

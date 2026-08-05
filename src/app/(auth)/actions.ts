'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  
  // check role for redirection
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
      
    if (profile?.role === 'super_admin' || profile?.role === 'ops_admin') {
      redirect('/admin')
    }
  }

  redirect('/portal')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
        data: {
            full_name: formData.get('full_name') as string,
            phone: formData.get('phone') as string
        }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/login?tab=signup&message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/portal')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
}

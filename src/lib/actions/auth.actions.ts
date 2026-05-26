'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const EmailSchema = z.object({
  email: z.string().email(),
})

export async function signInWithMagicLink(formData: FormData) {
  const parsed = EmailSchema.safeParse({
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return { error: 'Invalid email address' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      // In production this should be your actual URL
      emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback` : 'http://localhost:3000/auth/callback',
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

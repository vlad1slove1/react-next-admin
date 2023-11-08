'use client'

import React, { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

import type { ReactNode } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs'

interface IAuthProviderProps {
  accessToken: string | null
  children: ReactNode
}

export default function AuthProvider ({
  accessToken,
  children
}: IAuthProviderProps): React.JSX.Element {
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription: authListener }
    } = supabase.auth.onAuthStateChange((_event, session: Session | null): void => {
      if (session?.access_token !== accessToken) router.refresh()
    })

    return (): void => {
      authListener?.unsubscribe()
    }
  }, [accessToken, supabase, router])

  return <>{children}</>
}

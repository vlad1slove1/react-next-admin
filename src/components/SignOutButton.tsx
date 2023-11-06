'use client'

import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

import { Button } from '@nextui-org/react'
import SignOutIcon from '@/components/icons/SignOutIcon'

import type { Database } from '@/types/database.types'

export default function SignOutButton (): React.JSX.Element {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  async function handleSignOut (): Promise<void> {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out', error)
    } finally {
      router.refresh()
    }
  }

  return (
    <>
      <Button
        color="danger"
        variant="light"
        size="md"
        startContent={<SignOutIcon />}
        onPress={handleSignOut}
        className="flex-initial uppercase font-extrabold rounded-none"
      >
        Sign out
      </Button>
    </>
  )
}

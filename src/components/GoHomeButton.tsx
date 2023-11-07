import React from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@nextui-org/react'
import HomeIcon from '@/components/icons/HomeIcon'

export default function GoHomeButton ({ ...props }): React.JSX.Element {
  const router = useRouter()

  return (
    <>
      <Button
        color="default"
        variant="light"
        size="md"
        startContent={<HomeIcon />}
        onClick={() => router.push('/')}
        className="flex-initial uppercase font-extrabold rounded-none"
        {...props}
      >
        Home
      </Button>
    </>
  )
}

import React from 'react'
import { Button, useDisclosure } from '@nextui-org/react'

import NewOrderModal from './modals/NewOrderModal'
import AddIcon from './icons/AddIcon'

export default function NewOrderButton (): React.JSX.Element {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        color="primary"
        variant="light"
        size="md"
        startContent={<AddIcon />}
        onPress={onOpen}
        className="flex-initial uppercase font-extrabold rounded-none"
      >
        New order
      </Button>

      <NewOrderModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}

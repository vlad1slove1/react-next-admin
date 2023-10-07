import React, { useState } from 'react'
import dayjs, { type Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useForm, type SubmitHandler } from 'react-hook-form'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from '@nextui-org/react'
import AddIcon from './icons/AddIcon'
import MailIcon from './icons/MailIcon'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// Load plugins
dayjs.extend(utc)
dayjs.extend(timezone)

// Set the default timezone to Moscow
dayjs.tz.setDefault('Europe/Moscow')

type Inputs = {
  about: string | null
  address: string | null
  author: string | null
  company: string | null
  contact: string | null
  createdAt: string | null
  email: string | null
  id: number | null
  price: string | null
}

export default function NewOrderButton (): React.JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  // Get the current date in Moscow
  const currentDateInMoscow: Dayjs = dayjs()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [date, setDate] = useState<Dayjs | null>(currentDateInMoscow)

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

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        className="text-neutral-700"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold">Create order</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Choose date"
                      value={date}
                      onChange={(newValue) => { setDate(newValue) }}
                    />
                  </LocalizationProvider>

                  <Input
                    autoFocus
                    isClearable
                    isRequired
                    label="Author"
                    placeholder="Author"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                  />

                  <Input
                    isClearable
                    isRequired
                    label="Price"
                    type="number"
                    placeholder="0.00"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                  />

                  <Input
                    isClearable
                    isRequired
                    label="Company"
                    placeholder="Company"
                    type="text"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                  />

                  <Input
                    isClearable
                    isRequired
                    label="Address"
                    type="text"
                    variant="bordered"
                    radius="none"
                  />

                  <Input
                    isClearable
                    isRequired
                    label="Contact"
                    type="text"
                    variant="bordered"
                    radius="none"
                  />

                  <Input
                    isClearable
                    isRequired
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />

                  <Input
                    isClearable
                    isRequired
                    label="Description"
                    type="text"
                    variant="bordered"
                    radius="none"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary">
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>

  )
}

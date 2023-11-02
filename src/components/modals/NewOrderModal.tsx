/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, type SyntheticEvent } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '@/redux/hooks'
import { useGetOrdersQuery, useCreateOrderMutation } from '@/redux/services/supabaseApi'
import { setOrder } from '@/redux/slices/ordersSlice'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea
} from '@nextui-org/react'
import DatePicker from 'react-datepicker'
import MailIcon from '../icons/MailIcon'
import SnackbarWithAlert from '../SnackbarWithAlert'

import 'react-datepicker/dist/react-datepicker.css'

type OnOpenChange = () => void

interface INewOrderModalProps {
  isOpen: boolean
  onOpenChange: OnOpenChange
}

interface IOrder {
  about: string | null
  address: string | null
  author: string | null
  company: string | null
  contact: string | null
  createdAt: Date | null
  email: string | null
  price: number | null
  id: number | null
}

export default function NewOrderModal ({ isOpen, onOpenChange }: INewOrderModalProps): React.JSX.Element {
  const [alertOpen, setAlertOpen] = useState(false)
  const { refetch } = useGetOrdersQuery(null)
  const [createOrder] = useCreateOrderMutation()
  const dispatch = useAppDispatch()

  const handleOpenAlert = () => {
    setAlertOpen(true)
  }

  const handleCloseAlert = (event: Event | SyntheticEvent<Element, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  const {
    register,
    handleSubmit,
    control,
    reset
  } = useForm<IOrder>()
  const onSubmit: SubmitHandler<IOrder> = async (data) => {
    try {
      const responseData = await createOrder(data).unwrap()
      dispatch(setOrder(responseData))

      reset()
      onOpenChange()
      void refetch()
    } catch (error) {
      console.error('Error creating order:', error)
    } finally {
      handleOpenAlert()
    }
  }

  return (
    <>
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
              <ModalHeader className="flex flex-col gap-1 font-black mb-4">Create order</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-2">
                  <Controller
                    name="createdAt"
                    control={control}
                    defaultValue={new Date()}
                    render={({ field }) => (
                        <DatePicker
                          showIcon
                          selected={field.value}
                          onChange={(date) => { field.onChange(date) }}
                          dateFormat="dd.MM.yyyy"
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 48 48"
                              className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                            >
                              <mask id="ipSApplication0">
                                <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                  <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                                  <path
                                    fill="#fff"
                                    d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                  ></path>
                                </g>
                              </mask>
                              <path
                                fill="currentColor"
                                d="M0 0h48v48H0z"
                                mask="url(#ipSApplication0)"
                              ></path>
                            </svg>
                          }
                          customInput={
                            <Input
                              isRequired
                              label="Date"
                              placeholder="Date"
                              variant="bordered"
                              radius="none"
                              labelPlacement="outside"
                            />
                          }
                        />
                    )}
                  />
                  <Input
                    autoFocus
                    isClearable
                    isRequired
                    label="Author"
                    placeholder="Bill Murray"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    {...register('author')}
                  />

                  <Input
                    isClearable
                    isRequired
                    label="Price"
                    type="number"
                    placeholder="0"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    {...register('price')}
                  />

                  <Input
                    isClearable
                    isRequired
                    label="Company"
                    placeholder="Yandex Inc."
                    type="text"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    {...register('company')}
                  />

                  <Input
                    isClearable
                    isRequired
                    label="Address"
                    placeholder="Moscow, Gagarina str. 46"
                    type="text"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    {...register('address')}
                  />

                  <Input
                    isClearable
                    isRequired
                    label="Contact"
                    placeholder="Jean Paul Belmondo"
                    type="text"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    {...register('contact')}
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
                    startContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    {...register('email')}
                  />

                  <Textarea
                    isRequired
                    type="text"
                    label="About"
                    placeholder="Lorem ipsum dolor sit amet..."
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    {...register('about')}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleSubmit(onSubmit)}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <SnackbarWithAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        variant="success"
        message="You have created a new order"
        autoHideDuration={5000}
      />
    </>
  )
}
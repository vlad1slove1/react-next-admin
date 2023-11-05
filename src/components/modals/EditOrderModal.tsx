import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAppDispatch } from '@/redux/hooks'
import { useGetOrdersQuery, useUpdateOrderMutation } from '@/redux/services/supabaseApi'
import { updateOrder } from '@/redux/slices/ordersSlice'
import { yupResolver } from '@hookform/resolvers/yup'

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
import CalendarIcon from '@/components/icons/CalendarIcon'
import SnackbarWithAlert from '../SnackbarWithAlert'
import { schema } from '@/schemas/orderSchema'

import type { SyntheticEvent } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import type { FormData } from '@/schemas/orderSchema'

import 'react-datepicker/dist/react-datepicker.css'

interface IEditOrderModalProps {
  isOpen: boolean
  onOpenChange: () => void
  orderData: any
}

export default function EditOrderModal ({ isOpen, onOpenChange, orderData }: IEditOrderModalProps): React.JSX.Element {
  const [alertOpen, setAlertOpen] = useState(false)
  const { refetch } = useGetOrdersQuery(null)
  const [changeOrder] = useUpdateOrderMutation()
  const dispatch = useAppDispatch()

  const handleOpenAlert = (): void => {
    setAlertOpen(true)
  }

  const handleCloseAlert = (_event?: Event | SyntheticEvent<Element, Event>, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })
  const onSubmit: SubmitHandler<FormData> = async (newData: FormData): Promise<void> => {
    try {
      const responseData = await changeOrder(newData).unwrap()
      dispatch(updateOrder(responseData))
      void refetch()
    } catch (error) {
      console.error('Error creating order:', error)
    } finally {
      onOpenChange()
      handleOpenAlert()
    }
  }

  useEffect(() => {
    // Update the form fields with new values when orderData changes
    if (orderData !== null) {
      const { row } = orderData
      if (row !== null) {
        setValue('about', row.about)
        setValue('address', row.address)
        setValue('author', row.author)
        setValue('company', row.company)
        setValue('contact', row.contact)
        setValue('createdAt', new Date(row.createdAt))
        setValue('email', row.email)
        setValue('price', row.price)
        setValue('id', orderData.id)
      }
    }
  }, [orderData, setValue])

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
              <ModalHeader className="flex flex-col gap-1 font-black mb-4">Update order</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-2">
                  <Controller
                    name="createdAt"
                    control={control}
                    defaultValue={new Date(orderData.row.createdAt)}
                    render={({ field }) => (
                      <>
                        <DatePicker
                          selected={field.value}
                          onChange={(date: Date | null): void => { field.onChange(date) }}
                          dateFormat="dd.MM.yyyy"
                          popperClassName="some-custom-class"
                          popperPlacement="top-end"
                          popperModifiers={[
                            {
                              name: 'offset',
                              options: {
                                offset: [5, 10]
                              }
                            },
                            {
                              name: 'preventOverflow',
                              options: {
                                rootBoundary: 'viewport',
                                tether: false,
                                altAxis: true
                              }
                            }
                          ]}
                          customInput={
                            <Input
                              label="Date"
                              placeholder="Date"
                              variant="bordered"
                              radius="none"
                              labelPlacement="outside"
                              isInvalid={!!errors.createdAt}
                              color={errors.createdAt ? 'danger' : 'success'}
                              errorMessage={errors.createdAt?.message}
                              startContent={
                                <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                              }
                            />
                          }
                        />
                      </>
                    )}
                  />
                  <Input
                    autoFocus
                    isClearable
                    label="Author"
                    placeholder="Bill Murray"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    isInvalid={!!errors.author}
                    color={errors.author ? 'danger' : 'success'}
                    errorMessage={errors.author?.message}
                    {...register('author')}
                  />

                  <Input
                    isClearable
                    label="Price"
                    type="number"
                    placeholder="0"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    isInvalid={!!errors.price}
                    color={errors.price ? 'danger' : 'success'}
                    errorMessage={errors.price?.message}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    {...register('price')}
                  />

                  <Input
                    isClearable
                    label="Company"
                    placeholder="Yandex Inc."
                    type="text"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    isInvalid={!!errors.company}
                    color={errors.company ? 'danger' : 'success'}
                    errorMessage={errors.company?.message}
                    {...register('company')}
                  />

                  <Input
                    isClearable
                    label="Address"
                    placeholder="Moscow, Gagarina str. 46"
                    type="text"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    isInvalid={!!errors.address}
                    color={errors.address ? 'danger' : 'success'}
                    errorMessage={errors.address?.message}
                    {...register('address')}
                  />

                  <Input
                    isClearable
                    label="Contact"
                    placeholder="Jean Paul Belmondo"
                    type="text"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    isInvalid={!!errors.contact}
                    color={errors.contact ? 'danger' : 'success'}
                    errorMessage={errors.contact?.message}
                    {...register('contact')}
                  />

                  <Input
                    isClearable
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    isInvalid={!!errors.email}
                    color={errors.email ? 'danger' : 'success'}
                    errorMessage={errors.email?.message}
                    startContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    {...register('email')}
                  />

                  <Textarea
                    type="text"
                    label="About"
                    placeholder="Lorem ipsum dolor sit amet..."
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    isInvalid={!!errors.about}
                    color={errors.about ? 'danger' : 'success'}
                    {...register('about')}
                  />
                  <p className="text-tiny text-danger">{errors.about?.message}</p>
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
        variant="info"
        message="You have updated the order"
        autoHideDuration={5000}
      />
    </>
  )
}

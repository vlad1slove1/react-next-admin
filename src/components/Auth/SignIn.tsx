'use client'

import React, { type SyntheticEvent, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Input, Button } from '@nextui-org/react'
import Image from 'next/image'
import MailIcon from '@/components/icons/MailIcon'
import EyeFilledIcon from '@/components/icons/EyeFilledIcon'
import EyeSlashFilledIcon from '@/components/icons/EyeSlashFilledIcon'
import SnackbarWithAlert from '@/components/SnackbarWithAlert'
import loginPageBackground from '../../../public/loginPageBackground.jpg'

import type { Database } from '@/types/database.types'
import type { SubmitHandler } from 'react-hook-form'

const schema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(4, 'Four characters minimum')
    .required('Password is required')
})

type FormData = yup.InferType<typeof schema>

export default function LoginPage (): React.JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const handleOpenAlert = (): void => {
    setAlertOpen(true)
  }
  const handleCloseAlert = (
    _event?: Event | SyntheticEvent<Element, Event>,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  const onSubmit: SubmitHandler<FormData> = async (
    { email, password }: FormData
  ): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) handleOpenAlert()
      void data
    } catch (error) {
      console.error('Error signing in', error)
    } finally {
      router.refresh()
    }
  }

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <>
      <div className="z-0">
        <Image
          alt="Background image"
          src={loginPageBackground}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover'
          }}
        />
      </div>

      <div className="flex justify-center items-center h-screen text-black">
        <form className="flex flex-col gap-2 border-2 shadow-sm bg-blue-50 px-4 pt-2 pb-4 mb-2 w-96 z-10">
          <h2 className="pt-2 pb-2 text-center font-bold font-sans text-gray-600">Log in to enter /admin page</h2>
          <Input
            autoFocus={true}
            value={email}
            onValueChange={setEmail}
            label='Email'
            placeholder='admin@example.com'
            variant="bordered"
            radius='none'
            labelPlacement="outside"
            isInvalid={!!errors.email}
            color={errors.email ? 'danger' : 'success'}
            errorMessage={errors.email?.message}
            startContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            className="py-3 font-mono"
            {...register('email')}
          />

          <Input
            value={password}
            onValueChange={setPassword}
            label='Password'
            placeholder='Enter your password'
            variant="bordered"
            radius='none'
            labelPlacement="outside"
            isInvalid={!!errors.password}
            color={errors.password ? 'danger' : 'success'}
            errorMessage={errors.password?.message}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible
                  ? (<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />)
                  : (<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />)}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            className="py-3 font-mono"
            {...register('password')}
          />

          <div className="flex justify-center px-4 pt-2 mb-2">
            <Button
              variant="light"
              size="lg"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              className="w-full font-mono hover:font-extrabold"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>

      <SnackbarWithAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        variant="error"
        message="Incorrect email or password"
        autoHideDuration={5000}
      />
    </>
  )
}

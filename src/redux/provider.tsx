'use client'

import React from 'react'
import store from './store'
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'

export default async function Providers ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <NextUIProvider>
      <Provider store={store}>{children}</Provider>
    </NextUIProvider>
  )
}

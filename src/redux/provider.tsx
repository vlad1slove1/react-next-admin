/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/react-in-jsx-scope */
'use client'

import store from './store'
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'

export default function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </NextUIProvider>
  )
}

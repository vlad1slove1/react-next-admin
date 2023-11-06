import React from 'react'
import { CircularProgress } from '@nextui-org/react'

export default function Spinner (): React.JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <CircularProgress
        size="lg"
        aria-label="load spinner"
        label="Loading data..."
      />
    </div>
  )
}

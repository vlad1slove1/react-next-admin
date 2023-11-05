import React, { forwardRef } from 'react'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'

import type { SyntheticEvent } from 'react'
import type { SnackbarProps } from '@mui/material/Snackbar'
import type { AlertProps } from '@mui/material/Alert'

interface IAlertMessageProps extends AlertProps {
  onClose: (event: Event | SyntheticEvent<Element, Event>, reason?: string) => void
}

interface ISnackbarWithAlertProps extends Omit<SnackbarProps, 'onClose'> {
  variant: 'success' | 'info' | 'warning' | 'error'
  message: string
  onClose: (event: Event | SyntheticEvent<Element, Event>, reason?: string) => void
  autoHideDuration?: number
}

const Alert = forwardRef<HTMLDivElement, IAlertMessageProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

Alert.displayName = 'Alert'

export default function SnackbarWithAlert ({
  open,
  onClose,
  variant,
  message,
  autoHideDuration = 6000
}: ISnackbarWithAlertProps): React.JSX.Element {
  const handleClose = (event: Event | SyntheticEvent<Element, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    onClose(event, reason)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      TransitionComponent={Slide}
    >
      <Alert onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

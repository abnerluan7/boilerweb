import React, { useCallback, useEffect } from 'react'
import { MdClose } from 'react-icons/md'
import { IconButton, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { ToastProps } from '~/presentation/common/types'
import { useToast } from '~/presentation/hooks'

interface Props {
  toast: ToastProps
}

const Toast: React.FC<Props> = ({ toast }: Props) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id)
    }, 3000)

    return () => clearTimeout(timer)
  }, [toast.id, removeToast])

  const handleRemoveToast = useCallback(() => {
    removeToast(toast.id)
  }, [removeToast])

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={Boolean(toast.id)}
      autoHideDuration={6000}
      onClose={handleRemoveToast}
      action={
        <React.Fragment>
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={handleRemoveToast}
          >
            <MdClose fontSize='small' />
          </IconButton>
        </React.Fragment>
      }
    >
      <Alert
        elevation={6}
        variant='filled'
        severity={toast.type}
        data-testid={toast.test}
      >
        {toast.text}
      </Alert>
    </Snackbar>
  )
}

export default Toast

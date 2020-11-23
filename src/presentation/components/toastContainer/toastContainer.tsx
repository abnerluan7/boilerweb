import React from 'react'
import { Box } from '@material-ui/core'
import { ToastProps } from '~/presentation/common/types'
import { Toast } from '~/presentation/components'
import { useStyles } from './toastContainer.styles'

type Props = {
  toasts: ToastProps[]
}

const ToastContainer: React.FC<Props> = ({ toasts }: Props) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </Box>
  )
}

export default ToastContainer

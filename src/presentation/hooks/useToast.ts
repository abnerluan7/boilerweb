import { useContext } from 'react'
import { ToastContextProps } from '~/presentation/common/types'
import { ToastContext } from '~/presentation/contexts'

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

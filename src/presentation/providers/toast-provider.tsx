import React, { useCallback, useState } from 'react'
import { v4 } from 'uuid'
import {
  AddToastParams,
  ToastProps,
  ToastType
} from '~/presentation/common/types'
import { ToastContainer } from '~/presentation/components'
import { ToastContext } from '~/presentation/contexts'
import { useTranslation } from '../hooks'

const ToastProvider: React.FC = ({ children }) => {
  const { translate } = useTranslation()
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = useCallback(
    ({ text, type = ToastType.INFO, test }: AddToastParams) => {
      const id = v4()
      const toast = {
        id,
        text: translate(text),
        type,
        test
      }
      setToasts(prev => [...prev, toast])
    },
    [setToasts]
  )

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

export default ToastProvider

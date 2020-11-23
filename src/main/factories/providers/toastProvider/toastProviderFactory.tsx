import React from 'react'
import { ToastProvider } from '~/presentation/providers'

export const makeToastProvider: React.FC = ({
  children
}): React.ReactElement => <ToastProvider>{children}</ToastProvider>

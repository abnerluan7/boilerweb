import React from 'react'
import {
  makeAuthProvider,
  makeThemeProvider,
  makeToastProvider
} from '~/main/factories/providers'
import { AppProvider } from '~/presentation/providers'

export const AppProviderComposition: React.FC = ({
  children
}): React.ReactElement => (
  <AppProvider
    AuthProvider={makeAuthProvider}
    ThemeProvider={makeThemeProvider}
    ToastProvider={makeToastProvider}
  >
    {children}
  </AppProvider>
)

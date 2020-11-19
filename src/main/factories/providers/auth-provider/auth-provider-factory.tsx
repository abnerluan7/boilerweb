import React from 'react'
import { getTokenAdapter, setTokenAdapter } from '~/main/adapters/cache'
import { makeRemoteEmailAuthentication } from '~/main/factories/services'
import { AuthProvider } from '~/presentation/providers'

export const makeAuthProvider: React.FC = ({
  children
}): React.ReactElement => (
  <AuthProvider
    getToken={getTokenAdapter}
    setToken={setTokenAdapter}
    emailAuthentication={makeRemoteEmailAuthentication()}
  >
    {children}
  </AuthProvider>
)

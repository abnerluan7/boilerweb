import { useContext } from 'react'
import { AuthContextProps } from '~/presentation/common/types'
import { AuthContext } from '~/presentation/contexts'

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

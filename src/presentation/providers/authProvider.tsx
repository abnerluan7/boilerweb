import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TokenModel } from '~/domain/models'
import { Authentication } from '~/domain/modules'
import { EmailAuthentication } from '~/domain/services'
import { RouteConfig } from '~/main/config/routesConfig'
import { ToastType } from '~/presentation/common/types'
import { FullPageLoading } from '~/presentation/components'
import { AuthContext } from '~/presentation/contexts'
import { useToast } from '~/presentation/hooks'

type Props = {
  getToken: () => TokenModel
  setToken: (token: TokenModel) => void
  emailAuthentication: EmailAuthentication
}

const AuthProvider: React.FC<Props> = ({
  getToken,
  setToken,
  emailAuthentication,
  children
}) => {
  const { addToast } = useToast()
  const [loading, setLoading] = useState(true)
  const token = getToken()
  const history = useHistory()

  const isAuthenticated = useMemo(() => !!token, [token])

  useEffect(() => {
    if (isAuthenticated) {
      history.push(RouteConfig.login.path)
    }
    setLoading(false)
  }, [isAuthenticated, history])

  const handleToken = (token: TokenModel): void => {
    setToken(token)
  }

  const handleAuthSuccess = (token: TokenModel): void => {
    handleToken(token)
    history.push(RouteConfig.login.path)
  }

  const handleEmailSignIn = async (
    params: Authentication.EmailParams
  ): Promise<void> => {
    const tokenOrError = await emailAuthentication.auth(params)

    if (tokenOrError.isError()) {
      addToast({
        text: tokenOrError.value.message,
        type: ToastType.ERROR,
        test: 'login-toast'
      })
      throw tokenOrError.value
    }
    handleAuthSuccess(tokenOrError.value)
  }

  const logout = useCallback(() => {
    setToken(null)
    history.push(RouteConfig.login.path)
  }, [history])

  if (loading) return <FullPageLoading />

  return (
    <AuthContext.Provider
      value={{
        emailSignIn: handleEmailSignIn,
        getToken,
        setToken,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

type Props = RouteProps & {
  private: boolean
}

const ProtectRoute: React.FC<Props> = props => {
  const { private: isPrivate } = props
  const isAuthenticated = true

  if (isPrivate) {
    return isAuthenticated ? (
      <Route {...props} />
    ) : (
      <Route {...props} component={() => <Redirect to='/' />} />
    )
  }

  return <Route {...props} />
}

export default ProtectRoute

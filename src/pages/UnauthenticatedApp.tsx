import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
const Login = React.lazy(() => import('../containers/Login'))

function UnauthenticatedApp() {
  return (
    <React.Suspense fallback={<div></div>}>
      <Switch>
        <Route path='/login' component={Login} />
        <Redirect exact from='*' to='/login' />
      </Switch>
    </React.Suspense>
  )
}

export default UnauthenticatedApp

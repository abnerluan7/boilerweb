import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
const Home = React.lazy(() => import('../containers/Home'))

function AuthenticatedApp() {
  return (
    <React.Suspense fallback={<div></div>}>
      <Switch>
        <Route path='/home' component={Home} />
        <Redirect exact from='*' to='/home' />
      </Switch>
    </React.Suspense>
  )
}

export default AuthenticatedApp

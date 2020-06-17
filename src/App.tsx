import React from 'react'
import { useAuth } from './providers/AuthProvider'

// Remember to always codesplit routes
const UnauthenticatedApp = React.lazy(() => import('./pages/UnauthenticatedApp'))
const AuthenticatedApp = React.lazy(() => import('./pages/AuthenticatedApp'))

function App() {
  const { user } = useAuth()

  return (
    // Use React.Suspense to show a loader indicator while lazy routes are imported
    <React.Suspense fallback={<div></div>}>{user == null ? <UnauthenticatedApp /> : <AuthenticatedApp />}</React.Suspense>
  )
}

export default App

import * as React from 'react'
import User from '../types/User'

type UserType = {
  data?: User | undefined
  loading?: boolean
}

type State = {
  user: User | undefined
  login: (user: User) => void
  logout: () => void
}

const AuthContext = React.createContext<State | undefined>(undefined)

type AuthProvider = {
  children: object
}

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = React.useState<UserType>({
    data: undefined,
    loading: true,
  })

  React.useEffect(() => {
    // Replace this code with your choosen authentication strategy
    setTimeout(() => {
      // load user from local storage
      let user = localStorage.getItem('user') ?? ''

      // if user exists, set user to state
      if (user) {
        let cachedUser = JSON.parse(user)
        setUser({
          data: cachedUser,
          loading: false,
        })
      } else {
        // just set loading to false and let the router redirect to the login
        setUser({
          loading: false,
        })
      }
    }, 1000)
  }, [])

  function login(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
    setUser({
      data: user,
      loading: false,
    })
  }

  function logout() {
    localStorage.removeItem('user')
    setUser({
      data: undefined,
      loading: false,
    })
  }

  if (user.loading) {
    return <p>loading...</p>
  }

  return <AuthContext.Provider value={{ user: user.data, login, logout }}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }

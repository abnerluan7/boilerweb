import * as React from 'react'
import { useAuth } from '../providers/AuthProvider'

function Login() {
  const { login } = useAuth()

  const handleSubmit = () => {
    login({
      name: 'User 1234',
    })
  }

  return (
    <>
      <button onClick={handleSubmit}>Login</button>
    </>
  )
}

export default Login

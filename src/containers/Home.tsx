import * as React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useQuery, useMutation } from 'react-query'
import queryKeys from '../utils/queryKeys'
import { mockGetUserById, mockUpdateUserById } from '../services/exampleService'
import testValidator from '../utils/validators/testValidator'
import validateSchema from '../utils/validateSchema'

function Home() {
  const { user, logout } = useAuth()

  // see https://github.com/tannerlinsley/react-query for more examples on useQuery
  const someQuery = useQuery([queryKeys.someQueryKey, 'someParameter'], mockGetUserById)

  // see https://github.com/tannerlinsley/react-query for more examples on useMutation
  const [mutate, mutation] = useMutation(mockUpdateUserById, {
    onMutate: () => {
      console.log('mutation started')
    },
    onError: (error) => {
      console.log('this error occurred', error)
    },
    onSuccess: (data) => {
      console.log('success!!!', data)
    },
  })

  const testValidation = () => {
    const errors = validateSchema(
      {
        id: 'someid',
        name: 'valid name',
        age: 1234,
      },
      testValidator
    )

    console.log(errors)

    if (errors) {
      // show error to user
    } else {
      // continue
    }
  }

  const handleSubmit = () => {
    mutate('this parameter will be passed to the service function')
  }

  return (
    <>
      <h1>Hello {user?.name}</h1>
      <button onClick={logout}>logout</button>
      <p>someQuery status is '{someQuery.status}'</p>
      <button onClick={testValidation}>test validation</button>
      <br />
      <br />
      <button onClick={handleSubmit} disabled={mutation.status === 'loading'}>
        {mutation.status === 'idle'
          ? 'test mutation'
          : mutation.status === 'loading'
          ? 'loading...'
          : mutation.status === 'error'
          ? 'error :( click to retry'
          : 'success!'}
      </button>
    </>
  )
}

export default Home

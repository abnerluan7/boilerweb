import apiClient from '../utils/apiClient'
import User from '../types/User'

export const getUserById = (_: string, userId: string) => {
  return apiClient(`users/${userId}`)
}

export function mockGetUserById(_: string, parameter: string): Promise<User> {
  console.log(parameter, 'is available on the service')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'some user name',
      })
    }, 3000)
  })
}

export function mockUpdateUserById(userId: string): Promise<string> {
  const random = Math.random()
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (random > 0.5) {
        resolve(`user '${userId}' has been updated`)
      } else {
        reject('error updating user')
      }
    }, 3000)
  })
}

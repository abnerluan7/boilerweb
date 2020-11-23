import { TokenModel } from '~/domain/models'
import { makeLocalStorageAdapter } from '~/main/factories/cache'

export const setTokenAdapter = (token: TokenModel): void => {
  makeLocalStorageAdapter().set('token', token)
}

export const getTokenAdapter = (): TokenModel => {
  return makeLocalStorageAdapter().get('token')
}

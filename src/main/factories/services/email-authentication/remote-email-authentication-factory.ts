import { EmailAuthentication } from '~/domain/services'
import { RemoteEmailAuthentication } from '~/application/services'
import { makeApiUrl, makeAxiosHttpClient } from '~/main/factories/http'

export const makeRemoteEmailAuthentication = (): EmailAuthentication => {
  return new RemoteEmailAuthentication(
    makeApiUrl('/signin'),
    makeAxiosHttpClient()
  )
}

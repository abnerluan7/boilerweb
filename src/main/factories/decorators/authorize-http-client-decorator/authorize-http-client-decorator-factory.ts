import { HttpClient } from '~/application/protocols/http'
import { AuthorizeHttpClientDecorator } from '~/main/decorators/http'
import { makeLocalStorageAdapter } from '~/main/factories/cache'
import { makeAxiosHttpClient } from '~/main/factories/http'

export const makeAuthorizeHttpClientDecorator = (
  tokenPath: string
): HttpClient => {
  return new AuthorizeHttpClientDecorator(
    tokenPath,
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  )
}

import { error, success } from '~/domain/common/utils'
import { TokenModel } from '~/domain/models'
import { Authentication } from '~/domain/modules'
import { EmailAuthentication } from '~/domain/services'
import { HttpClient } from '~/application/protocols/http'
import { RequestResponse } from '~/application/protocols/http/request-response'

export class RemoteEmailAuthentication implements EmailAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteEmailAuthentication.Model>
  ) {}

  async auth (
    params: Authentication.EmailParams
  ): Promise<Authentication.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: this.url,
      body: params
    })

    const tokenOrError = RequestResponse.handle<TokenModel>(httpResponse)

    if (tokenOrError.isError()) {
      return error(tokenOrError.value)
    }

    return success(tokenOrError.value.response)
  }
}

export namespace RemoteEmailAuthentication {
  export type Model = TokenModel
}

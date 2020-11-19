import { TokenModel } from '~/domain/models'
import { GetStorage } from '~/application/protocols/cache'
import {
  HttpClient,
  HttpRequest,
  HttpResponse
} from '~/application/protocols/http'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (
    private readonly tokenPath: string,
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpClient
  ) {}

  async request (data: HttpRequest): Promise<HttpResponse> {
    const token: TokenModel = this.getStorage.get(this.tokenPath)
    if (token.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          Authorization: `Bearer ${token.accessToken}`
        })
      })
    }
    const httpResponse = await this.httpGetClient.request(data)
    return httpResponse
  }
}

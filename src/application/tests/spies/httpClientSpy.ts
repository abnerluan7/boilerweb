import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from '~/application/protocols/http'

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string
  method?: string
  body?: R
  headers?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    return Promise.resolve(this.response)
  }
}

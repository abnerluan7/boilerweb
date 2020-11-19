import {
  AccessDeniedError,
  InvalidCredentialsError,
  UnexpectedError
} from '~/domain/common/exceptions'
import {
  CombinedPredicated,
  combinedPredicates,
  error,
  success
} from '~/domain/common/utils'
import { Response, ResponseError } from '~/domain/models'
import { HttpResponse, HttpStatusCode } from '~/application/protocols/http'

export class RequestResponse<R> {
  private constructor (private readonly _response: R) {
    Object.freeze(this)
  }

  public static handle<R> (
    httpResponse: HttpResponse<R>
  ): Response<RequestResponse<R>> {
    const { statusCode } = httpResponse

    if (this.isSuccess(statusCode)) {
      return success(new RequestResponse(httpResponse.body))
    }

    const predicates: CombinedPredicated<HttpStatusCode, ResponseError> = [
      [this.isForbidden, new AccessDeniedError()],
      [this.isUnauthorized, new InvalidCredentialsError()]
    ]

    const errors = combinedPredicates({
      value: statusCode,
      predicatePairs: predicates
    })

    if (errors.isError()) {
      return error(errors.value)
    }

    return error(new UnexpectedError())
  }

  private static isSuccess (statusCode: HttpStatusCode): boolean {
    return statusCode >= 200 && statusCode <= 299
  }

  private static isForbidden (statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.forbidden
  }

  private static isUnauthorized (statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.unauthorized
  }

  get response (): R {
    return this._response
  }
}

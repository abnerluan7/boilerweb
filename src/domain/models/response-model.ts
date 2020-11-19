import {
  AccessDeniedError,
  InvalidCredentialsError,
  UnexpectedError
} from '~/domain/common/exceptions'
import { Either } from '~/domain/common/utils'

export type ResponseError =
  | AccessDeniedError
  | InvalidCredentialsError
  | UnexpectedError

export type Response<R = any> = Either<ResponseError, R>

import { ResponseError } from '~/domain/common/types'

export interface CachedQuery<T> {
  data: T
  error: ResponseError
  isError: boolean
  isSuccess: boolean
  isFetched: boolean
  isLoading: boolean
}

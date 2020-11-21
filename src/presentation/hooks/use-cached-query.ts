import { useQuery } from 'react-query'
import { ResponseError } from '~/domain/common/types'
import { CachedQuery } from '~/presentation/common/protocols'

export type UseCachedQueryParams<T, R> = {
  queryKey: string
  body?: R
  callback: () => Promise<T>
}

export const useCachedQuery = <T = unknown, R = unknown>({
  queryKey,
  callback
}: UseCachedQueryParams<T, R>): CachedQuery<T> => {
  const { data, error, isFetched, isLoading, isError, isSuccess } = useQuery<
  T,
  ResponseError
  >(queryKey, callback)

  return { error, data, isFetched, isLoading, isError, isSuccess }
}

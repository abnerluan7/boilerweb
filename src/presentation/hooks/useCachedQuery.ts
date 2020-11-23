import { useQuery } from 'react-query'
import { ResponseError } from '~/domain/common/types'
import { CachedQuery } from '~/presentation/common/protocols'

export type UseCachedQueryParams<T> = {
  queryKey: string
  fetcher: () => Promise<T>
}

export const useCachedQuery = <T = unknown>({
  queryKey,
  fetcher
}: UseCachedQueryParams<T>): CachedQuery<T> => {
  const { data, error, isFetched, isLoading, isError, isSuccess } = useQuery<
  T,
  ResponseError
  >(queryKey, fetcher)

  return { error, data, isFetched, isLoading, isError, isSuccess }
}

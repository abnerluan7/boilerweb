import { QueryResult } from 'react-query/types/core'
import { getLectures } from '~/application/services/generic/generic'
import useGenericQuery from './useGenericQuery'

function useLectures (): QueryResult<Response, unknown> {
  const query = useGenericQuery('queryKey', getLectures, {
    onError: () => {},
    onSuccess: () => {}
  })

  return query
}

export default useLectures

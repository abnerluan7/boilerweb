import * as React from "react";
import { useQuery } from "react-query";
import { getLectures } from "~/application/services/generic/generic";

type Config = {
  onError?: (/*parâmetro de erro*/) => void;
  onSuccess?: (data: Response) => void;
};

function useGenericQuery(
  queryKey: string,
  handleFn: () => Promise<Response>,
  config?: Config
) {
  const query = useQuery(queryKey, getLectures, {
    ...config,
    onError: (error) => {
      // tratamento de erro genérico
      // dispara quando erro
      return config.onError(/*objecto erro tratado*/);
    },
    onSuccess: (data) => {
      // dispara quando sucesso
      return config.onSuccess(data);
    },
  });

  return query;
}

export default useGenericQuery;

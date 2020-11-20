import { getLectures } from "~/application/services/generic/generic";
import useGenericQuery from "./useGenericQuery";

function useLectures() {
  const query = useGenericQuery("queryKey", getLectures, {
    onError: () => {},
    onSuccess: () => {},
  });

  return query;
}

export default useLectures;

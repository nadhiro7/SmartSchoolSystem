import { useQuery } from "react-query";
import axios from "axios";

const useClassroom = (fun) => {
  return useQuery("deleteUser", async () => fun, {
    enabled: false,
    cacheTime: 1000,
    staleTime: 1000,
    keepPreviousData: false,
  });
};
export default useClassroom;

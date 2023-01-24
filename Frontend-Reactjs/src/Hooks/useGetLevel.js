import { useQuery } from "react-query";
import axios from "axios";
const getLevel = (id) => {
  return axios.get("http://localhost:8000/api/getLevel/" + id);
};
const useGetLevel = (id) => {
  console.log(id);
  return useQuery("getLevelById", async () => getLevel(id));
};
export default useGetLevel;

import { useQuery } from "react-query";
import axios from "axios";
const getUserByID = (id) => {
  return axios.get("http://localhost:8000/api/getUser/" + id);
};
const useGetUser = (id) => {
  console.log(id);
  return useQuery("getUserById", async () => getUserByID(id));
};
export default useGetUser;

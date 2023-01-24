import { useQuery } from "react-query";
import axios from "axios";
const getUserByID = (id) => {
  return axios.get("http://localhost:8000/api/getStudent/" + id);
};
const useGetStudent = (id) => {
  return useQuery("getStudent", async () => getUserByID(id));
};
export default useGetStudent;

import { useQuery } from "react-query";
import axios from "axios";
const deleteByID = (id)=>{
    return axios.delete( 'http://localhost:8000/api/deleteUser/'+id)
}
const useDelete = (id)=>{
    console.log(id)
    return  useQuery( 'deleteUser', async () =>
        deleteByID(id),
        {
            enabled: false,
            cacheTime: 1000,
            staleTime: 1000,
        }
    );
}
export default useDelete;
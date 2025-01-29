import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useUser = () => {
    const { user } = useContext(AuthContext); 
    const email = user?.email;
  
    const { data: userData } = useQuery({
      queryKey: ["user", email],

      queryFn: async () => {
        const res = await axios.get(`${import.meta.env.VITE_URL}/user/${email}`);
        return res.data;
      },
      enabled: !!email, 
    });
  
    return [userData] ;
 
};

export default useUser;
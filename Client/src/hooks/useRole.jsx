import  { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
  const { user } = useContext(AuthContext);
  
  const { data: role = "", isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/user/${user?.email}`);
      console.log(data)
      return data?.role;
    },
  });

  return [role, isLoading];
 
};

export default useRole;

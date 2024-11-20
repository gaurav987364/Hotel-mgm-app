import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../services/apiAuth";

export function useUserdetail(){
    const {isLoading, data:user} = useQuery({
        queryKey: ["user"],
        queryFn: getUserDetails,
      });
    return {user, isLoading, isAuthenticated : user?.role === "authenticated"}
}
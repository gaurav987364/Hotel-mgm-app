import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate:login, isLoading:loginLoading} = useMutation({
        mutationFn : ({email, password}) => Login({
            email,
            password,
        }),
        onSuccess : (user)=> { // this user is = data which recive from supabase apiauth
            queryClient.setQueryData(['user'], user.user) //setting data to query before fetch
            navigate('/dashboard', {replace : true}),
            user?  toast.success("Successfully logged in") : "Not logged in"
        },
        onError : (err) => {
            console.log(err.message);
            toast.error('Provided email, password are incorrect')
        }
    })
    
    return {
        login,
        loginLoading,
    }  // return the login mutation and loading state 
}
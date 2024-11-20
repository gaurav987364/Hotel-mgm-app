import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProfile } from "../../services/apiAuth";
import toast from "react-hot-toast";


export function useUpdate(){
    const queryClient = useQueryClient();

    const {mutate: updateUser, isLoading:isUpdating} = useMutation({
        mutationFn : UpdateProfile,
        onSuccess : ({user}) => {
            toast.success("Profile updated successfully");
            queryClient.setQueryData(['user'], user); //update cahce 
            // queryClient.invalidateQueries({
            //     queryKey : ["user"]
            // });
        },
        onError : (error) => toast.error(error.message)
    })
    return {
        isUpdating,
        updateUser
    }
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSettings(){
    // Implement logic to update hotel settings
    const queryClient = useQueryClient();
    const {mutate, isLoading: isUpdating} = useMutation({
        mutationFn : updateSetting,
        onSuccess: () => {
            toast.success("Settings updated successfully");
            queryClient.invalidateQueries(["settings"]);
        },
        onError: (error) => toast.error(error.message)
    })
    return {
         isUpdating,
        updateSettings: mutate
    }
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout(){
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const {mutate, isLoading} = useMutation({
        mutationFn : (id)=>updateBooking(id, {
            status : "checked-out"
        }) ,

        //on success recive data from direct update booking
        onSuccess : (data)=>{
            toast.success(`Booking #${data.id} successfully checked-Out`);
            queryClient.invalidateQueries({active  : true});
            navigate('/')
        },
        onError : (error)=> toast.error(error.message),
    })
    return {mutate, isLoading};
}
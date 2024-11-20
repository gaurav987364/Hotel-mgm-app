import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin(){
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const {mutate, isLoading} = useMutation({
        mutationFn : ({id, breakFast})=> updateBooking(id, {
            status: "checked-in",
            isPaid : true,
            ...breakFast,
        }),

        //on success recive data from direct update booking
        onSuccess : (data)=>{
            toast.success(`Booking #${data.id} successfully checkedIn`);
            queryClient.invalidateQueries({active  : true});
            navigate('/')
        },
        onError : (error)=> toast.error(error.message),
    })
    return {mutate, isLoading};
}
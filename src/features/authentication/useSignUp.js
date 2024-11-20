import { useMutation } from "@tanstack/react-query";
import { SignUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp(){
    const {mutate : signUp, isLoading: signUpLoading} = useMutation({
        mutationFn : SignUp,
        onSuccess : (user)=> {
            console.log("User signed up successfully", user)
            toast.success("User Created successfully! Check Your Email Inbox For Confirmation your email and Log in.")
        }
    })
    return {signUp, signUpLoading}
}

import { SlLogout } from "react-icons/sl"
import ButtonIcon from "../../ui/ButtonIcon"
import { useLogout } from "./useLogout"
import SpinnerMini from "../../ui/SpinnerMini";


const Logout = () => {
    const {logout, logoutloading} = useLogout();
  return (
    <ButtonIcon disabled={logoutloading} onClick={logout}>
       {!logoutloading? <SlLogout /> : <SpinnerMini/>} 
    </ButtonIcon>
  )
}

export default Logout
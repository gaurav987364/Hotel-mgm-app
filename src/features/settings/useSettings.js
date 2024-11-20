import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default  function useSettings(){
 const {data:settings, isLoading, error} = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
 })   
 return {settings, isLoading, error}  // return the settings, isLoading and error as part of the custom hook.  // This hook can be used in any component to fetch and use the settings data.  // The query will be automatically refetched when the settings change.  // The query will also display a loading spinner while the data is being fetched.  // If an error occurs during the fetch, the error will be logged to the console.  // The query will also cache the
}
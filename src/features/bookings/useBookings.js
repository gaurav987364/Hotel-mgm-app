import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import MAGIC_NUMBER_PAGE_SIZE from "../../utils/constants";

const useBookings = () => {
  let queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //filter data and fetch data
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue }; //also we send method as prop of fetch data based upn that

  //sort data and sending to our booking page supbase
  const sortby = searchParams.get("sortby") || "startDate-asc";
  const [field, direction] = sortby.split("-");
  const sort = { field, direction };

  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page], //now passing the filter, sort here to re fetch data when status changed
    //queryFn : getBookings,
    queryFn: () => getBookings({ filter, sort, page }),
  });

  //PRE-Fecth data of pageniation data is there before gone to page
  
  const pageCount = Math.ceil(count / MAGIC_NUMBER_PAGE_SIZE);

  if (page < pageCount) 
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }) 
     });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }) 
     });
  return { bookings, error, isLoading, count };
};

export default useBookings;

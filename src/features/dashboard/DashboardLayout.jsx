import styled from "styled-components";
import { useRecentBooking } from "./useRecentbookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Statstistic from "./Statstistic";
import useFetchCabin from "../cabins/useFetchCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


const DashboardLayout = () => {
  const {isLoading,booking} = useRecentBooking();
  const { confirmStays = [], numDays} = useRecentStays();
  const {cabins} = useFetchCabin();
  
  
  if(isLoading) return <Spinner/>
  return (
    <StyledDashboardLayout>
      {/* Add your dashboard components here */}
      <Statstistic booking={booking} confirmStays={confirmStays} numDays={numDays} cabinsCount={cabins}/>

      <TodayActivity/>
      <DurationChart confirmStays={confirmStays}/>
      <SalesChart booking={booking} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
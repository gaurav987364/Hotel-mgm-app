import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2';
import Stat  from './Stat';
import PropTypes from 'prop-types'
import { formatCurrency } from '../../utils/helpers';


const Statstistic = ({booking, confirmStays = [], numDays}) => {
    //console.log(cabinsCount);
    
    //1) no.of boooking
    const numOfBookings = booking.length;
    //slaes
    const sales = booking.reduce((acc, curr)=> acc + curr.totalPrice, 0);
    //confirm stays
    const confirmStaysCount = confirmStays.length;
    // ooocurrency
    const oocupation = confirmStays.reduce((acc, curr)=> acc + curr.numNights,0) / (numDays * 8) //8 becase we have 8total cabins
    
  return (
    <>
        <Stat title='Bookings' color='blue' value={numOfBookings} icon={<HiOutlineBriefcase/>}/>
        <Stat title='Sales' color='green' value={formatCurrency(sales)} icon={<HiOutlineBanknotes/>}/>
        <Stat title='Check In' color='indigo' value={confirmStaysCount} icon={<HiOutlineCalendarDays/>}/>
        <Stat title='Occupancy Rates' color='yellow' value={Math.round(oocupation * 100) + '%'} icon={<HiOutlineChartBar/>}/>
    </>
  )
}

Statstistic.propTypes = {
    booking: PropTypes.arrayOf(PropTypes.object).isRequired,
    confirmStays: PropTypes.arrayOf(PropTypes.object).isRequired,
    numDays: PropTypes.number.isRequired,
    //cabinsCount: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Statstistic
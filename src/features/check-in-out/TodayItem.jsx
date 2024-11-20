import styled from "styled-components";
import Tag from '../../ui/Tag';
import Flag from '../../ui/Flag';
import Button from '../../ui/Button'
import CheckoutButton from './CheckoutButton'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 5rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;


const TodayItem = ({activity}) => {
  
  const {id, status, guests, numNights} = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="green">Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`}/>
      <Guest>{guests.fullName}</Guest>
      <div>{numNights}</div>

      {status === "unconfirmed" && (
        //hamne button tag me as prop diya isee hm kisi bi html element ko uski trahh work krwa skate hai to as me link from react router dom se ye uski tarh kaam karega or to prop me likhee router pe le jayga
        <Button size='small' variation='primary' as={Link} to={`/checkin/${id}`}>Check in</Button>
      )}
      {status === "checked-in" && (
        <CheckoutButton bookingId={id}/>
      )}
    </StyledTodayItem>
  )
}

TodayItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "checked-in"]),
    guests: PropTypes.shape({
      fullName: PropTypes.string,
      country: PropTypes.string,
      countryFlag: PropTypes.string,
    }),
    numNights: PropTypes.number.isRequired,
  }),
}
export default TodayItem
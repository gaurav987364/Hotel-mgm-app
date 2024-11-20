import styled from "styled-components";
import { format, isToday } from "date-fns";
import {Tooltip} from 'react-tooltip'
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import PropTypes from "prop-types";
//import Menus from "../../ui/Menus";
import { PiCalendarDotsThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { BsBuildingCheck } from "react-icons/bs";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { TiDeleteOutline } from "react-icons/ti";
import useDeletebooking from "./useDeletebooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  margin-left: -5rem;
`;

function BookingRow({
  booking: {
    id: bookingId,
    //created_at,
    startDate,
    endDate,
    numNights,
    //numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  //check out booking
  const { mutate: checkout, isLoading: isCheckOut } = useCheckout();
  const navigate = useNavigate();

  //delete bookings
  const { mutate: confirmDelete, isLoading: isdeleting } = useDeletebooking();

  return (
    <Table.Row>
      <Modal>
        <Cabin>{cabinName}</Cabin>

        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>

        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </Stacked>

        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

        <Amount>{formatCurrency(totalPrice)}</Amount>

        <Div>
          
          <PiCalendarDotsThin data-tooltip-id="my-tooltip" data-tooltip-content=" Booking Details!"
            onClick={() => navigate(`/bookings/${bookingId}`)}
            size={20}
            color="blue"
          />
          <Tooltip id="my-tooltip" style={{backgroundColor: "grey", color: "white"}} />

          {status === "unconfirmed" && (
            <BsBuildingCheck
            data-tooltip-id="my-tooltip" 
            data-tooltip-content=" Booking Check In!"
              size={20}
              color="blue"
              onClick={() => navigate(`/checkin/${bookingId}`)}
            />
          )}
          {status === "checked-in" && (
            <HiArrowUpOnSquare
            data-tooltip-id="my-tooltip" 
            data-tooltip-content="Booking Check out!"
              size={20}
              color="blue"
              onClick={() => checkout(bookingId)}
              disabled={isCheckOut}
            />
          )}

          <Modal.Open opens="delete">
            <Button>
              <TiDeleteOutline data-tooltip-id="my-tooltip" 
            data-tooltip-content="Delete Booking!" size={20} color="red" />
            </Button>
          </Modal.Open>
        </Div>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => confirmDelete(bookingId)}
            disabled={isdeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
    numGuests: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    guests: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    cabins: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
};
export default BookingRow;

import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeletebooking from "./useDeletebooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const idd = useParams();
  const id = idd.bookingId;

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(Number(id)),
    retry: false, // thiis retry method use to try fetch 3 time
  });

  //check out
  const { mutate, isLoading: isCheckout } = useCheckout();
  const status = booking?.status;
  const moveBack = useMoveBack();

  //delete bookings
  const { mutate: confirmDelete, isLoading: isdeleting } = useDeletebooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            variation="primary"
            size="medium"
            onClick={() => navigate(`/checkin/${id}`)}
          >
            check In
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            variation="primary"
            size="medium"
            onClick={() => mutate(id)}
            disabled={isCheckout}
          >
            Check Out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button size="medium" variation="danger">
              Delete Booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => confirmDelete(id, {
                onSettled: () => navigate(-1)
              })}
              disabled={isdeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation="primary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

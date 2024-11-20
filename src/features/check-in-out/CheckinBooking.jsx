import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  //getting the data from our hook to update chekin status
  const { mutate, isLoading: isUpdateIng } = useCheckin();
  //check out


  const idd = useParams();
  const id = idd.bookingId;

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(Number(id)),
    retry: false, // thiis retry method use to try fetch 3 time
  });

  //condition for check tick box when its paid or not
  const [confirmPaid, setConfirmPaid] = useState(false);
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const totalPrice = booking?.totalPrice;

  //adding breakfast
  const [addBreakFast, setAddBreakFast] = useState(false);
  const { settings, isLoading: isLoadSetting } = useSettings();

  //now calculaate prize of breakfast
  const optionalBreakfast =
    settings?.breakFastPrice * booking?.numNights * booking?.numGuests;

    //update status + breakfast status
  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakFast) {
      mutate({
        id,
        breakFast: {
          isBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      });
    } else {
      mutate({ id, breakFast: {} });
    }
  }


  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking?.isBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
            disabled={addBreakFast || isLoadSetting}
          >
            Book with breakfast for {formatCurrency(optionalBreakfast)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isUpdateIng}
        >
          I have read and agreed to the terms and conditions & I Confirmed that{" "}
          {booking?.guests?.fullName} has paid total amount of{" "}
          {!addBreakFast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfast
              )} (${formatCurrency(totalPrice + optionalBreakfast)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          variation="primary"
          size="medium"
          onClick={handleCheckin}
          disabled={!confirmPaid || isUpdateIng}
        >
          Check in booking #{id}
        </Button>

        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

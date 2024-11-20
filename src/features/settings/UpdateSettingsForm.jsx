import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useEditSettings";

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakFastPrice,
    } = {},
    isLoading,
    error,
  } = useSettings();

  //update settings
  const {isUpdating, updateSettings} =  useUpdateSettings();
  if (isLoading) return <Spinner />;
  if (error) return;

  const handelUpdate = (e,field) => {
    const {value} = e.target;
    if(!value) return;
    updateSettings({[field]: value})
  };
  
  return (
    <Main>
      <Form>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="min-nights"
            defaultValue={minBookingLength}
            disabled={isUpdating}
            onBlur={e => handelUpdate(e, "minBookingLength")}
          />
        </FormRow>

        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="max-nights"
            disabled={isUpdating}
            defaultValue={maxBookingLength}
            onBlur={e => handelUpdate(e, "maxBookingLength")}
          />
        </FormRow>

        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="max-guests"
            disabled={isUpdating}
            defaultValue={maxGuestPerBooking}
            onBlur={e => handelUpdate(e, "maxGuestPerBooking")}
          />
        </FormRow>

        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            disabled={isUpdating}
            defaultValue={breakFastPrice}
            onBlur={e => handelUpdate(e, "breakFastPrice")}
          />
        </FormRow>
      </Form>
    </Main>
  );
}

export default UpdateSettingsForm;

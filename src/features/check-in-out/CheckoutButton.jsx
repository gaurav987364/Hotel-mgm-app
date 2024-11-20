import Button from "../../ui/Button";
import PropTypes from "prop-types";
import { useCheckout } from "./useCheckout";
import Spinner from "../../ui/Spinner";
function CheckoutButton({ bookingId }) {
  const { isLoading, mutate: checkout } = useCheckout();
  if (isLoading) return <Spinner />;
  return (
    <Button
      disabled={isLoading}
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  );
}

CheckoutButton.propTypes = {
  bookingId: PropTypes.number.isRequired,
};
export default CheckoutButton;

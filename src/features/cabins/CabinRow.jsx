import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import useDelete from "./useDelete";
import useCreateCabin from "./useCreateCabin";
import { HiSquare2Stack } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

//----------------------------------------------------------------
const CabinRow = ({ cabin }) => {
  // const [showFrom, setShowForm] = useState(false);
  const { name, image, maxCapacity, regularPrice, discount, id } = cabin;

  //delete cabin
  const { isLoading, mutate } = useDelete();

  //duplicate cabin
  const { createCabin } = useCreateCabin();
  function duplicateCabin() {
    createCabin({
      name: `copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
    });
  }
  return (
    <Table.Row>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fills Upto {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}% off</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          {/* creating 3dot menu which is very compicated */}
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button
                onClick={duplicateCabin}
                icon={<HiSquare2Stack size={20} />}
              >
                Duplicate 
              </Menus.Button>
              <Modal.Open opens="edit">
                <Menus.Button icon={<FaRegEdit size={20} />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<IoClose size={20} />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                onConfirm={() => mutate(id)}
                disabled={isLoading}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

//hame proptype batana padata hai kyuki react query me important hai varna propr read ni hote
CabinRow.propTypes = {
  cabin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default CabinRow;

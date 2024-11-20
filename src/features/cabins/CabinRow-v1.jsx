import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
// import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { IoClose } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import Button from "../../ui/Button";
import useDelete from "./useDelete";
import useCreateCabin from "./useCreateCabin";
import { HiSquare2Stack } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const { createCabin, isCreating } = useCreateCabin();
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
    <>
      <TableRow role="row">
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
          <Button
            size="small"
            variation="secondary"
            onClick={duplicateCabin}
            disabled={isCreating}
          >
            <HiSquare2Stack size={20} />
          </Button>

          <Modal>
            <Modal.Open opens="edit">
              <Button size="small" variation="secondary">
                <FaRegEdit size={20} />
              </Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Open opens="delete">
              <Button size="small" variation="danger">
                <IoClose size={20} />
              </Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                onConfirm={() => mutate(id)}
                disabled={isLoading}
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
    </>
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

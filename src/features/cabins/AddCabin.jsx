// import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = ()=> {
  return (
   <div>
     <Modal>
      <Modal.Open opens='cabin-form'>
        <Button variation="primary" size="medium">Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        <CreateCabinForm/>
      </Modal.Window>
    </Modal>
   </div>
  )
}




//before we make model a compound componenet
// const AddCabin = () => {
//   const [isOpenModel, setIsOpenModel] = useState(false);
//   return (
//     <div>
//       <Button
//         variation="primary"
//         size="medium"
//         onClick={() => setIsOpenModel((show) => !show)}
//       >
//         Add New Cabin
//       </Button>
//       {isOpenModel && (
//         <Modal onClose={() => setIsOpenModel(false)}>
//           <CreateCabinForm onClose={() => setIsOpenModel(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

export default AddCabin;

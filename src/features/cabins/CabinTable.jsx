import useFetchCabin from "./useFetchCabin";
// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const { isLoading, cabins = [], error } = useFetchCabin(); //custom hook
  //getting value from url of discount for filtering
  const [searchParams] = useSearchParams();
  let filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  //sorting
  const sortby = searchParams.get("sortby") || "startDate-asc";
  //phle spilit krege
  const [field, direction] = sortby.split("-");
  //for direction
  const modifire = direction === "asc" ? 1 : -1;

  //sort
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifire
  );

  if (isLoading) return <Spinner />;
  if (error) return;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          //data={data}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;

import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Sortby from "../../ui/Sortby";
const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "ALL" },
          { value: "no-discount", label: "NO-DISCOUNT" },
          { value: "with-discount", label: "WITH-DISCOUNT" },
        ]}
      />

      <Sortby
        options={[
          { value: "name-asc", label: "sort by name (A-Z)" },
          { value: "name-desc", label: "sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "sort by price (low)" },
          { value: "regularPrice-desc", label: "sort by price (high)" },
          { value: "maxCapacity-asc", label: " sort by capacity (low)" },
          { value: "maxCapacity-desc", label: " sort by capacity (high)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;

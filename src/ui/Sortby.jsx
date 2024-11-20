import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import PropTypes from "prop-types";

const Sortby = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  //current value
  const currentSortBy = searchParams.get("sortby") || "";

  //setting current value to url
  const handelClick = (e) => {
    searchParams.set("sortby", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      value={currentSortBy}
      options={options}
      onChange={handelClick}
      type="white"
    />
  );
};

Sortby.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Sortby;

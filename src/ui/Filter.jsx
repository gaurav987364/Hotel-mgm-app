import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === 'true' &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  function handelClick(value) {
    searchParams.set(filterField, value);
    //solve bug of filter on last page app crash
    if(searchParams.get('page')) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  //select which is active to apply css
  const currentValue = searchParams.get(filterField) || options.at(0).value;
  return (
    <StyledFilter>
      {options.map((option, idx) => (
        <FilterButton active={(option.value === currentValue).toString()} key={idx} disabled={option.value === currentValue} onClick={() => handelClick(option.value)}>
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

Filter.propTypes = {
  filterField: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })),
}

export default Filter;

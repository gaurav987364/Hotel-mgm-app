import styled from "styled-components";
import Heading from "./Heading";
import GlobalStyles from "../styles/GlobalStyles";
import PropTypes from "prop-types";
import Button from "./Button";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

const ErrorFallback = ({ error, resetErrorBounadary }) => {
  return (
    <>
      <GlobalStyles>
      <StyledErrorFallback>
        <Box>
          <Heading as="h1">SomeThing went Wrong! 😡</Heading>
          <p>{error.message}</p>
          <Button size="large" variation="danger">
            {" "}
            <strong onClick={resetErrorBounadary}>←Go Back</strong>
          </Button>
        </Box>
      </StyledErrorFallback>
      </GlobalStyles>
    </>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBounadary: PropTypes.func,
};
export default ErrorFallback;

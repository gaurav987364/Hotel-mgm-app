import PropTypes from "prop-types";
import { useUserdetail } from "../features/authentication/useUserDetail";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-grey-200);
`;
const ProtectedRoute = ({ children }) => {
  //steps for doing this
  //1) load the authenticated user
  const { isAuthenticated, isLoading } = useUserdetail();
  const navigate = useNavigate();

  //3) if there is no authenticated user , redirect to the login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //2) while loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4) if there is authenticated user, render the children component.
  if (isAuthenticated) return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;

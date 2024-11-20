import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import DarkModeToggle from "./DarkModeToggle";

const StyledMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <>
      <StyledMenu>
        <li>
          <ButtonIcon
            onClick={() => navigate("/account")}
            data-tooltip-id="tooltip"
            data-tooltip-place="bottom"
            data-tooltip-content="Account"
          >
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li
          data-tooltip-id="tooltip"
          data-tooltip-place="bottom"
          data-tooltip-content="Logout"
        >
          <Logout />
        </li>
        <li 
         data-tooltip-id="tooltip"
         data-tooltip-place="bottom"
         data-tooltip-content="Theme"
        >
          <DarkModeToggle/>
        </li>
      </StyledMenu>
      <Tooltip id="tooltip" style={{ backgroundColor: "grey" }} />
    </>
  );
};

export default HeaderMenu;

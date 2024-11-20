import styled from "styled-components";
import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { createPortal } from "react-dom";
import { TfiMenuAlt } from "react-icons/tfi";
import { Tooltip } from "react-tooltip";
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");
  //store position data from handelclick
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenuContext.Provider
      value={{ openId, setOpenId, open, close, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
};

Menus.propTypes = {
  children: PropTypes.node.isRequired,
};

function Toggle({ id }) {
  const { openId, open, close, setPosition } = React.useContext(MenuContext);
  const handleClick = (e) => {
    //e.stopPropagation(); //fixing our click event from foing the event propgate
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  };
  return (
    <>
      <StyledToggle
        onClick={handleClick}
        data-tooltip-id="my-tooltip"
        data-tooltip-place="top"
        data-tooltip-content="Options!"
      >
        <TfiMenuAlt />
      </StyledToggle>
      <Tooltip id="my-tooltip" style={{ backgroundColor: "grey" }} />
    </>
  );
}

Toggle.propTypes = {
  id: PropTypes.number.isRequired,
};

function List({ id, children }) {
  const { openId, position, close } = React.useContext(MenuContext);
  const ref = useRef();

  //off by outside click
  useEffect(() => {
    const handelClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("click", handelClick, true);
    return () => document.removeEventListener("click", handelClick, true);
    //**! ye dono event me true lagana is important varna modal open ya close ni hoga becase ye true related hai event buubling se , true lagane se event captureing mode m hi execute hojyga bubble ni krega vanra true k bina vo bubble krega or work ni hoga */
  }, [close]);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

List.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenuContext);
  const handelBtn = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton onClick={handelBtn}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;

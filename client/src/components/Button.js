import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";

const Button = ({ handleClick, disabled, subStatus }) =>
  (
    <Wrapper disabled={disabled } onClick={handleClick}>
       {/* <Wrapper disabled={disabled || subStatus === "pending"} onClick={handleClick}></Wrapper> */}
    Confirm Your Order
  </Wrapper>
);

const Wrapper = styled.button`
  background: ${COLORS.third};
  border-radius: 4px;
  border-color: transparent;
  color: white;
  cursor: pointer;
  display: block;
  font-size: 24px;
  height: 48px;
  width: 100%;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  @media (max-width: 650px) and (max-height: 850px) {
    height: 15vh;
  }
`;

export default Button;

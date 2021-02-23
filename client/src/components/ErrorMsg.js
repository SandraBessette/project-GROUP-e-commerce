import React from "react";
import styled from "styled-components";

const ErrorMsg = ({ children }) => <Wrapper>{children}</Wrapper>;

const Wrapper = styled.div`
  display: flex;
  margin-top: 20px;
  border: 1px solid red;
  height: 100px;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 16px;
  padding: 15px;
`;

export default ErrorMsg;

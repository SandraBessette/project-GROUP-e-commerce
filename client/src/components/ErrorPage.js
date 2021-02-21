import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";

const ErrorPage = () => {
  return (
    <Wrapper>
      <StyledDiv>
        <Sorry>
          <h1>SORRY</h1>
        </Sorry>
        <Image>
          <Logo
            src={require("../assets/Robot_error.webp")}
            alt="Sorry"
            height="350px"
          ></Logo>
        </Image>
      </StyledDiv>
      <StyledDiv2>
       
        <Text>Something went wrong on our end...</Text>
        <Text>
          Please go back and try again or go to{" "}
          <LinkTo to={`/`}>Wear Tek's home page.</LinkTo>
        </Text>
       
        <Logo1
          src={require("../assets/wearteklogo.png")}
          alt="WearTek"
          height="200px"
        ></Logo1>
      </StyledDiv2>
    </Wrapper>
  );
};

export default ErrorPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  min-height: 700px;
  @media (max-width: 840px) {
 
  }
  @media (max-width: 768px) and (max-height: 1018px) {
    
  }
  @media (max-width: 650px) and (max-height: 850px) {
  }
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 30px;
`;
const StyledDiv2 = styled.div`
  align-items: center;
  display: flex;
  justify-content:center;
  flex-direction: column;
`;
const Sorry = styled.div`
  width: 30vw;
  height: 15vh;
  display: flex;
  background-color:black;
  color:white;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  font-weight: lighter;
  border: 5px double white;
  @media (max-width: 840px) {
    width: 50vw;
    height:10vh;
}
@media (max-width: 768px) and (max-height: 1018px) {
 
}
@media (max-width: 650px) and (max-height: 850px) {
  font-size: 20px;
  width: 70vw;
    height:10vh;
}
`;
const Image = styled.div`
  display: flex;
  justify-content: center;
`;
const Logo1 = styled.img``;



const Text = styled.div`
  font-size: 20px;

`;

const LinkTo = styled(Link)`
  color: ${COLORS.secondary};
  text-decoration: none;
  display:flex;

justify-content:center;
  &:hover {
    color: ${COLORS.fourth};
  }
`;

const Logo = styled.img``;

import React from "react";

import { COLORS } from "../constants";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <Wrapper
        style={{
          backgroundImage: "url(" + require("../assets/background.jpg") + ")",
        }}
      >
        <Carousel>
          <Slide>
            <NavLink to="/store/category/fitness">Fitness</NavLink>
            <Image src={require("../assets/fitness.jpg")}></Image>
          </Slide>
          <Slide>
            <NavLink to="/store/category/medical">Medical</NavLink>
            <Image src={require("../assets/Medical.jpg")}></Image>
          </Slide>
          <Slide>
            <NavLink to="/store/category/lifestyle">Lifestyle</NavLink>
            <Image src={require("../assets/Lifestyle.jpg")}></Image>
          </Slide>

          <Slide>
            <NavLink to="/store/category/entertainment">Entertainment</NavLink>
            <Image src={require("../assets/Entertainment.jpg")}></Image>
          </Slide>
          <Slide>
            <NavLink to="/store/category/industrial">Industrial</NavLink>
            <Image src={require("../assets/industrial.jpg")}></Image>
          </Slide>
          <Slide>
            <NavLink to="/store/category/petsandanimals">Pets & Animals</NavLink>
            <Image src={require("../assets/petsandanimals.jpg")}></Image>
          </Slide>
        </Carousel>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-image: "../assets/industrial.jpg";
  background-size: cover;
  min-height: calc(.76*100vh);
`;

const Carousel = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const Image = styled.img`
  border-radius: 1000px;
  height: 250px;
  width: 250px;
  @media (max-width: 1000px) {
    height: 200px;
    width: 200px;
  }
`;

const Slide = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${COLORS.secondary};
  height: 400px;
  width: 300px;
  @media (max-width: 1000px) {
    height: 250px;
    width: 200px;
  }
`;

const NavLink = styled(Link)`
  position: absolute;
  color: white;
  display: flex;
  font-size: 25pt;
  text-decoration: none;
  outline: 0;
  font-weight: bold;
  cursor: pointer;
  transition: font-size 0.5s ease-out;
  &:active,
  :focus,
  :hover {
    font-size: 28pt;
    transition-timing-function: ease-in-out;
    transition-property: font-size;
  }
  @media (max-width: 1000px) {
    font-size: 15pt;
    &:active,
    :focus,
    :hover {
      font-size: 20pt;
      transition-timing-function: ease-in-out;
      transition-property: font-size;
    }
  }
`;
export default Main;

import React, { useEffect } from "react";
import { COLORS } from "../constants";
import Map from "./Map";
import styled from "styled-components";

const location = {
  address: "WEAR TEK, 1814 Blvd. De La Côte-Vertu, Saint-Laurent, QC H4L 2A6",
  lat: 45.51044,
  lng: -73.68686,
};

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Wrapper>
        <Logo
          src={require("../assets/contactBlue.png")}
          alt="contact us"
        ></Logo>
        <BoxWrapper>
          <Box>
            <TextTitles>Talk to Customer Support</TextTitles>
            <Textparagraph>
              Sometimes you need a little help from your friends. Or a Wear-Tek
              support rep. Don’t worry… we’re here for you to chat 24/7.
            </Textparagraph>
            <EmailPhoneNo>
              <Bold>+1 801-954-9887</Bold>
            </EmailPhoneNo>
          </Box>
          <Box>
            <TextTitles>Email Customer Support</TextTitles>
            <Textparagraph>
              You may prefer to email rather than call us. Please rest assured
              that we will get back to you as fast as we can!
            </Textparagraph>
            <EmailPhoneNo>
              <Bold>wearteksupport@weartek.com</Bold>
            </EmailPhoneNo>
          </Box>
        </BoxWrapper>
        <Map location={location} zoomLevel={17} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;
const Logo = styled.img`
  width: 100%;
`;
const BoxWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 400px;
  border: 1px solid lightgray;
  border-style: solid;
  background-color: white;
  margin: 10px;
  @media (max-width: 1000px) {
    flex-direction: column;
    margin: 3px;
    padding: 3px;
    width: 300px;
  }
`;
const TextTitles = styled.h1`
  font-weight: bold;
  font-size: 20px;
`;

const Textparagraph = styled.p`
  font-size: 17px;
  margin: 10px;
  padding: 30px;
  text-align: center;
  @media (max-width: 1000px) {
    margin: 5px;
    padding: 15px;
  }
`;

const EmailPhoneNo = styled.div`
  font-size: 17px;
  margin: 10px;
  padding: 10px;
  color: ${COLORS.secondary};
`;

const Bold = styled.p`
  font-weight: bold;
  margin-left: 10px;
`;

export default Contact;

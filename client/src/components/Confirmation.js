import React, { useState, useEffect } from "react";

import { spinner6 } from "react-icons-kit/icomoon/spinner6";
import { Icon } from "react-icons-kit";
import { COLORS } from "../constants";
import styled, { keyframes } from "styled-components";

const moment = require("moment");

const Confirmation = () => {
  const [data, setData] = useState("");
 
  useEffect(() => {
    const receivedData = localStorage.getItem("received");   
    setData(JSON.parse(receivedData));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  if (!data) {
    return (
      <SpinnerWrapper>
        <StyledIcon size={50} icon={spinner6} />
      </SpinnerWrapper>
    );
  }
  return (
    <Wrapper>
      <Logos>
        <Logo1 src={require("../assets/ThankYou.jpg")} alt="WearTek"></Logo1>
        <Logo1 src={require("../assets/wearteklogo.png")} alt="WearTek"></Logo1>
      </Logos>
      <Main>Thank you for your order!</Main>
      <Processing>
        We are processing your order now, here are the details:
      </Processing>

      <Divider />

      <ConfirmationWrapper>
        <Details>Confirmation will be sent to</Details>
        <Details2>{data.email}</Details2>
      </ConfirmationWrapper>

      <ConfirmationWrapper>
        <Details>Order number</Details>
        <Details2>{data.id.substring(0, 8)}</Details2>
      </ConfirmationWrapper>

      <ConfirmationWrapper>
        <Details>Order date </Details>
        <Details2>{moment().format("LL")}</Details2>
      </ConfirmationWrapper>

      <ConfirmationWrapper>
        <Details>Delivery address</Details>
        <Details2>
          <div>{data.addressLine1}</div>
          <div>{data.city}</div>
          <div>{data.province}</div>
          <div>{data.country}</div>
          <div>{data.postcode}</div>
        </Details2>
      </ConfirmationWrapper>

      <ConfirmationWrapper>
        <Details>Expected delivery date:</Details>
        <Details2>{moment().add(7, "days").format("LL")}</Details2>
      </ConfirmationWrapper>

      <ConfirmationWrapper>
        <Details>Your Order Summary:</Details>
        <FlexWrapper>
          {data.newItems.map((item, i) => (
            <Details2 key={i}>
              {item.name} - Quantity ({item.quantity})
            </Details2>
          ))}
        </FlexWrapper>
      </ConfirmationWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  padding: 10px;
`;

const Main = styled.div`
  font-size: 40px;
  margin-bottom: 50px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Processing = styled.div`
  margin-bottom: 50px;
`;

const Divider = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  height: 2px;
  background-color: ${COLORS.fourth};
  margin-bottom: 50px;
`;

const ConfirmationWrapper = styled.div`
  margin-bottom: 30px;
  display: flex;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const FlexWrapper = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 768px) {
    width: 45%;
  }
`;

const Details = styled.div`
  display: flex;
  width: 50%;

  font-weight: bold;
  justify-content: flex-end;
  text-align: right;
  padding-right: 40px;

  @media (max-width: 768px) {
    width: 55%;
  }
`;

const Details2 = styled.div`
  padding-bottom: 10px;
  color: ${COLORS.secondary};
`;

const Logo1 = styled.img`
  width: 50%;
  max-width: 200px;
`;

const Logos = styled.div`
  margin: 40px 10px 30px 10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const StyledIcon = styled(Icon)`
  margin: 18% auto;
  animation: ${spinner} linear 1000ms infinite;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Confirmation;

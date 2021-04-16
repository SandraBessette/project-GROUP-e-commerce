import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../actions";
import styled from "styled-components";
import { COLORS } from "../constants";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const IndividualItem = ({
  _id,
  name,
  price,
  imageSrc,
  category,
  numInStock,
  companyName,
  companyFrom,
  bodyLocation,
}) => {
   const dispatch = useDispatch();
  const handleClick = (ev) => {
    ev.preventDefault();
    dispatch(
      addItem({
        _id,
        name,
        price,
        category,
        bodyLocation,
        imageSrc,
        numInStock,
        companyName,
        companyFrom
      })
    );
  };

  return (
    <MainWrapper>
      <TitleWrapper>
        <Title>
          <NameProduct>{name}</NameProduct>
        </Title>
      </TitleWrapper>
      <Main>
        <Wrapper>
          <ImageWrapper>
            <Image
              src={
                typeof imageSrc != "undefined" && imageSrc
                  ? imageSrc
                  : require("../assets/noImage.gif")
              }
              alt="itemImage"
            />
          </ImageWrapper>
        </Wrapper>
        <SideBar>
          <Confirm>
            <WrapperCompany>
              <Name>
                {typeof name != "undefined" && name ? name : "Unknown product"}
              </Name>
              <Details>
                <CompanyDetails>
                  <SoldBy>
                    Sold by <Span>{companyName}</Span>,{" "}
                  </SoldBy>{" "}
                  <ShippedBy>{companyFrom} </ShippedBy>
                </CompanyDetails>
                <SubCategory>
                  <Span>Category : </Span>
                  {category}

                  <Span>Body location : </Span>
                  {bodyLocation}
                </SubCategory>
              </Details>
            </WrapperCompany>
            <Container>
              <Price>
                {typeof price != "undefined" && price ? price : "$0"}
              </Price>
              {numInStock === 0 && (
                <SoldOut>
                  <AiOutlineExclamationCircle color="red" />
                  <SoldOutText>sold out!</SoldOutText>
                </SoldOut>
              )}
            </Container>
            <ButtonWrap>
              <Button
                onClick={(ev) => handleClick(ev)}
                disabled={numInStock === 0}
              >
                ADD TO CART
              </Button>
            </ButtonWrap>
          </Confirm>
        </SideBar>
      </Main>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;

  @media (max-width: 840px) {
    display: flex;
    flex-direction: column;

    justify-content: center;
    margin-bottom: 100px;
    margin-top: 20px;
  }
  @media (max-width: 768px) and (max-height: 1018px) {
    display: flex;
    flex-direction: column;

    justify-content: center;
    margin-bottom: 100px;
    margin-top: 20px;
  }
  @media (max-width: 650px) and (max-height: 850px) {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  width: 100vw;
  padding: 10px;
  @media (max-width: 840px) {
    margin-top: 20px;
  }
  @media (max-width: 768px) and (max-height: 1018px) {
    margin-top: 20px;
  }
  @media (max-width: 650px) and (max-height: 850px) {
    margin-top: 50px;
  }
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: black;
  margin-top: -50px;
  @media (max-width: 840px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: -40px;
  }
  @media (max-width: 768px) and (max-height: 1018px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: -40px;
  }
  @media (max-width: 650px) and (max-height: 850px) {
    display: flex;
    justify-content: space-between;
    height: 80vh;
    margin-top: 20px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 100vh;
  margin: 10px;
  @media (max-width: 840px) {
    width: 100vw;
    height: 70vh;
    margin: 0;
  }
  @media (max-width: 768px) and (max-height: 1018px) {
    width: 100vw;
    height: 70vh;
    margin: 0;
  }
  @media (max-width: 650px) and (max-height: 850px) {
    width: 100vw;
    height: 30vh;
    margin-bottom: 50px;
  }
`;
const SideBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 840px) {
    width: 100vw;
    margin-top: -100px;
    margin-bottom: 50px;
  }
  @media (max-width: 768px) and (max-height: 1018px) {
    width: 100vw;
    margin-top: -100px;
    margin-bottom: 50px;
  }
  @media (max-width: 650px) and (max-height: 850px) {
    display: flex;
    align-items: center;
    margin-top: 100px;
  }
`;
const CompanyDetails = styled.div`
  color: #d2a70d;
  border-bottom: 1px solid #d2a70d;
`;
const Confirm = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 10px;
  min-width: 30vw;
  max-width: 35vw;
  min-height: 40vh;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
  @media (max-width: 840px) {
    min-height: 27vh;
    max-height: 50vh;
    min-width: 80vw;
    max-width: 80vw;
  }
  @media (max-width: 768px) and (max-height: 1018px) {
    min-height: 27vh;
    max-height: 50vh;
    min-width: 80vw;
    max-width: 80vw;
  }
  @media (max-width: 650px) and (max-height: 850px) {
    min-height: 50vh;
    max-height: 60vh;
  }
`;

const WrapperCompany = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  color: ${COLORS.secondary};
  color: black;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 840px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  @media (max-width: 768px) and (max-height: 1018px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 650px) and (max-height: 850px) {
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Oswald", sans-serif;

  background-color: white;
  border-radius: 20px;
  width: 80vw;
  text-align: center;
  @media (max-width: 650px) and (max-height: 850px) {
    display: flex;
    justify-content: center;
    text-align: center;
    height: 20vh;
    margin-top: 10px;
    margin-bottom: 50px;
    font-size: 80%;
  }
`;
const NameProduct = styled.h1`
  color: black;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px lightgray solid;
`;

const SoldBy = styled.div`
  font-size: 20px;
`;
const ShippedBy = styled.div`
  font-size: 18px;
`;

const SubCategory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  @media (max-width: 768px) {
    height: 15vh;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 70px;
  border-radius: 10px;
  background-color: white;
  @media (max-width: 840px) {
    justify-content: center;
    max-width: 90vw;
  }
  @media (max-width: 768px) and (max-height: 1018px) {
    justify-content: center;
    max-width: 90vw;
  }
  @media (max-width: 650px) and (max-height: 850px) {
    justify-content: center;
    max-width: 80vw;
  }
`;

const Name = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 20px;
  color: ${COLORS.primary};
  font-weight: bold;
`;
const SoldOut = styled.div``;
const Image = styled.img`
  min-width: 300px;
  max-width: 450px;
  max-height: 300px;
  object-fit: contain;
  @media (max-width: 840px) {
    height: 25vh;
  }
  @media (max-width: 768px) and (max-height: 1018px) {
    height: 25vh;
  }

  @media (max-width: 650px) and (max-height: 850px) {
    height: 25vh;
  }
`;

const Button = styled.button`
  font-weight: bolder;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  color: white;
  background-color: ${COLORS.third};
  display: ${(p) => (p.hidden ? "none" : "block")};
  opacity: 0.9;
  :hover:enabled {
    cursor: pointer;
    opacity: 0.7;
  }
  :disabled {
    display: none;
  }
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.secondary};
  margin-top: 20px;
`;

const SoldOutText = styled.p`
  color: red;
  font-size: 12px;
  margin: 0 5px;
`;
const Span = styled.span`
  font-weight: bolder;
`;

export default IndividualItem;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../../constants";
import styled from "styled-components";
import { removeItem, updateQuantity } from "../../actions";

import { getStoreItemArray } from "../../reducers/item-reducer";

const CartItem = ({ setTotalItems, totalItems, setTotalPrice }) => {
  const dispatch = useDispatch();

  const newItems = useSelector(getStoreItemArray);

  useEffect(() => {
    const calculateTotalItem = (storeState) => {
      const reducer = (accumulator, storeItem) => {
        if (storeItem._id) {
          return Number(accumulator + storeItem.quantity);
        } else {
          return accumulator;
        }
      };
      return storeState.reduce(reducer, 0);
    };

    const total = calculateTotalItem(newItems);
    setTotalItems(total);
  }, [newItems]);
  useEffect(() => {
    const calculateTotal = (storeState) => {
      const newArray = storeState.map((item) => {
        const price = item.price;
        return price.replace("$", "");
      });

      console.log(newArray);

      const reduceTotal = (accumulator, storeItem) => {
        if (storeItem._id) {
          return (
            accumulator + parseFloat(newArray).toFixed(2) * storeItem.quantity
          );
        } else {
          return accumulator;
        }
      };
      return storeState.reduce(reduceTotal, 0);
    };

    const total = calculateTotal(newItems).toFixed(2);
    setTotalPrice(total);
  }, [newItems]);

  return (
    <Wrapper>
      <List>
        {newItems &&
          newItems.map((item) => {
            return (
              <Items key={item._id}>
                <Main>
                  <StyledLink to={`/item/${item._id}`}>
                    <Header>
                      <Title>
                        <h3>{item.name} </h3>
                      </Title>
                    </Header>

                    <ItemWrapper>
                      <Description>
                        <ItemImg src={item.imageSrc} />
                        <Category>
                          <SubCategory>
                            {" "}
                            <Span>Category:</Span> {item.category}
                          </SubCategory>

                          <Location>
                            <Span>Body Location:</Span> {item.body_location}
                          </Location>
                        </Category>
                      </Description>
                    </ItemWrapper>
                  </StyledLink>
                </Main>
                <ItemTotals>
                  <Delete>
                    <DeleteButton
                      onClick={() => {
                        dispatch(removeItem(item._id));
                      }}
                    >
                      X
                    </DeleteButton>
                  </Delete>
                  <div>
                    <Price>{item.price}</Price>
                  </div>

                  <Quantity>
                    <InputQt
                      value={item.quantity}
                      onChange={(event) => {
                        event.preventDefault();
                        dispatch(
                          updateQuantity({
                            itemId: item._id,
                            quantity: Number(event.target.value),
                          })
                        );
                      }}
                    />
                  </Quantity>
                </ItemTotals>
              </Items>
            );
          })}
      </List>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  border-style: solid;
  @media (max-width: 768px) {
    margin-bottom: 150px;
  }
  @media (max-width: 768px) and (max-height: 900px) {
    margin-bottom: 150px;
  }
  @media (max-width: 650px) and (max-height: 850px) {
    padding: 10px;
    margin-bottom: 150px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Items = styled.div`
  display: flex;
  min-width: 55vw;
  justify-content: space-around;
  padding: 15px;
  border-bottom: lightgray 1px solid;
  @media (max-width: 768px) and (max-height: 900px) {
    align-items: center;
  }
  @media (max-width: 650px) and (max-height: 850px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) and (max-height: 900px) {
    padding: 10px;
  }
  @media (max-width: 650px) and (max-height: 850px) {
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  max-width: 40vw;
  @media (max-width: 768px) and (max-height: 900px) {
    max-width: 60vw;
    flex-wrap: nowrap;
  }
  @media (max-width: 650px) and (max-height: 850px) {
    padding-right: 10px;
    justify-content: space-evenly;
  }
`;
const Title = styled.div``;
const Delete = styled.div``;
const DeleteButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 20px;
  height: 25px;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    background-color: lightgray;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
 
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const ItemTotals = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 20vh;
  @media (max-width: 768px) {
  }
  @media (max-width: 768px) and (max-height: 900px) {
  }
  @media (max-width: 650px) and (max-height: 850px) {
    flex-direction: row-reverse;

    align-items: center;
    width: 100vw;
  }
`;
const Description = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media (max-width: 768px) and (max-height: 900px) {
    flex-direction: column;
  }
  @media (max-width: 650px) and (max-height: 850px) {

    flex-direction: column;
    align-items: center;
  }
`;
const Category = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  @media (max-width: 650px) and (max-height: 850px) {

padding-top:15px;
}
`;
const SubCategory = styled.div``;

const Location = styled.div``;
const Quantity = styled.div`
  padding: 5px;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const InputQt = styled.input`
  width: 20px;
  outline: none;
  border: none;
`;

const Price = styled.p`
  font-weight: bolder;
`;

const ItemImg = styled.img`
  max-height: 150px;
  max-width: 150px;
  border-radius: 10px;
`;
const Span = styled.span`
  font-weight: bolder;
  color: ${COLORS.secondary};
`;
export default CartItem;

import React, { useEffect, useState } from "react";
import Spinner from "./Tools/Spinner";
import ErrorPage from "./ErrorPage";
import IndividualItem from "./IndividualItem";
import { useParams } from "react-router-dom";

import { COLORS } from "../constants";
import styled from "styled-components";

const Item = () => {  
  const [itemData, setItemData] = useState([]);
  const [company, setCompany] = useState([]);
  const [status, setStatus] = useState("idle");
  let { id } = useParams();

  useEffect(() => {
    setStatus("loading");
    if (id) {
      Promise.all([
        fetch(`/item/${id}`).then(response => response.json()),
        fetch(`/company/${id}`).then(response => response.json())    
      ]).then(([itemsData, compagnyData]) => {       
        setItemData(itemsData.data);
        setCompany(compagnyData.data);
        setStatus("idle");
         
      }).catch(() => {
        setStatus("error");
      });
    }
  }, [id]);
  
  
  if (status=== "error"){
    return (
      <ErrorPage />
    );
  };

  return ( 
    <Wrapper>
      {status === "loading" && <Spinner />}      
      {status === "idle" && (
        <ItemsWrapper>
          <IndividualItem
            key={itemData._id}
            _id={itemData._id}
            name={itemData.name}
            price={itemData.price}
            imageSrc={itemData.imageSrc}
            category={itemData.category}
            bodyLocation={itemData.body_location}
            numInStock={itemData.numInStock}
            companyName={company.name}
            companyFrom={company.country}
          />
        </ItemsWrapper>
      )}
    </Wrapper>   
  );
};

const Wrapper = styled.div`
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  color: ${COLORS.primary};
  min-height: 700px;
  background-color: #0d3e5d;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%238cb7d2' fill-opacity='0.4'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  @media (max-width: 768px) and (max-height: 1018px) {
  min-height:1000px;
  height:100vh;
  }

`;
const ItemsWrapper = styled.div`
  @media (max-width: 650px) and (max-height: 850px) {
 
    margin-top: 0px;
   margin-right:20px;
  }
 `;
export default Item;

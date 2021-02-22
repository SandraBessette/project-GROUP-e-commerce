import React, { useState } from 'react';
import styled  from 'styled-components';
import { NavLink } from "react-router-dom";
import {
    FiMinus,
    FiPlus
  } from "react-icons/fi"; 
 
import { useDispatch, useSelector } from "react-redux";
import RadioButton from './RadioButton';
import CheckBox from './CheckBox';
import { priceRadioButtonData } from './Utilities';

import { COLORS } from "../../constants";
import { updateStoreFilterPrice, updateStoreFilterBodyLocation, clearAllStoreFilterBodyLocation, clearStoreFilterPrice} from "../../actions";

const SideBar = ()=>{
    const [categoryHidden, setCategoryHidden] = useState(false);
    const [locationHidden, setLocationHidden] = useState(true);
    const [priceHidden, setPriceHidden] = useState(true);
    const {currentStore, filters:{price, body_location}}= useSelector((state)=>state.store); 
    const dispatch = useDispatch();    
   
    const handleClickCategory = (ev)=>{       
        ev.preventDefault();  
        setCategoryHidden(!categoryHidden);  
    };

    const handleClickLocation = (ev)=>{       
        ev.preventDefault();  
        setLocationHidden(!locationHidden);  
    };

    const handleClickPrice = (ev)=>{       
        ev.preventDefault();  
        setPriceHidden(!priceHidden);  
    };   

    const handleChangeFilterPrice = (ev, id, label) => { 
        dispatch(updateStoreFilterPrice({id: id, value: ev.target.value, label: label}));  
      };

    const handleChangeFilterBodyLocation = (ev, id, label) => { 
         dispatch(updateStoreFilterBodyLocation(id, ev.target.checked));  
      };
    
    const handleClearAllFilterBodyLocation = (ev) => { 
        ev.preventDefault();  
        dispatch(clearAllStoreFilterBodyLocation());  
     };

     const handleClearFilterPrice = (ev) => { 
        ev.preventDefault();  
        dispatch(clearStoreFilterPrice());  
     };


    return (
        <>
        <Wrapper>
            <NavBar >   
                <Divider/>          
                <TitleWrapper>
                    <Title>CATEGORY</Title>
                    <Button onClick={((ev)=>(handleClickCategory(ev)))}>
                        {categoryHidden ? <FiPlus color='grey' size={20}/> : <FiMinus color='grey' size={20}/>}
                    </Button>
                </TitleWrapper>
                <SectionWrapper className={categoryHidden && 'expanded'} >
                <NavigationLink exact to="/store/category/allProducts" activeClassName='active'>All products</NavigationLink> 
                    <NavigationLink exact to={`/store/category/entertainment`} activeClassName='active' >Entertainment</NavigationLink>
                    <NavigationLink exact to="/store/category/fitness" activeClassName='active'>Fitness</NavigationLink>
                    <NavigationLink exact to="/store/category/lifestyle" activeClassName='active'>Lifestyle</NavigationLink>
                    <NavigationLink exact to="/store/category/gaming" activeClassName='active'>Gaming</NavigationLink>
                    <NavigationLink exact to="/store/category/industrial" activeClassName='active'>Industrial</NavigationLink>
                    <NavigationLink exact to="/store/category/medical" activeClassName='active'>Medical</NavigationLink>
                    <NavigationLink exact to="/store/category/petsandanimals" activeClassName='active'>Pets and Animals</NavigationLink>
                </SectionWrapper>   
                <Divider/>       
                <TitleWrapper>
                    <Title>BODY LOCATION</Title>
                    <ButtonWrapper>
                        <Button title="Clear filters" onClick={((ev)=>(handleClearAllFilterBodyLocation(ev)))}>
                            CLEAR
                        </Button>
                        <Button onClick={((ev)=>(handleClickLocation(ev)))}>
                            {locationHidden ? <FiPlus color='grey' size={20}/> : <FiMinus color='grey' size={20}/>}
                        </Button>
                    </ButtonWrapper>
                </TitleWrapper>
                <SectionWrapper className={locationHidden && 'expanded'} >
                    {Object.values(body_location).map((data)=>{
                            return (
                                <CheckBox
                                    key={data.id}
                                    id={data.id}
                                    value={data.value}                           
                                    name={data.value}
                                    isChecked={data.isChecked}
                                    isAvailable={currentStore !== null && currentStore.bodyLocation[data.value] !== undefined}
                                    handleChange={handleChangeFilterBodyLocation}
                                >
                                    {data.label}
                                </CheckBox>
                            )
                        })} 
                </SectionWrapper>   
                <Divider/>           
                <TitleWrapper>
                    <Title>PRICE</Title>
                    <ButtonWrapper>
                        <Button title="Clear filters" onClick={((ev)=>(handleClearFilterPrice(ev)))}>
                            CLEAR
                        </Button>
                        <Button onClick={((ev)=>(handleClickPrice(ev)))}>
                            {priceHidden ? <FiPlus color='grey' size={20}/> : <FiMinus color='grey' size={20}/>}
                        </Button>
                    </ButtonWrapper>
                </TitleWrapper>
                <SectionWrapper className={priceHidden && 'expanded'} >
                    {priceRadioButtonData.map((priceData)=>{
                        return (
                            <RadioButton
                                key={priceData.id}
                                id={priceData.id}
                                value={priceData.value}                           
                                name={priceData.name}                               
                                isChecked={priceData.id === price.id}
                                handleChange={handleChangeFilterPrice}
                            >
                                {priceData.label}
                            </RadioButton>
                        )
                    })}                
                </SectionWrapper>   
                <Divider/>           
            </NavBar >        
        </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
   margin: 0px 20px;
   min-width: 340px;
   box-sizing:border-box;  
   @media (max-width: 940px) {
     min-width: 260px;   
 } 
 @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const NavBar = styled.nav`
   display: flex;
   flex-direction: column; 
   font-weight: bold;
   margin-top: 0px;    
`;

const Divider = styled.div`
 border-top: solid 1px #E8E8E8;
`;

const SectionWrapper = styled.div`  
    max-height: 400px;
    overflow: hidden;   
    transition: max-height 0.45s ease-in-out;

  &.expanded { 
   max-height: 0px;
    }
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  margin: 0px 0 0 25px; 
  padding: 7px 10px ;
  display: flex;
  align-items:center; 
  color: black;
  font-size: 15px;
  font-weight: normal; 
 
  &.active {
    background-color: ${COLORS.fifth};
  }

  &:hover {     
   color: gray;  
  }
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;   
    margin: 5px 0px;
`;
const Title = styled.p`
    padding: 0px 0 5px 0;
    margin: 5px 0 0 0;
    
`;

const Button = styled.button`    
    border: none;   
    background-color: white;
    font-size: 12px;
    font-weight: bold;
    text-decoration: underline;
    margin-left: 10px;

    :hover:enabled {   
        cursor: pointer;
        opacity: 0.7;      
        text-decoration: none;   
    }

    :focus,
    :active {
        outline: none;
    }
  
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;

`;
export default SideBar;
import React from 'react';
import styled from 'styled-components';

const CheckBox = ({ id, value, name, handleChange, isChecked, isAvailable, children })=>{     
    return (
        <Wrapper isAvailable={isAvailable}> 
            <Label >           
                <Input type="checkbox" name={name} onChange={(ev)=>handleChange(ev, id, children)} value={value} checked={isChecked} />
            {children}
            </Label>         
        </Wrapper>  
    );
};

const Wrapper = styled.div`  
  margin: 0px 0 0 25px; 
  padding: 5px 10px ;
  display: flex;
  align-items:center; 
  color: black;
  font-size: 15px;
  font-weight: normal; 
  display: ${p=>p.isAvailable ? 'block':'none' };   

  &:hover {     
   color: gray;  
  }
`;
const Label = styled.label`
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    margin-right: 15px;
    width: 15px;
    height: 15px;
`;

export default CheckBox;
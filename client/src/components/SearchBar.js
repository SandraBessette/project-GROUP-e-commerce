import React, { useState } from "react";
import styled from "styled-components";
import Suggestion from "./Suggestion";
import { useHistory } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { COLORS } from "../constants";

const SearchBar = ({ data }) => {
  let history = useHistory();
  const [value, setValue] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);  

  const handleSelect = (suggestion) => {  
    history.push(`/item/${suggestion}`);
    history.push("/temp");
    history.goBack();
    setValue("");
   
  };

  return (
    <TypeheadWrapper>
      <Input
        value={value}
        onKeyDown={(ev) => {
          switch (ev.key) {
            case "ArrowUp": {
              setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
              return;
            }
            case "ArrowDown": {
              setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
              return;
            }
            case "Escape": {
              setValue("");
              return;
            }
            default:
              return;
          }
        }}
        onChange={(ev) => {
          setValue(ev.target.value);
        }}
      />
      <RiSearchLine
        size="35"
        style={{
          position: "absolute",
          top: "5px",
          right: "20px",
          paddingleft: "13px",
          borderradius: "100%",
          backgroundcolor: COLORS.primary,
        }}
        onClick={() => {
          setValue("");
        }}
      />
      <SuggestionWrapper>
        <Suggestion
          data={data}
          value={value}
          handleSelect={handleSelect}
          selectedSuggestionIndex={selectedSuggestionIndex}
          setSelectedSuggestionIndex={setSelectedSuggestionIndex}         
        ></Suggestion>
      </SuggestionWrapper>
    </TypeheadWrapper>
  );
};

const TypeheadWrapper = styled.div``;

const Input = styled.input`
  width: calc(100vw * 0.3);
  font-family: "Alata", sans-serif;
  font-size: 15px;
  outline: none;
  border-radius: 25px;
  padding: 5px;
  margin: 2px;
  margin-right: 40px;
`;

const SuggestionWrapper = styled.div``;

/*const Button = styled.button`
  background: blue;
  color: white;
  padding: 10px;
  font-family: "Alata", sans-serif;
  font-size: 15px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 10px;
  border-radius: 5px;
`;*/
export default SearchBar;

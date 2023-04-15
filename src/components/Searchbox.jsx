import React, { useRef } from "react";
import styled from "styled-components";
import Navigationbar from "../components/Navigationbar";
import { SlMagnifier } from "react-icons/sl";
import { MdOutlineCancel } from "react-icons/md";

function Searchbox({placeholder, onChangeInput, onKeyPress, setSearchInput}) {

  const inputRef = useRef();

  const clearButtonHandler = () => {
    inputRef.current.value = "";
    setSearchInput(inputRef.current.value)
  }

  return (
    <>
      <SearchTotalBox>
        <SearchStyleBox>
          <SlMagnifier className="SlMagnifier" />
          <SearchStyle>
            <Searchinput
              maxLength={11}
              type="text"
              name="searchbox"
              placeholder={placeholder}
              onChange={onChangeInput}
              onKeyPress={onKeyPress}
              ref={inputRef}
            />
          </SearchStyle>
          <ClearButton onClick={clearButtonHandler}><MdOutlineCancel className='MdOutlineCancel' /></ClearButton>
        </SearchStyleBox>
      </SearchTotalBox>

    </>
  );
}

export default Searchbox;

const SearchTotalBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 15px 25px 15px;
`;

const SearchStyleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  background-color: #E8E8E8;
  border: none;
  border-radius: 20px;
  padding: 12px 15px 12px 15px;
  .SlMagnifier {
    font-size: 25px;
    color: #7a7a7a;
    padding-left: 5px;
  }
  .MdOutlineCancel {
    font-size: 25px;
    color: #9b9b9b;
    padding-right: 5px;
  }
`;

const SearchStyle = styled.div`
  width: 100%;
  margin-left: 3%;
  display: flex;
`;

const Searchinput = styled.input`
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  border: none;
  width: 100%;

`;

const ClearButton = styled.button`
  background: none;
  border: none;

  cursor: pointer;
`;
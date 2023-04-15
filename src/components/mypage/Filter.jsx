import React, { useRef } from "react";
import styled from "styled-components";
import { SlMagnifier } from "react-icons/sl";
import { MdOutlineCancel } from "react-icons/md";

//test filter입니다. searchBox에 합치기?
const Filter = ({ setCards, existCards, placeholder }) => {
  const handleOnChangeFilterInput = (e) => {
    const searchText = e.target.value.toLowerCase();
    if (searchText === "") {
      setCards(existCards);
    } else {
      setCards(
        existCards.filter((card) =>
          card.nickname.toLowerCase().includes(searchText)
        )
      );
    }
  };

  const inputRef = useRef();

  const clearButtonHandler = (e) => {
    inputRef.current.value = "";
    setCards(existCards);
  };

  return (
    <>
      <SearchTotalBox>
        <SearchStyleBox>
          <SlMagnifier className="SlMagnifier" />
          <SearchStyle>
            <Searchinput
              type="text"
              maxLength={11}
              onChange={handleOnChangeFilterInput}
              placeholder={placeholder}
              ref={inputRef}
            />
          </SearchStyle>
          <ClearButton onClick={clearButtonHandler}>
            <MdOutlineCancel className="MdOutlineCancel" />
          </ClearButton>
        </SearchStyleBox>
      </SearchTotalBox>
    </>
  );
};

export default Filter;

const SearchTotalBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 15px 25px 15px;
  overflow-x: hidden;
`;

const SearchStyleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  background-color: #e8e8e8;
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

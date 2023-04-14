import React from "react";
import styled from "styled-components";
import { MdArrowBack } from "react-icons/md";
import { VscBlank } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const TitleBox = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };
  return (
    <>
      <TopBox>
        <VscBlank className="VscBlank" />
        <Textbox>알림</Textbox>
        <VscBlank className="VscBlank" />
      </TopBox>

      <ArrowBox>
        <MdArrowBack className="MdArrowBack" onClick={goBack} />
      </ArrowBox>
    </>
  );
};

export default TitleBox;

const TopBox = styled.div`
  background-color: white;
  position: sticky;
  top: 0%;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
  .VscBlank {
    font-size: 35px;
  }
`;

const Textbox = styled.div`
  font-size: 110%;
  font-weight: bolder;
`;

const ArrowBox = styled.div`
  z-index: 2;
  position: sticky;
  top: 0%;
  background-color: white;
  .MdArrowBack {
    font-size: 40px;
    color: #afafaf;
    padding: 10px;
  }
`;

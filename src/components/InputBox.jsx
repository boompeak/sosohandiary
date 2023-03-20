import React from "react";
import styled from "styled-components";
import { HiOutlineXCircle } from "react-icons/hi";

const InputBox = ({ type }) => {
  return (
    <>
      <Content>
        <input type={type} required />
        <ClearButton>
          <HiOutlineXCircle className="HiOutlineXCircle" />
        </ClearButton>
      </Content>
    </>
  );
};

export default InputBox;

const Content = styled.div`
  padding: 10px;
  position: relative;
  input {
    box-sizing: border-box;
    height: 55px;
    width: 100%;
    outline: none;
    border-radius: 25px;
    padding: 10px 10px 10px 25px;
    font-size: 16px;
    border: 1px solid #eee;
    background: #f5f5f5;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  font-size: 18px;
  top: 30%;
  right: 3%;
  border: none;
  background: none;
  cursor: pointer;
  .HiOutlineXCircle {
    font-size: 150%;
    color: #d0d0d0;
  }
`;

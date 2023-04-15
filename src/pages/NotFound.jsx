import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };
  return (
    <>
      <MainContainer>
        <AlertMsgArea>
          <AlertMsg>잘못된 접근입니다</AlertMsg>
          <GoHomeButton onClick={goToHome}>홈으로 가기</GoHomeButton>
        </AlertMsgArea>
      </MainContainer>
    </>
  );
};

export default NotFound;

const MainContainer = styled.div`
  margin: 0 auto;
  width: 400px;
  height: auto;
  border-left: 0.0625rem solid rgb(225, 226, 228);
  border-right: 0.0625rem solid rgb(225, 226, 228);
`;
const AlertMsgArea = styled.div`
  background-color: #f7f1fd;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const AlertMsg = styled.div`
  font-size: 30px;
  margin: 50px;
`;

const GoHomeButton = styled.div`
  font-size: 20px;
  background-color: #e0edfb;
  padding: 20px;
  border-radius: 25px;
  cursor: pointer;
`;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import error4041 from "../assets/error4041.png";
import error4042 from "../assets/error4042.png";

const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };
  return (
    <>
      <MainContainer>
        <AlertMsgArea>
          {/* <img
            src={error4041}
            style={{
              width: "90%",
              objectFit: "cover",
            }}
          /> */}
          <img
            src={error4042}
            style={{
              width: "90%",
              objectFit: "cover",
            }}
          />
          <AlertMsg>페이지를 찾을 수 없습니다.</AlertMsg>
          <AlertSmall>
            요청하신 페이지가 삭제되었거나, 잘못된 경로입니다.
          </AlertSmall>
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
  font-size: 27px;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const AlertSmall = styled.div`
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 80px;
`;

const GoHomeButton = styled.div`
  font-size: 20px;
  background-color: #e0edfb;
  padding: 20px;
  border-radius: 25px;
  cursor: pointer;
  &:hover {
    background-color: #cde4ff;
  }
`;

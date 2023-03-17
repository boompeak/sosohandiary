import React from "react";
import styled from "styled-components";
import { WholeAreaStyle } from "../styles/\bWholeAreaStyle";
import { LongButtonStyle } from "../styles/LongButtonStyle";

const SignupSuccess = () => {
  return (
    <WholeAreaStyle>
      <CelebratingMsg>
        소다님,
        <br />
        회원가입을 축하합니다!
      </CelebratingMsg>
      <Circle></Circle>
      <WelcomeMsg>이제부터 소소한 일상을 담아보세요!</WelcomeMsg>
      <LongButtonStyle>다이어리 쓰러 가기</LongButtonStyle>
    </WholeAreaStyle>
  );
};

export default SignupSuccess;

const CelebratingMsg = styled.h2`
  margin-top: 8vh;
`;
const Circle = styled.div`
  background-color: #d6d6d6;
  height: 30vh;
  width: 30vh;
  border-radius: 50%;
  margin: 8vh 0px;
`;

const WelcomeMsg = styled.div`
  margin-top: 2vh;
  margin-bottom: 8vh;
`;


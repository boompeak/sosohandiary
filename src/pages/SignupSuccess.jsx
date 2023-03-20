import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  WholeAreaStyle,
  WholeAreaWithMargin,
} from "../styles/\bWholeAreaStyle";
import { LongButtonStyle } from "../styles/LongButtonStyle";

const SignupSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  setInterval(() => {
    setCountdown(countdown - 1);
    if (countdown === 1) {
      navigate("/diaries");
    }
  }, 1000);

  return (
    <WholeAreaWithMargin>
      <CelebratingMsg>
        소다님,
        <br />
        회원가입을 축하합니다!
      </CelebratingMsg>
      <Circle></Circle>
      <WelcomeMsg>{countdown}초 후 홈으로 이동합니다</WelcomeMsg>
      <WelcomeMsg>이제부터 소소한 일상을 담아보세요!</WelcomeMsg>
      <LongButtonStyle>홈으로 가기</LongButtonStyle>
    </WholeAreaWithMargin>
  );
};

export default SignupSuccess;

const CelebratingMsg = styled.h2`
  margin-top: 8vh;
  position: relative;
  right: 20px;
`;
const Circle = styled.div`
  background-color: #d6d6d6;
  height: 30vh;
  width: 30vh;
  border-radius: 50%;
  margin: 8vh 0px;
`;

const WelcomeMsg = styled.div`
  margin-top: -1vh;
  margin-bottom: 4vh;
`;

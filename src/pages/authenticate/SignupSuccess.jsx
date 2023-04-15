import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MintButtonLarge } from "../../styles/Buttons";
import { WholeAreaWithMargin } from "../../styles/WholeAreaStyle";
import logoImg from "../../assets/logoImg.png";
import signupSuccess from "../../assets/onboarding/signupSuccess.png";

const SignupSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  setInterval(() => {
    setCountdown(countdown - 1);
    if (countdown === 1) {
      window.localStorage.removeItem("accessToken");
      navigate("/login");
    }
  }, 1000);

  const { state } = useLocation();
  const userName = state;

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <WholeAreaWithMargin>
      <CelebratingMsg>
        {userName}님,
        <br />
        회원가입을 축하합니다!
      </CelebratingMsg>
      <Circle imgUrl={signupSuccess}></Circle>
      <WelcomeMsg>{countdown}초 후 홈으로 이동합니다</WelcomeMsg>
      <WelcomeMsg>이제부터 소소한 일상을 담아보세요!</WelcomeMsg>
      <MintButtonLarge onClick={goToLogin}>로그인하러 가기</MintButtonLarge>
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
  background-image: url(${({ imgUrl }) => imgUrl});
  background-size: cover;
  background-position: center;
  height: 30vh;
  width: 30vh;
  border-radius: 50%;
  margin: 8vh 0px;
`;

const WelcomeMsg = styled.div`
  margin-top: -1vh;
  margin-bottom: 4vh;
`;

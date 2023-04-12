import React, { Fragment, useRef } from "react";
import { useSprings, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoImg.png";
import first from "../../assets/onboarding/first.jpg";
import second from "../../assets/onboarding/second.jpg";
import third from "../../assets/onboarding/third.jpg";
import { MintButtonLarge } from "../../styles/Buttons";
import { useInView } from "react-intersection-observer";

const OnBoardingInnerHTML = ({ idx }) => {
  const navigate = useNavigate();
  const goToSignup = () => {
    navigate("/signup");
  };

  switch (idx) {
    case 0:
      return (
        <FlexCenter>
          <Logo logoUrl={logo}></Logo>
        </FlexCenter>
      );
    case 1:
      return (
        <Fragment>
          <EmptyBox></EmptyBox>
          <WelcomePhraseArea>
            <h1>
              일상을 공유하는
              <br />
              우리들만의 다이어리,
              <br />
              US
            </h1>
            <p>여러분의 소중한 일상을 담아보세요</p>
          </WelcomePhraseArea>
        </Fragment>
      );
    case 2:
      return (
        <BannerArea>
          <div></div>
          <BannerImg src={first} />
          <div></div>
        </BannerArea>
      );
    case 3:
      return (
        <BannerArea>
          <div></div>
          <BannerImg src={second} />
          <div></div>
        </BannerArea>
      );
    case 4:
      return (
        <BannerArea>
          <div></div>
          <BannerImg src={third} />
          <div></div>
          <ButtonArea>
            <MintButtonLarge onClick={goToSignup}>회원가입</MintButtonLarge>
          </ButtonArea>
        </BannerArea>
      );
    case 5:
      return (
        <BannerArea>
          <div></div>
          <BannerImg src={third} />
          <div></div>
          <ButtonArea>
            <MintButtonLarge onClick={goToSignup}>회원가입</MintButtonLarge>
          </ButtonArea>
        </BannerArea>
      );
    default:
      return;
  }
};

const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "",
];

const Viewpager = () => {
  const navigate = useNavigate();
  const index = useRef(0);
  const [ref, { width }] = useMeasure();
  const [props, api] = useSprings(
    pages.length,
    (i) => ({
      x: i * width,
      scale: width === 0 ? 0 : 1,
      display: "block",
    }),
    [width]
  );
  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
      console.log(index.current);
      if (index.current === 5) {
        navigate("/signup");
      }
      if (active && distance > width / 2) {
        index.current = clamp(
          index.current + (xDir > 0 ? -1 : 1),
          0,
          pages.length - 1
        );
        cancel();
      }
      api.start((i) => {
        if (i < index.current - 1 || i > index.current + 1)
          return { display: "none" };
        const x = (i - index.current) * width + (active ? mx : 0);
        const scale = active ? 1 - distance / width / 2 : 1;
        return { x, scale, display: "block" };
      });
    }
  );

  return (
    <AllStyle ref={ref} className="wrapper">
      {props.map(({ x, display, scale }, i) => {
        return (
          <animated.div
            className="page"
            {...bind()}
            key={i}
            style={{ display, x }}
          >
            <animated.div
              style={{ scale, backgroundImage: `url(${pages[i].url})` }}
            >
              <OnBoardingInnerHTML idx={i} />
            </animated.div>
          </animated.div>
        );
      })}
    </AllStyle>
  );
};

const OnBoarding = () => {
  return (
    <div className="container">
      <Viewpager />
    </div>
  );
};

export default OnBoarding;

const AllStyle = styled.div`
  .page {
    position: absolute;
    width: 100%;
    height: 100%;
    will-change: transform;
  }

  .page > div {
    touch-action: none;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 100%;
    will-change: transform;
    box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5),
      0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
  }

  .container {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }
`;

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Logo = styled.div`
  background-image: url(${({ logoUrl }) => logoUrl});
  background-size: cover;
  background-position: center;
  height: 200px;
  width: 200px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;

const EmptyBox = styled.div`
  height: 40vh;
`;

const WelcomePhraseArea = styled.div`
  margin: 30px 10vw;
`;

const BannerArea = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BannerImg = styled.img`
  -webkit-user-drag: none;
  max-width: 100%;

  /* 데스크톱 기기(992px 이상)에 대한 스타일 */
  @media only screen and (min-width: 992px) {
    width: 70vw;
  height: 100vh;

  }
`;
const PassageArea = styled.div``;

const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 15vh;
`;

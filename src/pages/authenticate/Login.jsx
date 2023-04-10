import React, { useEffect } from "react";
import styled from "styled-components";
import kakaoLoginImage from "../../assets//kakao_login_medium_wide.png";
import { useNavigate } from "react-router-dom";
import { kakaoLoginApi } from "../../api/kakaoLogin";
import { disableColor, subColor1 } from "../../constants/colorPalette";
import { useForm } from "react-hook-form";
import {
  MintButtonLarge,
  MintButtonLargeForSubmitInput,
} from "../../styles/Buttons";
import { HiOutlineXCircle } from "react-icons/hi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../contexts/currentUserInfoSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alreadySignedUp = window.localStorage.getItem("already signed up");
  const kakaoLoginButtonHandler = () => {
    kakaoLoginApi();
  };

  const goToSignup = () => {
    if (alreadySignedUp === true) {
      navigate("/signup");
    } else {
      navigate("/onboarding");
    }
  };

  //form 처리 관련
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_BASEURL}/login`, data)
      .then((res) => {
        const userInfo = {
          userName: res.data.name,
          userNickname: res.data.nickname,
        };
        dispatch(setCurrentUser(userInfo));
        localStorage.setItem("accessToken", res.headers.authorization);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <WholeArea>
      <LogoArea>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAM1BMVEX///+P1faJ0/aD0fXQ7Pvm9f2d2vd+0PXv+P7g8vz4/P7z+v7H6fut3/il3PjC5/q14vnqAUkaAAAB/ElEQVRoge1ZyZaEIAzEsAhu+P9fOxpcuucNa3dd5llXoQhJJUAU4sGDBw/SGKxTk/eTcnb4KvGoZkO9JIbsycxq/A6zncxG271hW8JM9mNqN/8mvheY3WfUS4w60C/t9HaW9Eol+w1vLiI5NzpH3TQk5bIqpzc4tS7yXpRItXAv8ppvvH7/pr25VpZLNbXt6KRe9V8D9HrSU1fpGn1R+6iix5v+z+VjcHRuOWmUPV1HFao57ZbZYClZa7ulw5cFM/QRGyr1+2GMKSpQgzm2Wca98GgqVljN+OBGMqXcQgTb8wG6HN5VFO2hK3X7HMyoUq4Om51z45ws3eIrgitlTu0cnfJgVk0LqVks2gshUplEZY+Tr+UWYqWs1w8DGk7fMb/liddf67lP06fECFNfQE+EYpdIvVFmBqTAhsm4R1VrOHd4nhxPENZKXXLe4DRN6CXsrI1biLRPB45J/WF+YGE1xAqe7ZuFuIPF2MeUzkWr7ZKzg+UQLV7pr1mkbWMx9Y1i2eTSp3L0K+SxLIGST0i3QAMKlSI0iaDpDy1c2JILPSygxxz0gMZeLaCXIuh1DnsRhV6hsZd/6LMF++CCPhWxj1zs8xzbWIC2RLDNHGwbCttAE9DWn8A2LbHtVgFtFDM9rsW9A9icZ+B+KxzYf4j4DV//IfLgwYP/iB/IARJeyL/yUwAAAABJRU5ErkJggg==" />
      </LogoArea>
      <LoginArea>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              {...register("email", {
                required: "이메일을 입력해주세요",
                minLength: { value: 2, message: "2자리 이상 입력하세요" },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            <button>
              <HiOutlineXCircle className="HiOutlineXCircle" />
            </button>
          </Content>
          {errors.email && (
            <ValidationAlert role="alert">
              {errors.email.message}
            </ValidationAlert>
          )}
          <Content>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: { value: 2, message: "2자리 이상 입력하세요" },
              })}
            />
            <div>
              <HiOutlineXCircle className="HiOutlineXCircle" />
            </div>
          </Content>
          {errors.password && (
            <ValidationAlert role="alert">
              {errors.password.message}
            </ValidationAlert>
          )}
          <MintButtonLargeForSubmitInput>
            <input type="submit" value="로그인" disabled={isSubmitting} />
          </MintButtonLargeForSubmitInput>
        </LoginForm>
        <MintButtonLarge onClick={goToSignup}>회원가입</MintButtonLarge>
        <Underline
          style={{ marginTop: "7vh", marginBottom: "3vh" }}
        ></Underline>
        <div>
          <img
            src={kakaoLoginImage}
            alt="카카오 로그인"
            onClick={kakaoLoginButtonHandler}
          />
        </div>
      </LoginArea>
    </WholeArea>
  );
};

export default Login;

const WholeArea = styled.div`
  padding: 3vh 0 4vh 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 83vh;
`;

const LogoArea = styled.div`
  display: flex;
  justify-content: center;
  img {
    border-radius: 10px;
    margin-top: 16vh;
    margin-bottom: 3vh;
    width: 100px;
    height: 100px;
    border: 1px solid rgb(194, 194, 194);
  }
`;

const LoginArea = styled.div`
  margin-top: 5px;
  div {
    text-align: center;
    margin: 5px 0px;
  }
`;

const LoginForm = styled.form`
  color: rgb(${disableColor});
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 12px;
`;

const SubmitButtonStyle = styled.div`
  background-color: rgb(${subColor1});
  width: 300px;
  height: 45px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;

  input {
    cursor: pointer;
    width: 100%;
    height: 100%;
    background: none;
    color: black;
    border: none;
    padding: 0;
    font: inherit;
    outline: inherit;
  }
`;

const FindIDPWArea = styled.div`
  color: gray;
  font-size: 11px;
`;

const Underline = styled.div`
  border-bottom: 1px solid rgb(222, 222, 222);
`;

const Content = styled.div`
  width: 300px;
  padding: 10px;
  position: relative;
  input {
    box-sizing: border-box;
    height: 30px;
    width: 100%;
    outline: none;
    border-radius: 25px;
    padding: 10px 10px 10px 25px;
    font-size: 16px;
    border: 1px solid #eee;
    background: #f5f5f5;
  }
  button {
    position: absolute;
    font-size: 18px;
    top: 21%;
    right: 3%;
    border: none;
    background: none;
    cursor: pointer;
    .HiOutlineXCircle {
      font-size: 150%;
      color: #d0d0d0;
    }
  }
`;

const ValidationAlert = styled.small`
  color: red;
  margin-top: -16px;
`;

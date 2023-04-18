import React, { useEffect, useState } from "react";
import styled from "styled-components";
import kakaoLoginImage from "../../assets//kakao_login_medium_wide.png";
import { Navigate, useNavigate } from "react-router-dom";
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
import AlertMessage from "../../components/alert/AlertMessage";
import logoImg from "../../assets/logoImg.png";

const Login = ({ setAccessToken }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alreadySignedUp = window.localStorage.getItem("already signed up");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertNavigateLink, setAlertNavigateLink] = useState("");

  const kakaoLoginButtonHandler = () => {
    kakaoLoginApi();
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  //form 처리 관련
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/login`, data)
      .then((res) => {
        localStorage.setItem("accessToken", res.headers.authorization);
        setAccessToken(res.headers.authorization);
        navigate("/");
      })
      .catch((err) => {
        setAlertOpen(true);
        setAlertMsg("회원정보를 확인해주세요");
      });
  };

  return (
    <WholeArea>
      {alertOpen ? (
        <AlertMessage
          setAlertOpen={setAlertOpen}
          message={alertMsg}
          navigateLink={alertNavigateLink}
        />
      ) : (
        ""
      )}
      <LogoArea>
        <img src={logoImg} />
      </LogoArea>
      <LoginArea>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <input
              type="text"
              placeholder="이메일를 입력해주세요"
              {...register("email", {
                required: "이메일을 입력해주세요",
                minLength: { value: 2, message: "2자리 이상 입력하세요" },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />

            <HiOutlineXCircle
              className="HiOutlineXCircle"
              onClick={() => reset({ email: "" })}
            />
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
                minLength: { value: 4, message: "4자리 이상으로 입력하세요" },
                maxLength: { value: 15, message: "15자리 이하로 입력하세요" },
              })}
            />
            <div>
              <HiOutlineXCircle
                className="HiOutlineXCircle"
                onClick={() => reset({ password: "" })}
              />
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
        <div style={{ cursor: "pointer" }}>
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
    padding: 10px 30px 10px 25px;
    font-size: 16px;
    border: 1px solid #eee;
    background: #f5f5f5;
  }
  .HiOutlineXCircle {
    position: absolute;
    font-size: 18px;
    top: 13px;
    right: 15px;
    border: none;
    background: none;
    font-size: 150%;
    color: #d0d0d0;
    cursor: pointer;
  }
`;

const ValidationAlert = styled.small`
  color: red;
  margin-top: -16px;
`;

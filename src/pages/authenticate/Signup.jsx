import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TbAlertCircle } from "react-icons/tb";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { MintButtonLargeForSubmitInput } from "../../styles/Buttons";
import { WholeAreaWithMargin } from "../../styles/WholeAreaStyle";
import AlertMessage from "../../components/alert/AlertMessage";

const Signup = () => {
  const navigate = useNavigate();
  const [alertMsg, setAlertMsg] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [noChangeForDisableSubmit, setNoChangeForDisableSubmit] =
    useState(false);

  // form 관련
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();
  const onSubmit = async (data) => {
    delete data.passwordConfirm;
    axios
      .post(`https://sosohandiary.shop/join`, data)
      .then(() => {
        navigate("/signup-success", { state: data.nickname });
      })
      .catch((err) => {
        console.log(err);
        setAlertOpen(true);
        setAlertMsg("이미 가입되어있는 이메일입니다");
        setNoChangeForDisableSubmit(true);
      });
  };

  const xButtonClickHandler = () => {
    navigate("/login");
  };

  return (
    <WholeAreaWithMargin>
      {alertOpen ? (
        <AlertMessage setAlertOpen={setAlertOpen} message={alertMsg} />
      ) : (
        ""
      )}
      <XandTitle>
        <Title>회원가입</Title>
      </XandTitle>
      <Xbutton onClick={xButtonClickHandler}>X</Xbutton>
      <Greeting>
        처음 오셨네요!
        <br />
        간단한 정보를 알려주세요
      </Greeting>
      <InputForm onSubmit={handleSubmit(onSubmit)}>
        <label>이름</label>
        <br />
        <Content>
          <input
            type="text"
            {...register("name", {
              required: "이름을 입력해주세요",
            })}
          />
          <div>
            {errors.name && <TbAlertCircle className="TbAlertCircle" />}
          </div>
        </Content>
        {errors.name && (
          <ValidationAlert role="alert">{errors.name.message}</ValidationAlert>
        )}
        <br />
        <label>닉네임</label>
        <br />
        <Content>
          <input
            type="text"
            {...register("nickname", {
              required: "닉네임을 입력해주세요",
            })}
          />
          <div>
            {errors.nickname && <TbAlertCircle className="TbAlertCircle" />}
          </div>
        </Content>
        {errors.nickname && (
          <ValidationAlert role="alert">
            {errors.nickname.message}
          </ValidationAlert>
        )}
        <br />
        <label>이메일</label>
        <br />
        <Content>
          <input
            id="emailInput"
            type="text"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
          <div>
            {errors.email && <TbAlertCircle className="TbAlertCircle" />}
          </div>
        </Content>
        {errors.email && (
          <ValidationAlert role="alert">{errors.email.message}</ValidationAlert>
        )}
        <br />
        <label>비밀번호</label>
        <br />
        <Content>
          <input
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
          />
          <div>
            {errors.password && <TbAlertCircle className="TbAlertCircle" />}
          </div>
        </Content>
        {errors.email && (
          <ValidationAlert role="alert">
            {errors.password.message}
          </ValidationAlert>
        )}
        <br />
        <label>비밀번호 확인</label>
        <br />
        <Content>
          <input
            type="password"
            {...register("passwordConfirm", {
              required: "비밀번호 확인을 입력해주세요",
              validate: (val) => {
                if (watch("password") != val) {
                  return "비밀번호가 일치하지 않습니다";
                }
              },
            })}
          />
          <div>
            {errors.passwordConfirm && (
              <TbAlertCircle className="TbAlertCircle" />
            )}
          </div>
        </Content>
        {errors.passwordConfirm && (
          <ValidationAlert role="alert">
            {errors.passwordConfirm.message}
          </ValidationAlert>
        )}
        <br />
        <MintButtonLargeForSubmitInput>
          <input
            type="submit"
            value="회원가입"
            disabled={isSubmitting || alertOpen}
          />
        </MintButtonLargeForSubmitInput>
      </InputForm>
    </WholeAreaWithMargin>
  );
};

export default Signup;

const XandTitle = styled.div`
  display: flex;
`;

const Xbutton = styled.div`
  position: relative;
  right: 120px;
  bottom: 15px;
`;

const Title = styled.div``;

const Greeting = styled.h2`
  margin-top: 4vh;
  position: relative;
  right: 30px;
`;

const InputForm = styled.form``;

const Content = styled.div`
  padding: 10px;
  position: relative;
  margin-bottom: 10px;
  input {
    box-sizing: border-box;
    height: 30px;
    width: 100%;
    outline: none;
    border-radius: 25px;
    padding: 10px 10px 10px 25px;
    font-size: 16px;
    border: 1px solid #d0d0d0;
  }
  div {
    position: absolute;
    font-size: 18px;
    top: 24%;
    right: 4%;
    border: none;
    background: none;
    cursor: pointer;
    .TbAlertCircle {
      font-size: 145%;
      color: red;
    }
  }
`;

const ContentGender = styled(Content)`
  display: flex;
  justify-content: flex-end;
  position: relative;
  div {
    top: -10px;
  }
`;

const ValidationAlert = styled.small`
  display: flex;
  justify-content: center;
  position: relative;
  color: red;
  margin-top: -16px;
`;

import { OmitProps } from "antd/es/transfer/ListBody";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Oauth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/login/kakao?code=${code}`)
      .then((res) => {})
      .catch((err) => {
        window.localStorage.setItem(
          "accessToken",
          err.response.headers.authorization
        );
        window.location.href = "https://us-diary.vercel.app/";
      });
  }, []);

  return <MainContainer></MainContainer>;
};

export default Oauth;

const MainContainer = styled.div`
  margin: 0 auto;
  width: 400px;
  height: auto;
  min-height: 100vh;

  border-left: 0.0625rem solid rgb(225, 226, 228);
  border-right: 0.0625rem solid rgb(225, 226, 228);
`;

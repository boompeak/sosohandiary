import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Oauth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log(code);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/login/kakao?code=${code}`)
      .then((res) => {
        console.log(res);

        window.localStorage.setItem("accessToken", "");
      })
      .catch((err) => {
        console.log(err);
        window.localStorage.setItem(
          "accessToken",
          err.response.headers.authorization
        );
        navigate("/");
      });
  }, []);

  return <div>Oauth</div>;
};

export default Oauth;

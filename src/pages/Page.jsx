import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { VscBlank } from "react-icons/vsc";
import { MdArrowBack } from "react-icons/md";
import AlertMessage from "../components/alert/AlertMessage";
import { getDate } from "../utils/getDate";

function Page() {
  const accessToken = window.localStorage.getItem("accessToken");
  const location = useLocation();
  const mypage = location.state;
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(mypage?.data?.img);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertNavigateLink, setAlertNavigateLink] = useState("");
  const [alertReload, setAlertReload] = useState(false);

  // 수정
  const handleClick = () => {
    navigate(`/diaryedit/${mypage.data.id}`, {
      state: {
        data: mypage.data,
      },
    });
  };

  // 삭제
  const handleDelete = async () => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (!confirmed) return;
    try {
      const config = {
        headers: {
          Authorization: accessToken,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_BASEURL}/diary/${mypage.data.id}`,
        config
      );
      setAlertMsg("삭제가 완료되었습니다!");
      setAlertOpen(true);
      setAlertNavigateLink(`/mypage`);
    } catch (error) {
      console.error("다이어리 삭제에 실패했습니다:", error);
    }
  };

  const navToBack = () => {
    navigate("/mypage");
  };
  return (
    <Wholebox>
      {alertOpen ? (
        <AlertMessage
          setAlertOpen={setAlertOpen}
          message={alertMsg}
          navigateLink={alertNavigateLink}
          reload={alertReload}
        />
      ) : (
        ""
      )}
      <TopBox>
        <StArrow>
          <StyledGobackButton onClick={navToBack} />
        </StArrow>
        <Textbox>다이어리 상세보기</Textbox>
        {/* <VscBlank className='VscBlank' /> */}
      </TopBox>
      <HeaderArea>
        <Title>{mypage?.data?.title}</Title>
        <HeaderRightArea>
          <HeaderIsPublic>{getDate(mypage?.data?.createdAt)}</HeaderIsPublic>
          <HeaderCreatedAt>
            {mypage?.data?.diaryCondition === "PUBLIC"
              ? "공개 다이어리"
              : "공유 다이어리"}
          </HeaderCreatedAt>
        </HeaderRightArea>
      </HeaderArea>
      <ButtonArea>
        <Upbutton backgroundColor="#A1B2FA" color="white" onClick={handleClick}>
          수정하기
        </Upbutton>
        <Upbutton
          backgroundColor="#FC9F9F"
          color="white"
          onClick={handleDelete}
        >
          삭제하기
        </Upbutton>
      </ButtonArea>
      {previewImage && ( // 업로드하려는 이미지를 미리 보여줌
        <img
          alt="preview"
          src={previewImage}
          style={{
            margin: "auto",
            width: "300px",
            height: "300px",
            borderRadius: "7px",
            objectFit: "cover",
          }}
        />
      )}
    </Wholebox>
  );
}

export default Page;

const StArrow = styled.div`
  position: relative;
  left: 16px;
  top: 30px;
`;

const StyledGobackButton = styled(MdArrowBack)`
  position: absolute;
  /* padding-top: 50px; */
  font-size: 40px;
  color: #adaaaa;
  cursor: pointer;
`;

const Upbutton = styled.button`
  color: ${(props) => props.color};
  background-color: #e8fefb;
  background-color: ${(props) => props.backgroundColor};

  width: 230px;
  height: 35px;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  font-size: 100%;
  margin: 10px;
  cursor: pointer;
`;

const Wholebox = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 5vw; */

  min-height: 100vh;
  height: auto;

  border-left: 0.0625rem solid rgb(225, 226, 228);
  border-right: 0.0625rem solid rgb(225, 226, 228);

  margin: 0 auto;
  width: 400px;
`;

const TopBox = styled.div`
  /* background-color: white;
  position: sticky;
  top: 0%;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; */
  /* .VscBlank {
    font-size: 35px;
    color: #afafaf;
    padding: 10px;
  }
  .MdArrowBack {
    font-size: 35px;
    color: #afafaf;
    padding: 10px;
  } */
`;

const Textbox = styled.div`
  font-weight: bold;

  display: flex;
  padding-top: 30px;
  margin-bottom: 17px;
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const HeaderRightArea = styled.div`
  text-align: right;
`;
const HeaderCreatedAt = styled.div`
  font-size: 12px;
  margin-right: 10px;
  color: rgba(1, 1, 1, 0.5);
`;

const Title = styled.h2`
  margin-left: 15px;
`;

const HeaderIsPublic = styled.div`
  font-size: 10px;
  margin-right: 10px;
  color: rgba(1, 1, 1, 0.3);
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { VscBlank } from "react-icons/vsc";
import { MdArrowBack } from "react-icons/md";
import AlertMessage from "../components/alert/AlertMessage";

function Page() {
  const accessToken = window.localStorage.getItem("accessToken");
  const location = useLocation();
  const mypage = location.state;
  const navigate = useNavigate();
  console.log(mypage.data);
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

  console.log(mypage.data);
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

  const goBackHandler = () => {
    navigate(-1);
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
        <MdArrowBack className="MdArrowBack" onClick={goBackHandler} />
        <Textbox>다이어리 상세보기</Textbox>
        <VscBlank className="VscBlank" />
      </TopBox>
      <HeaderArea>
        <h2>{mypage?.data?.title}</h2>
        <HeaderRightArea>
          <HeaderIsPublic>
            {mypage?.data?.diaryCondition === "PUBLIC"
              ? "공개 다이어리"
              : "비공개 다이어리"}
          </HeaderIsPublic>
          <HeaderCreatedAt>개설일: {mypage?.data?.createdAt}</HeaderCreatedAt>
        </HeaderRightArea>
      </HeaderArea>
      <ButtonArea>
        <Upbutton onClick={handleClick}>수정하기</Upbutton>
        <Upbutton onClick={handleDelete}>삭제하기</Upbutton>
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
          }}
        />
      )}
    </Wholebox>
  );
}

export default Page;

const Upbutton = styled.button`
  color: gray;
  background-color: #e8fefb;
  width: 300px;
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
  padding: 5vw;
`;

const TopBox = styled.div`
  background-color: white;
  position: sticky;
  top: 0%;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .VscBlank {
    font-size: 35px;
    color: #afafaf;
    padding: 10px;
  }
  .MdArrowBack {
    font-size: 35px;
    color: #afafaf;
    padding: 10px;
  }
`;

const Textbox = styled.div`
  font-size: 110%;
  font-weight: bolder;
  margin: 15px;
`;

const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderRightArea = styled.div`
  text-align: right;
`;
const HeaderCreatedAt = styled.div`
  font-size: 12px;
  color: rgba(1, 1, 1, 0.5);
`;
const HeaderIsPublic = styled.div`
  font-size: 10px;
  color: rgba(1, 1, 1, 0.3);
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

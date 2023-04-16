import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { VscBlank } from "react-icons/vsc";
import { MdArrowBack } from "react-icons/md";
import AlertMessage from "../components/alert/AlertMessage";
import { getDate } from "../utils/getDate";
import AlertMessageConfirm from "../components/alert/AlertMessageForDeleteDiary";
import AlertMessageForDeleteDiary from "../components/alert/AlertMessageForDeleteDiary";

function Page() {
  const accessToken = window.localStorage.getItem("accessToken");
  const location = useLocation();
  const mypage = location.state;
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(mypage?.data?.img);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertMsgOfDelete, setAlertMsgOfDelete] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOpenDeleteAlert, setAlertOpenDeleteAlert] = useState(false);
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
      navigate("/mypage");
      setAlertOpenDeleteAlert(false);
      setAlertOpen(false);
    } catch (error) {
      setAlertMsg("다이어리 삭제에 실패했습니다");
      setAlertOpen(true);
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

      {alertOpenDeleteAlert ? (
        <AlertMessageForDeleteDiary
          setAlertOpenDeleteAlert={setAlertOpenDeleteAlert}
          message={alertMsgOfDelete}
          diaryId={mypage.data.id}
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
              ? "전체공개 다이어리"
              : "친구공개 다이어리"}
          </HeaderCreatedAt>
        </HeaderRightArea>
      </HeaderArea>
      <ButtonArea>
        <Upbutton backgroundColor="#A1B2FA" color="white" onClick={handleClick}>
          수정
        </Upbutton>
        <Upbutton
          backgroundColor="#FC9F9F"
          color="white"
          onClick={() => {
            setAlertOpenDeleteAlert(true);
            setAlertMsgOfDelete("다이어리를 삭제하시겠습니까?");
          }}>
          삭제
        </Upbutton>
      </ButtonArea>
      {previewImage && ( // 업로드하려는 이미지를 미리 보여줌
        <img
          alt="preview"
          src={previewImage}
          style={{
            margin: "0 auto",
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

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 50px;
`;

const Upbutton = styled.button`
  color: ${(props) => props.color};
  background-color: #b9b9b9;
  width: 50px;
  height: 25px;
  border: none;
  border-radius: 7px;
  font-weight: 700;
  font-size: 80%;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    width: 50px;
    background-color: ${(props) => props.backgroundColor};
  }
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

const TopBox = styled.div``;

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

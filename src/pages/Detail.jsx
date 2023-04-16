import React, { useState, useRef, useEffect } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import CommentBox from "../components/detail/CommentBox";
import Like from "../components/detail/Like";
import { WholeViewWidth } from "../styles/WholeAreaStyle";
import GetUser from "../components/detail/GetUser";
import styled from "styled-components";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDiary } from "../api/detail";
import Spinner from "../styles/Spinner";
import DiaryModal from "../components/detail/DiaryModal";
import { useMutation } from "react-query";
import { deleteDiary } from "../api/detail";
import Thumbnail from "../components/drawing/Thumbnail";
import axios from "axios";
import AlertMessage from "../components/alert/AlertMessage";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import defaultProfileImg from "../assets/defaultProfileImg.jpeg";

function Detail() {
  const navigate = useNavigate();
  const sheetRef = useRef();
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertNavigateLink, setAlertNavigateLink] = useState("");

  const { diaryId, detailId } = useParams();

  const accessToken = localStorage.getItem("accessToken");

  const { data: diaryData } = useQuery(["getDiary"], () =>
    getDiary(diaryId, detailId, accessToken)
  );

  const myDiary = diaryData?.data;

  // 현재 로그인 유저 정보 확인 -> 모달창 권한 여부
  const { data: curUserInfo } = useQuery(["getCurUser"], () => {
    return axios
      .get(`${process.env.REACT_APP_BASEURL}/mypage/profile`, {
        headers: { Authorization: accessToken },
      })
      .catch((err) => {
        navigate("/login");
      });
  });

  useEffect(() => {
    sheetRef.current.click();
  }, []);

  //delete
  const { mutate: deleteDiaryMutate } = useMutation(
    (detailId) => deleteDiary(diaryId, detailId, accessToken),
    {}
  );

  const navToModify = () => {
    navigate(`/drawing/${diaryId}/${detailId}`);
  };

  const onDeleteHandler = async (detailId) => {
    try {
      await deleteDiaryMutate(detailId);
      setAlertMsg("삭제되었습니다");
      setAlertOpen(true);
      setAlertNavigateLink(`/diaries/${diaryId}`, {
        state: "needReload",
      });
    } catch (error) {}
  };

  return (
    <>
      {alertOpen ? (
        <AlertMessage
          setAlertOpen={setAlertOpen}
          message={alertMsg}
          navigateLink={alertNavigateLink}
        />
      ) : (
        ""
      )}
      <StyledGobackButton onClick={() => navigate(`/diaries/${diaryId}`)} />
      {myDiary && (
        <StyledDerailPage>
          <GetUser
            ProfileImg={
              myDiary?.profileImageUrl
                ? myDiary.profileImageUrl
                : defaultProfileImg
            }
            createdAt={myDiary?.createdAt}
            nickname={myDiary?.nickname}
          />
          {curUserInfo?.data?.memberId === diaryData?.data?.authorId ? (
            <DiaryModalWrapper>
              <DiaryModal
                navToModify={navToModify}
                onDeleteHandler={onDeleteHandler}
                detailId={detailId}
                customJson={myDiary?.customJson}
              />
            </DiaryModalWrapper>
          ) : (
            ""
          )}
          <div>
            <StyledDetailCardWrapper>
              <StyledDetailCard>
                <div
                  style={{
                    position: "relative",
                    top: "-10px",
                    zIndex: 0,
                    width: "100%",
                    height: "100%",
                    margin: "10px",
                  }}
                >
                  <Thumbnail
                    diaryId={diaryId}
                    paperId={detailId}
                    width={700}
                    height={window.innerHeight}
                  />
                </div>
              </StyledDetailCard>
            </StyledDetailCardWrapper>
          </div>
        </StyledDerailPage>
      )}
      <button
        style={{ display: "none" }}
        ref={sheetRef}
        onClick={() => setOpen(true)}
      ></button>
      {myDiary ? (
        <StBottomSheet
          open={open}
          scrollLocking={false}
          header={
            <DetailElement>
              <IoChatbubbleEllipsesSharp
                style={{ fontSize: "28px", color: "#b4d0f5", marginRight: "5" }}
              />
              {myDiary.commentCount}
              <Like diaryData={myDiary} />
              {myDiary.likeCount}
            </DetailElement>
          }
          defaultSnap={({ snapPoints }) => snapPoints}
          snapPoints={({ minHeight, maxHeight }) => [60, maxHeight]}
          blocking={false}
        >
          <CommentBox />
        </StBottomSheet>
      ) : (
        <div
          style={{
            marginTop: "40vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </div>
      )}
    </>
  );
}
export default Detail;

const StyledDerailPage = styled.div`
  margin-top: 20px;
  position: relative;
`;

const StyledGobackButton = styled(MdArrowBack)`
  position: relative;
  top: 30px;
  left: 50%;
  transform: translateX(-500%);
  font-size: 38px;
  color: #adaaaa;
  cursor: pointer;
  z-index: 1;
`;

const StyledDetailCardWrapper = styled(WholeViewWidth)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  overflow: hidden;
  border: none;
`;

const StyledDetailCard = styled.div`
  display: flex;
  justify-content: center;
  width: 375px;
  height: 550px;
  border: none;
  background-color: #f1f1f1;
  border-radius: 30px;
  padding: 10px;
`;

const DetailElement = styled.div`
  display: flex;
`;

const DiaryModalWrapper = styled.div`
  background-color: #fff;
  border: none;
  position: absolute;
  top: 25px;
  right: 50%;
  transform: translateX(460%);
`;

const StBottomSheet = styled(BottomSheet)`
  --rsbs-max-w: 418px;
  --rsbs-ml: auto;
  --rsbs-mr: auto;
`;

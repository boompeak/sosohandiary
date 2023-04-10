import React, { useState, useRef, useEffect } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import CommentBox from "../components/detail/CommentBox";
import "react-spring-bottom-sheet/dist/style.css";
import Like from "../components/detail/Like";
import { WholeAreaWithMargin, WholeViewWidth } from "../styles/WholeAreaStyle";
import GetUser from "../components/detail/GetUser";
import styled from "styled-components";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDiary } from "../api/detail";
import Spinner from "../styles/Spinner";
import CommentImage from "../assets//comment.png";
import DiaryModal from "../components/detail/DiaryModal";
import { useMutation } from "react-query";
import { deleteDiary } from "../api/detail";
import Thumbnail from "../components/drawing/Thumbnail";

function Detail() {
  const navigate = useNavigate();
  const sheetRef = useRef();
  const [open, setOpen] = useState(false);
  const { diaryId, detailId } = useParams();

  const accessToken = localStorage.getItem("accessToken");

  const { data: diaryData } = useQuery(["getDiary"], () => getDiary(diaryId, detailId, accessToken));

  const myDiary = diaryData?.data;

  console.log("data", myDiary);

  useEffect(() => {
    sheetRef.current.click();
  }, []);

  //delete
  const { mutate: deleteDiaryMutate } = useMutation((detailId) => deleteDiary(diaryId, detailId, accessToken), {});

  const navToModify = () => {
    navigate(`/drawing/${diaryId}/${detailId}`);
  };

  const onDeleteHandler = async (detailId) => {
    console.log("dd");
    try {
      await deleteDiaryMutate(detailId);
      alert("삭제되었습니다");
      navigate(`/diaries/${diaryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StyledGobackButton onClick={() => navigate(-1)} />
      {myDiary && (
        <StyledDerailPage>
          <GetUser ProfileImg={myDiary.profileImageUrl} createdAt={myDiary.createdAt} nickname={myDiary.nickname} />

          <DiaryModalWrapper>
            <DiaryModal navToModify={navToModify} onDeleteHandler={onDeleteHandler} detailId={detailId} />
          </DiaryModalWrapper>

          <div>
            <StyledDetailCardWrapper>
              <StyledDetailCard>
                <div style={{ position: "relative", top: "-10px" }}>
                  <Thumbnail
                    diaryId={diaryId}
                    paperId={detailId}
                    width={window.innerWidth}
                    height={window.innerHeight}
                  />
                </div>
              </StyledDetailCard>
            </StyledDetailCardWrapper>
          </div>
        </StyledDerailPage>
      )}
      <button style={{ display: "none" }} ref={sheetRef} onClick={() => setOpen(true)}></button>
      {myDiary ? (
        <BottomSheet
          style={{ position: "absolute", top: "100px" }}
          open={open}
          header={
            <DetailElement>
              <img
                src={CommentImage}
                alt="코멘트 아이콘"
                width="28"
                height="28"
                style={{
                  marginRight: "5px",
                }}
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
        </BottomSheet>
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
  margin-top: 40px;
  position: relative;
`;

const StyledGobackButton = styled(MdArrowBack)`
  position: absolute;
  top: 10px;
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
  align-items: center;
  margin-top: 30px;
  overflow: hidden;
`;

const StyledDetailCard = styled.div`
  display: flex;
  width: 375px;
  height: 80vh;
  border: none;
  background-color: #f1f1f1;
  border-radius: 30px 30px 0px 0px;
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

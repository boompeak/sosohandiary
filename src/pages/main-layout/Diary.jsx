import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { VscBlank } from "react-icons/vsc";
import defaultProfileImg from "../../assets/defaultProfileImg.jpeg";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/alert/AlertMessage";
import AlertMessageAndNavigate from "../../components/alert/AlertMessage";
import logoGray from "../../assets/logoGray.png";
import AlertMessageConfirm from "../../components/alert/AlertMessageForDeleteDiary";
import { useDispatch } from "react-redux";
import { changeCurNavbarMode } from "../../contexts/curNavbarModeSlice";

const Diary = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [previewImage, setPreviewImage] = useState(logoGray);
  const [diaryCondition, setDiaryCondition] = useState("PUBLIC");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertNavigateLink, setAlertNavigateLink] = useState("");

  useEffect(() => {
    if (accessToken === null) {
      navigate("/login", { replace: true });
    }
  }, [accessToken]);

  // navbar 모드 변경
  useEffect(() => {
    dispatch(changeCurNavbarMode("PLUS"));
  }, []);

  const handleConditionChange = (event) => {
    setDiaryCondition(event.target.value);
  };

  const handleChange = (e) => {
    if (e.target.files === null) return;
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("img", file);
    if (title.trim() === "") {
      setAlertMsg("공백은 입력할 수 없습니다");
      setAlertOpen(true);
      return;
    }

    const data = {
      title: title.trim(),
      diaryCondition: diaryCondition,
    };

    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    axios
      .post(`${process.env.REACT_APP_BASEURL}/diary`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      })
      .then((res) => {
        setAlertMsg("작성이 완료되었습니다");
        setAlertOpen(true);
        setAlertNavigateLink(`/diaries/${res.data.id}`);
      })
      .catch((err) => {
        setAlertMsg("다이어리 표지 사진을 첨부하세요!");
        setAlertOpen(true);
      });
  };

  //이미지 업로드 관련
  const selectFile = useRef();
  const imgClickHandler = () => {
    selectFile.current.click();
  };

  return (
    <Wholebox>
      {alertOpen ? (
        <AlertMessage
          setAlertOpen={setAlertOpen}
          message={alertMsg}
          navigateLink={alertNavigateLink}
        />
      ) : (
        ""
      )}
      <TopBox>
        <VscBlank className="VscBlank" />
        <Textbox>다이어리 만들기</Textbox>
        <VscBlank className="VscBlank" />
      </TopBox>
      <Card>
        <SideLabel colorCode={"#F7E8F6"}></SideLabel>
        <InnerArea>
          <Title>{title}</Title>
          <ImgArea>
            {previewImage && ( // 업로드하려는 이미지를 미리 보여줌
              <img
                alt="preview"
                src={previewImage}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "25px",
                  objectFit: "cover",
                }}
                onClick={imgClickHandler}
              />
            )}
          </ImgArea>
          <CreatedAt></CreatedAt>
        </InnerArea>
      </Card>
      <InputBox>
        <VscBlank className="VscBlank" />
        <FileInput
          type="file"
          onChange={handleChange}
          className="StyledInput"
          ref={selectFile}
        />
        <VscBlank className="VscBlank" />
      </InputBox>
      <form>
        <TitleText>제목</TitleText>
        <TitleContent>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              if (e.target.value.length > 7) {
                setAlertMsg("7자 이하로 설정해주세요");
                setAlertOpen(true);
                return;
              }
              setTitle(e.target.value);
            }}
          />
        </TitleContent>

        <PublicSelectBox>
          <SelectButtonLeft
            diaryCondition={diaryCondition}
            onClick={() => {
              setDiaryCondition("PUBLIC");
            }}
          >
            전체 공개
          </SelectButtonLeft>
          <CenterColumn></CenterColumn>
          <SelectButtonRight
            diaryCondition={diaryCondition}
            onClick={() => {
              setDiaryCondition("PRIVATE");
            }}
          >
            친구 공개
          </SelectButtonRight>
        </PublicSelectBox>

        <SubmitButton onClick={handleClick}>생성하기</SubmitButton>
      </form>
      <InvisibleDiv></InvisibleDiv>
    </Wholebox>
  );
};

export default Diary;
const InputBox = styled.div`
  display: none;
  flex-direction: row;
  margin-left: 10px;
  margin-right: 10px;
  justify-content: space-between;
`;

const FileInput = styled.input`
  margin: 0 auto;
  &::-webkit-file-upload-button {
    background-color: #d9d9d9;
    color: gray;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bolder;
  }
`;

const TitleContent = styled.div`
  padding: 10px;
  position: relative;
  input {
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    outline: none;
    border-radius: 20px;
    padding: 10px 10px 10px 25px;
    font-size: 16px;
    border: 1px solid #eee;
    background: #f5f5f5;
  }
`;

const TitleText = styled.div`
  margin-left: 10px;
  font-size: 100%;
  color: gray;
`;

const Wholebox = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 5vw; */

  height: auto;
  min-height: 100vh;

  border-left: 0.0625rem solid rgb(225, 226, 228);
  border-right: 0.0625rem solid rgb(225, 226, 228);

  margin: 0 auto;
  width: 400px;
  height: auto;
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
  }
  .MdArrowBack {
    font-size: 40px;
    color: #afafaf;
    padding: 10px;
  }
`;

const Textbox = styled.div`
  font-size: 110%;
  font-weight: bolder;
  margin: 15px;
`;

const Card = styled.div`
  margin: 0 auto;
  color: black;
  background-size: cover;
  width: 135px;
  height: 180px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 13px;
  display: flex;
  flex-direction: row;
`;

const SideLabel = styled.div`
  background-color: ${({ colorCode }) => colorCode};
  width: 15px;
  height: 180px;
  border-radius: 13px 0 0 13px;
  position: relative;
`;

const InnerArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: bold;
  margin: 20px 0 20px 15px;
  position: absolute;
  top: 0%;
`;

const ImgArea = styled.div`
  cursor: pointer;
  background-image: url(${({ imgSrc }) => imgSrc});
  margin-left: 10px;
  margin-top: 40px;
`;

const CreatedAt = styled.div`
  font-size: 10px;
  position: absolute;
  bottom: 14px;
  right: 14px;
`;

const PublicSelectBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px auto;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 20px;
  background-color: #eeeeee;
  width: 300px;
  height: 50px;
`;

const SelectButtonLeft = styled.div`
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: ${({ diaryCondition }) =>
    diaryCondition === "PUBLIC" ? "#ffe2e2" : ""};
  width: 100%;
  border-radius: 20px 0 0 20px;
`;

const SelectButtonRight = styled.div`
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: ${({ diaryCondition }) =>
    diaryCondition === "PRIVATE" ? "#ffe2e2" : ""};
  width: 100%;
  border-radius: 0 20px 20px 0;
`;

const CenterColumn = styled.div`
  background-color: rgba(1, 1, 1, 0.5);
  width: 1px;
  height: 20px;
  position: relative;
`;

const SubmitButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 100px auto 100px auto;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 20px;
  background-color: #e1e7ff;
  width: 300px;
  height: 50px;
  cursor: pointer;
`;

const InvisibleDiv = styled.div`
  height: 0.01px;
`;

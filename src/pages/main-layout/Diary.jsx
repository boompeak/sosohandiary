import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { VscBlank } from "react-icons/vsc";
import defaultProfileImg from "../../assets/defaultProfileImg.jpeg";
import { useNavigate } from "react-router-dom";

const Diary = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [previewImage, setPreviewImage] = useState(defaultProfileImg);
  const [diaryCondition, setDiaryCondition] = useState("PUBLIC");

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
    console.log("dd");
    console.log(accessToken);

    const formData = new FormData();
    formData.append("img", file);

    const data = {
      title: title,
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
        console.log(res);
        alert("작성이 완료되었습니다.");
        navigate(`/`);
      })
      .catch((error) => {
        console.error(error);
        alert("다이어리 표지 사진을 첨부하세요!");
      });
  };

  //이미지 업로드 관련
  const selectFile = useRef();
  const imgClickHandler = () => {
    console.log("dd");
    selectFile.current.click();
  };

  return (
    <Wholebox>
      <TopBox>
        <VscBlank className="VscBlank" />
        <Textbox>다이어리 만들기</Textbox>
        <VscBlank className="VscBlank" />
      </TopBox>

      <Card>
        <SideLabel colorCode={"#E0C7FF"}></SideLabel>
        <InnerArea>
          <Title>{title}</Title>
          <ImgArea>
            {previewImage && ( // 업로드하려는 이미지를 미리 보여줌
              <img
                alt="preview"
                src={previewImage}
                style={{
                  position: "absolute",
                  top: "145px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "25px",
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
              if (e.target.value.length > 8) {
                alert("제목이 너무 길어요");
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
            }}>
            공개
          </SelectButtonLeft>
          <CenterColumn></CenterColumn>
          <SelectButtonRight
            diaryCondition={diaryCondition}
            onClick={() => {
              setDiaryCondition("PRIVATE");
            }}>
            비공개
          </SelectButtonRight>
        </PublicSelectBox>

        <SubmitButton onClick={handleClick}>생성하기</SubmitButton>
      </form>
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

const PrivateorPublicBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  justify-content: space-between;
`;

const UpButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  justify-content: space-between;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  label {
    display: flex;
    align-items: center;
  }

  input[type="radio"] {
    margin-right: 0.5rem;
    cursor: pointer;
  }
`;

const Upbutton = styled.button`
  color: gray;
  background-color: #e8fefb;
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  font-size: 100%;
  cursor: pointer;
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
  font-size: 120%;
  color: gray;
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
`;

const SideLabel = styled.div`
  background-color: ${({ colorCode }) => colorCode};
  width: 15px;
  height: 180px;
  border-radius: 13px 0 0 13px;
  position: absolute;
`;

const InnerArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 700;
  margin: 20px 0 20px 15px;
`;

const ImgArea = styled.div`
  height: 100px;
  width: 100px;
  background-image: url(${({ imgSrc }) => imgSrc});
  margin: 0 0 0 15px;
`;

const CreatedAt = styled.div`
  font-size: 10px;
  position: absolute;
  bottom: 14px;
  right: 14px;
`;

const PublicSelectBox = styled.div`
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
  position: absolute;
`;

const SubmitButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 100px auto 80px auto;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 20px;
  background-color: #e1e7ff;
  width: 300px;
  height: 50px;
  cursor: pointer;
`;

import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { VscBlank } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import leftArrow from "../assets/leftArrow.png";

function DiaryEdit() {
  const accessToken = window.localStorage.getItem("accessToken");
  const location = useLocation();
  const mypage = location.state;
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [title, setTitle] = useState(mypage?.data?.title);
  const [previewImage, setPreviewImage] = useState(mypage?.data?.img);
  const [diaryCondition, setDiaryCondition] = useState(
    mypage?.data?.diaryCondition
  );

  // 공개 비공개 바꾸는거
  const handleConditionChange = (event) => {
    setDiaryCondition(event.target.value);
  };

  // 이미지 파일 올리는 거
  const handleChange = useCallback((e) => {
    if (e.target.files === null) return;
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  }, []);

  useEffect(() => {
    const url = mypage.data.img;
    // let url =
    //   "https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg";

    const urlToObject = async () => {
      const response = await fetch(url);
      // here image is url/location of image
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      setFile(file);
    };
    urlToObject();
  }, []);

  // 수정
  const handleClick = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData();

      formData.append("img", file);

      const uploader = { title };

      formData.append(
        "title",
        new Blob([JSON.stringify(uploader)], {
          type: "application/json",
        })
      );

      try {
        const paramId = mypage.data.id;
        console.log(paramId);
        const res = await axios.patch(
          `${process.env.REACT_APP_BASEURL}/diary/${paramId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: accessToken,
            },
          }
        );
        console.log(res.data); // 수정된 다이어리 정보가 포함된 API 응답 데이터
        navigate(`/mypage`);
      } catch (error) {
        console.error("다이어리 수정에 실패했습니다.", error);
      }
    },
    [accessToken, diaryCondition, file, mypage.data.id, navigate, title]
  );

  // 친구
  const [friends, setFriends] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const getMyfriends = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/mypage/friend/myfriends`,
        {
          headers: { Authorization: accessToken },
        }
      );
      setFriends(res.data);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  //이미지 업로드 관련
  const selectFile = useRef();
  const imgClickHandler = () => {
    console.log("dd");
    selectFile.current.click();
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <Wholebox>
      <TopBox>
        <VscBlank className="VscBlank" />
        <Textbox>다이어리 만들기</Textbox>
        <VscBlank className="VscBlank" />
      </TopBox>
      <div>
        <img src={leftArrow} onClick={goBackHandler} />
      </div>

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
      </form>
      <Addbutton onClick={getMyfriends}>멤버 추가</Addbutton>
      {modalOpen && (
        <ModalWrapper>
          <ModalContent>
            <div>
              <h2>추가할 멤버를 체크하세요</h2>
              <ul
                style={{
                  listStyleType: "none",
                  display: "flex",
                  flexDirection: "column",
                }}>
                {friends.map((friend) => (
                  <li
                    key={friend.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                      marginRight: "30px",
                    }}>
                    <label style={{ flex: 1 }}>
                      <img
                        src={friend.profileImageUrl}
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          marginRight: "7px",
                        }}
                      />
                      {friend.name} ({friend.nickname}):
                    </label>
                    <input
                      type="checkbox"
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "white",
                        marginTop: "8px",
                      }}
                    />
                  </li>
                ))}
              </ul>

              <ModalCloseButton onClick={handleCloseModal}>
                닫기
              </ModalCloseButton>
            </div>
          </ModalContent>
        </ModalWrapper>
      )}

      <SubmitButton onClick={handleClick}>생성하기</SubmitButton>
    </Wholebox>
  );
}

export default DiaryEdit;

const Addbutton = styled.button`
  color: gray;
  width: 100px;
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const ModalWrapper = styled.div`
  position: fixed;
  bottom: 50%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-radius: 5px;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 90%;
  padding: 20px;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  right: 0%;
  top: 0%;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  cursor: pointer;
  background-color: gray;
`;
const InputBox = styled.div`
  display: none;
  flex-direction: row;
  margin-left: 10px;
  margin-right: 10px;
  justify-content: space-between;
`;

const FileInput = styled.input`
  &::-webkit-file-upload-button {
    background-color: #d9d9d9;
    color: gray;
    width: 100px;
    height: 40px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bolder;
    margin-bottom: 20px;
    margin-top: 10px;
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
  width: 430px;
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
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 100px auto 80px auto;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 20px;
  background-color: #e1e7ff;
  width: 300px;
  height: 50px;
`;

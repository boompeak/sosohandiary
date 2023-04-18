import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
import { VscBlank } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import Searchbox from "../components/Searchbox";
import { Badge } from "@mui/material";
import { data } from "jquery";
import AlertMessage from "../components/alert/AlertMessage";
import defaultProfileImg from "../assets/defaultProfileImg.jpeg";
import BsCheckCircleFill from "../assets/diary-edit/BsCheckCircleFill.png";
import FaRegCircle from "../assets/diary-edit/FaRegCircle.png";
import { MdClose } from "react-icons/md";

function DiaryEdit() {
  const accessToken = window.localStorage.getItem("accessToken");
  const location = useLocation();
  const mypage = location.state;
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [title, setTitle] = useState(mypage?.data?.title);
  const titleBeforeChange = mypage?.data?.title;
  const [previewImage, setPreviewImage] = useState(mypage?.data?.img);
  const [diaryCondition, setDiaryCondition] = useState(
    mypage?.data?.diaryCondition
  );
  const [alertMsg, setAlertMsg] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertNavigateLink, setAlertNavigateLink] = useState("");
  const [alertReload, setAlertReload] = useState(false);

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
      if (title.trim() === "") {
        setAlertMsg("공백은 입력할 수 없습니다");
        setAlertOpen(true);
        return;
      }
      if (title.trim() === titleBeforeChange) {
        setAlertMsg("제목과 사진을 전부 수정해주세요");
        setAlertOpen(true);
        return;
      }
      const formData = new FormData();

      formData.append("img", file);

      const uploader = { title: title.trim() };

      formData.append(
        "title",
        new Blob([JSON.stringify(uploader)], {
          type: "application/json",
        })
      );

      try {
        const paramId = mypage.data.id;
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
        setAlertMsg("수정이 완료되었습니다");
        setAlertOpen(true);
        setAlertNavigateLink("/mypage");
      } catch (error) {
        setAlertMsg("제목과 사진을 전부 수정해주세요");
        setAlertOpen(true);
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
    } catch (error) {}
  };

  // 모달 닫기 버튼
  const handleCloseModal = () => {
    setModalOpen(false);
    setCheckedList([]);
  };

  //이미지 업로드 관련
  const selectFile = useRef();
  const imgClickHandler = () => {
    selectFile.current.click();
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  const navToBack = () => {
    navigate(-1);
  };

  // 모달 안에서 쓰일 검색 기능
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
    }
  };

  //체크 관련
  const [checkedList, setCheckedList] = useState([]);

  const onCheckedElement = (item) => {
    if (!checkedList.includes(item)) {
      setCheckedList([...checkedList, item]);
    } else {
      setCheckedList(checkedList.filter((el) => el !== item));
    }
  };
  const onRemove = (item) => {
    setCheckedList(checkedList.filter((el) => el !== item));
  };

  // 멤버 추가
  const addMemberCompleteHandler = () => {
    const diaryId = mypage.data.id;
    setModalOpen(false);
    checkedList.map((item) => {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/invite/${diaryId}/${item.memberId}`,
          {},
          { headers: { Authorization: accessToken } }
        )
        .then((res) => {
          setAlertMsg("멤버가 추가되었습니다");
          setCheckedList([]);
          setAlertOpen(true);
          setAlertReload(true);
        })
        .catch((err) => {
          setAlertMsg(err.response.data.msg);
          setCheckedList([]);
          setAlertOpen(true);
        });
    });
  };

  const [alreadyMembersId, setAlreadyMembersId] = useState([]);
  const getCurrentMemberInfo = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/invite/${mypage.data.id}/list`, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        setAlreadyMembersId(res.data.map((item) => item.memberId));
      });
  };

  useEffect(() => {
    getCurrentMemberInfo();
  }, []);

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
        <Textbox>다이어리 만들기</Textbox>
      </TopBox>
      {/* <div>
        <img src={leftArrow} onClick={goBackHandler} />
      </div> */}
      <Card>
        <SideLabel colorCode={"#E0C7FF"}></SideLabel>
        <InnerArea>
          {title ? <Title>{title}</Title> : <Title>&nbsp;</Title>}
          <ImgArea>
            {previewImage && ( // 업로드하려는 이미지를 미리 보여줌
              <img
                alt="preview"
                src={previewImage}
                style={{
                  position: "relative",
                  top: "0%",
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
              if (e.target.value.length > 8) {
                alert("제목이 너무 길어요");
                return;
              }
              setTitle(e.target.value);
            }}
          />
        </TitleContent>
      </form>
      {diaryCondition !== "PUBLIC" && (
        <Addbutton onClick={getMyfriends}>멤버 추가</Addbutton>
      )}
      {modalOpen && (
        <ModalWrapper>
          <ModalContent>
            <TopTopBox>
              <VscBlank className="VscBlank" />
              <MemberTextbox>멤버 추가</MemberTextbox>
              <MdClose className="MdClose" onClick={handleCloseModal} />
            </TopTopBox>
            <Searchbox
              placeholder="친구를 검색하세요"
              onChangeInput={handleInputChange}
              onKeyPress={handleKeyPress}
              setSearchInput={setSearchInput}
            />
            <CheckedListBox>
              {checkedList.map((item, i) => {
                return (
                  <MemberBox key={i}>
                    <Badge
                      style={{
                        cursor: "pointer",
                      }}
                      badgeContent="-"
                      color="primary"
                      onClick={() => {
                        onRemove(item);
                      }}>
                      <img
                        src={
                          item.profileImageUrl
                            ? item.profileImageUrl
                            : defaultProfileImg
                        }
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginRight: "7px",
                          objectFit: "cover",
                        }}
                      />
                    </Badge>
                    <div>{item.name}</div>
                  </MemberBox>
                );
              })}
            </CheckedListBox>
            <div>
              {friends
                .filter(
                  (item) =>
                    item.name.includes(searchInput) ||
                    item.nickname.includes(searchInput)
                )
                .map((friend) => (
                  <ListStyle
                    key={friend.id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}>
                    <label style={{ flex: 1 }}>
                      <ImgAndName>
                        <img
                          src={
                            friend.profileImageUrl
                              ? friend.profileImageUrl
                              : defaultProfileImg
                          }
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            marginRight: "7px",
                            objectFit: "cover",
                          }}
                        />
                        <FriendName>
                          {friend.name}({friend.nickname})
                        </FriendName>
                      </ImgAndName>
                    </label>
                    <CheckBox
                      disabled={alreadyMembersId.includes(friend.memberId)}
                      onClick={() => {
                        onCheckedElement(friend);
                      }}
                      checkedList={checkedList}
                      friend={friend}></CheckBox>
                    <AlreadyMember
                      disabled={alreadyMembersId.includes(friend.memberId)}>
                      이미 멤버입니다
                    </AlreadyMember>
                  </ListStyle>
                ))}
              <CompleteButtonArea>
                <Completebutton onClick={addMemberCompleteHandler}>
                  완료
                </Completebutton>
              </CompleteButtonArea>
              <TextBlank>-</TextBlank>
              <TextBlank>-</TextBlank>
              <TextBlank>-</TextBlank>
              <TextBlank>-</TextBlank>
              <TextBlank>-</TextBlank>
              <TextBlank>-</TextBlank>
            </div>
          </ModalContent>
        </ModalWrapper>
      )}
      <SubmitButton onClick={handleClick}>완료</SubmitButton>
    </Wholebox>
  );
}

export default DiaryEdit;

const TextBlank = styled.div`
  color: transparent;
`;

const TopTopBox = styled.div`
  background-color: white;
  top: 0%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .VscBlank {
    font-size: 35px;
  }
  .MdClose {
    font-size: 170%;
    font-weight: bolder;
    border-top: none;
    padding-top: 26px;
    color: gray;
    cursor: pointer;
  }
`;

const TopBox = styled.div``;

const MemberTextbox = styled.div`
  font-size: 110%;
  font-weight: bolder;
  margin: 10px;
  border-top: 3px solid gray;
  padding-top: 18px;
`;

const CheckedListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 32px;
  padding-right: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #dcdcdc;
`;

const MemberBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  margin: 7px;
`;

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

const FriendName = styled.div`
  margin-top: 17px;
  font-size: 16px;
  font-weight: bolder;
`;

const ImgAndName = styled.div`
  display: flex;
  flex-direction: row;
`;

const Addbutton = styled.button`
  color: gray;
  width: 100px;
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  margin: 5px 0 20px 10px;
  &:hover {
    width: 100px;
    background-color: #e2e2e2;
  }
`;

const ModalWrapper = styled.div`
  margin: 0 auto;
  width: 400px;
  position: absolute;
  z-index: 1;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-top: 100px;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  height: 100vh;
  overflow-y: scroll;
  padding: 15px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  padding-bottom: 100px;
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
  margin: 15px 0 0 15px;
  font-size: 100%;
  color: gray;
`;

const Wholebox = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100vh;
  border-left: 0.0625rem solid rgb(225, 226, 228);
  border-right: 0.0625rem solid rgb(225, 226, 228);
  margin: 0 auto;
  width: 400px;
`;

const Textbox = styled.div`
  font-weight: bold;
  display: flex;
  padding-top: 30px;
  margin-bottom: 27px;
  display: flex;
  justify-content: center;
  font-size: 18px;
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

const FriendListArea = styled.li`
  display: flex;
  align-items: center;
`;

const CheckBox = styled.div`
  display: ${({ disabled }) => (disabled ? "none" : "")};
  width: 20px;
  height: 20px;
  background-image: url(${({ friend, checkedList }) =>
    checkedList.includes(friend) ? BsCheckCircleFill : FaRegCircle});
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;

const CompleteButtonArea = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 10px 50px 10px;
`;

const Completebutton = styled.button`
  color: black;
  background-color: #e1e7ff;
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 15px;
  margin: 0px auto;
  font-weight: 700;
  font-size: 100%;
  cursor: pointer;
  margin-top: 30px;
`;

const ListStyle = styled.div`
  display: flex;
  align-items: center;
`;

const AlreadyMember = styled.div`
  display: ${({ disabled }) => (disabled ? "" : "none")};
`;

const TopName = styled.div`
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 10px;
`;

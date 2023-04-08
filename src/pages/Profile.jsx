import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { getProfile, editProfile, deleteAccount } from "../api/mypage";
import defaultProfileImg from "../assets/defaultProfileImg.jpeg";
import {
  HiPencil,
  HiOutlineXCircle,
  HiOutlineExclamation,
} from "react-icons/hi";
import { MdArrowBack } from "react-icons/md";
import { MintButtonMedium } from "../styles/Buttons";
import DeleteAccount from "../components/mypage/DeleteAccount";
import { WholeViewWidth } from "../styles/WholeAreaStyle";

function Profile() {
  const accessToken = localStorage.getItem("accessToken");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const [newimage, setNewImage] = useState("");
  const [file, setFile] = useState("");
  const [previewImg, setPreviewImg] = useState(false);
  const [profileStatus, setProfileStatus] = useState(true);

  const { data: profileData } = useQuery(
    ["getProfile"],
    () => getProfile(accessToken),
    {
      onSuccess: (data) => {
        setNickname(data.data.nickname);
        setStatusMessage(data.data.statusMessage);
        if(data.data.profileImageUrl === null){
          setProfileStatus(false);
        }
      },
    }
  );

  const mutation = useMutation(() => editProfile(formData, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("getProfile");
    },
  });

  //image
  const onImgPostHandler = (event) => {
    setNewImage([]);
    for (let i = 0; i < event.target.files.length; i++) {
      setFile(event.target.files[i]);
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.addEventListener("loaded", (event) => {
        newimage.src = event.target.result;
      });
      reader.onloadend = () => {
        const base = reader.result;
        if (base) {
          const baseSub = base.toString();
          setNewImage((newimage) => [...newimage, baseSub]);
        }
      };
    }

      setPreviewImg(true);
    // }, []);
  };

  //delete Mutation
  const { mutate: deleteAccountMutate } = useMutation(() =>
    deleteAccount(accessToken)
  );

  const profile = profileData?.data;

  const fileInput = useRef();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const onImgButton = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setConfirmDelete(true);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setConfirmDelete(false);
  };

  const handleDelete = () => {
    alert("탈퇴 완료!");
    deleteAccountMutate();
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const navToBack = () => {
    navigate("/mypage");
  };

  const data = {
    nickname: nickname,
    statusMessage: statusMessage,
  };

  const formData = new FormData();

  function onSubmitHandler(e) {
    e.preventDefault();

    formData.append("img", file);
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    mutation.mutate(formData);
    alert('프로필 변경 성공');
  }

  return (
    <>
      <WholeViewWidth>
        <StLayout>
          <StArrow>
            <StyledGobackButton onClick={navToBack} />
          </StArrow>

          <Title size='18'>프로필 편집</Title>

          <ProfileLayout>
            <form encType='multipart/form-data' onSubmit={onSubmitHandler}>
              <ProfileArea>
                <StButton onClick={onImgButton}>
                  {previewImg ? (
                    <img
                      style={ProfileImg}
                      src={newimage}
                      alt='profile image'
                    />
                  ) : (
                    profileStatus ? (    <img
                      style={ProfileImg}
                      src={profile?.profileImageUrl}
                      alt='profile image'
                    />):(
                      <img
                      style={ProfileImg}
                      src={defaultProfileImg}
                      alt='profile image'
                    />
                    )
                
                  )}
                </StButton>

                {/* <EditPencilArea>
                <HiPencil />
              </EditPencilArea> */}
              </ProfileArea>

              <input
                type='file'
                accept='image/*'
                onChange={onImgPostHandler}
                ref={fileInput}
                style={{ display: "none" }}
              />
              <Container>
                <Content>
                  <Label>이름(별명)</Label>
                  <IconContainer>
                    <StInput
                      type='text'
                      name='nickname'
                      placeholder={profile?.nickname}
                      value={nickname || ""}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                    <ClearButton disabled>
                      <HiOutlineXCircle color='#D0D0D0' />
                    </ClearButton>
                  </IconContainer>

                  <Label>소개</Label>
                  <StTextarea
                    name='statusMessage'
                    onChange={(e) => setStatusMessage(e.target.value)}
                    placeholder={profile?.statusMessage}
                    value={statusMessage || ""}
                  />
                </Content>

                <StButtonContainer>
                  <MintButtonMedium type='submit'>저장</MintButtonMedium>
                </StButtonContainer>
                <DeActivateBox>
                  <DeActivate onClick={handleOpenModal}>
                    <HiOutlineExclamation />
                    회원 탈퇴
                  </DeActivate>
                </DeActivateBox>
                <DeleteAccount
                  title='탈퇴하기'
                  isOpen={confirmDelete}
                  onClose={handleCloseModal}
                  handleDelete={handleDelete}
                />
              </Container>
            </form>
          </ProfileLayout>
        </StLayout>
      </WholeViewWidth>
    </>
  );
}

export default Profile;

const StLayout = styled.div`
  background-color: #524f4f;
  overflow-x: hidden;
`;

const StArrow = styled.div`
  margin: 0 auto;
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

const ProfileLayout = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const ProfileImg = {
  padding: "2px",
  borderRadius: "50%",
  width: "120px",
  height: "120px",
};

const ProfileArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 17px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ size }) => `${size}px`};
  color: #fff;
  padding-top: 30px;
  display: flex;
  justify-content: center;
`;

const EditPencilArea = styled.div`
  background-color: gray;
  position: relative;
  right: 20px;
  top: 60px;
  border-radius: 70%;
  overflow: hidden;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(256, 256, 256, 0.8);
`;

const StButton = styled.div`
  border: none;
  cursor: pointer;
`;

const Container = styled.div`
  background: #fff;
  height: 100vh;
  margin-top: 20px;
  border-radius: 50px 50px 0px 0px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  padding: 50px;
  flex-direction: column;
`;

const StInput = styled.input`
  box-sizing: border-box;
  height: 55px;
  width: 100%;
  outline: none;
  border-radius: 20px;
  padding: 0 10px;
  font-size: 16px;
  border: 1px solid #eee;
  background: #f5f5f5;
`;
const StTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid #eee;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 20px;
  background: #f5f5f5;
`;

const Label = styled.div`
  color: #9a9696;
  font-size: 16px;
  display: block;
  font-weight: ${(props) => props.fontWeight};
  margin: 10px;
`;

const IconContainer = styled.div`
  position: relative;
`;

const ClearButton = styled.button`
  position: absolute;
  font-size: 18px;
  top: 15px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

const StButtonContainer = styled.div`
  position: absolute;

  top: 450px;
  right: 0;
  /* bottom: 300px; */
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeActivate = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const DeActivateBox = styled.div`
  /* display: flex;
  align-items: flex-end;
  justify-content: flex-end; */

  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  right: 40px;
  top: 550px;
`;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";

import {
  getFriendsCount,
  getMypage,
  getProfile,
  getDiaryCount,
} from "../../api/mypage";
import { getDate } from "../../utils/getDate";
import { WholeArea, WholeViewWidth } from "../../styles/WholeAreaStyle";
import defaultProfileImg from "../../assets/defaultProfileImg.jpeg";
import { ProfilePicLarge } from "../../components/ProfilePics";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import Navigationbar from "../../components/Navigationbar";

function MyPage() {
  const accessToken = localStorage.getItem("accessToken");
  const [dataStatus, setDataStatus] = useState(true);
  const [profileStatus, setProfileStatus] = useState(true);

  const { data: myPageData } = useQuery(
    ["getMypage"],
    () => getMypage(accessToken),
    {
      onSuccess: (data) => {
        if (data && data.data.length < 1) {
          setDataStatus(false);
        }
      },
    }
  );

  const { data: profileData } = useQuery(
    ["getProfile"],
    () => getProfile(accessToken),
    {
      onSuccess: (data) => {
        if (data.data.profileImageUrl === null) {
          setProfileStatus(false);
        }
      },
    }
  );

  const { data: friendsCount } = useQuery(["getFriendsCount"], () =>
    getFriendsCount(accessToken)
  );

  const { data: diaryCount } = useQuery(["getDiaryCount"], () =>
    getDiaryCount(accessToken)
  );

  const mypage = myPageData?.data;
  const profile = profileData?.data;

  const navigate = useNavigate();

  const navToProfile = () => {
    navigate("/profile");
  };

  const navToFriendsList = () => {
    navigate("/myfriends");
  };

  const navToModifyCover = (diaryId, index) => {
    navigate(`/diary/${diaryId}`, {
      state: {
        data: mypage[index],
      },
    });
  };

  const navToBack = () => {
    navigate(-1);
  };

  const LogoutHandler = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <>
      <WholeViewWidth style={{ overflow: "hidden" }}>
        <StArrow>
          <StyledGobackButton onClick={navToBack} />
        </StArrow>
        <Title size="18">마이페이지</Title>
        <FlexContainer justifyContent="center">
          {profileStatus ? (
            <ProfilePicLarge src={profile?.profileImageUrl} />
          ) : (
            <ProfilePicLarge src={defaultProfileImg.toString()} />
          )}
        </FlexContainer>

        <Title size="22">{profile?.nickname}</Title>

        <Container>
          <FlexContainer justifyContent="flex-end">
            <NavButton onClick={navToProfile}>
              <Label size="16">프로필 편집</Label>
            </NavButton>
          </FlexContainer>

          <FlexContainer justifyContent="center">
            <MenuBox>
              <EachMenuBox boderRight="1px solid">
                <NavButton onClick={navToFriendsList}>
                  <LabelSpan size="18">친구</LabelSpan>
                  <Label size="20" fontWeight="bold" color="#858585">
                    {friendsCount?.data?.myFriendCount}
                  </Label>
                </NavButton>
              </EachMenuBox>
              <EachMenuBox>
                <LabelSpan size="18">다이어리</LabelSpan>
                <Label size="20" fontWeight="bold" color="#858585">
                  {diaryCount?.data?.myDiaryCount}
                </Label>
              </EachMenuBox>
            </MenuBox>
          </FlexContainer>

          <Label size="18" margin="16" fontWeight="bold">
            내 다이어리
          </Label>

          {dataStatus ? (
            mypage?.map((item, index) => {
              return (
                <FlexContainer justifyContent="center" key={item.id}>
                  <DiaryCards>
                    <ThumbnailBox>
                      <ThumbnailImg src={item.img} />
                    </ThumbnailBox>
                    <StTextBox display="flex">
                      {item.title === "" ? (
                        <StText fontWeight="bold" size="18" color="#C2C3C5">
                          제목 없음
                        </StText>
                      ) : (
                        <StText fontWeight="bold" size="18">
                          {/* {item.title.length > 10 ? item.title.slice(0, 10) + '...' : item.title} */}
                          {item.title}
                        </StText>
                      )}
                      {item.diaryCondition === "PUBLIC" ? (
                        <Public size="16">공유 다이어리</Public>
                      ) : (
                        <Public size="16">다이어리</Public>
                      )}
                    </StTextBox>
                    <StTextBox>
                      <Label size="16" color="#B0B0B0">
                        개설일: {getDate(item.createdAt)}{" "}
                      </Label>
                    </StTextBox>

                    <ConfirmButton
                      onClick={() => navToModifyCover(item.id, index)}
                    >
                      <IoIosArrowForward size={28} color="#A1B2FA" />
                    </ConfirmButton>
                  </DiaryCards>
                </FlexContainer>
              );
            })
          ) : (
            <StEmptyBox>다이어리가 없습니다.</StEmptyBox>
          )}

          <StLogout>
            <LougoutBtn onClick={LogoutHandler}>로그아웃</LougoutBtn>
          </StLogout>
        </Container>

        <Navigationbar />
      </WholeViewWidth>
    </>
  );
}

export default MyPage;

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

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ size }) => `${size}px`};
  color: black;

  padding-top: 30px;
  margin-bottom: 17px;
  display: flex;
  justify-content: center;
`;

const Label = styled.div`
  color: #858585;
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${(props) => props.fontWeight};
  margin: ${({ margin }) => `${margin}px`};
  margin-left: ${({ marginLeft }) => `${marginLeft}px`};
  margin-right: ${({ marginRight }) => `${marginRight}px`};
  align-self: ${({ alignSelf }) => alignSelf};
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
`;

const NavButton = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  /* display: flex;
  justify-content: flex-end; */
  align-items: flex-end;
  align-self: ${({ alignSelf }) => alignSelf};
`;

const MenuBox = styled.div`
  /* box-sizing: border-box; */
  display: flex;
  height: 55px;
  width: 50%;
  max-width: 300px;
  outline: none;
  border-radius: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #f8f8f8;
  background: #f8f8f8;
  margin-bottom: 20px;

  text-align: center;
  align-items: center;
  justify-content: center;
`;

const EachMenuBox = styled.div`
  flex: 1;
  line-height: 1.3rem;
  color: ${(props) => props.color};
  border-right: ${(props) => props.boderRight};
  border-right-color: #e1e7ff;

  text-align: center;
  align-items: center;
  justify-content: center;
`;

const DiaryCards = styled.div`
  border-radius: 23px;
  width: 90%;
  max-width: 720px;
  padding: 30px;
  position: relative;

  background: #f5f5f5;

  margin: 5px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 425px) {
    text-overflow: clip;
    white-space: normal;
  }
`;

const ThumbnailBox = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  box-sizing: border-box;
  border-radius: 18px;

  @media (max-width: 390px) {
    top: 25px;
  }
`;

const ThumbnailImg = styled.img`
  width: 80px;
  height: 80px;
  background: content-box;
  border-radius: 18px;
`;

const LabelSpan = styled.span`
  color: #858585;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${({ size }) => `${size}px`};
  color: ${(props) => props.color};
`;

const Public = styled.div`
  color: #858585;
  font-size: ${({ size }) => `${size}px`};
  margin-left: ${({ marginLeft }) => `${marginLeft}px`};

  display: flex;
`;

const StTextBox = styled.div`
  margin-left: 70px;
  display: ${({ display }) => `${display}`};
  gap: 10px;

  @media (max-width: 425px) {
    flex-direction: column;
    gap: 0px;
  }
`;

const StText = styled.div`
  font-weight: ${(props) => props.fontWeight};
  font-size: ${({ size }) => `${size}px`};
  color: ${(props) => props.color};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: 425px) {
    text-overflow: clip;
    white-space: normal;
  }
`;

const ConfirmButton = styled.button`
  position: absolute;
  top: 35px;
  right: 25px;

  background: none;
  border: none;

  cursor: pointer;

  @media (max-width: 390px) {
    top: 50px;
  }
`;

const StLogout = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #8e8f94;

  margin-top: 10px;
  padding-bottom: 100px;
`;

const StEmptyBox = styled.div`
  padding: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const LougoutBtn = styled.button`
  border: none;
  background: none;
  margin-right: 24px;
`;

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

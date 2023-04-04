import React from "react";
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
import { ProfilePicLarge } from "../../components/ProfilePics";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import Navigationbar from "../../components/Navigationbar";

function MyPage() {
  const accessToken = localStorage.getItem("accessToken");

  const { data: myPageData } = useQuery(["getMypage"], () =>
    getMypage(accessToken)
  );

  const { data: profileData } = useQuery(["getProfile"], () =>
    getProfile(accessToken)
  );

  const { data: friendsCount } = useQuery(["getFriendsCount"], () =>
    getFriendsCount(accessToken)
  );

  const { data: diaryCount } = useQuery(["getDiaryCount"], () =>
    getDiaryCount(accessToken)
  );

  const mypage = myPageData?.data;
  const profile = profileData?.data;

  console.log(mypage);

  const navigate = useNavigate();

  const navToProfile = () => {
    navigate("/profile");
  };

  const navToFriendsList = () => {
    navigate("/myfriends/list");
  };

  const navToModifyCover = (diaryId, index) => {
    console.log("TARGET", mypage[index]);
    navigate(`/diary/${diaryId}`, {
      state: {
        data: mypage[index],
      },
    });
  };
  console.log(mypage);

  const navToBack = () => {
    navigate(-1);
  };

  const LogoutHandler = () => {
    localStorage.removeItem("accessToken");
    alert("로그아웃! 이 메세지 없애주세요");
    navigate("/login");
  };
  return (
    <>
      <WholeViewWidth style={{ margin: "30px auto", maxWidth: "600px" }}>
        <StArrow>
          <StyledGobackButton onClick={navToBack} />
        </StArrow>
        <Title size='18'>마이페이지</Title>
        <FlexContainer justifyContent='center'>
          <ProfilePicLarge src={profile?.profileImageUrl} />
        </FlexContainer>

        <Title size='22'>{profile?.nickname}</Title>

        <FlexContainer justifyContent='flex-end'>
          <NavButton onClick={navToProfile}>
            <Label size='16' margin='10'>
              프로필 편집
            </Label>
          </NavButton>
        </FlexContainer>

        <FlexContainer justifyContent='center'>
          <MenuBox>
            <EachMenuBox boderRight='1px solid'>
              <NavButton onClick={navToFriendsList}>
                <LabelSpan size='18'>친구</LabelSpan>
                <Label size='20' fontWeight='bold' color='#858585'>
                  {friendsCount?.data?.myFriendCount}
                </Label>
              </NavButton>
            </EachMenuBox>
            <EachMenuBox>
              <LabelSpan size='18'>다이어리</LabelSpan>
              <Label size='20' fontWeight='bold' color='#858585'>
                {diaryCount?.data?.myDiaryCount}
              </Label>
            </EachMenuBox>
          </MenuBox>
        </FlexContainer>

        <Label size='18' margin='10'>
          내 다이어리
        </Label>

        {mypage?.map((item, index) => {
          return (
            <FlexContainer justifyContent='center' key={item.id}>
              <DiaryCards>
                <ThumbnailBox>
                  <ThumbnailImg src={item.img} />
                </ThumbnailBox>
                <StTextBox display='flex'>
                  {item.title === "" ? (
                    <StText fontWeight='bold' size='18' color='#C2C3C5'>
                      제목 없음
                    </StText>
                  ) : (
                    <StText fontWeight='bold' size='18'>
                     {/* {item.title.length > 10 ? item.title.slice(0, 10) + '...' : item.title} */}
                     {item.title}
                    </StText>
                  )}
                  {item.diaryCondition === "PUBLIC" ? (
                    <Public size='16'>공유 다이어리</Public>
                  ) : (
                    <StText>다이어리</StText>
                  )}
                </StTextBox>
                <StTextBox>
                  <Label size='16' color='#B0B0B0'>
                    개설일: {getDate(item.createdAt)}{" "}
                  </Label>
                </StTextBox>

                <ConfirmButton onClick={() => navToModifyCover(item.id, index)}>
                  <IoIosArrowForward size={28} color='#A1B2FA' />
                </ConfirmButton>
              </DiaryCards>
            </FlexContainer>
          );
        })}

        <StLogout>
          <LougoutBtn onClick={LogoutHandler}>로그아웃</LougoutBtn>
        </StLogout>

        <Navigationbar />
      </WholeViewWidth>
    </>
  );
}

export default MyPage;

const StArrow = styled.div`
  max-width: 720px;
  margin: 0 auto;
  position: relative;
  left: 0;
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

  display: flex;
  padding: 10px;
  justify-content: center;
`;

const Label = styled.div`
  color: #858585;
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${(props) => props.fontWeight};
  margin: ${({ margin }) => `${margin}px`};
  margin-left: ${({ marginLeft }) => `${marginLeft}px`};
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
  border: 1px solid #eee;
  background: #d9d9d9;
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
  border-right-color: #9e9b9b;

  text-align: center;
  align-items: center;
  justify-content: center;
`;

const DiaryCards = styled.div`
  border-radius: 23px;
  width: 90%;
  max-width: 600px;
  padding: 30px;
  position: relative;

  background: #f5f5f5;

  margin: 5px;
`;

const ThumbnailBox = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  box-sizing: border-box;
  border-radius: 18px;
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

  @media (max-width: 300px) {
    display: none;
  }
`;

const StTextBox = styled.div`
  margin-left: 70px;
  display: ${({ display }) => `${display}`};
  gap:10px;
`;

const StText = styled.div`
  font-weight: ${(props) => props.fontWeight};
  font-size: ${({ size }) => `${size}px`};
  color: ${(props) => props.color};

  width: 40%;
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
`;

const StLogout = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #8e8f94;

  margin-top: 10px;
  padding-bottom: 80px;
`;

const LougoutBtn = styled.button`
  border: none;
  background: none;
`;

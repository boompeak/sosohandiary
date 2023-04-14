import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import debounce from "lodash.debounce";

import Searchbox from "../../components/Searchbox";
import { MarginAuto, WholeViewWidth } from "../../styles/WholeAreaStyle";
import { ProfilePicSmall } from "../../components/ProfilePics";
import defaultProfileImg from "../../assets/defaultProfileImg.jpeg";
import addFriendButton from "../../assets/addFriendButton.png";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { changeCurNavbarMode } from "../../contexts/curNavbarModeSlice";
const NewFriend = () => {
  const accessToken = window.localStorage.getItem("accessToken");

  const [userId, setUserId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [profileStatus, setProfileStatus] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken === null) {
      navigate("/login", { replace: true });
    }
  }, [accessToken]);

  // navbar 모드 변경
  useEffect(() => {
    dispatch(changeCurNavbarMode("MAGNIFIER"));
  }, []);

  const queryClient = useQueryClient();

  //프로필 get 해오기!!!
  const getProfile = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASEURL}/mypage/profile`,
      {
        headers: { Authorization: accessToken },
      }
    );
    setUserId(res.data.memberId);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const { data: friendList = [], isLoading: isFriendsLoading } = useQuery(
    ["getNewFriend", searchInput],
    async () => {
      if (searchInput.trim() === "") {
        return [];
      }
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/search?nickname=${searchInput}`,
        { headers: { Authorization: accessToken } }
      );
      return res.data;
    },
    {
      enabled: searchInput.trim() !== "",
      onSuccess: (data) => {
        const hasNullProfileImageUrl = data.some(
          (friend) => friend.profileImageUrl === null
        );
        setProfileStatus(!hasNullProfileImageUrl);
      },
    }
  );

  const addFriendMutation = useMutation(
    (id) =>
      axios.post(
        `${process.env.REACT_APP_BASEURL}/friend/request/${id}`,
        {},
        { headers: { Authorization: accessToken } }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getNewFriend");
      },
    }
  );

  const onChangeInput = debounce((e) => setSearchInput(e.target.value), 500);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchInput(event.target.value);
    }
  };

  return (
    <OuterBorderArea>
      <WholeViewWidth
        style={{ marginTop: "-20px", paddingTop: "20px", height: "auto" }}
      >
        <Searchbox
          placeholder="닉네임을 검색해 친구를 추가해보세요"
          onChangeInput={onChangeInput}
          onKeyPress={handleKeyDown}
          setSearchInput={setSearchInput}
        />
        {searchInput.trim() === "" ? (
          <TextBox>친구를 검색해주세요.</TextBox>
        ) : isFriendsLoading ? (
          <TextBox>Loading...</TextBox>
        ) : friendList.length > 0 ? (
          friendList.map((item) => (
            <ListCards key={item.memberId}>
              <ListBox>
                {item.profileImageUrl ? (
                  <ProfilePicSmall src={item.profileImageUrl} />
                ) : (
                  <ProfilePicSmall src={defaultProfileImg} />
                )}
                <ListContentBox>
                  <StText fontWeight="bold">{item.nickname}</StText>
                  <StText
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {item?.statusMessage?.length > 13
                      ? item?.statusMessage?.substr(0, 13) + "..."
                      : item?.statusMessage}
                  </StText>
                </ListContentBox>
              </ListBox>

              <ButtonBox>
                {item.friendStatus !== "ACCEPTED" &&
                  userId != item.memberId &&
                  item.friendStatus !== "PENDING" && (
                    <AddButton
                      onClick={() => addFriendMutation.mutate(item.memberId)}
                    >
                      <StText color="#9A9A9A" fontWeight="700">
                        추가하기
                      </StText>
                      <img src={addFriendButton} />
                    </AddButton>
                  )}
              </ButtonBox>
            </ListCards>
          ))
        ) : (
          <TextBox>검색 결과가 없습니다.</TextBox>
        )}
        <InvisibleDiv></InvisibleDiv>
      </WholeViewWidth>
    </OuterBorderArea>
  );
};

export default NewFriend;

const ListCards = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 24px 0 24px;

  padding: 5px;
`;

const ListBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin-left: 10px;
  /* @media screen and (max-width: 768px) {
    width: 200px;
  } */

  /* @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 600px;
  } */
`;

const StText = styled.div`
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  /* max-width: 280px;
  max-height: 40px;
  overflow-y: hidden; */

  /* overflow: ${(props) => props.overflow};
  text-overflow: ${(props) => props.textOverflow};
  white-space: ${(props) => props.whiteSpace}; */
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const ButtonBox = styled.div`
  flex: 0 0 auto;
`;

const AddButton = styled.button`
  height: 25px;
  width: 87px;
  border: none;
  border-radius: 20px;
  text-align: center;
  background: #e3e3e3;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 5px;
`;

const InvisibleArea = styled.div`
  height: 85px;
`;

const OuterBorderArea = styled.div`
  border-left: 0.0625rem solid rgb(225, 226, 228);
  border-right: 0.0625rem solid rgb(225, 226, 228);
  height: auto;
`;

const InvisibleDiv = styled.div`
  height: 85px;
`;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import debounce from "lodash.debounce";

import Searchbox from "../../components/Searchbox";
import { WholeViewWidth } from "../../styles/WholeAreaStyle";
import { ProfilePicSmall } from "../../components/ProfilePics";
import defaultProfileImg from "../../assets/defaultProfileImg.jpeg";
import addFriendButton from "../../assets/addFriendButton.png";
import { useQuery, useMutation, useQueryClient } from "react-query";
const NewFriend = () => {
  const accessToken = window.localStorage.getItem("accessToken");

  const [userId, setUserId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [profileStatus, setProfileStatus] = useState(true);

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
        `${process.env.REACT_APP_BASEURL}/search?name=${searchInput}`,
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
    <>
      <WholeViewWidth style={{height:"100vh"}}>
        <Searchbox
          placeholder='친구이름을 검색해 친구를 추가해보세요'
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
                  <StText fontWeight='bold'>{item.name}</StText>
                  <StText overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>{item.statusMessage}</StText>
                </ListContentBox>
              </ListBox>

              <ButtonBox>
                {item.friendStatus !== "ACCEPTED" &&
                  userId != item.memberId &&
                  item.friendStatus !== "PENDING" && (
                    <AddButton
                      onClick={() => addFriendMutation.mutate(item.memberId)}
                    >
                      <StText color='#9A9A9A' fontWeight='700'>
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
      </WholeViewWidth>
    </>
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
  @media screen and (max-width: 768px) {
  width: 200px;
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  width: 600px;
}

`;

const StText = styled.div`
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};

  overflow: ${(props) => props.overflow};
  text-overflow: ${(props) => props.textOverflow};
  white-space: ${(props) => props.whiteSpace};

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

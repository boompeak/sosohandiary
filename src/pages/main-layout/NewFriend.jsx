import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import debounce from "lodash.debounce";

import Searchbox from "../../components/Searchbox";
import { WholeViewWidth } from "../../styles/WholeAreaStyle";
import { ProfilePicSmall } from "../../components/ProfilePics";
import { useQuery, useMutation,useQueryClient } from "react-query";
const NewFriend = () => {
  const accessToken = window.localStorage.getItem("accessToken");

  const [userId, setUserId] = useState(null);

  const [searchInput, setSearchInput] = useState("");

  const queryClient = useQueryClient();

  //프로필 get 해오기!!!
  const getProfile = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASEURL}/mypage/profile`, {
      headers: { Authorization: accessToken },
    });
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
      <WholeViewWidth>
        <Searchbox
          placeholder="아이디를 검색해 친구를 추가해보세요"
          onChangeInput={onChangeInput}
          onKeyPress={handleKeyDown}
          setSearchInput={setSearchInput}
        />
        {searchInput.trim() === "" ? (
          <StText>친구를 검색해주세요.</StText>
        ) : isFriendsLoading ? (
          <StText>Loading...</StText>
        ) : friendList.length > 0 ? (
          friendList.map((item) => (
            <ListCards key={item.memberId}>
              <ListBox>
                <ProfilePicSmall src={item.profileImageUrl} />
                <ListContentBox>
                  <StText fontWeight="bold">{item.name}</StText>
                  <StText>{item.statusMessage}</StText>
                </ListContentBox>
              </ListBox>

              <ButtonBox>
                {item.friendStatus !== "ACCEPTED" && userId != item.memberId && item.friendStatus !== "PENDING" && (
                  <AddButton onClick={() => addFriendMutation.mutate(item.memberId)}>
                    <StText color="#9A9A9A" fontWeight="700">
                      추가하기 +
                    </StText>
                  </AddButton>
                )}
              </ButtonBox>
            </ListCards>
          ))
        ) : (
          <StText>검색 결과가 없습니다.</StText>
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
`;

const StText = styled.div`
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

const ButtonBox = styled.div``;

const AddButton = styled.button`
  height: 25px;
  width: 87px;
  border: none;
  border-radius: 20px;
  text-align: center;
  background: #e3e3e3;

  cursor: pointer;
`;

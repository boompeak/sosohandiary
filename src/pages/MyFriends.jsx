import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import defaultProfileImg from "../assets/defaultProfileImg.jpeg";
import { getMyfriends, getFriendsCount, deleteFriend } from "../api/mypage";
import { ProfilePicSmall } from "../components/ProfilePics";
import { MdArrowBack } from "react-icons/md";
import { WholeViewWidth } from "../styles/WholeAreaStyle";
import Filter from "../components/mypage/Filter";

const MyFriends = () => {
  const [searchFriends, setSearchFriends] = useState(null);
  const [swipeOpen, setSwipeOpen] = useState(false);
  const [profileStatus, setProfileStatus] = useState(true);
  const [notes, setNotes] = useState(true);

  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const { data: myFriends } = useQuery(
    ["getMyFriends"],
    () => getMyfriends(accessToken),

    {
      onSuccess: (data) => {
        if (Array.isArray(data)) {
          const hasNullProfileImageUrl = data.some(
            (friend) => friend.profileImageUrl === null
          );
          setProfileStatus(!hasNullProfileImageUrl);
        }
      },
    }
  );

  const { data: friendsCount } = useQuery(
    ["getFriendsCount"],
    () => getFriendsCount(accessToken),
    {
      onSuccess: (data) => {
        if (data.data.myFriendCount === 0) {
          setNotes(false);
        }
      },
    }
  );

  const queryClient = useQueryClient();
  //friend-id 넣어주기
  const { mutate: deleteFriendMutate } = useMutation(
    (friendId) => deleteFriend(friendId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getMyFriends");
        queryClient.invalidateQueries("getFriendsCount");
      },
    }
  );

  const friends = myFriends?.data;

  // 이름순 정렬을 위한 compare 함수 정의
  const collator = new Intl.Collator("ko-KR");
  const compare = (a, b) => collator.compare(a.nickname, b.nickname);

  // 정렬된 친구 목록
  const sortedFriends = friends?.sort(compare);

  useEffect(() => {
    setSearchFriends(friends);
  }, [friends]);

  const onDeleteHandler = (friendId) => {
    deleteFriendMutate(friendId);
  };

  const navToBack = () => {
    navigate("/mypage");
  };

  const handleDelete = () => {};

  const trailingActions = (item) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={handleDelete}>
        <DeleteButton onClick={() => onDeleteHandler(item.friendListId)}>
          삭제하기
        </DeleteButton>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
      <WholeView style={{ overflow: "hidden" }}>
        <StArrow>
          <StyledGobackButton onClick={navToBack} />
        </StArrow>
        <Title size="18">친구</Title>
        {/* <Searchbox placeholder='친구 검색' /> */}
        <Filter
          setCards={setSearchFriends}
          existCards={friends}
          placeholder="닉네임을 검색해 친구를 찾아보세요"
        />
        <Label alignSelf="flex-start">
          친구 {friendsCount?.data?.myFriendCount}
        </Label>
        {notes && (
          <LabelArea>
            <div>밀어서 삭제하세요</div>
          </LabelArea>
        )}
        <div>
          <SwipeableList threshold={0.5} type={ListType.IOS}>
            {sortedFriends &&
              searchFriends
                ?.filter((item) => item.friendStatus === "ACCEPTED")
                .sort(compare)
                .map((item) => {
                  return (
                    <StyledSwipeableListItem
                      key={item.memberId}
                      trailingActions={trailingActions(item)}
                      onSwipeOpen={() => setSwipeOpen(true)}
                      onSwipeClose={() => setSwipeOpen(false)}
                    >
                      {item.friendStatus === "ACCEPTED" && (
                        <>
                          <div className="slide">
                            <ListCards>
                              {item.profileImageUrl ? (
                                <ProfilePicSmall src={item.profileImageUrl} />
                              ) : (
                                <ProfilePicSmall src={defaultProfileImg} />
                              )}

                              <ListContentBox>
                                <StText fontWeight="bold">
                                  {item.nickname}
                                </StText>
                                <StText>{item.statusMessage}</StText>
                              </ListContentBox>
                            </ListCards>
                          </div>
                        </>
                      )}
                    </StyledSwipeableListItem>
                  );
                })}
          </SwipeableList>
        </div>
        <InvisibleDiv></InvisibleDiv>
      </WholeView>
    </>
  );
};

export default MyFriends;

const WholeView = styled.div`
  width: 400px;
  margin: 0 auto;
  height: auto;
  min-height: 100vh;
  overflow: scroll;

  border-left: 0.0625rem solid rgb(225, 226, 228);
  border-right: 0.0625rem solid rgb(225, 226, 228);
`;

const StArrow = styled.div`
  margin: 0 auto;
  position: relative;
  top: 30px;
  left: 16px;
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
  padding-top: 30px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
`;

const Label = styled.div`
  color: #858585;
  font-size: ${({ size }) => `${size}px`};
  display: block;
  font-weight: ${(props) => props.fontWeight};
  margin: 0 24px 5px 24px;

  display: flex;
  align-self: ${({ alignSelf }) => alignSelf};
`;

const ListCards = styled.div`
  display: flex;
  /* align-self: flex-start; */

  /* padding: 10px; */
  margin: 0 24px 0 24px;
  justify-content: center;
  align-items: center;
`;

const ListContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 10px;
  height: 60px;
`;

const StText = styled.div`
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

const StyledSwipeableListItem = styled(SwipeableListItem)`
  border-top: 1px solid #d9d9d9;

  width: 100%;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  display: flex;
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: center;
  background: #dedede;
  text-align: center;
  border: 1px solid #d9d9d9;
  width: 70px;
  height: 100%;
`;

const LabelArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  color: #c0c0c0;
`;

const InvisibleDiv = styled.div`
  height: 0.01px;
`;

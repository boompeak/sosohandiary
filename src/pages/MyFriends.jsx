import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { getMyfriends, getFriendsCount, deleteFriend } from "../api/mypage";
import { ProfilePicSmall } from "../components/ProfilePics";
import { MdArrowBack } from "react-icons/md";
import { WholeViewWidth } from "../styles/WholeAreaStyle";
import Filter from "../components/mypage/Filter";

const MyFriends = () => {
  const [searchFriends, setSearchFriends] = useState(null);
  const [swipeOpen, setSwipeOpen] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const { data: myFriends } = useQuery(["getMyFriends"], () =>
    getMyfriends(accessToken)
  );

  const { data: friendsCount } = useQuery(["getFriendsCount"], () =>
    getFriendsCount(accessToken)
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
const compare = (a, b) => collator.compare(a.name, b.name);

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

  const handleDelete = () => {
  console.log("delete");
};


  const trailingActions = (item) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={handleDelete}>
        <DeleteButton onClick={() => onDeleteHandler(item.friendListId)}>삭제하기</DeleteButton>
      </SwipeAction>
    </TrailingActions>
  );


  return (
    <>
      <WholeViewWidth style={{ overflow: "hidden" }}>
        <StArrow>
          <StyledGobackButton onClick={navToBack} />
        </StArrow>
        <Title size='18'>친구</Title>
        {/* <Searchbox placeholder='친구 검색' /> */}
        <Filter
          setCards={setSearchFriends}
          existCards={friends}
          placeholder='친구 검색'
        />
        <Label alignSelf='flex-start'>
          친구 {friendsCount?.data?.myFriendCount}
        </Label>

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
                    {item.friendStatus === "ACCEPTED" &&(
                      <>
                        <div className='slide'>
                          <ListCards>
                            <ProfilePicSmall src={item.profileImageUrl} />
                            <ListContentBox>
                              <StText fontWeight='bold'>{item.name}</StText>
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
      </WholeViewWidth>
    </>
  );
};

export default MyFriends;

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
  height:60px;
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

`

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

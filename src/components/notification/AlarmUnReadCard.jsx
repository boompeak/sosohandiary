import React from "react";
import styled from "styled-components";
import { TbBellRingingFilled } from "react-icons/tb";
import axios from "axios";
import { useMutation } from "react-query";

const AlarmUnReadCard = ({ alarmType, item }) => {
  const accessToken = window.localStorage.getItem("accessToken");

  const getTitleAndDesc = () => {
    switch (alarmType) {
      case "friend":
        return {
          title: "새로운 친구요청이 왔습니다.",
          desc: `${item.friendNickName}님이 친구 요청을 보냈습니다.`,
        };
      case "invite":
        return {
          title: "다이어리에 초대되었습니다.",
          desc: `${item.nickname}님의 다이어리`,
        };
      case "comment":
        return {
          title: "내 다이어리에 댓글이 달렸습니다.",
          desc: `${item.commentName}님이 댓글을 작성하였습니다.`,
        };
      default:
        return "다이어리에 초대되었습니다.";
    }
  };

  return (
    <AlarmArea alarm={item?.alarm}>
      <TbBellRingingFilled className="TbBellRingingFilled" />
      <AlarmUnreadTextBox>
        <AlarmHead>
          <AlarmUnreadTitle>{getTitleAndDesc().title}</AlarmUnreadTitle>
        </AlarmHead>
        <AlarmUnreadBody>
          <ProfileAndComment>
            <UserProfileImg src={item?.profileImageUrl || ""}></UserProfileImg>
            {getTitleAndDesc().desc}
          </ProfileAndComment>
        </AlarmUnreadBody>
      </AlarmUnreadTextBox>
    </AlarmArea>
  );
};

export default AlarmUnReadCard;

const AlarmUnreadDay = styled.div`
  font-size: 90%;
  margin-left: 5px;
`;

const AlarmHead = styled.div`
  display: flex;
  flex-direction: row;
`;
const AlarmUnreadTitle = styled.div`
  color: black;
  font-weight: bold;
  font-size: 110%;
`;
const AlarmUnreadBody = styled.div`
  color: black;
  font-size: 100%;
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
`;

const ProfileAndComment = styled.div`
  display: flex;
  align-items: center;
`;

const AlarmUnreadTime = styled.div`
  width: 80vw;
  display: flex;
  justify-content: flex-end;
  color: #a7a7a7;
`;
const AlarmUnreadTextBox = styled.div`
  padding-top: 12px;
  padding-left: 10px;
`;

const AlarmArea = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ alarm }) =>
    alarm === false
      ? "rgba(224, 237, 251, 0.89)"
      : "rgba(227, 239, 251, 0.45)"};
  border-bottom: 1px solid #38383818;
  width: 100%;
  height: 80px;
  .TbBellRingingFilled {
    font-size: 30px;
    margin: 10px 10px 10px 20px;
    color: ${({ alarm }) => (alarm === false ? "#FFD88C" : "#C6C5C3")};
  }
`;

const UserProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

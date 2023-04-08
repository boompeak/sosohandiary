import React from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import AlarmList from "../../components/notification/AlarmList";
import { useSelector } from "react-redux";

const Notification = () => {
  const alarmStore = useSelector((state) => state.alarmSlice);

  const dataListForFriendRequset = alarmStore.friend;
  const dataListForInviteAlarm = alarmStore.invite;
  const dataListForCommentAlarm = alarmStore.comment;

  const testItem = dataListForCommentAlarm.filter(
    (item) => item.alarm === false
  );
  console.log(testItem);
  return (
    <>
      <TitleBox />

      <AlarmBox>
        {dataListForFriendRequset?.map((item, i) => (
          <AlarmList key={i} alarmType="friend" item={item} />
        ))}
        {dataListForInviteAlarm
          ?.filter((item) => item.alarm === false)
          .map((item, i) => (
            <AlarmList key={i} alarmType="invite" item={item} />
          ))}
        {dataListForCommentAlarm
          ?.filter((item) => item.alarm === false)
          .map((item, i) => (
            <AlarmList key={i} alarmType="comment" item={item} />
          ))}
      </AlarmBox>
    </>
  );
};

export default Notification;

const AlarmBox = styled.div`
  background-color: white;
  margin-top: 10px;
  margin-bottom: 80px;
`;

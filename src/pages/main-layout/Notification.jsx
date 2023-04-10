import React from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import AlarmList from "../../components/notification/AlarmList";
import { useSelector } from "react-redux";

const Notification = () => {
  const alarmStore = useSelector((state) => state.alarmSlice);

  const dataListForFriendRequset = alarmStore.friend;
  const dataListForInviteAlarm = alarmStore.invite?.filter(
    (item) => item.alarm === false
  );
  const dataListForCommentAlarm = alarmStore.comment?.filter(
    (item) => item.alarm === false
  );

  console.log(
    dataListForFriendRequset,
    dataListForInviteAlarm,
    dataListForCommentAlarm
  );
  return (
    <>
      <TitleBox />

      <AlarmBox>
        {dataListForFriendRequset?.map((item, i) => (
          <AlarmList key={i} alarmType="friend" item={item} />
        ))}
        {dataListForInviteAlarm.map((item, i) => (
          <AlarmList key={i} alarmType="invite" item={item} />
        ))}
        {dataListForCommentAlarm.map((item, i) => (
          <AlarmList key={i} alarmType="comment" item={item} />
        ))}
        {dataListForCommentAlarm?.length === 0 &&
        dataListForFriendRequset?.length === 0 &&
        dataListForInviteAlarm?.length === 0 ? (
          <NoAlarm>알람이 없습니다</NoAlarm>
        ) : (
          ""
        )}
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
const NoAlarm = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

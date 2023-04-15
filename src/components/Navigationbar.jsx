import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import home from "../assets/navbar/home.png";
import bell from "../assets/navbar/bell.png";
import magnifier from "../assets/navbar/magnifier.png";
import person from "../assets/navbar/person.png";
import plus from "../assets/navbar/plus.png";
import { Badge } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCommentAlarm, getFriendAlarm, getInviteAlarm } from "../contexts/alarmSlice";

const Navigationbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = window.localStorage.getItem("accessToken");
  const [navMode, setNavMode] = useState("HOME");

  const { curMode } = useSelector((state) => state.curNavbarModeSlice);
  useEffect(() => {
    setNavMode(curMode);
  }, [curMode]);

  const { data: dataForInviteAlarm } = useQuery(["getInviteAlarmAtNav"], () => {
    return axios.get(`${process.env.REACT_APP_BASEURL}/invite/alarm`, {
      headers: { Authorization: accessToken },
    });
  });

  const { data: dataForFriendAlarm } = useQuery(["getFriendRequestsAtNav"], () => {
    return axios.get(`${process.env.REACT_APP_BASEURL}/friend/request`, {
      headers: { Authorization: accessToken },
    });
  });

  const { data: dataForCommentAlarm } = useQuery(["getCommentAlarmAtNav"], () => {
    return axios.get(`${process.env.REACT_APP_BASEURL}/comment/alarm`, {
      headers: { Authorization: accessToken },
    });
  });

  dispatch(getCommentAlarm(dataForCommentAlarm?.data.filter((item) => item.alarm === false)));
  dispatch(getFriendAlarm(dataForFriendAlarm?.data.filter((item) => item.alarm === false)));
  dispatch(getInviteAlarm(dataForInviteAlarm?.data.filter((item) => item.alarm === false)));

  let friendAlarmCnt = dataForFriendAlarm?.data.filter((item) => item.alarm === false).length;

  if (isNaN(friendAlarmCnt)) {
    friendAlarmCnt = 0;
  }

  let commentAlarmCnt = dataForCommentAlarm?.data.filter((item) => item.alarm === false).length;

  if (isNaN(commentAlarmCnt)) {
    commentAlarmCnt = 0;
  }

  let inviteAlarmCnt = dataForInviteAlarm?.data.filter((item) => item.alarm === false).length;

  if (isNaN(inviteAlarmCnt)) {
    inviteAlarmCnt = 0;
  }

  const totalAlarmNumber = friendAlarmCnt + commentAlarmCnt + inviteAlarmCnt;

  const goToPage = (to) => {
    navigate(to);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <NavbarArea style={{ width: "400px" }}>
        <div
          onClick={() => {
            goToPage("/");
          }}
        >
          <Button src={home} buttonType={"HOME"} navMode={navMode} style={{ cursor: "pointer" }} />
        </div>
        <div
          onClick={() => {
            goToPage("/notification");
            // checkAllAlarm();
          }}
        >
          <Badge badgeContent={isNaN(totalAlarmNumber) ? "" : totalAlarmNumber} color="primary">
            <Button src={bell} buttonType={"BELL"} navMode={navMode} style={{ cursor: "pointer" }} />
          </Badge>
        </div>
        <div
          onClick={() => {
            goToPage("/diary");
          }}
        >
          <Button src={plus} buttonType={"PLUS"} navMode={navMode} style={{ cursor: "pointer" }} />
        </div>
        <div
          onClick={() => {
            goToPage("/new-friend");
          }}
        >
          <Button src={magnifier} buttonType={"MAGNIFIER"} navMode={navMode} style={{ cursor: "pointer" }} />
        </div>
        <div
          onClick={() => {
            goToPage("/mypage");
          }}
        >
          <Button src={person} buttonType={"PERSON"} navMode={navMode} style={{ cursor: "pointer" }} />
        </div>
      </NavbarArea>
    </div>
  );
};

export default Navigationbar;

const NavbarArea = styled.div`
  width: 100%;
  height: 80px;
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  z-index: 1;
  bottom: -1px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 0px 5px rgba(192, 193, 194, 0.527);
`;

const Button = styled.img`
  transition: 0.1s;
  opacity: ${({ buttonType, navMode }) => (navMode === buttonType ? 1 : 0.3)};
`;

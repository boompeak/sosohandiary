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
import { useDispatch } from "react-redux";
import {
  getCommentAlarm,
  getFriendAlarm,
  getInviteAlarm,
} from "../contexts/alarmSlice";

const Navigationbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = window.localStorage.getItem("accessToken");
  const [navMode, setNavMode] = useState("HOME");

  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/notification":
        setNavMode("BELL");
        return;
      case "diary":
        setNavMode("PLUS");
        return;
      case "/new-friend":
        setNavMode("MAGNIFIER");
        return;
      case "/mypage":
        setNavMode("PERSON");
        return;
      default:
        setNavMode("HOME");
        return;
    }
  }, []);

  const { data: dataForInviteAlarm } = useQuery(["getInviteAlarmAtNav"], () => {
    return axios.get(`${process.env.REACT_APP_BASEURL}/invite/alarm`, {
      headers: { Authorization: accessToken },
    });
  });

  const { data: dataForFriendAlarm } = useQuery(
    ["getFriendRequestsAtNav"],
    () => {
      return axios.get(`${process.env.REACT_APP_BASEURL}/friend/request`, {
        headers: { Authorization: accessToken },
      });
    }
  );

  const { data: dataForCommentAlarm } = useQuery(
    ["getCommentAlarmAtNav"],
    () => {
      return axios.get(`${process.env.REACT_APP_BASEURL}/comment/alarm`, {
        headers: { Authorization: accessToken },
      });
    }
  );

  dispatch(
    getCommentAlarm(
      dataForCommentAlarm?.data.filter((item) => item.alarm === false)
    )
  );
  dispatch(
    getFriendAlarm(
      dataForFriendAlarm?.data.filter((item) => item.alarm === false)
    )
  );
  dispatch(
    getInviteAlarm(
      dataForInviteAlarm?.data.filter((item) => item.alarm === false)
    )
  );

  const friendAlarmCnt = dataForFriendAlarm?.data.filter(
    (item) => item.alarm === false
  ).length;
  const commentAlarmCnt = dataForCommentAlarm?.data.filter(
    (item) => item.alarm === false
  ).length;
  const inviteAlarmCnt = dataForInviteAlarm?.data.filter(
    (item) => item.alarm === false
  ).length;

  const totalAlarmNumber = friendAlarmCnt + commentAlarmCnt + inviteAlarmCnt;

  const goToPage = (to) => {
    navigate(to);
  };

  return (
    <NavbarArea>
      <div
        onClick={() => {
          goToPage("/");
          setNavMode("HOME");
        }}>
        <Button src={home} buttonType={"HOME"} navMode={navMode} />
      </div>
      <div
        onClick={() => {
          goToPage("/notification");
          setNavMode("BELL");
          // checkAllAlarm();
        }}>
        <Badge
          badgeContent={isNaN(totalAlarmNumber) ? "" : totalAlarmNumber}
          color="primary">
          <Button src={bell} buttonType={"BELL"} navMode={navMode} />
        </Badge>
      </div>
      <div
        onClick={() => {
          goToPage("/diary");
          setNavMode("PLUS");
        }}>
        <Button src={plus} buttonType={"PLUS"} navMode={navMode} />
      </div>
      <div
        onClick={() => {
          goToPage("/new-friend");
          setNavMode("MAGNIFIER");
        }}>
        <Button src={magnifier} buttonType={"MAGNIFIER"} navMode={navMode} />
      </div>
      <div
        onClick={() => {
          goToPage("/mypage");
          setNavMode("PERSON");
        }}>
        <Button src={person} buttonType={"PERSON"} navMode={navMode} />
      </div>
    </NavbarArea>
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
  box-shadow: -2px -2px 9px rgba(0, 0, 0, 0.2);
`;

const Button = styled.img`
  transition: 0.1s;
  opacity: ${({ buttonType, navMode }) => (navMode === buttonType ? 1 : 0.3)};
`;

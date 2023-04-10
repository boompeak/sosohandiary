import React from "react";
import styled from "styled-components";
import { ProfilePicSmall } from "../ProfilePics";
import GetTimeAgo from "../GetTimeAgo";

const GetUser = ({ nickname, createdAt, ProfileImg }) => {
  const createdAtAgo = <GetTimeAgo createdAt={createdAt} />;
  return (
    <>
      <StyledUserBox>
        <ProfilePicSmall src={ProfileImg} />

        <span>{nickname}</span>
        <span>{createdAtAgo}</span>
      </StyledUserBox>
    </>
  );
};

export default GetUser;

const StyledUserBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  left: -100px;

  span {
    &:first-of-type {
      font-size: 17px;
      font-weight: bold;
      margin-left: 7px;
      color: #000000;
    }
    &:not(:last-of-type)::after {
      content: "·";
      margin-left: 5px;
      margin-right: 5px;
      color: gray;
    }
    &:last-of-type {
      font-size: 14px;
      font-weight: bold;
      color: gray;
      margin-right: 20px;
    }
  }
`;

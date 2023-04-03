import { purple } from "@nextui-org/react";
import React from "react";
import styled from "styled-components";

const DiaryCardTopBig = ({ item, color, idx, activeIdxForSelfmade }) => {
  const getColorCode = (color = purple) => {
    switch (color) {
      case "purple":
        return "#E0C7FF";
      case "green":
        return "#B5FFB4";
      case "pink":
        return "#FFB4B4";
      default:
        return;
    }
  };
  const colorCode = getColorCode(color);

  return (
    <Card
      imgSrc={item?.img}
      idx={idx}
      activeIdxForSelfmade={activeIdxForSelfmade}
    >
      <SideLabel
        colorCode={colorCode}
        idx={idx}
        activeIdxForSelfmade={activeIdxForSelfmade}
      ></SideLabel>
      <div>
        <Title>{item?.title}</Title>
        <CreatedAt>{item?.createdAt.split(" ")[0]}</CreatedAt>
      </div>
    </Card>
  );
};

export default DiaryCardTopBig;

const Card = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${({ imgSrc }) => imgSrc});
  color: #fff;
  background-size: cover;
  width: 120px;
  height: 160px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 13px;

  transition: 0.5s;
  background-color: #e3d7d7;

  height: ${({ idx, activeIdxForSelfmade }) =>
    idx === activeIdxForSelfmade + 1 ? "196px" : "140px"};
  width: ${({ idx, activeIdxForSelfmade }) =>
    idx === activeIdxForSelfmade + 1 ? "140px" : "100px"};
  border-radius: 25px;
  margin-bottom: ${({ idx, activeIdxForSelfmade }) =>
    idx === activeIdxForSelfmade + 1
      ? "0px"
      : idx === activeIdxForSelfmade || idx === activeIdxForSelfmade + 2
      ? "75px"
      : "150px"};

  margin-left: ${({ idx, activeIdxForSelfmade }) =>
    idx <= activeIdxForSelfmade ? "-50%" : "0px"};

  margin-right: ${({ idx, activeIdxForSelfmade }) =>
    idx >= activeIdxForSelfmade + 2 ? "-50%" : ""};
`;

const SideLabel = styled.div`
  transition: 0.5s;
  background-color: ${({ colorCode }) => colorCode};
  width: 15px;
  height: ${({ idx, activeIdxForSelfmade }) =>
    idx === activeIdxForSelfmade + 1 ? "196px" : "140px"};
  border-radius: 13px 0 0 13px;
  position: absolute;
`;

const Title = styled.div`
  font-weight: 700;
  margin: 20px 0 20px 15px;
`;
const CreatedAt = styled.div`
  font-size: 10px;
  position: absolute;
  bottom: 22px;
  right: 20px;
`;

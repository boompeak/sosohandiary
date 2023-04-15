import { purple } from "@nextui-org/react";
import { secondsInDay } from "date-fns";
import React from "react";
import styled from "styled-components";

const DiaryCardTopBig = ({ item, color, idx, activeIdxForSelfmade }) => {
  const getColorCode = (color = purple) => {
    switch (color) {
      case "purple":
        return "#fff5c7";
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
    <Card idx={idx} activeIdxForSelfmade={activeIdxForSelfmade}>
      <SideLabel colorCode={colorCode} idx={idx} activeIdxForSelfmade={activeIdxForSelfmade}></SideLabel>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Title idx={idx} activeIdxForSelfmade={activeIdxForSelfmade}>
          {item?.title}
        </Title>

        <CoverImg src={item?.img} idx={idx} activeIdxForSelfmade={activeIdxForSelfmade} />

        <CreatedAt idx={idx} activeIdxForSelfmade={activeIdxForSelfmade}>
          {item?.createdAt?.split(" ")[0]}
        </CreatedAt>
      </div>
    </Card>
  );
};

export default DiaryCardTopBig;

const Card = styled.div`
  cursor: pointer;
  transition: 0.2s;
  background-color: #fff;
  width: 120px;
  height: 160px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 13px;
  height: ${({ idx, activeIdxForSelfmade }) => (idx === activeIdxForSelfmade ? "196px" : "140px")};
  width: ${({ idx, activeIdxForSelfmade }) => (idx === activeIdxForSelfmade ? "140px" : "100px")};
  border-radius: 25px;
  margin-bottom: ${({ idx, activeIdxForSelfmade }) =>
    idx === activeIdxForSelfmade
      ? "0px"
      : idx === activeIdxForSelfmade - 1 || idx === activeIdxForSelfmade + 1
      ? "80px"
      : "160px"};

  margin-left: ${({ idx, activeIdxForSelfmade }) => (idx < activeIdxForSelfmade ? "-50%" : "0px")};

  margin-right: ${({ idx, activeIdxForSelfmade }) => (idx > activeIdxForSelfmade ? "-50%" : "")};
`;

const SideLabel = styled.div`
  transition: 0.2s;
  background-color: ${({ colorCode }) => colorCode};
  width: 15px;
  height: ${({ idx, activeIdxForSelfmade }) => (idx === activeIdxForSelfmade ? "196px" : "140px")};
  border-radius: 13px 0 0 13px;
  position: absolute;
`;

const Title = styled.div`
  transition: 0.2s;
  font-size: ${({ idx, activeIdxForSelfmade }) => (idx === activeIdxForSelfmade ? "16px" : "13px")};
  font-weight: 700;
  margin: 20px 0 20px 15px;
`;
const CreatedAt = styled.div`
  transition: 0.2s;

  position: relative;
  top: ${({ idx, activeIdxForSelfmade }) => (idx === activeIdxForSelfmade ? "35px" : "13px")};
  right: ${({ idx, activeIdxForSelfmade }) => (idx === activeIdxForSelfmade ? "-25px" : "-15px")};
  font-size: ${({ idx, activeIdxForSelfmade }) => (idx === activeIdxForSelfmade ? "10px" : "7px")};
`;

const CoverImg = styled.div`
  transition: 0.2s;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  width: ${({ idx, activeIdxForSelfmade }) => (idx === activeIdxForSelfmade ? "84px" : "60px")};
  height: ${({ idx, activeIdxForSelfmade }) => (idx === activeIdxForSelfmade ? "84px" : "60px")};
  margin-left: 15px;
`;

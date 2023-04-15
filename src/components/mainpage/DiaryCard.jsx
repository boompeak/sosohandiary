import { purple } from "@nextui-org/react";
import styled from "styled-components";

const DiaryCard = ({ item, color }) => {
  const getColorCode = (color = purple) => {
    switch (color) {
      case "purple":
        return "#f7e8ec";
      case "green":
        return "#B5FFB4";
      case "pink":
        return "#FFB4B4";
      default:
        return;
    }
  };
  const colorCode = getColorCode(color);

  const fitTitleLength = (target) => {
    if (target.length < 8) {
      return target;
    } else {
      return target.substr(0, 6) + "...";
    }
  };

  return (
    <Card>
      <SideLabel colorCode={colorCode}></SideLabel>
      <InnerArea>
        <Title>{fitTitleLength(item?.title)}</Title>
        <ImgArea imgSrc={item?.img}></ImgArea>
        <CreatedAt>{item?.createdAt.split(" ")[0]}</CreatedAt>
      </InnerArea>
    </Card>
  );
};

export default DiaryCard;

const Card = styled.div`
  color: black;
  background-size: cover;
  width: 135px;
  height: 180px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 13px;
  cursor: pointer;
`;

const SideLabel = styled.div`
  background-color: ${({ colorCode }) => colorCode};
  width: 15px;
  height: 180px;
  border-radius: 13px 0 0 13px;
  position: absolute;
`;

const InnerArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 700;
  margin: 20px 0 20px 15px;
  font-size: 16px;
`;

const ImgArea = styled.div`
  height: 100px;
  width: 100px;
  background-image: url(${({ imgSrc }) => imgSrc});
  background-size: cover;
  margin: 0 0 0 15px;
`;

const CreatedAt = styled.div`
  font-size: 10px;
  position: absolute;
  bottom: 14px;
  right: 14px;
`;

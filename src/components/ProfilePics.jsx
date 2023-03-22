import styled from "styled-components";

export const ProfilePicLarge = ({ src }) => {
  return (
    <CirclePic size={"large"}>
      <Image src={src} size={"large"} />
    </CirclePic>
  );
};

export const ProfilePicMedium = ({ src }) => {
  return (
    <CirclePic size={"medium"}>
      <Image src={src} size={"medium"} />
    </CirclePic>
  );
};

export const ProfilePicSmall = ({ src }) => {
  return (
    <CirclePic size={"small"}>
      <Image src={src} size={"small"} />
    </CirclePic>
  );
};

const CirclePic = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: ${({ size }) => {
    return size === "large" ? "120px" : size === "medium" ? "80px" : "56px";
  }};
  height: ${({ size }) => {
    return size === "large" ? "120px" : size === "medium" ? "80px" : "56px";
  }};
`;

const Image = styled.img`
  display: block;
  width: ${({ size }) => {
    return size === "large" ? "120px" : size === "medium" ? "80px" : "56px";
  }};
  height: ${({ size }) => {
    return size === "large" ? "120px" : size === "medium" ? "80px" : "56px";
  }};
`;
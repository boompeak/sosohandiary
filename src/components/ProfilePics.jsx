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
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  width: ${({ size }) => {
    return size === "large" ? "120px" : size === "medium" ? "80px" : "43px";
  }};
  height: ${({ size }) => {
    return size === "large" ? "120px" : size === "medium" ? "80px" : "43px";
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
  object-fit: cover;
`;

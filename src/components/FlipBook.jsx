import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Thumbnail from "./drawing/Thumbnail";

const FlipBook = ({ data, diaryId }) => {
  const navigate = useNavigate();

  const goToInnerPaperDetail = (paperId) => {
    navigate(`/diaries/${diaryId}/${paperId}`);
  };

  return (
    <FlipBookArea>
      <HTMLFlipBook width={300} height={500} showCover={true}>
        <InnerThumb>
          <Cover>US 다이어리</Cover>
        </InnerThumb>
        {data?.map((item, i) => (
          <InnerThumb key={i} onClick={() => goToInnerPaperDetail(item?.id)}>
            <Thumbnail
              diaryId={diaryId}
              paperId={item.id}
              width={300}
              height={500}
            />
          </InnerThumb>
        ))}
      </HTMLFlipBook>
    </FlipBookArea>
  );
};

export default FlipBook;

const InnerThumb = styled.div`
  background-color: #f3f3f3;
`;

const FlipBookArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cover = styled.div`
  display: flex;
  justify-content: center;
  margin: 25vh 0;
`;

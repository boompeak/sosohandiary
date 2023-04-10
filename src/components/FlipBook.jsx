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
    <>
      <HTMLFlipBook width={300} height={500}>
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
    </>
  );
};

export default FlipBook;

const InnerThumb = styled.div`
  background-color: #f3f3f3;
`;

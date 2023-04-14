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
      <HTMLFlipBook width={370} height={500}>
        {data?.map((item, i) => (
          <InnerThumb key={i} onClick={() => goToInnerPaperDetail(item?.id)}>
            <div
              style={{
                paddingBottom: "300px",
                height: "180px",
                width: "370px",
                overflow: "hidden",
              }}
            >
              <Thumbnail
                diaryId={diaryId}
                paperId={item.id}
                width={370}
                height={700}
              />
            </div>
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

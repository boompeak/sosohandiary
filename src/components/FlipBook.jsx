import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Thumbnail from "./drawing/Thumbnail";

const FlipBook = ({ data, diaryId }) => {
  const navigate = useNavigate();

  const goToInnerPaperDetail = (paperId) => {
    navigate(`/diaries/${diaryId}/${paperId}`);
  };

  const [page, setPage] = useState(0);
  const totalPage = data.length;
  const pageRef = useRef();

  const onFlipHandler = (e) => {
    setPage(e.data);
  };
  return (
    <FlipBookArea>
      <HTMLFlipBook
        usePortrait={true}
        width={370}
        height={560}
        onFlip={onFlipHandler}
        ref={pageRef}
      >
        {data?.map((item, i) => (
          <InnerThumb key={i} onClick={() => goToInnerPaperDetail(item?.id)}>
            <div
              style={{
                paddingBottom: "300px",
                height: "260px",
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
      {totalPage <= 0 ? (
        ""
      ) : (
        <ButtonArea>
          [<span>{page + 1}</span> /<span> {totalPage}</span>]
        </ButtonArea>
      )}
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
  flex-direction: column;
`;

const Cover = styled.div`
  display: flex;
  justify-content: center;
  margin: 25vh 0;
`;

const BookMode = styled.div`
  z-index: -10;
`;

const ButtonArea = styled.div`
  margin: 10px;
`;

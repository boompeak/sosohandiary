import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import HTMLFlipBook from "react-pageflip";
import ReactPaginate from "react-paginate";
import { getDate } from "../utils/getDate";
import leftArrow from "../assets/leftArrow.png";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { Image, Layer, Line, Stage } from "react-konva";
import useImage from "use-image";

function SubPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [lineDataList, setLineDataList] = useState([]);

  const { diaryId } = useParams();

  const accessToken = window.localStorage.getItem("accessToken");

  const fetchData = async (page) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail?page=${page}&size=5`,
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        setData([...res.data.content]); // 객체로 반환되길래 배열로 만듬
        setPageCount(res.data.pageableCustom.totalPages);
      });

    return response;
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const goToInnerPaperDetail = (paperId) => {
    navigate(`/diaries/${diaryId}/${paperId}`);
  };

  const newInnerPaper = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail`,
        {
          customJson: "",
          content: "",
        },
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        alert("한 장 더 추가되었습니다");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert("다이어리의 주인만 쓸 수  있습니다.");
        }
      });
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  //썸네일 위치 지정
  const thumbAreaRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (
      thumbAreaRef.current?.offsetHeight &&
      thumbAreaRef.current?.offsetWidth
    ) {
      setDimensions({
        width: thumbAreaRef.current.offsetWidth,
        height: thumbAreaRef.current.offsetHeight,
      });
    }
  }, []);

  //텍스트 썸네일

  const getTextData = (idx) => {
    if (data[idx]) {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(data[idx]?.customJson).texts)
      );
    } else {
      return EditorState.createEmpty();
    }
  };

  //펜 썸네일

  const getLineData = (idx) => {
    if (data[idx]) {
      return JSON.parse(data[idx].customJson).lines;
    } else {
      return [];
    }
  };

  // 스티커 썸네일
  const getStickerData = (idx) => {
    if (data[idx]) {
      return JSON.parse(data[idx].customJson).stickers;
    } else {
      return [];
    }
  };

  // 스티커 썸네일 컴퍼넌트
  const ImageSticker = ({ shapeProps, sticker }) => {
    // 스티커 사전

    const [imgUrl0] = useImage(
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQI9l1%2Fbtr4t7oeBhs%2FMYKvXRiLsy4mINf9Egxb30%2Fimg.png"
    );
    const [imgUrl1] = useImage(
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdXWxWU%2Fbtr4tOJkV2M%2FdYfSWPVUkDz5i7K0lZnJ80%2Fimg.png"
    );
    const [imgUrl2] = useImage(
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcl8BFN%2Fbtr4voJMOf7%2FdmfbZkelRI171YwUDcRdj0%2Fimg.png"
    );

    const imgList = [imgUrl0, imgUrl1, imgUrl2];

    return (
      <React.Fragment>
        <Image
          image={imgList[sticker.stickerUrlNum]}
          key={sticker.id}
          id={sticker.id}
          x={sticker.x}
          y={sticker.y}
          numPoints={5}
          innerRadius={20}
          outerRadius={40}
          opacity={0.8}
          draggable={false}
          rotation={sticker.rotation}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
          shadowOffsetX={5}
          shadowOffsetY={5}
          scaleX={1}
          scaleY={1}
          {...shapeProps}
        />
      </React.Fragment>
    );
  };

  return (
    <>
      <div>
        <Title>다이어리 상세보기</Title>
        <LeftArrow src={leftArrow} onMouseDown={goBackHandler}></LeftArrow>

        <div>
          <HeaderStyle>
            <DiaryTitle>{data[0]?.diaryTitle}</DiaryTitle>
            <DiaryCreatedAt>{getDate(data[0]?.createdAt)}</DiaryCreatedAt>
          </HeaderStyle>
          <MorePageButton onClick={newInnerPaper}>한장 더 쓰기</MorePageButton>
        </div>
      </div>
      <button
        style={{ zIndex: 1000, position: "fixed", top: "0px" }}
        onClick={() => goToInnerPaperDetail(data[0]?.id)}
      >
        dddd
      </button>
      <FlipStyle>
        <HTMLFlipBook width={300} height={500}>
          {[0, 1, 2, 3, 4].map((item) => (
            <InnerThumb>
              <Editor editorState={getTextData(0)} />
              <Stage
                width={dimensions.width}
                height={dimensions.height}
                style={{ position: "absolute", top: "0px", zIndex: "1" }}
              >
                <Layer>
                  {getLineData(0).map((line, i) => (
                    <Line
                      key={i}
                      points={line.points}
                      stroke={line.lineColor}
                      strokeWidth={line.lineWidth}
                      tension={0.5}
                      lineCap="round"
                      lineJoin="round"
                      globalCompositeOperation={
                        line.lineTool === "eraser"
                          ? "destination-out"
                          : "source-over"
                      }
                    />
                  ))}
                  {getStickerData(0).map((sticker, i) => {
                    return (
                      <ImageSticker
                        key={i}
                        shapeProps={sticker}
                        sticker={sticker}
                      />
                    );
                  })}
                </Layer>
              </Stage>
            </InnerThumb>
          ))}

          <InnerThumb onClick={() => goToInnerPaperDetail(data[0]?.id)}>
            <div id="thumbnail" ref={thumbAreaRef} style={{ height: "100%" }}>
              <Editor editorState={getTextData(0)} />
              <Stage
                width={dimensions.width}
                height={dimensions.height}
                style={{ position: "absolute", top: "0px", zIndex: "1" }}
              >
                <Layer>
                  {getLineData(0).map((line, i) => (
                    <Line
                      key={i}
                      points={line.points}
                      stroke={line.lineColor}
                      strokeWidth={line.lineWidth}
                      tension={0.5}
                      lineCap="round"
                      lineJoin="round"
                      globalCompositeOperation={
                        line.lineTool === "eraser"
                          ? "destination-out"
                          : "source-over"
                      }
                    />
                  ))}
                  {getStickerData(0).map((sticker, i) => {
                    return (
                      <ImageSticker
                        key={i}
                        shapeProps={sticker}
                        sticker={sticker}
                      />
                    );
                  })}
                </Layer>
              </Stage>
              <div>id : {data[0]?.id}</div>
              <div>diaryTitle : {data[0]?.diaryTitle}</div>
              <div>nickname : {data[0]?.nickname}</div>
              <div>createdAt : {data[0]?.createdAt}</div>
              <div>modifiedAt : {data[0]?.modifiedAt}</div>
              <div>likeCount : {data[0]?.likeCount}</div>
            </div>
          </InnerThumb>
          <InnerThumb onClick={() => goToInnerPaperDetail(data[1]?.id)}>
            <div>id : {data[1]?.id}</div>
            <div>diaryTitle : {data[1]?.diaryTitle}</div>
            <div>nickname : {data[1]?.nickname}</div>
            <div>createdAt : {data[1]?.createdAt}</div>
            <div>modifiedAt : {data[1]?.modifiedAt}</div>
            <div>likeCount : {data[1]?.likeCount}</div>
          </InnerThumb>
          <InnerThumb onClick={() => goToInnerPaperDetail(data[2]?.id)}>
            <div>id : {data[2]?.id}</div>
            <div>diaryTitle : {data[2]?.diaryTitle}</div>
            <div>nickname : {data[2]?.nickname}</div>
            <div>createdAt : {data[2]?.createdAt}</div>
            <div>modifiedAt : {data[2]?.modifiedAt}</div>
            <div>likeCount : {data[2]?.likeCount}</div>
          </InnerThumb>
          <InnerThumb onClick={() => goToInnerPaperDetail(data[3]?.id)}>
            <div>id : {data[3]?.id}</div>
            <div>diaryTitle : {data[3]?.diaryTitle}</div>
            <div>nickname : {data[3]?.nickname}</div>
            <div>createdAt : {data[3]?.createdAt}</div>
            <div>modifiedAt : {data[3]?.modifiedAt}</div>
            <div>likeCount : {data[3]?.likeCount}</div>
          </InnerThumb>
          <InnerThumb onClick={() => goToInnerPaperDetail(data[4]?.id)}>
            <div>id : {data[4]?.id}</div>
            <div>diaryTitle : {data[4]?.diaryTitle}</div>
            <div>nickname : {data[4]?.nickname}</div>
            <div>createdAt : {data[4]?.createdAt}</div>
            <div>modifiedAt : {data[4]?.modifiedAt}</div>
            <div>likeCount : {data[4]?.likeCount}</div>
          </InnerThumb>
        </HTMLFlipBook>
      </FlipStyle>
      <div>
        <StyledPagination
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel="<"
          nextLabel=">"
        />
      </div>
    </>
  );
}

export default SubPage;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ size }) => `${size}px`};
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const HeaderStyle = styled.div`
  display: flex;
  margin-top: 30px;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

const DiaryTitle = styled.div`
  font-size: 30px;
`;

const DiaryCreatedAt = styled.div`
  font-size: 10px;
`;

const StPageCard = styled.div`
  height: 600px;
  width: 200px;
  /* background: #f9f9f9; */
`;

const StyledPagination = styled(ReactPaginate)`
  margin-top: 50px;
  display: flex;
  justify-content: center;

  & li {
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    padding: 5px 10px;
    border: none;

    &.active {
      background-color: #007bff;
      color: #fff;
      border-color: #007bff;
    }
  }

  & a {
    display: inline-block;
    padding: 5px 10px;
    /* border: 1px solid #ccc; */
    /* border-radius: 3px; */
    color: #007bff;
    cursor: pointer;
    transition: all 0.3s ease;
    color: black;

    &:hover {
      background-color: #007bff;
      color: #fff;
      border-color: #007bff;
    }
  }

  & .disabled {
    color: #ccc;
    cursor: not-allowed;
    border-color: #ccc;
  }
`;

const StButton = styled.button`
  border: none;
  background: none;
  padding: 0;
`;

const InnerThumb = styled.div`
  background-color: #f3f3f3;
`;

const MorePageButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto 80px auto;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 20px;
  background-color: #e1e7ff;
  width: 300px;
  height: 50px;
  cursor: pointer;
  z-index: 10;
  position: relative;
`;

const FlipStyle = styled.div`
  margin: -130px auto;
`;

const LeftArrow = styled.img`
  margin-left: 20px;
  width: 20px;
  position: absolute;
  top: 50px;
  z-index: 11;
`;

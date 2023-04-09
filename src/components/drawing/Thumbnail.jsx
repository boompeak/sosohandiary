import { useEffect, useRef, useState } from "react";
import React from "react";
import styled from "styled-components";
import { Stage, Layer, Line, Transformer, Image } from "react-konva";
import useImage from "use-image";
import axios from "axios";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "react-tooltip/dist/react-tooltip.css";
import ReactPaginate from "react-paginate";

// <---------------스티커 크기 조절----------------->
const ImageSticker = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  sticker,
  mode,
}) => {
  // <--------------->
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

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
        draggable={mode === "STICKER" ? true : false}
        rotation={sticker.rotation}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={sticker.isDragging ? 10 : 5}
        shadowOffsetY={sticker.isDragging ? 10 : 5}
        scaleX={sticker.isDragging ? 1.2 : 1}
        scaleY={sticker.isDragging ? 1.2 : 1}
        onDragStart={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
            isDragging: true,
          });
        }}
        // onDragEnd={handleDragEnd}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
            isDragging: false,
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

// <---------------------------------------->

const Thumbnail = ({ diaryId, paperId, width, height }) => {
  const [lines, setLines] = useState([]);

  const accessToken = localStorage.getItem("accessToken");

  // 드래그 시  스크롤 방지
  useEffect(() => {
    function preventBehavior(e) {
      e.preventDefault();
    }
    document.addEventListener("touchmove", preventBehavior, { passive: false });
  }, []);

  // <=== 데이터 겟===>
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail/${paperId}`,
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        if (res.data.customJson.length > 10) {
          const resJson = JSON.parse(res.data.customJson);
          setStickers(resJson.stickers);
          setLines(resJson.lines);
          window.localStorage.setItem(
            "draft-js-example-item",
            JSON.stringify(resJson.texts)
          );
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // <-------------- 스티커 관련 -------------->

  const [stickers, setStickers] = useState([]);

  // 텍스트 - Draft관련
  const TEXT_EDITOR_ITEM = "draft-js-example-item";

  const data = localStorage.getItem(TEXT_EDITOR_ITEM);
  const initialState = data
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(data)))
    : EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initialState);

  // 도화지
  return (
    <div>
      <Editor editorState={editorState} onChange={setEditorState} />
      <Stage
        width={width}
        height={height}
        style={{ position: "absolute", top: "0px", zIndex: "1" }}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.lineColor}
              strokeWidth={line.lineWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.lineTool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
          {stickers.map((sticker, i) => {
            return (
              <ImageSticker key={i} shapeProps={sticker} sticker={sticker} />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Thumbnail;

const DiaryBack = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const TextAreaStyle = styled.div`
  position: absolute;
  width: 80vw;
  margin: 40px 10vw;
  z-index: ${({ mode }) => (mode === "TEXT" ? 1 : -1)};
`;

const AllToolbarStyle = styled.div`
  transition: 0.2s;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  position: absolute;
  right: ${({ isOpenAllToolbar }) =>
    isOpenAllToolbar === true ? 0 : "-100px"};
  top: 40vh;
  background-color: #707070;
  width: 70px;
  height: 200px;
  border-radius: 25px 0 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
`;

const TextToolbarStyle = styled.div`
  transition: 0.2s;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  position: absolute;
  right: ${({ isOpenTextToolbar }) =>
    isOpenTextToolbar === true ? 0 : "-80px"};
  top: 40vh;
  background-color: #707070;
  width: 70px;
  height: 270px;
  border-radius: 25px 0 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
`;

const DrawToolbarStyle = styled.div`
  transition: 0.2s;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  position: absolute;
  right: ${({ isOpenDrawToolbar }) =>
    isOpenDrawToolbar === true ? "-32px" : "-70px"};
  top: 10vh;
  background-color: transparent;
  width: 70px;
  height: 500px;
  border-radius: 25px 0 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
`;

const StickerToolbarStyle = styled.div`
  transition: 0.2s;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  position: absolute;
  bottom: -100px;
  background-color: #b9b9b9;
  width: 100vw;
  height: ${({ isOpenStickerToolbar }) =>
    isOpenStickerToolbar === true ? "600px" : 0};
  border-radius: 25px 25px 0 0;
  padding-top: 20px;
  z-index: 10;
`;

const ColorPea = styled.div`
  transition: 0.2s;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  background-color: ${({ color }) => color};
  height: 30px;
  width: 30px;
  transform: scale(
    ${({ color, lineColor }) => (color === lineColor ? "1.3" : "1")}
  );
  border-radius: 50%;
  border: 2px solid #9b9b9b;
  margin: 4px;
`;

const PenStyle = styled.img`
  margin: 5px 0 5px 0;
  transition: 0.2s;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  width: ${({ lineTool }) => (lineTool === "pen" ? "70px" : "40px")};
`;
const EraserStyle = styled.img`
  margin: 5px 0 5px 0;
  transition: 0.2s;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  width: ${({ lineTool }) => (lineTool === "eraser" ? "70px" : "30px")};
`;

const StickerPea = styled.div`
  background-color: red;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  margin: auto;
`;

const StickerTitle = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ToolButton = styled.img`
  margin: 5px;
`;

const WidthArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 -10px;
`;

const WidthButton = styled.img`
  width: 30px;
  margin: -5px 1px;
`;

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

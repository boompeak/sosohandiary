import { Textarea, css } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import React from "react";
import styled from "styled-components";
import { WholeAreaWithMargin } from "../styles/WholeAreaStyle";
import {
  Stage,
  Layer,
  Star,
  Text,
  Line,
  Rect,
  Transformer,
  Image,
} from "react-konva";
import TestDraft from "./TestDraft";
import useImage from "use-image";

// <---------------변형 기능된 이미지 스티커 컴퍼넌트----------------->
const ImageSticker = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  sticker,
  mode,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // 스티커 사전
  const [imgUrl0] = useImage("https://konvajs.org/assets/lion.png");
  const [imgUrl1] = useImage("https://konvajs.org/assets/yoda.jpg");
  const [imgUrl2] = useImage(
    "https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"
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
        // fill="#89b717"
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

// 초기 스티커 값
const INITIAL_STATE = [
  {
    id: 0,
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    rotation: 30,
    isDragging: false,
    stickerUrlNum: 0,
  },
  {
    id: 1,
    x: 200,
    y: 200,
    width: 100,
    height: 100,
    rotation: 60,
    isDragging: false,
    stickerUrlNum: 1,
  },
  {
    id: 2,
    x: 300,
    y: 300,
    width: 100,
    height: 100,
    rotation: 90,
    isDragging: false,
    stickerUrlNum: 2,
  },
];

const Test = () => {
  const [mode, setMode] = useState("TEXT");
  const [lineTool, setLineTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [lineColor, setLineColor] = useState("#df4b26");
  const [lineWidth, setLineWidth] = useState(5);
  const isDrawing = useRef(false);
  const changeModeHandler = (target) => {
    setMode(target);
  };

  // <-------------- 스티커 관련 -------------->

  const [stickers, setStickers] = useState([]);

  // 변형할 것 선택 관련
  const [selectedId, selectShape] = React.useState(null);

  // 스티커 추가 관련
  const addStickerButtonHandler = (num) => {
    const newSticker = {
      id: stickers.length,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      width: 100,
      height: 100,
      rotation: 45,
      isDragging: false,
      stickerUrlNum: num,
    };
    const newStickerList = stickers.concat();
    newStickerList.push(newSticker);
    setStickers(newStickerList);
  };

  // <-------------- 그리기 관련 -------------->
  const handleMouseDown = (e) => {
    //스티커 변형 초기화
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }

    //그리기 시작
    if (mode === "DRAW") {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([
        ...lines,
        { lineTool, lineColor, lineWidth, points: [pos.x, pos.y] },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const changeColorHandler = (target) => {
    setLineColor(target);
  };
  const changeWidthHandler = (target) => {
    setLineWidth(target);
  };
  const changeLineTool = (target) => {
    setLineTool(target);
  };

  //도구 모음 창
  const Toolbar = () => {
    return (
      <div style={{ position: "sticky", zIndex: 10 }}>
        <button onClick={() => changeModeHandler("TEXT")}>텍스트 모드</button>
        <button onClick={() => changeModeHandler("DRAW")}>그리기 모드</button>
        <button onClick={() => changeModeHandler("STICKER")}>
          스티커 모드
        </button>
        <button onClick={() => changeColorHandler("#df4b26")}>빨간색</button>
        <button onClick={() => changeColorHandler("#2645df")}>파란색</button>
        <button onClick={() => changeWidthHandler(5)}>굵게</button>
        <button onClick={() => changeWidthHandler(1)}>얇게</button>
        <button onClick={() => changeLineTool("eraser")}>지우개</button>
        <button onClick={() => changeLineTool("pen")}>펜</button>
        <div>
          스티커 관련
          <button onClick={() => addStickerButtonHandler(0)}>
            0번 스티커 추가
          </button>
          <button onClick={() => addStickerButtonHandler(1)}>
            1번 스티커 추가
          </button>
          <button onClick={() => addStickerButtonHandler(2)}>
            2번 스티커 추가
          </button>
        </div>
      </div>
    );
  };

  // 도화지
  return (
    <WholeAreaWithMargin>
      <Toolbar />
      <BackgroundStyle></BackgroundStyle>
      <TextAreaStyle mode={mode}>
        <TestDraft />
      </TextAreaStyle>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        style={{ position: "absolute" }}
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
              <ImageSticker
                key={i}
                mode={mode}
                shapeProps={sticker}
                isSelected={sticker.id === selectedId}
                sticker={sticker}
                onSelect={() => {
                  if (mode === "STICKER") {
                    selectShape(sticker.id);
                  }
                }}
                onChange={(newAttrs) => {
                  const sticks = stickers.slice();
                  sticks[i] = newAttrs;
                  setStickers(sticks);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </WholeAreaWithMargin>
  );
};

export default Test;

const BackgroundStyle = styled.div`
  position: absolute;
  z-index: -10;
  background-color: #e9e9e9;
  width: 100%;
  height: 1000px;
`;

const TextAreaStyle = styled.div`
  position: absolute;
  top: 120px;
  width: 100%;
  z-index: ${({ mode }) => (mode === "TEXT" ? 1 : -1)};
`;

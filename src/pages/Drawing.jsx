import { useEffect, useRef, useState } from "react";
import React from "react";
import styled from "styled-components";
import { Stage, Layer, Line, Transformer, Image } from "react-konva";
import useImage from "use-image";
import axios from "axios";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useNavigate, useParams } from "react-router-dom";
import eraser from "../assets/decoration/toolbar/eraser.png";
import pen from "../assets/decoration/toolbar/pen.png";
// import Grid from "@mui/material/Grid";
import bImg from "../assets/decoration/toolbar/bImg.png";
import iImg from "../assets/decoration/toolbar/iImg.png";
import sImg from "../assets/decoration/toolbar/sImg.png";
import uImg from "../assets/decoration/toolbar/uImg.png";
import drawImg from "../assets/decoration/toolbar/drawImg.png";
import saveImg from "../assets/decoration/toolbar/saveImg.png";
import stickerImg from "../assets/decoration/toolbar/stickerImg.png";
import textImg from "../assets/decoration/toolbar/textImg.png";
import diaryBack from "../assets/decoration/diaryBack.png";
import widthLarge from "../assets/decoration/toolbar/widthLarge.png";
import widthMedium from "../assets/decoration/toolbar/widthMedium.png";
import widthSmall from "../assets/decoration/toolbar/widthSmall.png";
import backImg from "../assets/decoration/toolbar/backImg.png";
import backImg2 from "../assets/decoration/toolbar/backImg2.png";
import download from "../assets/decoration/toolbar/download.png";
import widthSmallEraser from "../assets/decoration/toolbar/widthSmallEraser.png";
import widthMediumEraser from "../assets/decoration/toolbar/widthMediumEraser.png";
import widthLargeEraser from "../assets/decoration/toolbar/widthLargeEraser.png";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { List } from "antd";
import { Grid, ListItemText } from "@mui/material";
import { IoIosSave } from "react-icons/io";

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
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1404.png"
  );
  const [imgUrl1] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1405.png"
  );
  const [imgUrl2] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1406.png"
  );
  const [imgUrl3] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1407.png"
  );
  const [imgUrl4] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1408.png"
  );
  const [imgUrl5] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1409.png"
  );
  const [imgUrl6] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1410.png"
  );
  const [imgUrl7] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1411.png"
  );
  const [imgUrl8] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1412.png"
  );
  const [imgUrl9] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1413.png"
  );
  const [imgUrl10] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1414.png"
  );
  const [imgUrl11] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1415.png"
  );
  const [imgUrl12] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1416.png"
  );
  const [imgUrl13] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1417.png"
  );
  const [imgUrl14] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1418.png"
  );
  const [imgUrl15] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1419.png"
  );
  const [imgUrl16] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1420.png"
  );
  const [imgUrl17] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1421.png"
  );
  const [imgUrl18] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1422.png"
  );
  const [imgUrl19] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1423.png"
  );
  const [imgUrl20] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1424.png"
  );
  const [imgUrl21] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1425.png"
  );
  const [imgUrl22] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1426.png"
  );
  const [imgUrl23] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1427.png"
  );
  const [imgUrl24] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1428.png"
  );
  const [imgUrl25] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1429.png"
  );
  const [imgUrl26] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1430.png"
  );
  const [imgUrl27] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Union-1.png"
  );
  const [imgUrl28] = useImage(
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Union.png"
  );

  const imgList = [
    imgUrl0,
    imgUrl1,
    imgUrl2,
    imgUrl3,
    imgUrl4,
    imgUrl5,
    imgUrl6,
    imgUrl7,
    imgUrl8,
    imgUrl9,
    imgUrl10,
    imgUrl11,
    imgUrl12,
    imgUrl13,
    imgUrl14,
    imgUrl15,
    imgUrl16,
    imgUrl17,
    imgUrl18,
    imgUrl19,
    imgUrl20,
    imgUrl21,
    imgUrl22,
    imgUrl23,
    imgUrl24,
    imgUrl25,
    imgUrl26,
    imgUrl27,
    imgUrl28,
  ];

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
            rotation: e.target.attrs.rotation,
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
            rotation: e.target.attrs.rotation,
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

const Drawing = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("TEXT");
  const [lineTool, setLineTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [touchStartY, setTouchStartY] = useState(0);
  const [movementY, setmovementY] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDrawing = useRef(false);
  const { diaryid, paperid } = useParams();

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
        `${process.env.REACT_APP_BASEURL}/diary/${diaryid}/detail/${paperid}`,
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        if (res.data.customJson.length > 10) {
          const resJson = JSON.parse(res.data.customJson);
          setStickers(resJson.stickers);
          setLines(resJson.lines);
          setEditorState(
            EditorState.createWithContent(convertFromRaw(resJson.texts))
          );
        }
      });
  }, []);

  // <-------------- 스티커 관련 -------------->

  const [stickers, setStickers] = useState([]);

  // 변형할 것 선택 관련
  const [selectedId, selectShape] = React.useState(null);

  // 스티커 추가 관련
  const addStickerButtonHandler = (num) => {
    const generateRandomId = () => {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    };

    const newSticker = {
      id: generateRandomId(),
      x: 150,
      y: 300,
      width: 100,
      height: 100,
      rotation: 0,
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

  // 텍스트 - Draft관련

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleTogggleClick = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleSave = () => {
    const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    // localStorage.setItem(TEXT_EDITOR_ITEM, data);

    const allData = {
      stickers,
      lines,
      texts: convertToRaw(editorState.getCurrentContent()),
    };

    const allJSON = JSON.stringify(allData);

    const sendData = { thumbnail: "dd", customJson: allJSON };

    axios.patch(
      `${process.env.REACT_APP_BASEURL}/diary/${diaryid}/detail/${paperid}`,
      sendData,
      {
        headers: { Authorization: accessToken },
      }
    );
  };

  //툴바 관련
  const [isOpenAllToolbar, setIsOpenAllToolbar] = useState(true);
  const [isOpenTextToolbar, setIsOpenTextToolbar] = useState(false);
  const [isOpenDrawToolbar, setIsOpenDrawToolbar] = useState(false);
  const [isOpenStickerToolbar, setIsOpenStickerToolbar] = useState(false);

  const [lineColor, setLineColor] = useState("#e74b24");
  const [lineWidth, setLineWidth] = useState(5);

  const touchAllToolbarButtonHandler = (props) => {
    switch (props) {
      case "TEXT":
        setIsOpenTextToolbar(true);
        setIsOpenAllToolbar(false);
        setMode("TEXT");
        return;
      case "DRAW":
        setIsOpenAllToolbar(false);
        setIsOpenDrawToolbar(true);
        setMode("DRAW");
        return;
      case "STICKER":
        setIsOpenAllToolbar(false);
        setIsOpenStickerToolbar(true);
        setMode("STICKER");
        return;
      default:
        return;
    }
  };

  const colorPallette = [
    "#FC9F9F",
    "#FCBB9F",
    "#FCDC9F",
    "#9FFCA8",
    "#9FF1FC",
    "#9FB3FC",
    "#E49FFC",
    "#000000",
  ];

  const goBackDiaryHandler = () => {
    navigate(-1);
  };

  const deleteStickerHandler = () => {
    setStickers(stickers.filter((item) => item.id !== selectedId));
  };

  const stickerUrlList = [
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1404.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1405.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1406.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1407.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1408.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1409.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1410.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1411.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1412.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1413.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1414.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1415.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1416.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1417.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1418.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1419.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1420.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1421.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1422.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1423.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1424.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1425.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1426.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1427.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1428.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1429.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Group+1430.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Union-1.png",
    "https://mysosodiary.s3.ap-northeast-2.amazonaws.com/sticker/Union.png",
  ];

  const MAX_LENGTH = 1000;

  const getLengthOfSelectedText = () => {
    const currentSelection = editorState.getSelection();
    const isCollapsed = currentSelection.isCollapsed();

    let length = 0;

    if (!isCollapsed) {
      const currentContent = editorState.getCurrentContent();
      const startKey = currentSelection.getStartKey();
      const endKey = currentSelection.getEndKey();
      const startBlock = currentContent.getBlockForKey(startKey);
      const isStartAndEndBlockAreTheSame = startKey === endKey;
      const startBlockTextLength = startBlock.getLength();
      const startSelectedTextLength =
        startBlockTextLength - currentSelection.getStartOffset();
      const endSelectedTextLength = currentSelection.getEndOffset();
      const keyAfterEnd = currentContent.getKeyAfter(endKey);
      if (isStartAndEndBlockAreTheSame) {
        length +=
          currentSelection.getEndOffset() - currentSelection.getStartOffset();
      } else {
        let currentKey = startKey;

        while (currentKey && currentKey !== keyAfterEnd) {
          if (currentKey === startKey) {
            length += startSelectedTextLength + 1;
          } else if (currentKey === endKey) {
            length += endSelectedTextLength;
          } else {
            length += currentContent.getBlockForKey(currentKey).getLength() + 1;
          }

          currentKey = currentContent.getKeyAfter(currentKey);
        }
      }
    }

    return length;
  };

  const handleBeforeInput = () => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText("").length;
    const selectedTextLength = getLengthOfSelectedText();

    if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
      alert("1000자 이하로 입력해주세요");

      return "handled";
    }
  };

  const handlePastedText = (pastedText) => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText("").length;
    const selectedTextLength = getLengthOfSelectedText();

    if (
      currentContentLength + pastedText.length - selectedTextLength >
      MAX_LENGTH
    ) {
      alert("1000자 이하로 입력해주세요");

      return "handled";
    }
  };
  // 도화지
  return (
    <div style={{ overflow: "hidden", width: "100vw" }}>
      <DiaryBack src={diaryBack} onClick={goBackDiaryHandler} />{" "}
      {/* <SaveButton src={saveImg} onClick={handleSave} /> */}
      <SaveButtonArea>
        <IoIosSave onClick={handleSave} />
      </SaveButtonArea>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        style={{ position: "absolute", top: "40px" }}
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
      <DeleteButtonArea mode={mode}>
        <SubmitButton onClick={deleteStickerHandler}>스티커 삭제</SubmitButton>
      </DeleteButtonArea>
      <TextAreaStyle mode={mode}>
        <Editor
          editorStyle={{ height: "10px" }}
          editorState={editorState}
          onChange={setEditorState}
          onEditorStateChange={handleKeyCommand}
          handleBeforeInput={handleBeforeInput}
          handlePastedText={handlePastedText}
        />
      </TextAreaStyle>
      <AllToolbarStyle isOpenAllToolbar={isOpenAllToolbar}>
        <ToolButton
          src={textImg}
          onClick={() => touchAllToolbarButtonHandler("TEXT")}
        />
        <ToolButton
          src={drawImg}
          onClick={() => touchAllToolbarButtonHandler("DRAW")}
        />
        <ToolButton
          src={stickerImg}
          onClick={() => {
            setDrawerOpen(true);
            touchAllToolbarButtonHandler("STICKER");
          }}
        />
      </AllToolbarStyle>
      <TextToolbarStyle isOpenTextToolbar={isOpenTextToolbar}>
        <ToolButton
          src={backImg}
          width="25px"
          height="35px"
          onMouseDown={() => {
            setIsOpenTextToolbar(false);
            setIsOpenAllToolbar(true);
            setMode("TEXT");
          }}
        />
        <ToolButton
          src={uImg}
          width="40px"
          height="40px"
          onMouseDown={() => handleTogggleClick("UNDERLINE")}
        />
        <ToolButton
          src={sImg}
          width="40px"
          height="40px"
          onMouseDown={() => handleTogggleClick("STRIKETHROUGH")}
        />
        <ToolButton
          src={iImg}
          width="40px"
          height="40px"
          onMouseDown={() => handleTogggleClick("ITALIC")}
        />
        <ToolButton
          src={bImg}
          width="40px"
          height="40px"
          onMouseDown={() => handleTogggleClick("BOLD")}
        />
      </TextToolbarStyle>
      <DrawToolbarStyle isOpenDrawToolbar={isOpenDrawToolbar}>
        <ToolButton
          src={backImg}
          width="25px"
          height="35px"
          style={{ marginRight: "40px" }}
          onClick={() => {
            setIsOpenDrawToolbar(false);
            setIsOpenAllToolbar(true);
            setMode("TEXT");
          }}
        />
        <a id={lineTool === "pen" ? "openerPenWidth" : ""}>
          <PenStyle
            src={pen}
            lineTool={lineTool}
            onClick={() => {
              setLineTool("pen");
            }}
          />
        </a>
        <Tooltip
          anchorSelect="#openerPenWidth"
          clickable
          place="left"
          noArrow={true}
          style={{ backgroundColor: "rgba(150,150,150,0.5)" }}
        >
          <WidthArea>
            <WidthButton
              src={widthSmall}
              onMouseDown={() => {
                setLineWidth(5);
                setLineTool("pen");
              }}
            ></WidthButton>
            <WidthButton
              src={widthMedium}
              onMouseDown={() => {
                setLineWidth(10);
                setLineTool("pen");
              }}
            ></WidthButton>
            <WidthButton
              src={widthLarge}
              onMouseDown={() => {
                setLineWidth(20);
                setLineTool("pen");
              }}
            ></WidthButton>
          </WidthArea>
        </Tooltip>

        <a id="openerEraserWidth">
          <EraserStyle
            src={eraser}
            lineTool={lineTool}
            onClick={() => {
              setLineTool("eraser");
            }}
          />
        </a>
        <Tooltip
          anchorSelect="#openerEraserWidth"
          clickable
          place="left"
          noArrow={true}
          style={{ backgroundColor: "rgba(150,150,150,0.5)" }}
        >
          <WidthArea>
            <WidthButton
              src={widthSmallEraser}
              onMouseDown={() => {
                setLineWidth(5);
                setLineTool("eraser");
              }}
            ></WidthButton>
            <WidthButton
              src={widthMediumEraser}
              onMouseDown={() => {
                setLineWidth(10);
                setLineTool("eraser");
              }}
            ></WidthButton>
            <WidthButton
              src={widthLargeEraser}
              onMouseDown={() => {
                setLineWidth(20);
                setLineTool("eraser");
              }}
            ></WidthButton>
          </WidthArea>
        </Tooltip>
        {colorPallette.map((item, i) => (
          <ColorPea
            key={i}
            color={item}
            lineColor={lineColor}
            onClick={() => setLineColor(item)}
          ></ColorPea>
        ))}
      </DrawToolbarStyle>
      <StickerToolbarStyle
        isOpenStickerToolbar={isOpenStickerToolbar}
        onTouchStart={(e) => {
          setTouchStartY(e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          if (e.touches[0].clientY - touchStartY > 10) {
            setIsOpenStickerToolbar(false);
            setIsOpenAllToolbar(true);
          }
        }}
        onMouseDown={(e) => {
          setTouchStartY(e.clientY);
        }}
        onMouseUp={(e) => {
          if (e.clientY - touchStartY > 10) {
            setIsOpenStickerToolbar(false);
            setIsOpenAllToolbar(true);
          }
        }}
      >
        <StickerTitle>스티커</StickerTitle>
        <Grid
          container
          spacing={{ xs: 2, md: 2, sm: 2 }}
          columns={{ xs: 8, sm: 8, md: 8 }}
        >
          {stickerUrlList.map((item, i) => (
            <Grid item xs={2} sm={2} md={2} key={i}>
              <StickerPea
                imgUrl={item}
                onClick={() => {
                  addStickerButtonHandler(i);
                  setIsOpenStickerToolbar(false);
                  setIsOpenAllToolbar(true);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </StickerToolbarStyle>
    </div>
  );
};

export default Drawing;

const DiaryBack = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  width: 40px;
  @media (min-width: 700px) {
    width: 80px;
  }
`;
const SaveButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  width: 40px;
  @media (min-width: 700px) {
    width: 80px;
  }
`;

const TextAreaStyle = styled.div`
  .DraftEditor-editorContainer {
    background-color: #fff;
    max-height: 70vh;
    overflow: scroll;
  }
  font-size: 20px;
  position: absolute;
  width: auto;
  min-width: 100px;
  max-width: 80vw;
  margin: 40px 10vw;
  z-index: ${({ mode }) => (mode === "TEXT" ? 1 : -1)};
  background-color: "red";
  border-radius: 25px;
  background-color: rgba(200, 200, 200, 0.1);
  padding: 25px;
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
  justify-content: space-around;
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
  background-color: #efeeee;
  width: 100vw;
  height: ${({ isOpenStickerToolbar }) =>
    isOpenStickerToolbar === true ? "110vh" : 0};
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
  background-image: url(${({ imgUrl }) => imgUrl});
  background-size: cover;
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

const DeleteButtonArea = styled.div`
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ mode }) => (mode === "STICKER" ? "1" : "0")};
`;

const SubmitButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 20px;
  background-color: #e1e7ff;
  width: 30vw;
  height: 50px;
  opacity: 0.8;
`;

const SaveButtonArea = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  width: 100px;
  font-size: 80px;
  @media (min-width: 700px) {
    width: 80px;
  }
`;

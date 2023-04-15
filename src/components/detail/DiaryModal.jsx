import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const options = ["수정하기", "삭제하기"];

const ITEM_HEIGHT = 48;

const DiaryModal = (props) => {
  console.log(props);
  const { navToModify, onDeleteHandler, detailId } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "15ch",
          },
          sx: {
            left: "52% !important"
          }
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              if (option === "수정하기") {
                navToModify();
              } else if (option === "삭제하기") {
                onDeleteHandler(detailId);
              }
              handleClose();
            }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {option === "수정하기"
              ? props.customJson === ""
                ? "작성하기"
                : "수정하기"
              : "삭제하기"}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DiaryModal;

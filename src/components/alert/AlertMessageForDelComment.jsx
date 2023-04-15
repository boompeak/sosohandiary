import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import { VscBlank } from "react-icons/vsc";
import AlertMessage from "./AlertMessage";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertMessageForDelComment = ({ setAlertOpenDeleteAlert, message, onDeleteHandler }) => {
  const [open, setOpen] = React.useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleClose = () => {
    setOpen(false);
    setAlertOpenDeleteAlert(false);
  };

  return (
    <>
      {alertOpen ? <AlertMessage setAlertOpen={setAlertOpen} message={alertMsg} /> : ""}
      <Invisible>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <TopBox>
            <VscBlank className="VscBlank" />
            <TopMent>US</TopMent>
            <VscBlank className="VscBlank" />
          </TopBox>
          <DialogTitle>{message}</DialogTitle>
          <TopBox></TopBox>
          <ButtonArea>
            <DialogActions>
              <CancelButton onClick={handleClose}>취소</CancelButton>
            </DialogActions>
            <DialogActions>
              <OkButton onClick={onDeleteHandler}>삭제하기</OkButton>
            </DialogActions>
          </ButtonArea>
        </Dialog>
      </Invisible>
    </>
  );
};

export default AlertMessageForDelComment;

const Invisible = styled.div`
  position: absolute;
  top: 0px;
`;

const TopBox = styled.div`
  border-bottom: 1px solid #dcdcdc;
  font-weight: bold;
  font-size: 25px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding-bottom: 10px;
  .VscBlank {
    font-size: 35px;
  }
`;

const TopMent = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin-top: 2px;
`;

const OkButton = styled.button`
  position: relative;
  width: 100%;
  border: none;
  border-radius: 7px;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  color: #67b8d8;
`;

const CancelButton = styled.button`
  position: relative;
  width: 100%;
  border: none;
  border-radius: 7px;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  color: #d8676f;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

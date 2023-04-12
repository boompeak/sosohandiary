import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { VscBlank } from "react-icons/vsc";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertMessage = ({ setAlertOpen, message, navigateLink, reload }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    setAlertOpen(false);
    if (navigateLink) {
      navigate(navigateLink);
    }
    if (reload) {
      window.location.reload();
    }
  };

  const closeByKeyboard = () => {
    handleClose();
  };
  return (
    <Invisible onKeyDown={closeByKeyboard}>
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
        <DialogActions>
          <OkButton onClick={handleClose}>확인했습니다</OkButton>
        </DialogActions>
      </Dialog>
    </Invisible>
  );
};

export default AlertMessage;

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

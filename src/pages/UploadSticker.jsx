import axios from "axios";
import React from "react";

const UploadSticker = () => {
  const getStickers = () => {
    axios.get(`${process.env.REACT_APP_BASEURL}/decorations`);
  };
  return <div>UploadSticker</div>;

};

export default UploadSticker;

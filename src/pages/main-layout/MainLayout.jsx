import React from "react";
import Navigationbar from "../../components/Navigationbar";
import { Outlet } from "react-router-dom";

const MainLayout = ({ accessToken }) => {
  return (
    <>
      <Outlet />
      {accessToken === null ? "" : <Navigationbar />}
    </>
  );
};

export default MainLayout;

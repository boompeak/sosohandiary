import React, { useState } from "react";
import Friendlist from "../components/Friendlist";
import Navigationbar from "../components/Navigationbar";
import Searchbox from "../components/Searchbox";
import "react-alice-carousel/lib/alice-carousel.css";

function UserSearch() {
  return (
    <>
      <Searchbox placeholder="친구이름을 검색해 친구를 추가해보세요!" />
      <Friendlist />
      <Navigationbar />
    </>
  );
}

export default UserSearch;

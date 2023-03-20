import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Search from "./Search";
import Test from "./Test";
import Diary from "./Diary";
import MainPage from "./MainPage";
import OtherLogin from "./OtherLogin";
import Profile from "./Profile";
import Notification from "./Notification";
import MyPage from "./MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/notice" element={<Notice />} /> */}
        {/* <Route path="/transfusion" element={<TransfusionBoard />} /> */}
        {/* <Route path="/knowledge" element={<Knowledge />} /> */}
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otherlogin" element={<OtherLogin />} />
        <Route path="/test" element={<Test />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/mypage" element={<MyPage />} />
        {/* <Route path="/detail" element={<Detail />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

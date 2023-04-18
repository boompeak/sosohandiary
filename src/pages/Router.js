import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./authenticate/Login";
import Profile from "./Profile";
import Notification from "./main-layout/Notification";
import MyPage from "./main-layout/MyPage";
import Signup from "./authenticate/Signup";
import SignupSuccess from "./authenticate/SignupSuccess";
import Oauth from "./authenticate/Oauth";
import Detail from "./Detail";
import MyFriends from "./MyFriends";
import MainPage from "./main-layout/MainPage";
import NewFriend from "./main-layout/NewFriend";
import Diary from "./main-layout/Diary";
import MainLayout from "./main-layout/MainLayout";
import Drawing from "./Drawing";
import Page from "./Page";
import DiaryEdit from "./DiaryEdit";
import DiaryDetail from "./DiaryDetail";
import AlertMessage from "../components/alert/AlertMessage";
import NotFound from "./NotFound";
import ScrollToTop from "../utils/ScrollToTop";
import { useEffect, useState } from "react";

const Router = () => {
  const [accessToken, setAccessToken] = useState(
    window.localStorage.getItem("accessToken")
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout accessToken={accessToken} />}>
          <Route
            path="/"
            element={
              accessToken === null ? (
                <Navigate replace to="/login" />
              ) : (
                <MainPage />
              )
            }
          />
          <Route path="/notification" element={<Notification />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/new-friend" element={<NewFriend />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route
          path="/login"
          element={<Login setAccessToken={setAccessToken} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="drawing/:diaryid/:paperid" element={<Drawing />} />
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/diaries/:diaryId/:detailId" element={<Detail />} />
        <Route path="/myfriends" element={<MyFriends />} />
        <Route path="/diaries/:diaryId" element={<DiaryDetail />} />
        <Route path="/diary/:diaryId" element={<Page />} />
        <Route path="/diaryedit/:diaryId" element={<DiaryEdit />} />
        <Route path="/alertmessage" element={<AlertMessage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

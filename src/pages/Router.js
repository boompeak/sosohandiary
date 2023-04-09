import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./authenticate/Login";
import OtherLogin from "./authenticate/OtherLogin";
import Profile from "./Profile";
import Notification from "./main-layout/Notification";
import MyPage from "./main-layout/MyPage";
import Signup from "./authenticate/Signup";
import SignupSuccess from "./authenticate/SignupSuccess";
import Oauth from "./authenticate/Oauth";
import Detail from "./Detail";
import MyFriends from "./MyFriends";
import OnBoarding from "./authenticate/OnBoarding";
import MainPage from "./main-layout/MainPage";
import NewDiary from "./NewDiary";
import NewFriend from "./main-layout/NewFriend";
import Diary from "./main-layout/Diary";
import MainLayout from "./main-layout/MainLayout";
import Drawing from "./Drawing";
import Page from "./Page";
import DiaryEdit from "./DiaryEdit";
import BookDetail from "./DiaryDetail";
import DiaryDetail from "./DiaryDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/new-friend" element={<NewFriend />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/otherlogin" element={<OtherLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="drawing/:diaryid/:paperid" element={<Drawing />} />
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/diaries/:diaryId/:detailId" element={<Detail />} />
        <Route path="/new-diary" element={<NewDiary />} />
        <Route path="/myfriends" element={<MyFriends />} />
        <Route path="/diaries/:diaryId" element={<DiaryDetail />} />
        <Route path="/diary/:diaryId" element={<Page />} />
        <Route path="/diaryedit/:diaryId" element={<DiaryEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

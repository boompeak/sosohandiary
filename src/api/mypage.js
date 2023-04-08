import axios from "axios";

export const getMypage = async (accessToken) => {
  return await axios.get(`${process.env.REACT_APP_BASEURL}/mypage/diaries`, {
    headers: { Authorization: accessToken },
  });
};

export const getProfile = async (accessToken) => {
  return await axios.get(`${process.env.REACT_APP_BASEURL}/mypage/profile`, {
    headers: { Authorization: accessToken },
  });
};

export const editProfile = async (formData, accessToken) => {
  try{
    const respense = await axios.patch(
    `${process.env.REACT_APP_BASEURL}/mypage/profile/edit`,
    formData,
    {
      headers: { Authorization: accessToken },
      "Content-Type": `multipart/form-data; `,
    }
  );
  return respense.data;
  }catch(error){
    console.error(error);
    throw error;
  }
};

export const getFriendsCount = async (accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_BASEURL}/mypage/friend/count`,
    {
      headers: { Authorization: accessToken },
    }
  );
};

export const getDiaryCount = async (accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_BASEURL}/mypage/diary/count`,
    {
      headers: { Authorization: accessToken },
    }
  );
};

export const deleteAccount = async (accessToken) => {
  return await axios.delete(`${process.env.REACT_APP_BASEURL}/mypage/out`, {
    headers: { Authorization: accessToken },
  });
};

//친구목록 조회
export const getMyfriends = async (accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_BASEURL}/mypage/friend/myfriends`,
    {
      headers: { Authorization: accessToken },
    }
  );
};

//친구 삭제
export const deleteFriend = async (friendId, accessToken) => {
  return await axios.delete(
    `${process.env.REACT_APP_BASEURL}/friend/list/${friendId}`,
    {
      headers: { Authorization: accessToken },
    }
  );
};

//친구추가요청목록
export const getRequested = async (accessToken) => {
  return await axios.get(`${process.env.REACT_APP_BASEURL}/friend/request`, {
    headers: { Authorization: accessToken },
  });
};

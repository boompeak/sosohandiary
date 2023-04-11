import axios from "axios";

export const getMypage = async (accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASEURL}/mypage/diaries`,
      {
        headers: { Authorization: accessToken },
      }
    );
    return res;
  } catch (err) {
    console.error(`Error : ${err} `);
    return;
  }
};

export const getProfile = async (accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASEURL}/mypage/profile`,
      {
        headers: { Authorization: accessToken },
      }
    );

    return res;
  } catch (err) {
    console.error(`Error : ${err} `);
    return;
  }
};

export const editProfile = async (formData, accessToken) => {
  try {
    const respense = await axios.patch(
      `${process.env.REACT_APP_BASEURL}/mypage/profile/edit`,
      formData,
      {
        headers: { Authorization: accessToken },
        "Content-Type": `multipart/form-data; `,
      }
    );
    return respense.data;
  } catch (error) {
    console.error(`Error : ${error} `);
    throw error;
  }
};

export const getFriendsCount = async (accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASEURL}/mypage/friend/count`,
      {
        headers: { Authorization: accessToken },
      }
    );
    return res;
  } catch (err) {
    console.error(`Error : ${err} `);
    return;
  }
};

export const getDiaryCount = async (accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASEURL}/mypage/diary/count`,
      {
        headers: { Authorization: accessToken },
      }
    );

    return res;
  } catch (err) {
    console.error(`Error : ${err} `);
    return;
  }
};

export const deleteAccount = async (accessToken) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BASEURL}/mypage/out`,
      {
        headers: { Authorization: accessToken },
      }
    );
    return res;
  } catch (err) {
    console.error(`Error : ${err} `);
    return;
  }
};

//친구목록 조회
export const getMyfriends = async (accessToken) => {
  try{
    const res = await axios.get(
      `${process.env.REACT_APP_BASEURL}/mypage/friend/myfriends`,
      {
        headers: { Authorization: accessToken },
      }
    );
    return res;
  }catch(err){
    console.error(`Error : ${err} `);
    return;
  }
};

//친구 삭제
export const deleteFriend = async (friendId, accessToken) => {
  try{
    const res = await axios.delete(
      `${process.env.REACT_APP_BASEURL}/friend/list/${friendId}`,
      {
        headers: { Authorization: accessToken },
      }
    );
    return res;
  }catch(err){
    console.error(`Error : ${err} `);
    return;
  }
};
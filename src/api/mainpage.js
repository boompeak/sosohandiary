import axios from "axios";

export const getDiariesOfSelfmade = async (accessToken) => {
  return axios.get(`${process.env.REACT_APP_BASEURL}/private`, {
    headers: { Authorization: accessToken },
  });
};

//댓글 조회
export const getComment = async (id, accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_BASEURL}/detail/${id}/comments`,
    {
      headers: { Authorization: accessToken },
    }
  );
};

//댓글 삭제
export const deleteComment = async (id, commentId, accessToken) => {
  return await axios.delete(
    `${process.env.REACT_APP_BASEURL}/detail/${id}/comment/${commentId}`,
    {
      headers: { Authorization: accessToken },
    }
  );
};

//댓글 수정
export const updatedComment = async (
  id,
  commentId,
  editedcomment,
  accessToken
) => {
  return await axios.patch(
    `${process.env.REACT_APP_BASEURL}/detail/${id}/comment/${commentId}`,
    editedcomment,
    {
      headers: { Authorization: accessToken },
    }
  );
};

//좋아요
export const likePost = async (id, accessToken) => {
  return await axios.post(
    `${process.env.REACT_APP_BASEURL}/detail/${id}/like`,
    {},
    {
      headers: { Authorization: accessToken },
    }
  );
};

//다이어리속지 내용 상세 조회
export const getDiary = async (diaryId, detailId, accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail/${detailId}`,
    {
      headers: { Authorization: accessToken },
    }
  );
};

//다이어리속지 삭제
export const deleteDiary = async (diaryId, detailID, accessToken) => {
  return await axios.delete(
    `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail/${detailID}`,
    {
      headers: { Authorization: accessToken },
    }
  );
};

import React, { useState } from "react";
import styled from "styled-components";
import { ProfilePicSmall } from "../ProfilePics";
import { RiPencilFill, RiDeleteBin6Fill, RiCheckFill, RiCloseFill } from "react-icons/ri";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { addComment, getComment, deleteComment, updatedComment } from "../../api/detail";
import { useParams } from "react-router-dom";
import GetTimeAgo from "../GetTimeAgo";
import { WholeAreaWithMargin } from "../../styles/WholeAreaStyle";

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import AlarmReadCard from "../notification/AlarmReadCard";

const CommentBox = () => {
  const [comment, setComment] = useState({
    comment: "",
  });
  const [editingComment, setEditingComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [test, setTest] = useState(null);

  const queryClient = useQueryClient();
  const { detailId } = useParams();
  const accessToken = localStorage.getItem("accessToken");

  // get
  const { data: commentData } = useQuery(["getComment"], () => getComment(detailId, accessToken));
  const mycomment = commentData?.data;

  // console.log("??", mycomment);

  // <----Mutation----> //

  //add
  const { mutate: addmutation } = useMutation(() => addComment(detailId, comment, accessToken), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getComment");
      queryClient.invalidateQueries("getDiary");
    },
  });

  //delete
  const { mutate: deleteCommentMutate } = useMutation((commentId) => deleteComment(detailId, commentId, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("getComment");
      queryClient.invalidateQueries("getDiary");
    },
  });

  //edit
  const { mutate: updatedCommentMutate } = useMutation(
    (commentId) => updatedComment(detailId, commentId, comment, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getComment");
        queryClient.invalidateQueries("getDiary");
      },
    }
  );

  // <----Handler----> //
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (isEditing) {
        onUpdateHandler();
      } else {
        onAddHandler(event);
      }
    }
  };

  const onAddHandler = (event) => {
    event.preventDefault();
    addmutation();
    setComment({ comment: "" });
  };

  const onDeleteHandler = (commentId) => {
    deleteCommentMutate(commentId);
  };

  const onEditHandler = (comment) => {
    console.log(comment);
    setIsEditing(true);
    setEditingComment(comment);
    setComment({ comment: comment.comment });
    setTest(comment.commentId);
  };

  const onCancelEditHandler = () => {
    setIsEditing(false);
    setEditingComment(null);
    setComment({ comment: "" });
  };

  const onUpdateHandler = () => {
    updatedCommentMutate(test);
    setIsEditing(false);
    setEditingComment(null);
    setComment({ comment: "" });
  };

  //스와이프 테스트
  const handleReject = () => {
    console.log("Reject 누름");
  };
  const handleDelete = () => {
    console.log("Delete 누름");
    console.log("Delete 누르면 사라집니다. -> destructive={true} 옵션");
  };

  const trailingActions = (comment) => (
    <TrailingActions>
      <IconWrapper onClick={() => onEditHandler(comment)}>
        <EditIconStyled>&#9998;</EditIconStyled>
        <span>Edit</span>
      </IconWrapper>
      <IconWrapper onClick={() => onDeleteHandler(comment.commentId)}>
        <DeleteIconStyled>&#10006;</DeleteIconStyled>
        <span>Delete</span>
      </IconWrapper>
    </TrailingActions>
  );

  return (
    <div>
      <WholeAreaWithMargin>
        <CommentsContainer>
          <h3>댓글</h3>

          <SwipeableList threshold={0.5} type={ListType.IOS}>
            {mycomment?.map((comment) => {
              const createdAtAgo = <GetTimeAgo createdAt={comment.createdAt} />;
              return (
                <SwipeableListItem trailingActions={trailingActions()}>
                  <React.Fragment key={comment.commentId}>
                    <div>
                      <CommentStyle>
                        <ProfilePicSmall src={comment.commentProfileImageUrl} />
                        <UserBox>
                          <span>{comment.commentName}</span>
                          <span>{createdAtAgo}</span>
                        </UserBox>
                        <IconStyle>
                          {isEditing && editingComment.commentId === comment.commentId ? (
                            <>
                              <CancelIcon onClick={onCancelEditHandler} />
                              <UpdateIcon onClick={onUpdateHandler} />
                            </>
                          ) : (
                            <>
                              <EditIcon onClick={() => onEditHandler(comment)} />
                              <DeleteIcon onClick={() => onDeleteHandler(comment.commentId)} />
                            </>
                          )}
                        </IconStyle>
                      </CommentStyle>
                      <CommentText>{comment.comment}</CommentText>
                    </div>
                  </React.Fragment>
                </SwipeableListItem>
              );
            })}
          </SwipeableList>
        </CommentsContainer>
      </WholeAreaWithMargin>

      <WholeAreaWithMargin>
        <CommentInput
          name="comment"
          placeholder={isEditing ? "댓글 수정하기" : "댓글 달기"}
          value={comment.comment}
          onChange={inputChangeHandler}
          onKeyPress={handleKeyDown}
        />
      </WholeAreaWithMargin>
    </div>
  );
};

export default CommentBox;

const IconWrapper = styled.span`
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;
const EditIconStyled = styled(RiPencilFill)`
  font-size: 20px;
  margin-right: 5px;
`;

const DeleteIconStyled = styled(RiDeleteBin6Fill)`
  font-size: 20px;
  margin-right: 5px;
`;

const CommentsContainer = styled.div`
  width: 375px;
  height: 600px;
  border: none;
  /* background-color: #ca9d9d; */
  /* border-radius: 30px 30px 0px 0px; */
  padding: 10px;
  margin-top: -25px;
  margin-bottom: -25px;
  overflow-y: auto;
  position: relative;

  h3 {
    text-align: center;
    line-height: 22px;
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
  }

  /* Add new styles */
  & > div {
    margin-bottom: 5px;
  }
`;

const CommentInput = styled.input`
  width: 360px;
  height: 40px;
  /* margin-top: 10px; */
  padding: 5px;
  /* resize: none; */
  border: none;
  border-radius: 20px;
  background-color: #f1f1f1;
  outline: none;
`;

const CommentStyle = styled.div`
  border: none;
  width: 360px;
  height: 55px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: -3px;
  background-color: #4a92d1;

  /* Add new styles */
  & > img {
    margin-right: 10px;
  }

  & > span:last-child {
    flex: 1;
  }
`;
const CommentText = styled.span`
  font-size: 14px;
  /* font-weight: 600; */
  margin-left: 10px;
  display: block;
  white-space: pre-wrap;
  word-break: break-all;
  background-color: #e4abab;
  width: 360px;
`;

const UserBox = styled.div`
  font-size: 14px;

  span {
    &:first-of-type {
      font-size: 15px;
      font-weight: bold;
      margin-left: 7px;
      color: gray;
    }

    &:not(:last-of-type)::after {
      content: "·";
      margin-left: 5px;
      margin-right: 5px;
      color: gray;
    }

    &:last-of-type {
      font-size: 12px;
      color: gray;
    }
  }
`;

const IconStyle = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 118px;
  height: 40px;
  color: #a5a2a2;
`;

const EditIcon = styled(RiPencilFill)`
  position: absolute;
  right: -60px;
  cursor: pointer;
`;

const DeleteIcon = styled(RiDeleteBin6Fill)`
  position: absolute;
  right: -80px;
  cursor: pointer;
`;

const CancelIcon = styled(RiCloseFill)`
  position: absolute;
  right: -80px;
  cursor: pointer;
`;

const UpdateIcon = styled(RiCheckFill)`
  position: absolute;
  right: -60px;
  cursor: pointer;
`;

import React, { useState } from "react";
import styled from "styled-components";
import { ProfilePicSmall } from "../ProfilePics";
import {
  RiPencilFill,
  RiDeleteBin6Fill,
  RiCheckFill,
  RiCloseFill,
} from "react-icons/ri";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  addComment,
  getComment,
  deleteComment,
  updatedComment,
} from "../../api/detail";
import { useParams } from "react-router-dom";
import GetTimeAgo from "../GetTimeAgo";
import { WholeAreaWithMargin } from "../../styles/WholeAreaStyle";

import {
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

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
  const { data: commentData } = useQuery(["getComment"], () =>
    getComment(detailId, accessToken)
  );
  const mycomment = commentData?.data;

  // <----Mutation----> //

  //add
  const { mutate: addmutation } = useMutation(
    () => addComment(detailId, comment, accessToken),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getComment");
        queryClient.invalidateQueries("getDiary");
      },
    }
  );

  //delete
  const { mutate: deleteCommentMutate } = useMutation(
    (commentId) => deleteComment(detailId, commentId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getComment");
        queryClient.invalidateQueries("getDiary");
      },
    }
  );

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

  const trailingActions = (comment) => (
    <TrailingActions>
      {isEditing && editingComment.commentId === comment.commentId ? (
        <>
          <IconWrapper onClick={onUpdateHandler}>
            <CheckIconStyled />
          </IconWrapper>
          <IconWrapper onClick={onCancelEditHandler}>
            <CloseIconStyled />
          </IconWrapper>
        </>
      ) : (
        <>
          <IconWrapper onClick={() => onEditHandler(comment)}>
            <EditIconStyled />
          </IconWrapper>
          <IconWrapper onClick={() => onDeleteHandler(comment.commentId)}>
            <DeleteIconStyled />
          </IconWrapper>
        </>
      )}
    </TrailingActions>
  );

  return (
    <div>
      <WholeAreaWithMargin>
        <h3>댓글</h3>
        <LabelArea>
          <div>밀어서 수정하세요</div>
        </LabelArea>
        <CommentsContainer>
          <SwipeableList
            threshold={0.5}
            type={ListType.IOS}
            disableSwipe={isEditing}
          >
            {mycomment?.length === 0 ? (
              <h5>"아직 댓글이 없어요"</h5>
            ) : (
              mycomment?.map((comment) => {
                const createdAtAgo = (
                  <GetTimeAgo createdAt={comment.createdAt} />
                );

                return (
                  <SwipeableListItem
                    key={comment.commentId}
                    trailingActions={trailingActions(comment)}
                  >
                    <React.Fragment key={comment.commentId}>
                      <div>
                        <CommentStyle>
                          <ProfilePicSmall
                            src={comment.commentProfileImageUrl}
                          />
                          <UserBox>
                            <span>{comment.commentName}</span>
                            <span>{createdAtAgo}</span>
                          </UserBox>
                        </CommentStyle>
                        <CommentText>{comment.comment}</CommentText>
                      </div>
                    </React.Fragment>
                  </SwipeableListItem>
                );
              })
            )}
          </SwipeableList>
        </CommentsContainer>
      </WholeAreaWithMargin>

      <WholeAreaWithMargin>
        <CommentInput
          name="comment"
          placeholder={isEditing ? "댓글 수정하기" : "댓글 입력 후 엔터"}
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
  color: #87b1e7;
`;

const DeleteIconStyled = styled(RiDeleteBin6Fill)`
  font-size: 20px;
  margin-right: 5px;
  color: #f35b5b;
`;

const CloseIconStyled = styled(RiCloseFill)`
  font-size: 25px;
  margin-right: 5px;
  color: #f35b5b;
`;

const CheckIconStyled = styled(RiCheckFill)`
  font-size: 25px;
  margin-right: 5px;
  color: #87b1e7;
`;

const CommentsContainer = styled.div`
  width: 375px;
  /* height: 100vw; */
  height: 400px;
  border: none;
  padding: 10px;
  margin-top: -20px;
  margin-bottom: -25px;
  position: relative;
  /* background-color: #c7d6ff; */

  h5 {
    text-align: center;
    line-height: 22px;
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 700;
    color: gray;
    margin-top: 100px;
  }

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
  font-size: 16px;
  width: 360px;
  height: 40px;
  padding: 5px;
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
  /* background-color: #4a92d1; */

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
  margin-left: 15px;
  margin-top: 10px;
  display: block;
  white-space: pre-wrap;
  word-break: break-all;
  /* background-color: #e4abab; */
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
const LabelArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  color: #c0c0c0;
`;

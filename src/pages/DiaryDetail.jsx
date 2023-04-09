import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import HTMLFlipBook from "react-pageflip";
import ReactPaginate from "react-paginate";
import { getDate } from "../utils/getDate";
import leftArrow from "../assets/leftArrow.png";
import Thumbnail from "../components/drawing/Thumbnail";

const DiaryDetail = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { diaryId } = useParams();

  const accessToken = window.localStorage.getItem("accessToken");

  const fetchData = async (page) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail?page=${page}&size=5`,
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        setData([...res.data.content]); // 객체로 반환되길래 배열로 만듬
        setPageCount(res.data.pageableCustom.totalPages);
      });

    return response;
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const goToInnerPaperDetail = (paperId) => {
    navigate(`/diaries/${diaryId}/${paperId}`);
  };

  const newInnerPaper = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/diary/${diaryId}/detail`,
        {
          customJson: "",
          content: "",
        },
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        alert("한 장 더 추가되었습니다");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert("다이어리의 주인만 쓸 수  있습니다.");
        }
      });
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        <Title>다이어리 상세보기</Title>
        <LeftArrow src={leftArrow} onMouseDown={goBackHandler}></LeftArrow>

        <div>
          <HeaderStyle>
            <DiaryTitle>{data[0]?.diaryTitle}</DiaryTitle>
            <DiaryCreatedAt>{getDate(data[0]?.createdAt)}</DiaryCreatedAt>
          </HeaderStyle>
          <MorePageButton onClick={newInnerPaper}>한장 더 쓰기</MorePageButton>
        </div>
      </div>

      <FlipStyle>
        <HTMLFlipBook width={300} height={500}>
          {data?.map((item, i) => (
            <InnerThumb key={i} onClick={() => goToInnerPaperDetail(item?.id)}>
              <Thumbnail
                diaryId={diaryId}
                paperId={item.id}
                width={300}
                height={500}
              />
            </InnerThumb>
          ))}
        </HTMLFlipBook>
      </FlipStyle>
      <div>
        <StyledPagination
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel="<"
          nextLabel=">"
        />
      </div>
    </>
  );
};

export default DiaryDetail;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ size }) => `${size}px`};
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const HeaderStyle = styled.div`
  display: flex;
  margin-top: 30px;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

const DiaryTitle = styled.div`
  font-size: 30px;
`;

const DiaryCreatedAt = styled.div`
  font-size: 10px;
`;

const StyledPagination = styled(ReactPaginate)`
  position: relative;
  margin-top: 60px;
  display: flex;
  justify-content: center;

  & li {
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    padding: 5px 10px;
    border: none;

    &.active {
      background-color: #007bff;
      color: #fff;
      border-color: #007bff;
    }
  }

  & a {
    display: inline-block;
    padding: 5px 10px;
    /* border: 1px solid #ccc; */
    /* border-radius: 3px; */
    color: #007bff;
    cursor: pointer;
    transition: all 0.3s ease;
    color: black;

    &:hover {
      background-color: #007bff;
      color: #fff;
      border-color: #007bff;
    }
  }

  & .disabled {
    color: #ccc;
    cursor: not-allowed;
    border-color: #ccc;
  }
`;

const InnerThumb = styled.div`
  background-color: #f3f3f3;
`;

const MorePageButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto 80px auto;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 20px;
  background-color: #e1e7ff;
  width: 300px;
  height: 50px;
  cursor: pointer;
  z-index: 10;
  position: relative;
`;

const FlipStyle = styled.div`
  margin: -130px auto;
`;

const LeftArrow = styled.img`
  margin-left: 20px;
  width: 20px;
  position: absolute;
  top: 50px;
  z-index: 11;
`;

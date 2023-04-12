import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ellipse from "../../assets/main-page/Ellipse 111.png";
import DiaryCard from "../../components/mainpage/DiaryCard";
import DiaryCardTopBig from "../../components/mainpage/DiaryCardTopBig";
import { useQuery } from "react-query";
import { getDiariesOfSelfmade } from "../../api/mainpage";
import { getMypage, getProfile } from "../../api/mypage";
import Spinner from "../../assets/Spinner.gif";
import { Alert } from "antd";
import AlertMessage from "../../components/alert/AlertMessage";
import openAlert from "../../components/alert/AlertMessage";

const MainPage = () => {
  const navigate = useNavigate();

  //비로그인 -> 로그인창으로
  const accessToken = window.localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken === null) {
      navigate("/login");
    }
  }, []);

  // 로그인 유저 정보
  const { data: dataOfUserInfo, isError: isErrorOfUserInfo } = useQuery(
    ["getUserInfo"],
    () => {
      return axios.get(`${process.env.REACT_APP_BASEURL}/mypage/profile`, {
        headers: { Authorization: accessToken },
      });
    }
  );

  if (isErrorOfUserInfo) {
    console.log("dd");
    navigate("/login");
  }

  const resOfCurrentUserInfo = useQuery(["resOfCurrentUserInfo"], () => {
    return getProfile(accessToken);
  });

  //무한스크롤

  const { ref: refForPrivate, inView: inViewForPrivate } = useInView({
    threshold: 0,
  });
  const { ref: refForPublic, inView: inViewForPublic } = useInView({
    threshold: 0,
  });

  //데이터 겟
  const [privatePage, setPrivatePage] = useState(0);
  const [publicPage, setPublicPage] = useState(0);
  useState(false);
  const [IsLoadingForPrivate, setIsLoadingForPrivate] = useState(false);
  const [IsLoadingForPublic, setIsLoadingForPublic] = useState(false);

  const [dataListForPrivate, setDataListForPrivate] = useState([]);
  const [dataListForPublic, setDataListForPublic] = useState([]);
  const [activeIdxForSelfmade, setActiveIdxForSelfmade] = useState(0);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertNavigateLink, setAlertNavigateLink] = useState("");

  const resForSelfmade = useQuery(["getDiariesOfSelfmade"], () => {
    return getDiariesOfSelfmade(accessToken);
  });

  useEffect(() => {
    setIsLoadingForPrivate(true);
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/invite?page=${privatePage}&size=5`,
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        setIsLoadingForPrivate(false);

        if (res.data === "") {
          return;
        }
        setDataListForPrivate((prev) => [...prev, ...res.data.content]);
        setPrivatePage((prev) => prev + 1);
      })
      .catch((err) => {
        setIsLoadingForPrivate(false);
      });
  }, [inViewForPrivate]);

  useEffect(() => {
    setIsLoadingForPublic(true);
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/public?page=${publicPage}&size=5`,
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => {
        setIsLoadingForPublic(false);
        setDataListForPublic((prev) => [...prev, ...res.data.content]);
        setPublicPage((prev) => prev + 1);
      })
      .catch((err) => {
        setIsLoadingForPublic(false);
        console.log(err);
      });
  }, [inViewForPublic]);

  const goToDiaryDetail = (id) => {
    navigate(`/diaries/${id}`);
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      <WelcomeArea>
        <div>
          안녕하세요
          <br />
          {resOfCurrentUserInfo.data?.data.nickname}님!
        </div>
        <CurProfileImage
          url={resOfCurrentUserInfo.data?.data.profileImageUrl}
          onClick={() => {
            navigate("/mypage");
          }}
        ></CurProfileImage>
      </WelcomeArea>
      <Label style={{ backgroundColor: "#e1e7fc" }}>내가 만든 다이어리</Label>
      <SelfmadeArea>
        <Swiper
          watchSlidesProgress
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={0}
          onSlideChange={(e) => setActiveIdxForSelfmade(e.activeIndex)}
          className="mySwiper"
        >
          {resForSelfmade.data?.data.length === 0 ? (
            <SwiperSlide>
              <DiaryCardTopBig
                color="purple"
                idx={0}
                activeIdxForSelfmade={activeIdxForSelfmade}
                item={{
                  title: "다이어리가 \n없습니다",
                }}
              ></DiaryCardTopBig>
            </SwiperSlide>
          ) : (
            resForSelfmade.data?.data.map((item, i) => (
              <SwiperSlide key={i} onClick={() => goToDiaryDetail(item.id)}>
                <DiaryCardTopBig
                  color="purple"
                  idx={i}
                  activeIdxForSelfmade={activeIdxForSelfmade}
                  item={item}
                  onClick={() => {
                    navigate("/dd");
                  }}
                >
                  Slide {item.id}
                </DiaryCardTopBig>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </SelfmadeArea>
      <div style={{ margin: "10px 10px 80px 10px" }}>
        <Label>초대된 다이어리</Label>
        <SwiperArea>
          <Swiper slidesPerView={"auto"} spaceBetween={20} className="mySwiper">
            {dataListForPrivate.map((item) => (
              <SwiperSlide
                key={item.id}
                onClick={() => {
                  goToDiaryDetail(item.id);
                }}
              >
                <DiaryCard item={item} color="purple" />
              </SwiperSlide>
            ))}
            {dataListForPrivate.length < 3 ? (
              <SwiperSlide
                style={{
                  width: "100vw",
                  backgroundColor: "#e4e4e4",
                }}
              >
                다이어리가 없습니다.
              </SwiperSlide>
            ) : (
              ""
            )}
            {IsLoadingForPrivate ? (
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            ) : (
              ""
            )}
            <span
              slot="wrapper-end"
              ref={refForPrivate}
              style={{ margin: "0px 10px 0px 0px" }}
            >
              <Skeleton width={140} height={196} borderRadius={25} />
            </span>
            <span slot="wrapper-end" style={{ margin: "0px 10px" }}>
              <Skeleton width={140} height={196} borderRadius={25} />
            </span>
            <span slot="wrapper-end" style={{ margin: "0px 10px" }}>
              <Skeleton width={140} height={196} borderRadius={25} />
            </span>
          </Swiper>
        </SwiperArea>
        <Label>공개 다이어리</Label>
        <SwiperArea>
          <Swiper slidesPerView={"auto"} spaceBetween={20} className="mySwiper">
            {dataListForPublic.map((item, i) => (
              <SwiperSlide
                key={i}
                onClick={() => {
                  goToDiaryDetail(item.id);
                }}
              >
                <DiaryCard item={item} color="purple" />
              </SwiperSlide>
            ))}
            {dataListForPublic.length < 3 ? (
              <SwiperSlide
                style={{
                  width: "100vw",
                  backgroundColor: "#e4e4e4",
                }}
              >
                다이어리가 없습니다.
              </SwiperSlide>
            ) : (
              ""
            )}
            {IsLoadingForPublic ? (
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            ) : (
              ""
            )}
            <span
              slot="wrapper-end"
              ref={refForPublic}
              style={{ margin: "0px 10px" }}
            >
              <Skeleton width={140} height={196} borderRadius={25} />
            </span>
            <span slot="wrapper-end" style={{ margin: "0px 10px" }}>
              <Skeleton width={140} height={196} borderRadius={25} />
            </span>
            <span slot="wrapper-end" style={{ margin: "0px 10px" }}>
              <Skeleton width={140} height={196} borderRadius={25} />
            </span>
          </Swiper>
        </SwiperArea>
      </div>
    </div>
  );
};

export default MainPage;

const WelcomeArea = styled.div`
  font-size: 32px;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  background-color: #e1e7fc;
  margin-bottom: -20px;
`;

const CurProfileImage = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
`;

const SwiperArea = styled.div`
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-slide {
    height: 196px;
    width: 140px;
  }
`;

const Label = styled.div`
  padding: 10px;
  font-weight: 800;
`;

const SlideOne = styled.div`
  border-radius: 25px;
  font-weight: 700;
  font-size: 10px;
  color: #fff;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${({ imageUrl }) => imageUrl});
  background-size: cover;
`;

const SelfmadeArea = styled.div`
  .swiper {
    width: 100%;
    height: 100%;
    background-image: url(${ellipse});
    background-size: 100vw 100%;
    background-position: 0 -120px;
    background-repeat: no-repeat;
    margin-top: -10px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

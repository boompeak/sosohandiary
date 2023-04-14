const kakaoLoginApi = () => {
  const REDIRECT_URI = "https://us-diary.vercel.app/oauth"; //프론트 도메인
  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
};

export { kakaoLoginApi };

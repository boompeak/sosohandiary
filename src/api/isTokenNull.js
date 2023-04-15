export const isTokenNull = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  if (accessToken === null) {
    return true;
  } else {
    return false;
  }
};

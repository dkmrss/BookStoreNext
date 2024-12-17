const getLocalRefreshToken = (): string | null => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.refreshToken || null;
};

const getLocalAccessToken = (): string | null => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.accessToken || null;
};

const updateLocalAccessToken = (token: string): void => {
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = (): any => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

const setUser = (user: any): void => {
  localStorage.setItem("id", user?.id);
  localStorage.setItem("jwt", user?.jwt);
  localStorage.setItem("refreshToken", user?.refreshToken);
  localStorage.setItem("userName", user?.userName);
};

const removeUser = (): void => {
  localStorage.removeItem("user");
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;

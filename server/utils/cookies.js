const { NODE_ENV } = require("../constants/env");
const {
  sevenDaysFromNow,
  thirtyDaysFromNow,
  tenSecondsFromNow,
  oneMinuteFromNow,
} = require("./date");

const REFRESH_PATH = "/";

const defaults = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: "strict",
};

const getAccessTokenCookieOptions = () => ({
  ...defaults,
  // expires: sevenDaysFromNow(),
  expires: tenSecondsFromNow(),
});

const getRefreshTokenCookieOptions = () => ({
  ...defaults,
  // expires: thirtyDaysFromNow(),
  expires: oneMinuteFromNow(),
  path: REFRESH_PATH,
});

const setAuthCookies = ({ res, accessToken, refreshToken }) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

const clearAuthCookies = (res) =>
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: REFRESH_PATH });

module.exports = {
  REFRESH_PATH,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies,
  clearAuthCookies,
};

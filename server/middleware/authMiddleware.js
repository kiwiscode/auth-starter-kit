const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const { JWT_ACCESS_SECRET } = require("../constants/env");
const HttpStatus = require("../constants/http");

module.exports = (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "NoAccessToken");
  }

  jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "TokenExpiredError");
      } else {
        throw new ApiError(HttpStatus.FORBIDDEN, "Invalid token");
      }
    }

    req.userId = decoded.id || decoded._id || decoded.userId;
    next();
  });
};

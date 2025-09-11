import ApiError from "../utils/ApiError.js";

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return ApiError(
        res,
        403,
        "You are not authorized to access this resource"
      );
    next();
  };
};
export default authorizeRole;

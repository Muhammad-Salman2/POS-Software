const ApiError = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export default ApiError;

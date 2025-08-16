const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 400;
  res.status(status).json({
    isSuccess: false,
    message: err.message,
  });
};
export default errorMiddleware;

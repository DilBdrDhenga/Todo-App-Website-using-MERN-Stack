import expressAsyncHandler from "express-async-handler";

const errorMiddleware = expressAsyncHandler((err, req, res, next) => {
  res.status(400).json({
    isSuccess: true,
    message: err.message,
  });
});
export default errorMiddleware;

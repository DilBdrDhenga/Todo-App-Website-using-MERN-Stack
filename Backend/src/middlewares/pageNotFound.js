import expressAsyncHandler from "express-async-handler";

const pageNotFound = expressAsyncHandler((req, res, next) => {
  res.status(404).json({
    isSuccess: true,
    message: "Page Not Found",
  });
});

export default pageNotFound;

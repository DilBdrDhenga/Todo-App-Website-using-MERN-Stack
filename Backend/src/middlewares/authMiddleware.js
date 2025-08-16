import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { secretKey } from "../utils/constant.js";

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  // get token data
  let bearerToken = req.headers.authorization;
  // verifying if token sent or not
  if (!bearerToken) {
    let error = new Error("Token is required. Please provide it");
    error.status = 401;
    throw error;
  } else {
    // extracting token
    let token = bearerToken.split(" ")[1];
    //extracting id
    let info = jwt.verify(token, secretKey);
    // console.log("info.id", info.id);
    // verifying token
    if (!info) {
      let error = new Error("Token Not Valid.");
      error.status = 401;
      throw error;
    } else {
      // passing this extracted id to next middleware
      req.id = info.id;
      // console.log("req.id", req.id);
      next();
    }
  }
});

export default authMiddleware;

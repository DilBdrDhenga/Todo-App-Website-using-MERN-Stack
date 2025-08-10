import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import { expiresIn, secretKey } from "../utils/constant.js";
import jwt from "jsonwebtoken";

// REGISTER USER
const registerUser = expressAsyncHandler(async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    // Check for required fields
    if (!userName || userName.trim() === "") {
      return res
        .status(400)
        .json(new ApiResponse(400, "Full name is required"));
    }
    if (!email || email.trim() === "") {
      return res.status(400).json(new ApiResponse(400, "Email is required"));
    }
    if (!password || password.trim() === "") {
      return res.status(400).json(new ApiResponse(400, "Password is required"));
    }

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [{ userName: userName.toLowerCase() }, { email }],
    });
    if (existingUser) {
      res.status(409).json(new ApiResponse(409, "User already exists"));
    }
    // creating hash password
    let hashPassword = await bcrypt.hash(password, 10);
    let data = {
      userName: userName.toLowerCase(),
      email,
      password: hashPassword,
    };

    // creating new user
    const user = await User.create(data);
    // console.log(data);

    // Fetch the created user without the password
    const createdUser = await User.findById(user.id);
    // const createdUser = await User.findById(user.id).select("-password");
    if (!createdUser) {
      return res.status(500).json(new ApiResponse(500, "Error creating user"));
    }
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          `User '${user.userName}' Registered successfully`,
          createdUser
        )
      );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      isSuccess: false,
      message: "Register API",
      error: error.message,
    });
  }
});

// LOGIN USER
const loginUser = expressAsyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking for required fields
    if (!email || email.trim() === "") {
      return res.status(400).json(new ApiResponse(400, "Email is required"));
    }
    if (!password || password.trim() === "") {
      return res.status(400).json(new ApiResponse(400, "Password is required"));
    }

    // finding user
    const user = await User.findOne({ email });
    // validating user
    if (user) {
      let matchPassword = await bcrypt.compare(password, user.password);
      // checking if the password entered by user is valid or not
      if (!matchPassword) {
        res
          .status(401)
          .json(new ApiResponse(401, "User credentials does not match."));
      } else {
        let info = {
          id: user.id,
        };
        const token = jwt.sign(info, secretKey, { expiresIn });
        const loggedInUser = await User.findById(user._id).select("-password");

        res
          .status(200)
          .json(
            new ApiResponse(
              200,
              `User '${user.userName}' logged in successfully`,
              { tokenData: token, userInfo: loggedInUser }
            )
          );
      }
    } else {
      return res
        .status(400)
        .json(new ApiResponse(400, "User not registered yet"));
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      isSuccess: false,
      message: "Login API",
      error: error.message,
    });
  }
});

export { registerUser, loginUser };

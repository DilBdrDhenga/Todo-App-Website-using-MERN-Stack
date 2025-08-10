import mongoose from "mongoose";
import { dbURL } from "../utils/constant.js";

const connectToMongoDB = async () => {
  // Codes connecting to MongoDb
  try {
    await mongoose.connect(dbURL);
    console.log(
      `Application is connected to database:-  '${dbURL}'`.bgGreen.white
    );
  } catch (error) {
    console.log("MongoDb Error: ", error.message);
  }
};

export default connectToMongoDB;

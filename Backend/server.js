import express, { json } from "express";
import { port } from "./src/utils/constant.js";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import indexRoute from "./src/routes/indexRoute.js";
import connectToMongoDB from "./src/connectToMongoDB/connectToMongoDB.js";
import colors from "colors";

// rest object
const app = express();

// middlewares
config();
app.use(json());
app.use(morgan("dev")); // to know which api is hit
app.use(cors());

// routes
app.use("/api/v1/", indexRoute);

// port listen
app.listen(port, () => {
  console.log(`Application is running at port: ${port}`.bgCyan);
  connectToMongoDB();
});

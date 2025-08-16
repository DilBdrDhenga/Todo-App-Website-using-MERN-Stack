import { Router } from "express";
import errorMiddleware from "../middlewares/errorMiddleware.js";
import pageNotFound from "../middlewares/pageNotFound.js";
import userRoute from "./userRoute.js";
import todoRoute from "./todoRoute.js";

const indexRoute = Router();
let apiRoute = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/todos",
    route: todoRoute,
  },
];

apiRoute.forEach((item, i) => {
  indexRoute.use(item.path, item.route);
});

indexRoute.use(pageNotFound);
indexRoute.use(errorMiddleware);

export default indexRoute;

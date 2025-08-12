import axios from "axios";
import { url } from "../constant";

let hitApi = axios.create({
  baseURL: `${url}`,
});

export default hitApi;

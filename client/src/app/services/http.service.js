import axios from "axios";
import configFile from "../config.json";

const http = axios.create({
  baseURL: configFile.API_ENDPOINT,
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default httpService;

import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:4012/api/",
  // process.env.REACT_APP_NODE_DEV === "development"
  //   ? process.env.REACT_APP_URL_API_DEVELOPMENT
  //   : process.env.REACT_APP_URL_API_PRODUCTION,
  withCredentials: true,
});

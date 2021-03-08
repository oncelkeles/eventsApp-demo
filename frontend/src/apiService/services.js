import axios from "axios";

export default axios.create({
  baseURL: "https://events-api-oncel.herokuapp.com/api/v1",
  //baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

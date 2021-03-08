import axios from "axios";

export default axios.create({
  baseURL: "https://events-api-oncel.herokuapp.com/api/v1",
  withCredentials: true,
});

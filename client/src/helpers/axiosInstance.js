import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});

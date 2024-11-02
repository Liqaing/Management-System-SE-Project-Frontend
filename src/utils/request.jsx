import axios from "axios";
import { message } from "antd";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

export const request = async (url, method, param) => {
  try {
    const response = await axios({
      url: BASE_URL + url,
      method: method,
      data: param,
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    var status = err.response?.status;
    if (status === 404) {
      const errorMessage =
        err.response?.data?.error?.message || "Route Not Found!";
      message.error(errorMessage);
    } else if (status === 401) {
      const errorMessage =
        err.response?.data?.error?.message || "Unauthorized!";
      message.error(errorMessage);
    } else if (status === 500) {
      message.error("Internal Server Error!");
    } else {
      const errorMessage =
        err.response?.data?.error?.message ||
        "An error occurred during the request.";
      message.error(errorMessage);
    }
    return err;
  }
};

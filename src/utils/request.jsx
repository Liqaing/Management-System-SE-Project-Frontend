import axios from "axios";
import { message } from "antd";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

export const request = async (url, method, param, query) => {
  try {
    const response = await axios({
      url: BASE_URL + url,
      params: query,
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
      const errorMessage =
        err.response?.data?.error?.message || "Internal Server Error!!";
      message.error(errorMessage);
    } else {
      const errorMessage =
        err.response?.data?.error?.message ||
        "An error occurred during the request.";
      message.error(errorMessage);
    }
    return err;
  }
};

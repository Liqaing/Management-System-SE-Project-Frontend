import axios from 'axios';
import { message } from 'antd';

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

export const request = async (url, method, param) => {
  try {
    const response = await axios({
      url: BASE_URL + url,
      method: method,
      data: param
    });

    return response.data;
  } catch (err) {
    var status = err.response?.status;
    if (status === 404) {
      message.error('Route Not Found!');
    } else if (status === 401) {
      message.error('Unauthorized!');
    } else if (status === 500) {
      message.error('Internal Server Error!');
    } else {
      message.error(err.message);
    }
    return err;
  }
};
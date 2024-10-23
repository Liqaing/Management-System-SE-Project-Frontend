import axios from "axios";

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const formatError = {
      title: "Login Failed",
      msg:
        err.response?.data?.error.message ||
        "An error occurred during operation.",
    };
    return Promise.reject(formatError);
  }
);

import { notification } from "antd";
import PropTypes from "prop-types";

const ErrorAlert = async (title, msg) => {
  notification.error({
    message: title || "Error",
    description: msg || "Sorry, We run into a problem!",
    placement: "topRight",
    duration: 10,
  });
  return null;
};

ErrorAlert.propTypes = {
  msg: PropTypes.string,
  title: PropTypes.string,
};

export default ErrorAlert;

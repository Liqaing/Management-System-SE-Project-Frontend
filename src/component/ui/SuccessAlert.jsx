import { notification } from "antd";
import PropTypes from "prop-types";

const SuccessAlert = async (title, msg) => {
  notification.success({
    message: title || "Success",
    description: msg || "Operation was successful!",
    placement: "topRight",
    duration: 10,
  });
  return null;
};

SuccessAlert.propTypes = {
  msg: PropTypes.string,
  title: PropTypes.string,
};

export default SuccessAlert;

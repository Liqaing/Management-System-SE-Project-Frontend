import { useContext } from "react";
import { AppContext } from "../context";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = (props) => {
  const { user } = useContext(AppContext);
  console.log("route", user);
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (props.requiredRole && !props.requiredRole.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return props.children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  requiredRole: PropTypes.string || PropTypes.array,
};

export default ProtectedRoute;

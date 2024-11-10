import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../../utils/context";

function LayoutAuth() {
  const { user } = useContext(AppContext);
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {/* <div>LayoutAuth</div> */}
      <Outlet />
    </>
  );
}

export default LayoutAuth;

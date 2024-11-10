import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../utils/context";
import ErrorAlert from "../../component/ui/ErrorAlert";

const Logout = () => {
  const { user, setUser } = useContext(AppContext);
  const handleLogout = async () => {
    axios
      .post("/api/auth/logout")
      .then(() => {
        setUser(null);
      })
      .catch(async (err) => {
        await ErrorAlert(
          "Logout Failed",
          err.response?.data?.error.message || "An error occurred during login."
        );
      });
  };

  return <>{user?.isLogin && <p onClick={handleLogout}>Logout</p>}</>;
};

export default Logout;

import { RouterProvider } from "react-router-dom";
import router from "./utils/routeHandler/routes";
import { useContext, useEffect } from "react";
import { AppContext } from "./utils/context.jsx";
import axios from "axios";

const App = () => {
  const { setUser } = useContext(AppContext);

  useEffect(() => {
    axios
      .post("/api/auth/token")
      .then((res) => {
        const data = res.data;
        const userData = {
          isLogin: data.data.isLogin,
          username: data.data.username,
          role: data.data.role,
        };
        setUser(userData);
      })
      .catch(() => {
        setUser(null);
      });
  }, [setUser]);
  return <RouterProvider router={router} />;
};

export default App;

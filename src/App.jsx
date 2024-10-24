import { RouterProvider } from "react-router-dom";
import router from "./utils/routeHandler/routes";
import { useContext } from "react";
import { AppContext } from "./utils/context";

const App = () => {
  const { user, setUser } = useContext(AppContext);

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
      .catch((err) => {
        setUser(null);
      });
  }, []);
  return <RouterProvider router={router} />;
};

export default App;

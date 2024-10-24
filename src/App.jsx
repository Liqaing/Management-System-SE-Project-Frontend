import { RouterProvider } from "react-router-dom";
import router from "./utils/routeHandler/routes";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

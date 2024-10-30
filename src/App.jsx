import { useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./utils/context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontendLayout from "./component/layout/FrontendLayout.jsx";
import HomePage from "./page/home/HomePage.jsx";
import NotFoundPage from "./page/error/404.jsx";
import DashboardLayout from "./component/layout/DashboardLayout.jsx";
import HomePageDash from "./page-dash/home/HomePageDash.jsx";
import LayoutAuth from "./component/layout/LayoutAuth.jsx";
import SignupPage from "./page/auth/SignupPage.jsx";
import SignInPage from "./page/auth/SignInPage.jsx";
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
  return (
    <BrowserRouter>
      <Routes>
        {/* frontend route */}
        <Route path="/" element={<FrontendLayout />}>
          <Route path="" element={<HomePage />}></Route>
          <Route path="home" element={<HomePage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>

        {/* backend route */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<HomePageDash />}></Route>
          <Route path="home" element={<HomePageDash />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>

        {/* Login Route */}
        <Route path="/auth" element={<LayoutAuth />}>
          <Route path="signin" element={<SignInPage />}></Route>
          <Route path="signup" element={<SignupPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

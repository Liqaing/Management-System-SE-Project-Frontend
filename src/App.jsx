import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontendLayout from "./component/layout/FrontendLayout";
import HomePage from "./page/home/HomePage";
import DashboardLayout from "./component/layout/DashboardLayout";
import HomePageDash from "./page-dash/home/HomePageDash";
import NotFoundPage from "./page/error/404";
import LayoutAuth from "./component/layout/LayoutAuth";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";

const App = () => {
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
        <Route path="/dashboard" element={<LayoutAuth />}>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

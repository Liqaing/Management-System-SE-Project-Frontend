import { useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./utils/context";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import FrontendLayout from "./component/layout/FrontendLayout.jsx";
import HomePage from "./page/home/HomePage.jsx";
import NotFoundPage from "./page/error/404.jsx";

import HomePageDash from "./page-dash/home/HomePageDash.jsx";
import LayoutAuth from "./component/layout/LayoutAuth.jsx";
import SignupPage from "./page/auth/SignupPage.jsx";
import SignInPage from "./page/auth/SignInPage.jsx";
import CategoryPageDash from "./page-dash/product/CategoryPageDash.jsx";
import ProductPageDash from "./page-dash/product/ProductPageDash.jsx";
import DashboardLayout from "./component/layout/DashboardLayout.jsx";
import EmployeePageDash from "./page-dash/user/EmployeePageDash.jsx";
import CustomerPageDash from "./page-dash/user/CustomerPageDash.jsx";
import POS from "./page-dash/pos/POS.jsx";

const PrivateRoute = ({ element, path, user }) => {
  if (user === null && path.includes("dashboard")) {
    // Redirect unauthenticated users trying to access dashboard routes
    return <Navigate to="/auth/signin" replace />;
  }

  return <Route path={path} element={element} />;
};

const App = () => {
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    axios
      .post("/api/auth/token")
      .then((res) => {
        const data = res.data;
        console.log("token: " + data);

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
          <Route path="" element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* backend route */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<HomePageDash />} />
          <Route path="pos" element={<POS />} />
          <Route path="home" element={<HomePageDash />} />
          <Route path="product/category" element={<CategoryPageDash />} />
          <Route path="product/productList" element={<ProductPageDash />} />
          <Route path="user/employee" element={<EmployeePageDash />} />
          <Route path="user/customer" element={<CustomerPageDash />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Login Route */}
        <Route path="/auth" element={<LayoutAuth />}>
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
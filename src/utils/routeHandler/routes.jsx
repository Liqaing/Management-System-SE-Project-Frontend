import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../../auth/LoginPage.jsx";
import HomePage from "../../page/home/HomePage.jsx";
import ProtectedRoute from "./protectedRoute.jsx";
import FrontendLayout from "../../component/layout/FrontendLayout.jsx";
import DashboardLayout from "../../component/layout/DashboardLayout.jsx";
import HomePageDash from "../../page-dash/home/HomePageDash.jsx";
import LayoutAuth from "../../component/layout/LayoutAuth.jsx";
import NotFoundPage from "../../page/error/404.jsx";
import RegisterPage from "../../auth/RegisterPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontendLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <HomePageDash />,
      },
      {
        path: "home",
        element: <HomePageDash />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <LayoutAuth />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "",
        element: <Navigate to="login" replace />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;

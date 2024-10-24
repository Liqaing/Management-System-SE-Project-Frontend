import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../../pages/auth/Login.jsx";
import SignUpPage from "../../pages/auth/signup.jsx";
import Layout from "../../pages/Layout.jsx";
import ErrorPage from "../../pages/error/Error.jsx";
import HomePage from "../../pages/home/home.jsx";
import ProtectedRoute from "./protectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    // Auth Route
    path: "auth",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        // Redirect to /auth/login on empty go to auth
        path: "",
        element: <Navigate to="login" replace />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;

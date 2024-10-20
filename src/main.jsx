import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/auth/login.jsx";
import SignUpPage from "./pages/auth/signup.jsx";
import Layout from "./pages/Layout.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "auth",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "singup",
        element: <SignUpPage />,
      },
      {
        // Redirect to /auth/login on empty go to auth
        path: "",
        element: <Navigate to="login" replace />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);

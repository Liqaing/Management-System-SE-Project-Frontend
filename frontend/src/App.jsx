import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontendLayout from "./component/layout/FrontendLayout";
import HomePage from "./page/home/HomePage";
import DashboardLayout from "./component/layout/DashboardLayout";
import HomePageDash from "./page-dash/home/HomePageDash";
import NotFoundPage from "./page/error/404";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* frontend route */}
        <Route path="/" element={<FrontendLayout />}>
          <Route path="" element={<HomePage />}></Route>
          <Route path="home" element={<HomePage />}></Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Route>

        {/* backend route */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<HomePageDash />}></Route>
          <Route path="home" element={<HomePageDash />}></Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;

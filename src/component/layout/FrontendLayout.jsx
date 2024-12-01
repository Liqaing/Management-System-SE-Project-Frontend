import { useContext } from "react";


import { AppContext } from "../../utils/context";

import HomePage from "../../page/home/HomePage";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const FrontendLayout = () => {
  const { user } = useContext(AppContext);


  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default FrontendLayout;

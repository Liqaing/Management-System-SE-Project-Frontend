import { useContext } from "react";


import { AppContext } from "../../utils/context";
import Navbar from "../Navbar/Navbar";
import HomePage from "../../page/home/HomePage";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

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

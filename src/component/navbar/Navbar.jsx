import { Avatar, Badge, IconButton } from "@mui/material";
import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { pink } from "@mui/material/colors";
import "./Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../utils/context";
import logo from "../../assets/logo/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user} = useContext(AppContext);

  console.log('user --------- ', user);

  const handleAvatarClick = () => {
    if(user?.role === "ADMIN"){
      navigate("/dashboard");
    }else{
      navigate("/my-profile");
    }
  };

  return (
    <div className="px-5 sticky top-0 z-50 py-[0.5rem] bg-[#e91e63] lg:px-20 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li>
          <img src={logo} className="w-[50px] h-[50px] rounded-full" />
        </li>
        <li
          onClick={() => navigate("/")}
          className="logo pacifico-regular text-gray-50 text-2xl lg:text-2xl sm:text-sm"
        >
          Angkor
        </li>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="">
          <IconButton>
            <SearchIcon className="text-white" sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div className="">
          <IconButton>
            {user?.isLogin ? (
              <Avatar
                onClick={handleAvatarClick}
                sx={{ bgcolor: "white", color: pink.A400 }}
              >
                {user.username[0].toUpperCase()}
              </Avatar>
            ) : (
              <IconButton onClick={() => navigate("/account/signin")}>
                <PersonIcon className="text-white" />
              </IconButton>
            )}
          </IconButton>
        </div>
        <div className="">
          <IconButton>
            <Badge color="warning" badgeContent={5}>
              <ShoppingCartIcon
                className="text-white"
                sx={{ fontSize: "1.5rem" }}
              ></ShoppingCartIcon>
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import axios from "axios";
import ErrorAlert from "../ui/ErrorAlert";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../utils/context";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, loading, setUser } = useContext(AppContext);

  const handleLogout = async () => {
    axios
      .post("/api/auth/logout")
      .then(() => {
        navigate("/");
        setUser(null);
      })
      .catch(async (err) => {
        await ErrorAlert(
          "Logout Failed",
          err.response?.data?.error.message || "An error occurred during login."
        );
      });
  };


  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center justify-centerb text-center">
        <div className="flex flex-col items-center justify-center">
          <AccountCircleIcon sx={{ fontSize: "9rem" }} />
          <h1 className="py-5 text-2xl font-semibold">Kroes Soda</h1>
          <p>Email: soda@gmail.com</p>
          <Button variant="contained" onClick={handleLogout} sx={{ margin: "2rem 0rem" }}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

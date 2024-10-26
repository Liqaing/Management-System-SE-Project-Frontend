import { useContext, useState } from "react";
import { AppContext } from "../../utils/context";
import { Box, Button } from "@mui/material";
import axios from "axios";
// import ErrorAlert from "../../components/ui/Alert";

const Logout = () => {
  const { user, setUser } = useContext(AppContext);
  const [error, setError] = useState(null);
  const handleLogout = () => {
    axios
      .post("/api/auth/logout")
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        setError({
          title: "Login Failed",
          msg:
            err.response?.data?.error.message ||
            "An error occurred during logout.",
        });
      });
  };
  return (
    <>
      {user?.isLogin && (
        <Box>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              border: "1px solid white",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "white",
                color: "primary.main",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      )}
      {/* {error && <ErrorAlert title={error.title} msg={error.msg} />} */}
    </>
  );
};

export default Logout;

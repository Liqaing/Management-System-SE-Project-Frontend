import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import { Avatar } from "@radix-ui/react-avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  return (
    <AppBar position="static" className="bg-blue-500">
      <Toolbar className="flex justify-between">
        {/* Left side - Menu icon or brand */}
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        {/* Right side - Profile and Logout buttons */}
        <div className="flex items-center space-x-4">
          {/* Profile Button */}
          <Button color="inherit" className="flex items-center space-x-2">
            <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
            <span>Profile</span>
          </Button>

          {/* Logout Button */}
          <Button color="inherit" startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

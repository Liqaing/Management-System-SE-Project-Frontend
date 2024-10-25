import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import LinkBtn from "./ui/Link";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import Logout from "../pages/auth/Logout";

// const navigation = [
//   { name: "Dashboard", href: "#", current: true },
//   { name: "Team", href: "#", current: false },
//   { name: "Projects", href: "#", current: false },
//   { name: "Calendar", href: "#", current: false },
// ];

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setMobileMoreAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar>
          <Box
            component="div"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            <RestaurantMenuIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Restaurant Management System
            </Typography>
          </Box>

          {/* Right side - Notification and Profile */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ margin: "10px" }}>
              <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
              >
                <NotificationsIcon />
              </IconButton>

              {/* Profile Menu */}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar
                  alt="User Profile"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />
              </IconButton>
            </Box>

            {/* Spacing between Login and Signup buttons */}
            <Box sx={{ display: "flex" }}>
              <LinkBtn
                to="/auth/login"
                sx={{ color: "white", padding: "8px", display: "block" }}
              >
                Login
              </LinkBtn>
              <LinkBtn
                to="/auth/signup"
                sx={{ color: "white", padding: "8px", display: "block" }}
              >
                Sign Up
              </LinkBtn>

              <Logout />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        id={menuId}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
      </Menu>
    </Box>
  );
}

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import LinkBtn from "./ui/Link";
// import { Link } from "react-router-dom";

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
      <AppBar position="static" sx={{ bgcolor: "gray.800" }}>
        <Toolbar>
          <Box
            component="div"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
              style={{ height: "32px" }}
            />
            {/* Navigation Links */}
            <Box sx={{ display: { xs: "none", sm: "block" }, ml: 2 }}>
              <Button
                href="#"
                sx={{
                  color: "white",
                  bgcolor: "gray.900",
                  "&:hover": {
                    bgcolor: "gray.700",
                    color: "white",
                  },
                  ml: 1,
                  textTransform: "none",
                }}
              >
                Home
              </Button>
            </Box>
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
            <Box>
              <LinkBtn to="/auth/login" sx={{ color: "white", padding: "8px" }}>
                Login
              </LinkBtn>
              <LinkBtn
                to="/auth/singup"
                sx={{ color: "white", padding: "8px" }}
              >
                Sign Up
              </LinkBtn>
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

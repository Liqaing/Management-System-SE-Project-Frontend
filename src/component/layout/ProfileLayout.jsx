import React, { useState, useEffect, useContext } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import axios from "axios";
import ErrorAlert from "../ui/ErrorAlert";
import { AppContext } from "../../utils/context";

const { Header, Content, Sider } = Layout;

const menu = [
  {
    key: "order",
    icon: <ShoppingBagIcon />,
    label: "Order",
  },
  {
    key: "favorites",
    icon: <FavoriteIcon />,
    label: "Favorites",
  },
  {
    key: "address",
    icon: <HomeIcon />,
    label: "Address",
  },
  {
    key: "payments",
    icon: <AccountBalanceWalletIcon />,
    label: "Payments",
  },
  {
    key: "events",
    icon: <NotificationOutlined />,
    label: "Events",
  },
  {
    key: "logout",
    icon: <LogoutIcon />,
    label: "Logout",
  },
];

const ProfileLayout = () => {
  const { user, loading, setUser } = useContext(AppContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (user == null) {
      navigate("/account/signin");
    }
  }, [user]);

  const handleChangeMenu = (item) => {
    if (item.key === "logout") {
      handleLogout();
    } else {
      navigate(item.key);
    }
  };

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

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      <Navbar />
      <Content>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={toggleSidebar}
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              onSelect={handleChangeMenu}
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={menu}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Content>
      {/* <Footer /> */}
    </Layout>
  );
};

export default ProfileLayout;

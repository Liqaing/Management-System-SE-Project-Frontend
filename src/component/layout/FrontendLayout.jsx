import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;
import logo from "../../assets/logo/logo.png";
import Logout from "../../page/auth/Signout";
import { AppContext } from "../../utils/context";

const FrontendLayout = () => {
  const { user } = useContext(AppContext);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState(""); // State to keep track of the selected menu item
  const navigate = useNavigate();

  const handleOnChangeMenu = (item) => {
    setSelectedKey(item.key); // Update the selected menu item
    navigate(item.key);
  };

  const items = [
    {
      label: <Link to="home">Main Menu</Link>,
      key: "Main Menu",
    },
    {
      label: <Link to="beverages">Beverages</Link>,
      key: "beverages",
    },
    {
      label: <Link to="breakfast">Breakfast</Link>,
      key: "breakfast",
    },
    {
      label: <Link to="specials">Specials</Link>,
      key: "specials",
    },
    {
      label: <Link to="kids">Kids Menu</Link>,
      key: "kids",
    },
    {
      label: <Link to="deals">Deals & Combos</Link>,
      key: "deals",
    },
    {
      label: <Link to="desserts">Desserts</Link>,
      key: "desserts",
    },

    {
      label: <Link>Dashboard</Link>,
      key: "dashboard",
    },

    ...(user?.isLogin
      ? [{ label: <Logout />, key: "Signout" }]
      : [
          {
            label: <Link>Signin</Link>,
            key: "auth/signin",
          },
          {
            label: <Link>Signup</Link>,
            key: "auth/signup",
          },
        ]),
  ];

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-log" />
        <img
          src={logo}
          className="rounded-full mx-10"
          style={{ width: 45, height: 45 }}
        />
        <Menu
          onSelect={handleOnChangeMenu}
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Content */}
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Developed by Rupp ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default FrontendLayout;

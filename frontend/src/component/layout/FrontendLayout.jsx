import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;
import logo from "../../assets/logo/logo.png";


const items = [
  { key: "home", label: "Main Menu" },
  { key: "beverages", label: "Beverages" },
  { key: "breakfast", label: "Breakfast" },
  { key: "specials", label: "Specials" },
  { key: "kids", label: "Kids Menu" },
  { key: "deals", label: "Deals & Combos" },
  { key: "desserts", label: "Desserts" },
  { key: "dashboard/sign-in", label: "Login" },
];

const FrontendLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState(""); // State to keep track of the selected menu item
  const navigate = useNavigate();

  const handleOnChangeMenu = (item) => {
    console.log(item.key);
    setSelectedKey(item.key); // Update the selected menu item
    navigate(item.key);
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-log" />
        <img src={logo} className="rounded-full mx-10" style={{ width: 45, height: 45 }} />
        <Menu
          onSelect={handleOnChangeMenu}
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          style={{ flex: 1, minWidth: 0 }}
        >
          {items.map((item) => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
        </Menu>
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
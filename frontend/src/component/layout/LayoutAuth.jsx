import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";

const { Header } = Layout;

const LayoutAuth = ({ children }) => {
  return (
    // <Layout>
    //   <Header>
    //     <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
    //       <Menu.Item key="1"><Link to="/login">Login</Link></Menu.Item>
    //     </Menu>
    //   </Header>

    // </Layout>
    <Outlet />
  );
};

export default LayoutAuth;

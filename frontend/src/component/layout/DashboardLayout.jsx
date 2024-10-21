import React, { useState } from "react";
import logo from "../../assets/logo/logo.png";
import { DownOutlined } from "@ant-design/icons";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboar", "/dashboard", <PieChartOutlined />),

  getItem("Customer", "/dashboard/customer", <DesktopOutlined />),
  getItem("Order", "/dashboard/order", <DesktopOutlined />),
  getItem("POS", "/dashboard/pos", <DesktopOutlined />),

  getItem("Product", "/dashboard/product", <UserOutlined />, [
    getItem("Category", "/dashboard/product/category", <DesktopOutlined />),
    getItem("Product", "/dashboard/product/productList", <DesktopOutlined />),
  ]),

  getItem("User", "/dashboard/user", <UserOutlined />, [
    getItem("Employee", "/dashboard/user/employee"),
    getItem("Role", "/dashboard/user/role"),
    getItem("User Role", "/dashboard/user/userRole"),
  ]),

  getItem("System", "/dashboard/system", <UserOutlined />, [
    getItem("Order Status", "/dashboard/system/orderStatus"),
    getItem("Order Payment", "/dashboard/system/orderPayment"),
    getItem("Province", "/dashboard/system/province"),
  ]),
  getItem("Report", "/dashboard/report", <TeamOutlined />, [
    getItem("Top Sale", "/dashboard/report/topSale", <FileOutlined />),
    getItem("Sale Summary", "/dashboard/report/saleSummary", <FileOutlined />),
    getItem(
      "Sole by category",
      "/dashboard/report/soleByCategory",
      <FileOutlined />
    ),
    getItem(
      "Sole by product",
      "/dashboard/report/soleByProduct",
      <FileOutlined />
    ),
  ]),
];

const handleOnClickLogOut = () => {};

const itemsProfile = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        My Account
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Change Password
      </a>
    ),
  },
  {
    key: "3",
    label: <a onClick={handleOnClickLogOut}>Logout</a>,
  },
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 40px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="">
            <img
              src={logo}
              className="rounded-full"
              style={{ width: 60, height: 60 }}
            />
          </div>
          <div>
            <Space size="large">
              <Input.Search className="mt-5" />
              <Badge count={5}>
                <Avatar shape="square" size="small" />
              </Badge>

              <Dropdown
                menu={{
                  items: itemsProfile,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div className="">Mr.Darith</div>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Space>
          </div>
        </Header>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Dashboar</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* content */}
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;

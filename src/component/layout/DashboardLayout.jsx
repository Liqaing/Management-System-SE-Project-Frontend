import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
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
  Dropdown,
  Input,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";

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

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleOnClickLogOut = () => {
    window.location.href = "/dashboard/login";
  };
  
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

  const handleChangeMenu = (item) => {
    navigate(item.key);
  };

  // Dynamic Breadcrumb Items
  const breadcrumbItems = location.pathname.split("/").filter(Boolean).map((segment, index, array) => {
    const path = `/${array.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={path} onClick={() => navigate(path)}>
        {segment.charAt(0).toUpperCase() + segment.slice(1)} {/* Capitalize first letter */}
      </Breadcrumb.Item>
    );
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          onSelect={handleChangeMenu}
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
          <div className="flex">
            <img src={logo} className="rounded-full mt-2" style={{ width: 45, height: 45 }} />
            <div className="font-bold ml-2 text-lg mt-4 text-gray-600">KHMER FOOD</div>
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

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadcrumbItems} {/* Render dynamic breadcrumb items */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          RUPP ©{new Date().getFullYear()} Created by Group
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
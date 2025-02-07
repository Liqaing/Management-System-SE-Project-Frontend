import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Dropdown, Space, theme } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { FaExchangeAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdManageAccounts } from "react-icons/md";
import axios from "axios";
import ErrorAlert from "../ui/ErrorAlert";
import { ROLES } from "../../utils/constants";
import { AppContext } from "../../utils/context";
import logo from "../../assets/logo/logo.png";
import userPic from "../../assets/logo/user.png";

const { Header, Content, Footer, Sider } = Layout;

const getItem = (label, key, icon, children) => ({
  key,
  icon,
  children,
  label,
});

const items = [
  getItem("Dashboard", "/dashboard", <PieChartOutlined />),
  getItem("POS", "/dashboard/pos", <DesktopOutlined />),
  getItem("Product", "/dashboard/product", <UserOutlined />, [
    getItem("Category", "/dashboard/product/category", <DesktopOutlined />),
    getItem("Product List", "/dashboard/product/productList", <DesktopOutlined />),
  ]),
  getItem("User", "/dashboard/user", <UserOutlined />, [
    getItem("Employee", "/dashboard/user/employee"),
    getItem("Customer", "/dashboard/user/customer"),
  ]),
  getItem("System", "/dashboard/system", <UserOutlined />, [
    getItem("Coupon", "/dashboard/system/coupon"),
    getItem("Order Status", "/dashboard/system/orderStatus"),
    getItem("Order Payment", "/dashboard/system/orderPayment"),
    getItem("Province", "/dashboard/system/province"),
  ]),
  getItem("Report", "/dashboard/report", <TeamOutlined />, [
    getItem("Top Sale", "/dashboard/report/topSale", <FileOutlined />),
    getItem("Sale Summary", "/dashboard/report/saleSummary", <FileOutlined />),
    getItem("Sales by Category", "/dashboard/report/salesByCategory", <FileOutlined />),
    getItem("Sales by Product", "/dashboard/report/salesByProduct", <FileOutlined />),
  ]),
  getItem("Logout", "/dashboard/logout", <LogoutOutlined />),
];

const DashboardLayout = () => {
  const { user, loading, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (!user) {
      navigate("/account/signin");
    }
    if (user.role !== ROLES.adminRole && user.role !== ROLES.staffRole) {
      navigate("/");
    }
  }, [user, navigate, loading]);

  const handleLogout = async () => {
    axios
      .post("/api/auth/logout")
      .then(() => {
        navigate("/");
        setUser(null);
      })
      .catch(async (err) => {
        await ErrorAlert("Logout Failed", err.response?.data?.error.message || "An error occurred during logout.");
      });
  };

  const itemsProfile = [
    {
      key: "1",
      label: (
        <>
          <MdManageAccounts className="size-5 mr-1 text-blue-500" />
          <a href="#" className="text-blue-500">My Account</a>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <FaExchangeAlt className="size-4 mr-1 text-blue-500" />
          <a href="#">Change Password</a>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <FiLogOut className="size-4 mr-1 text-red-500" />
          <a onClick={handleLogout} >Logout</a>
        </>
      ),
    },
  ];

  const handleChangeMenu = (item) => {
    if (item.key === "/dashboard/logout") {
      handleLogout();
    } else {
      navigate(item.key);
    }
  };

  // Dynamic Breadcrumb Items
  const breadcrumbItems = location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      const path = `/${array.slice(0, index + 1).join("/")}`;
      return (
        <Breadcrumb.Item key={path} onClick={() => navigate(path)}>
          {segment.charAt(0).toUpperCase() + segment.slice(1)}
        </Breadcrumb.Item>
      );
    });

  return (
    <Layout className="h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        className="min-h-screen"
      >
        <div className="p-4 flex justify-center">
          <img src={logo} className="rounded-full w-12 h-12" />
        </div>
        <Menu
          onSelect={handleChangeMenu}
          theme="dark"
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout>
        <Header className="bg-white shadow-md flex justify-between items-center px-6">
          <div className="flex items-center">
            <img src={logo} className="rounded-full w-10 h-10" />
            <div className="font-bold ml-3 text-lg text-gray-600">
              Angkor Restaurant
            </div>
          </div>
          <Space size="large">
            <Dropdown menu={{ items: itemsProfile }}>
              <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
                <Space className="p-3 m-10 ">
                  <img src={userPic} className="w-8" />
                  <span className="font-semibold">{user?.username}</span>
                </Space>
              </a>
            </Dropdown>
          </Space>
        </Header>

        <Content className="p-4 overflow-auto h-full">
          <Breadcrumb className="mb-4">{breadcrumbItems}</Breadcrumb>
          <div
            className="p-6 bg-white rounded-lg shadow-md"
            style={{ minHeight: "calc(100vh - 160px)" }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer className="text-center">
          ©RUPP - {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

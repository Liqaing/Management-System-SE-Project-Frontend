import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import logo from "../../assets/logo/logo.png";
import userPic from "../../assets/logo/user.png";
import { FaExchangeAlt, FaUserAlt } from "react-icons/fa";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
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
import { FiLogOut } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import { request } from "../../utils/request";
import { getUser } from "../../utils/helper";
import { AppContext } from "../../utils/context";
import { MdManageAccounts } from "react-icons/md";
import axios from "axios";
import ErrorAlert from "../ui/ErrorAlert";
import { ROLES } from "../../utils/constants";
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

  getItem("POS", "/dashboard/pos", <DesktopOutlined />),

  getItem("Product", "/dashboard/product", <UserOutlined />, [
    getItem("Category", "/dashboard/product/category", <DesktopOutlined />),
    getItem("Product", "/dashboard/product/productList", <DesktopOutlined />),
  ]),

  getItem("User", "/dashboard/user", <UserOutlined />, [
    getItem("Employee", "/dashboard/user/employee"),
    getItem("Customer", "/dashboard/user/customer"),
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
    if (user.role != ROLES.adminRole && user.role != ROLES.staffRole) {
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
        await ErrorAlert(
          "Logout Failed",
          err.response?.data?.error.message || "An error occurred during login."
        );
      });
  };

  const itemsProfile = [
    {
      key: "1",
      label: (
        <>
          <MdManageAccounts className="size-5 mr-1" />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            My Account
          </a>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <FaExchangeAlt className="size-4 mr-1" />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            Change Password
          </a>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <FiLogOut className="size-4 mr-1 color-re" />

          <a onClick={handleLogout}> Logout</a>
        </>
      ),
    },
  ];

  const handleChangeMenu = (item) => {
    console.log('item ----------',item)
    if(item.key == "/dashboard/logout"){
      handleLogout();
    }else{
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
          {segment.charAt(0).toUpperCase() + segment.slice(1)}{" "}
          {/* Capitalize first letter */}
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
            <img
              src={logo}
              className="rounded-full mt-2"
              style={{ width: 45, height: 45 }}
            />
            <div className="pacifico-regular font-bold ml-2 text-lg mt-4 text-gray-600">
              Angkor Restaurant
            </div>
          </div>
          <div>
            <Space size="large" className="mt-2">
              <Dropdown
                menu={{
                  items: itemsProfile,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="bg-gray-100 rounded-lg h-[40px] p-3">
                    <img src={userPic} className="w-[30px]" />
                    <span className="font-semibold pacifico-regular">{user?.username}</span>
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
          ©RUPP - {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

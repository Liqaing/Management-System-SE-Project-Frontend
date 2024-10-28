import { useContext, useState } from "react";
import { Button, Row, Col, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../utils/context";
import ErrorAlert from "../../component/ui/ErrorAlert";
import Title from "antd/es/typography/Title";

const LoginPage = () => {
  const { setUser, loading, setLoading } = useContext(AppContext);
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", {
        telephone: telephone,
        password: password,
      });
      const data = res.data;
      const userData = {
        isLogin: true,
        username: data.data.username,
        role: data.data.role,
      };
      setUser(userData);
      setLoading(false);
      return <Navigate to="/" replace />;
    } catch (err) {
      await ErrorAlert(
        "Login Failed",
        err.response?.data?.error.message || "An error occurred during logout."
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = async () => {
    await ErrorAlert("Login Failed", "Please check your input and try again.");
  };

  return (
    <div>
      <Row justify="center">
        <Col
          xs={{ span: 24, offset: 0 }}
          lg={{ span: 6, offset: 2 }}
          md={{ span: 12 }}
        >
          <Title>Log In</Title>
          <Form
            name="signup"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Telephone"
              name="telephone"
              rules={[
                { required: true, message: "Please input your telephone!" },
              ]}
            >
              <Input
                placeholder="Enter your telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={loading}
              >
                SIGN UP
              </Button>
            </Form.Item>

            <p className="font-semibold text-muted">
              Already have an account?{" "}
              <Link to="/auth/signup" className="text-dark font-bold">
                Sign Up
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;

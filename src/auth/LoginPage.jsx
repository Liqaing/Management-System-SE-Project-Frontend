import { useContext, useState } from "react";
import { Layout, Menu, Button, Row, Col, Typography, Form, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../utils/context";
import ErrorAlert from "../component/ui/ErrorAlert";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { user, setUser } = useContext(AppContext);
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (user) {
    navigate("/home");
  }

  const onFinish = async () => {
    axios
      .post("/api/auth/login", {
        telephone: telephone,
        password: password,
      })
      .then((res) => {
        const data = res.data;
        const userData = {
          isLogin: true,
          username: data.data.username,
          role: data.data.role,
        };
        setUser(userData);
      })
      .catch(async (err) => {
        await ErrorAlert(
          "Login Failed",
          err.response?.data?.error.message || "An error occurred during login."
        );
      });
  };

  const onFinishFailed = async () => {
    await ErrorAlert("Login Failed", "Please check your input and try again.");
  };

  return (
    <div>
      <Row gutter={[24, 0]} justify="space-around">
        <Col
          xs={{ span: 24, offset: 0 }}
          lg={{ span: 6, offset: 2 }}
          md={{ span: 12 }}
        >
          <Title className="mb-15">Sign In</Title>
          <Title className="font-regular text-muted" level={5}>
            Enter your email and password to sign in
          </Title>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
          >
            <Form.Item
              className="telephone"
              label="Telephone"
              name="telephone"
              rules={[
                {
                  required: true,
                  message: "Please input your telephone!",
                },
              ]}
            >
              <Input
                placeholder="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
              />
            </Form.Item>

            <Form.Item
              className="username"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                SIGN IN
              </Button>
            </Form.Item>
            <p className="font-semibold text-muted">
              Don&apos;t have an account?{" "}
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

import { useContext, useState } from "react";
import { Button, Row, Col, Form, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import ErrorAlert from "../../component/ui/ErrorAlert";
import AppContext from "antd/es/app/context";

const { Title } = Typography;

const SignupPage = () => {
  const { user, loading, setLoading } = useContext(AppContext);
  const [telephone, setTelephone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  if (user) {
    <Navigate to="/" replace />;
  }
  const onFinish = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/signup", {
        telephone: telephone,
        username: username,
        password: password,
      });
      return <Navigate to="auth/login" replace />;
    } catch (err) {
      await ErrorAlert(
        "Signup Failed",
        err.response?.data?.error.message || "An error occurred during signup."
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = async () => {
    await ErrorAlert("Signup Failed", "Please check your input and try again.");
  };

  return (
    <div>
      <Row justify="center">
        <Col
          xs={{ span: 24, offset: 0 }}
          lg={{ span: 6, offset: 2 }}
          md={{ span: 12 }}
        >
          <Title>Sign Up</Title>
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
                { len: 10, message: "Telephone must be 10 digits long!" }, // Example validation for length
              ]}
            >
              <Input
                placeholder="Enter your telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              <Link to="/auth/login" className="text-dark font-bold">
                Log In
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SignupPage;

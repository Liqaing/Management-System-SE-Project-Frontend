import { useContext } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../utils/context";
import ErrorAlert from "../../component/ui/ErrorAlert";
import { storeUserProfileData } from "../../utils/helper";

const SignInPage = () => {
  const { setUser, loading, setLoading } = useContext(AppContext);

  const onFinish = async (values) => {
    
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", {
        telephone: values.telephone,
        password: values.password,
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
      console.log(err)
      await ErrorAlert(
        "Login Failed",
        err.response?.data?.error.message || "An error occurred during logout."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Sign In
        </h2>

        <Form.Item
          name="telephone"
          rules={[{ required: true, message: "Please input your telephone!" }]}
        >
          <Input
            placeholder="Telephone"
            size="large"
            className="mb-4"
            prefix={<UserOutlined className="text-gray-500" />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            className="mb-6"
            prefix={<LockOutlined className="text-gray-500" />}
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-700"
          >
            Sign In
          </Button>
        </Form.Item>

        <div className="text-center">
          <p>
            Don&apost have an account?{" "}
            <Link to="/auth/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default SignInPage;

import { useContext } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorAlert from "../../component/ui/ErrorAlert";
import { BsTelephone } from "react-icons/bs";
import { AppContext } from "../../utils/context";
import { request } from "../../utils/request";

const SignupPage = () => {
  const { user, loading, setLoading } = useContext(AppContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  if (user) {
    <Navigate to="/" replace />;
  }
  const onFinish = async (values) => {
    setLoading(true);
    var param = {
        username: values.username,
        telephone: values.telephone,
        password: values.password
    }
    try {
      var res = await request("/api/auth/signup","POST",param);
      console.log(res);
      if(res.success==true){
        navigate("/auth/signin");
      }
    } catch (err) {
      console.log(err.response?.data?.error.message);
      await ErrorAlert(
        "Signup Failed",
        err.response?.data?.error.message || "An error occurred during signup."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Form
        name="register-form"
        form={form}
        onFinish={onFinish}
        className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Sign Up
        </h2>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            placeholder="Username"
            size="large"
            className="mb-4"
            prefix={<UserOutlined className="text-gray-500" />}
          />
        </Form.Item>

        <Form.Item
          name="telephone"
          rules={[{ required: true, message: "Please input your telephone!" }]}
        >
          <Input
            placeholder="Telephone"
            size="large"
            className="mb-4"
            prefix={<BsTelephone className="text-gray-500" />}
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
            Sign Up
          </Button>
        </Form.Item>

        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default SignupPage;

import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import { request } from '../utils/request';
import { BsTelephone } from "react-icons/bs";


const SignUpPage = () => {
  const [loading, setLoading] = useState();

  const [form] = Form.useForm(); // Form instance for resetting form fields

  const onFinish = (values) => {
    console.log('Received values:', values);
    var jsonPayload = {
      username: values.username,
      telephone: values.telephone,
      password: values.password
    }
    setLoading(true);
    request("auth/signup", "POST", jsonPayload).then((res) => {
      console.log(res);
      setLoading(false);
      if (res.data?.success === true) {
        message.success("User create success.");
        form.resetFields(); // Reset form fields on success
      } else {
        message.error(res.response.data.error.message);
      }
      setLoading(false);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Form
        name="register-form"
        form={form}
        onFinish={onFinish}
        className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
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
          rules={[{ required: true, message: 'Please input your telephone!' }]}
        >
          <Input
            placeholder="Telephone"
            size="large"
            className="mb-4"
            prefix={<BsTelephone  className="text-gray-500" />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            className="mb-6"
            prefix={<LockOutlined className="text-gray-500" />}
          />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-700">
            Sign Up
          </Button>
        </Form.Item>

        <div className="text-center">
          <p>
            Already have an account? <Link to="/dashboard/sign-in" className="text-blue-500">Sign In</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
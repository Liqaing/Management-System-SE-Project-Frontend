import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom'; // For navigation

const SignUpPage = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Form
        name="register-form"
        onFinish={onFinish}
        className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>
        
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input
            placeholder="Name"
            size="large"
            className="mb-4"
            prefix={<UserOutlined className="text-gray-500" />}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            placeholder="Email"
            size="large"
            className="mb-4"
            prefix={<MailOutlined className="text-gray-500" />}
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
          <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-700">
            Sign Up
          </Button>
        </Form.Item>

        <div className="text-center">
          <p>Already have an account? <Link to="/dashboard/sign-in" className="text-blue-500">Sign In</Link></p>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
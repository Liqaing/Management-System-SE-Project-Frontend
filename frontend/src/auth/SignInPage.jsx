import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import { request } from '../utils/request';
import { storeUserProfileData } from '../utils/helper';

const SignInPage = () => {

  const [loading,setLoading] = useState();

  const onFinish = (values) => {
    console.log('Received values:', values);
    var jsonPayload = {
      telephone: values.telephone,
      password:  values.password
    };
    setLoading(true);
    request("auth/login","POST",jsonPayload).then((res) => {
      setLoading(false);
      if(res.data.success === true){
        storeUserProfileData(res.data);
        window.location.href = "/dashboard";
      }else{
        message.error(res.data.error.message);
      }
    })
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign In</h2>
        
        <Form.Item
          name="telephone"
          rules={[{ required: true, message: 'Please input your telephone!' }]}
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
            Sign In
          </Button>
        </Form.Item>

        <div className="text-center">
          <p>Don't have an account? <Link to="/dashboard/sign-up" className="text-blue-500">Sign Up</Link></p>
        </div>
      </Form>
    </div>
  );
};

export default SignInPage;
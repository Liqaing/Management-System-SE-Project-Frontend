import React, { useState } from "react";
import { Button, Card, Form, Input, Radio } from "antd";
const LoginPage = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
        window.location.href = "/dashboard"
    };

  return (
    <div
     className="flex justify-center items-center h-full m-auto mt-20"
    >
      <Card
        title="Login"
        bordered={false}
        className="w-[450px]"
      >
        <Form layout="vertical" name="basic" autoComplete="off" onFinish={onFinish}>
          <Form.Item label="Username" name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item  className="mt-5">
            <Button className="w-full"  type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default LoginPage;

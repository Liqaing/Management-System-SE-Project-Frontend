import React, { useEffect, useState } from "react";
import MainPageDash from "../mainpage/MainPageDash";
import { Button, Table, Modal, Form, Input, Space } from "antd";
import { request } from "../../utils/request";
import { formatDateClient } from "../../utils/helper";

const CategoryPageDash = () => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  //use form
  const [form] = Form.useForm();

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true); // Start loading
    try {
      const res = await request("/api/category", "GET", {});
      console.log(res);

      // Convert the response data object into an array
      const categoriesArray = Object.values(res.data);
      setCategoryList(categoriesArray);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false); // Set loading to false after response
    }
  };

  const columns = [
    {
      title: "№",
      key: "No",
      dataIndex: null,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "categoryName",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Create At",
      key: "create_at",
      render: (text, record) => {
        return formatDateClient(record.create_at);
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log(values);
    // Handle the submit logic, e.g., send values to the server
  };

  return (
    <MainPageDash loading={loading}>
      <div className="flex justify-between">
        <div>
          <div className="text-lg text-gray-700">Category</div>
          <div className="text-gray-400">{categoryList.length} items</div>
        </div>
        <Button size="middle" type="primary" onClick={showModal}>
          Add Category
        </Button>
      </div>
      <Table
        className="mt-2"
        dataSource={categoryList}
        columns={columns}
        size="small"
      />

      {/* Start Modal Form Insert */}

      <Modal
        title="Add Category"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="categoryName"
            rules={[{ required: true, message: "Please input category name" }]}
            className="mb-3"
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description" }]}
            className="mb-3"
          >
            <Input placeholder="Description" />
          </Form.Item>

          <Form.Item className="mt-5">
            <Space style={{ display: "flex", justifyContent: "right" }}>
              <Button danger onClick={handleCancel}>
                Cancel
              </Button>
              <Button danger onClick={() => form.resetFields()}>
                Clear
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* End Modal Form Insert */}
    </MainPageDash>
  );
};

export default CategoryPageDash;
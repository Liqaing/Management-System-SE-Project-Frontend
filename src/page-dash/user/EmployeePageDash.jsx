import React, { useEffect, useState } from "react";
import MainPageDash from "../mainpage/MainPageDash";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
  message,
  Popconfirm,
  Tag,
  Select,
} from "antd";
import { request } from "../../utils/request";
import { formatDateClient } from "../../utils/helper";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { QuestionCircleOutlined } from "@ant-design/icons";

const EmployeePageDash = () => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //track event edit
  const [categoryId, setCategoryId] = useState();

  //use form
  const [form] = Form.useForm();

  useEffect(() => {
    getList();
  }, []);

  const handleEdit = (items) => {
    console.log(items);
    setIsModalOpen(true);
    setCategoryId(items.id);
    form.setFieldsValue({
      name: items.categoryName,
      description: items.description,
    });
  };
  const handleDelete = async (record) => {
    setLoading(true);
    try {
      const res = await request(`/api/category/${record.id}`, "DELETE", {});
      console.log(res);
      if (res.success === true) {
        message.success(res.data.message);
        getList();
      } else {
        message.success(res.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };

  const getList = async () => {
    setLoading(true); // Start loading
    try {
      const res = await request("/api/user?filter[roleName]=ADMIN", "GET", {});
      console.log(res);
      setCategoryList(res.data.value);
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
      title: "UserName",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "Telephone",
      key: "telephone",
      dataIndex: "telephone",
    },
    {
      title: "Role",
      key: "roleName",
      render: (text, record, index) => {
        const color = "geekblue";
        return (
          <Tag color={color} key={text}>
            {record.role.roleName}
          </Tag>
        );
      },
    },
    {
      title: "Create At",
      key: "create_at",
      render: (text, record, index) => {
        return formatDateClient(text);
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div>
            <Space>
              <Button
                size="small"
                type="primary"
                onClick={() => handleEdit(record)}
              >
                <LiaEdit />
              </Button>

              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete?"
                onCancel={cancel}
                onConfirm={() => handleDelete(record)}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
              >
                <Button danger size="small">
                  <MdOutlineDelete />
                </Button>
              </Popconfirm>
            </Space>
          </div>
        );
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
    setCategoryId(null);
    form.resetFields();
  };

  const onFinish = async (items) => {
    console.log(items);

    const payload = {
      categoryName: items.name,
      description: items.description,
    };

    setLoading(true);
    try {
      let res;
      if (categoryId == null) {
        res = await request("/api/category", "POST", payload);
      } else {
        res = await request(`/api/category/${categoryId}`, "PUT", payload);
      }

      console.log(res);
      if (res.success === true) {
        message.success(res.data.message);
        form.resetFields();
        setIsModalOpen(false);
        getList();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainPageDash loading={loading}>
      <div className="flex justify-between">
        <div>
          <div className="text-lg text-gray-700">Employee</div>
          <div className="text-gray-400">{categoryList.length} items</div>
        </div>
        <Button size="middle" type="primary" onClick={showModal}>
          Add Employee
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
        title={categoryId == null ? "Add Employee" : "Edit Employee"}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input username" }]}
            className="mb-3"
          >
            <Input placeholder="Username" allowClear={true} />
          </Form.Item>

          <Form.Item
            label="Telephone"
            name="telephone"
            rules={[{ required: true, message: "Please input telephone" }]}
            className="mb-3"
          >
            <Input placeholder="Telephone" allowClear={true} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password" }]}
            className="mb-3"
          >
            <Input
              defaultValue="123456"
              placeholder="Password"
              allowClear
              readOnly
            />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select placeholder="Select a role">
              <Select.Option value="ADMIN">Admin</Select.Option>
              <Select.Option value="STAFF">Staff</Select.Option>
              <Select.Option value="USER">User</Select.Option>
            </Select>
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
                {categoryId == null ? "Save" : "Edit"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* End Modal Form Insert */}
    </MainPageDash>
  );
};

export default EmployeePageDash;

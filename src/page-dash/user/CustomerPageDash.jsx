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
} from "antd";
import { request } from "../../utils/request";
import { formatDateClient } from "../../utils/helper";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { QuestionCircleOutlined } from "@ant-design/icons";

const CustomerPageDash = () => {
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
      const res = await request("/api/category", "GET", {});
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
        title={categoryId == null ? "Add Category" : "Edit Category"}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input category name" }]}
            className="mb-3"
          >
            <Input placeholder="Name" allowClear={true} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description" }]}
            className="mb-3"
          >
            <Input placeholder="Description" allowClear={true} />
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

export default CustomerPageDash;

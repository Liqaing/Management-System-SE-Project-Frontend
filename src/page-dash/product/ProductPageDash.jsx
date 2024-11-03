import React, { useEffect, useState } from "react";
import { request } from "../../utils/request";
import MainPageDash from "../mainpage/MainPageDash";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import { formatDateClient } from "../../utils/helper";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { QuestionCircleOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ProductPageDash = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [productIdEdit, setProductIdEdit] = useState(null);


  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [userImages, setUserImages] = useState([]);

  //use form
  const [form] = Form.useForm();

  useEffect(() => {
    getList();
    getCategoryList();
  }, []);

  const getList = async () => {
    setLoading(true);
    try {
      const res = await request(
        "/api/product?includeCategory=true&includeProductImage=true",
        "GET",
        {}
      );
      console.log(res);
      setProductList(res.data.value);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryList = async () => {
    setLoading(true);
    try {
      const res = await request("/api/category", "GET", {});
      console.log(res);
      setCategoryList(res.data.value);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setIsModalOpen(false);
    setProductIdEdit(null);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("categoryId", values.category);

    // Check if values.images is an array before iterating
    if (Array.isArray(values.images)) {
      values.images.forEach((file, index) => {
        formData.append(`userImage${index}`, file.originFileObj);
      });
    } else if (values.images) {
      formData.append(`userImage`, values.images.originFileObj);
    }

    setLoading(true);
    axios
      .post("/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        console.log("Response:", res.data);
        setIsModalOpen(false);
        if (res.data.success == true) {
          message.success(res.data.data?.message);
          getList();
        } else {
          message.success(res.data.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error:", err);
        message.error(err?.response?.data?.error?.message);
      });
  };

  const cancel = (e) => {
    console.log(e);
  };

  const handleDelete = async (record) => {
    setLoading(true);
    try {
      const res = await request(`/api/product/${record.id}`, "DELETE", {});
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

  const handleEdit = (values) => {
    console.log(values);
    setIsModalOpen(true);
    setProductIdEdit(values.id);
    
    form.setFieldsValue({
      productName: values.productName,
      price: values.price,
      description: values.description,
      category: values.category.categoryName,
    });
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
      title: "Category",
      key: "categoryName",
      render: (text, record, index) => {
        return record.category.categoryName;
      },
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "productName",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Image",
      key: "image",
      render: (text, record, index) => {
        return (
          <img
            src={record.productImage[0]?.imageUrl}
            alt="Product Image"
            style={{ width: 100, height: "auto" }}
          />
        );
      },
    },
    {
      title: "Create At",
      key: "create_at",
      render: (text, record) => {
        return formatDateClient(record.createAt);
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record,index) => {
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

  const allowedFileTypes = ["image/png", "image/jpeg"];
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    }

    const isLtSize = info.file.size / 1024 / 1024 < MAX_FILE_SIZE;

    if (!isLtSize) {
      message.error("Image must be smaller than 10MB!");
      return false;
    }

    const isImage = allowedFileTypes.includes(info.file.type);

    if (!isImage) {
      message.error("You can only upload PNG or JPEG file!");
      return false;
    }

    setUserImages(info.fileList);
  };

  return (
    <MainPageDash loading={loading}>
      <div className="flex justify-between">
        <div>
          <div className="text-lg text-gray-700">Product</div>
          <div className="text-gray-400">{productList.length} items</div>
        </div>
        <Button size="middle" type="primary" onClick={showModal}>
          Add Product
        </Button>
      </div>
      <Table
        className="mt-2"
        dataSource={productList}
        columns={columns}
        size="small"
      />

      {/* Start Modal Form Insert */}

      <Modal
        title= {productIdEdit == null ? "Add Product" : "Edit Product"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[
                  { required: true, message: "Please input product name" },
                ]}
                className="mb-3"
              >
                <Input placeholder="Product Name" value={productName} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input the price" }]}
              >
                <Input type="number" placeholder="Price" value={price} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label="Category"
                name={"category"}
                rules={[
                  {
                    required: true,
                    message: "Please select a category",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a category"
                  allowClear
                >
                  {categoryList?.map((item, index) => (
                    <Select.Option key={index} value={item.categoryId}>
                      {item.categoryName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input description" },
                ]}
                className="mb-3"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Description"
                  value={description}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Item label="Upload Images" name="images" className="mb-3">
                <Upload
                  listType="text"
                  fileList={userImages}
                  onChange={handleImageChange}
                  multiple
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="mt-5">
            <Space style={{ display: "flex", justifyContent: "right" }}>
              <Button danger onClick={handleCancel}>
                Cancel
              </Button>
              <Button danger onClick={() => form.resetFields()}>
                Clear
              </Button>
              <Button type="primary" htmlType="submit">
                {productIdEdit == null ? "Save" : "Edit"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      {/* End Modal Form Insert */}
    </MainPageDash>
  );
};

export default ProductPageDash;

import { useEffect, useState } from "react";
import { request } from "../../utils/request";
import MainPageDash from "../mainpage/MainPageDash";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  List,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Typography,
  Upload,
} from "antd";
import { formatDateClient } from "../../utils/helper";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";

const ProductPageDash = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [productIdEdit, setProductIdEdit] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [productImagesToRemove, setProductImagesToRemove] = useState([]);
  const [currentProductImages, setCurrentProductImages] = useState([]);

  const [txtSearch, setTxtSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState(null);

  const [form] = Form.useForm();

  const getList = async () => {
    try {
      const res = await request(
        "/api/product",
        "GET",
        {},
        {
          "include[category]": true,
          "include[productImage]": true,
        }
      );
      console.log(res);
      setProductList(res.data.value);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getCategoryList = async () => {
    try {
      const res = await request("/api/category", "GET", {});
      console.log(res);
      setCategoryList(res.data.value);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getList();
        await getCategoryList();
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
    setProductIdEdit(null);
    form.resetFields();
    setProductImages([]);
    setProductImagesToRemove([]);
    setCurrentProductImages([]);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setIsModalOpen(false);
    setProductIdEdit(null);
    form.resetFields();
    setProductImages([]);
    setProductImagesToRemove([]);
    setCurrentProductImages([]);
  };

  const handleRemoveImage = (imageId) => {
    // Add image to remove list
    setProductImagesToRemove([...productImagesToRemove, imageId]);
    setCurrentProductImages([
      ...currentProductImages.filter((image) => image.id !== imageId),
    ]);
  };

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("qty", values.qty);
    formData.append("categoryId", values.category);

    // Check if values.images is an array before iterating
    if (
      values.images &&
      values.images.fileList &&
      Array.isArray(values.images.fileList)
    ) {
      values.images.fileList.forEach((file) => {
        formData.append("productImages", file.originFileObj);
      });
    }

    const endpoint = productIdEdit
      ? `/api/product/${productIdEdit}`
      : "/api/product";
    const method = productIdEdit ? "PUT" : "POST";

    if (productIdEdit) {
      formData.append("imagesToDeleteId", productImagesToRemove);
    }

    setLoading(true);
    axios({
      url: endpoint,
      method: method,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setLoading(false);
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
        message.error(err?.response?.data?.error?.message);
      })
      .finally(() => {
        form.resetFields();
        setProductImages([]);
        setProductImagesToRemove([]);
        setCurrentProductImages([]);
        setProductIdEdit(null);
      });
  };

  const cancel = (e) => {
    console.log(e);
  };

  const handleDelete = async (record) => {
    setLoading(true);
    try {
      const res = await request(`/api/product/${record.id}`, "DELETE", {}, {});
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
    // Open edit form
    console.log("edit value: ", values);
    setIsModalOpen(true);
    setProductIdEdit(values.id);

    form.setFieldsValue({
      productName: values.productName,
      price: values.price,
      qty: values.qty,
      description: values.description,
      category: values.category.id,
    });
    setCurrentProductImages(values.productImage);
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
      render: (text, record) => {
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
      title: "Quantity",
      key: "qty",
      dataIndex: "qty",
    },
    {
      title: "Image",
      key: "image",
      render: (text, record) => {
        return (
          <Image
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
      render: (text, record) => {
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

    setProductImages(info.fileList);
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

      <div className="flex justify-center mb-5">
        <Space>
          <Input.Search
            value={txtSearch}
            placeholder="Product Name"
            allowClear={true}
          />
          <Select
            value={categorySearch}
            placeholder="Select a category"
            className="w-[250px]"
          >
            {categoryList.map((item, index) => {
              return (
                <Select.Option key={index} value={item.id} allowClear={true}>
                  {item.categoryName}
                </Select.Option>
              );
            })}
          </Select>
          <Button type="primary">Filter</Button>
          <Button danger>Clear</Button>
        </Space>
      </div>

      <Table
        className="mt-2"
        dataSource={productList}
        columns={columns}
        size="small"
      />

      {/* Start Modal Form Insert */}

      <Modal
        title={productIdEdit == null ? "Add Product" : "Edit Product"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[
                  { required: true, message: "Please input product name" },
                ]}
                className="mb-3"
              >
                <Input placeholder="Product Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Product Quantity"
                name="qty"
                rules={[
                  { required: true, message: "Please input product qty" },
                ]}
                className="mb-3"
              >
                <Input type="number" placeholder="Product Quantity" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input the price" }]}
              >
                <Input type="number" placeholder="Price" />
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
                <Select showSearch placeholder="Select a category" allowClear>
                  {categoryList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
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
                <Input.TextArea rows={4} placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>

          {productIdEdit &&
            currentProductImages &&
            currentProductImages.length > 0 && (
              <Row>
                <List
                  itemLayout="horizontal"
                  dataSource={currentProductImages}
                  renderItem={(item, index) => (
                    <Col>
                      <List.Item
                        actions={[
                          <Button
                            key={index}
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleRemoveImage(item.id)}
                          />,
                        ]}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <Image width={50} src={item.imageUrl} />
                          <Typography.Text>
                            Product Image {index + 1}
                          </Typography.Text>
                        </div>
                      </List.Item>
                    </Col>
                  )}
                />
              </Row>
            )}

          <Row>
            <Col>
              <Form.Item label="Upload Images" name="images" className="mb-3">
                <Upload
                  listType="text"
                  fileList={productImages}
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

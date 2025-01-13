import { useEffect, useState } from "react";
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
  DatePicker,
  Select,
} from "antd";
import { request } from "../../utils/request";
import { formatDateClient } from "../../utils/helper";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { QuestionCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const CouponPage = () => {
  const [loading, setLoading] = useState(false);
  const [couponList, setCouponList] = useState([]);

  //track event edit
  const [couponId, setCouponId] = useState();
  const [form] = Form.useForm();

  const getList = async () => {
    setLoading(true);
    try {
      const res = await request("/api/coupon", "GET", {});
      setCouponList(res.data.value);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleEdit = (item) => {
    setIsModalOpen(true);
    setCouponId(item.id);
    form.setFieldsValue({
      ...item,
      effectiveDate: moment(item.effectiveDate),
      expireDate: moment(item.expireDate),
    });
  };

  const handleDelete = async (record) => {
    setLoading(true);
    try {
      const res = await request(`/api/coupon/${record.id}`, "DELETE", {});
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
      title: "Coupon Code",
      key: "couponCode",
      dataIndex: "couponCode",
    },
    {
      title: "Discount Percentage",
      key: "DiscountPercentage",
      dataIndex: "DiscountPercentage",
    },
    {
      title: "Limit Usange",
      key: "limitUsange",
      dataIndex: "limitUsange",
    },
    {
      title: "Coupon Type",
      key: "couponType",
      dataIndex: "couponType",
    },
    {
      title: " Effective Date",
      key: "effectiveDate",
      render: (item) => {
        return formatDateClient(item.effectiveDate);
      },
    },
    {
      title: "Expire Date",
      key: "expireDate",
      render: (item) => {
        return formatDateClient(item.expireDate);
      },
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <div>
            <Space>
              <Button
                size="small"
                type="primary"
                onClick={() => handleEdit(item)}
              >
                <LiaEdit />
              </Button>

              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete?"
                onCancel={cancel}
                onConfirm={() => handleDelete(item)}
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
    setCouponId(null);
    form.resetFields();
  };

  const onFinish = async (items) => {
    const payload = {
      couponCode: items.couponCode,
      DiscountPercentage: items.DiscountPercentage,
      couponType: items.couponType,
      effectiveDate: items.effectiveDate,
      expireDate: items.expireDate,
      limitUsange: items.limitUsange,
    };

    setLoading(true);
    try {
      let res;
      if (couponId == null) {
        res = await request("/api/coupon", "POST", payload);
      } else {
        res = await request(`/api/coupon/${couponId}`, "PUT", payload);
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
          <div className="text-lg text-gray-700">Coupon</div>
          <div className="text-gray-400">{couponList.length} items</div>
        </div>
        <Button size="middle" type="primary" onClick={showModal}>
          Add Coupon
        </Button>
      </div>
      <Table
        className="mt-2"
        dataSource={couponList}
        columns={columns}
        size="small"
        rowKey="id"
      />

      {/* Start Modal Form Insert */}
      <Modal
        title={couponId == null ? "Add Coupon" : "Edit Coupon"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* Coupon Code */}
          <Form.Item
            label="Coupon Code"
            name="couponCode"
            rules={[
              { required: true, message: "Please input the coupon code" },
            ]}
            className="mb-3"
          >
            <Input placeholder="Coupon Code" allowClear={true} />
          </Form.Item>

          <Form.Item
            label="Discount Percentage"
            name="DiscountPercentage"
            rules={[
              {
                required: true,
                message: "Please input the discount percentage",
              },
              {
                max: 100,
                message: "Please input valid discount percentage",
              },
              {
                type: "number",
                message: "Must be a positive number",
                transform: (value) => +value,
                validator: (_, value) =>
                  value >= 0
                    ? Promise.resolve()
                    : Promise.reject("Discount percentage cannot be negative"),
              },
            ]}
            className="mb-3"
          >
            <Input
              placeholder="Discount Percentage"
              allowClear={true}
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="Coupon Type"
            name="couponType"
            rules={[
              { required: true, message: "Please select the coupon type" },
            ]}
            className="mb-3"
          >
            <Select placeholder="Select Coupon Type">
              <Select.Option value="Online">Online</Select.Option>
              <Select.Option value="Counter">Counter</Select.Option>
            </Select>
          </Form.Item>

          {/* <Form.Item>
            <DatePicker.RangePicker />
          </Form.Item> */}

          <Form.Item
            label="Effective Date"
            name="effectiveDate"
            rules={[
              { required: true, message: "Please select the effective date" },
            ]}
            className="mb-3"
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Expiration Date"
            name="expireDate"
            rules={[
              { required: true, message: "Please select the expiration date" },
            ]}
            className="mb-3"
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Usage Limit"
            name="limitUsange"
            rules={[
              { required: true, message: "Please input the usage limit" },
              {
                type: "number",
                message: "Must be a number",
                transform: (value) => +value,
                validator: (_, value) =>
                  value >= 0
                    ? Promise.resolve()
                    : Promise.reject("usange limit cannot be negative"),
              },
            ]}
            className="mb-3"
          >
            <Input placeholder="Usage Limit" allowClear={true} type="number" />
          </Form.Item>

          {/* Buttons */}
          <Form.Item className="mt-5">
            <Space style={{ display: "flex", justifyContent: "right" }}>
              <Button danger onClick={handleCancel}>
                Cancel
              </Button>
              <Button danger onClick={() => form.resetFields()}>
                Clear
              </Button>
              <Button type="primary" htmlType="submit">
                {couponId == null ? "Save" : "Edit"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </MainPageDash>
  );
};

export default CouponPage;

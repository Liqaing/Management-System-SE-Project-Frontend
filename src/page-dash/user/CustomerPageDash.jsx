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
      const res = await request("/api/user?filter[roleName]=USER", "GET", {});
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
      }
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

  

  return (
    <MainPageDash loading={loading}>
      <div className="flex justify-between">
        <div>
          <div className="text-lg text-gray-700">Customer</div>
          <div className="text-gray-400">{categoryList.length} items</div>
        </div>
        
      </div>
      <Table
        className="mt-2"
        dataSource={categoryList}
        columns={columns}
        size="small"
      />
    </MainPageDash>
  );
};

export default CustomerPageDash;

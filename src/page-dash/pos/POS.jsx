import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Grid,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
} from "antd";
import MainPageDash from "../mainpage/MainPageDash";
import styles from "./styles.module.css";
import { request } from "../../utils/request";
import ProductCard from "./ProductCard";
import ProductSummaryCard from "./ProductSummaryCard";
import TextArea from "antd/es/input/TextArea";

const POS = () => {
  const [loading, setLoading] = useState(false);
  const [proListByCategory, setProListByCategory] = useState([]);
  const [txtSearchId, setTxtSearchId] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  const [customerList, setCustomerList] = useState([]);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [orderStatusList, setOrderStatusList] = useState([]);

  const [customerId, setCustomerId] = useState();
  const [paymentMethodId, setPaymentMethodId] = useState();
  const [orderStatusId, setOrderStatusId] = useState();

  const getProduct = async () => {
    const res = await request(
      "/api/category",
      "GET",
      {},
      {
        "include[product]": true,
      }
    );
    setProListByCategory(res.data.value);
  };

  useEffect(() => {
    // Add any necessary side effects here
    getProduct();
  }, []);

  const handleCheckout = () => {
    // Implement the checkout logic here
  };

  return (
    // <MainPageDash loading={loading}>
    <Flex className="flex h-full w-full overflow-hidden">
      <Col span={18}>
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          className="h-full"
          items={proListByCategory.map((category, index) => ({
            label: category.categoryName,
            key: index,
            children: (
              <div>
                <div className={styles.containInputSearch}>
                  <Input.Search
                    placeholder="Enter product ID"
                    allowClear
                    value={txtSearchId}
                    onChange={(e) => setTxtSearchId(e.target.value)}
                  />
                </div>
                <Row gutter={16}>
                  {category.product.map((product, proIndex) => (
                    <Col key={proIndex} span={8}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>
              </div>
            ),
          }))}
        />
      </Col>

      <Col className="border p-2 border-gray-100 h-full" span={6}>
        <Flex vertical className="h-full" gap={16}>
          <div>
            <Typography.Title level={3} style={{ marginBottom: "0px" }}>
              Summary
            </Typography.Title>
            <Flex gap={8} className="mt-2">
              {/* <Select
                value={customerId}
                onChange={(value) => setCustomerId(value)}
                placeholder="Customer"
                size="small"
              >
                {customerList.map((item, index) => (
                  <Select.Option key={index} value={item.customer_id}>
                    {item.customer_id}-{item.firstname} {item.lastname}
                  </Select.Option>
                ))}
              </Select> */}
              <Select
                value={paymentMethodId}
                onChange={(value) => setPaymentMethodId(value)}
                placeholder="Payment Method"
                size="small"
              >
                {paymentMethodList.map((item, index) => (
                  <Select.Option key={index} value={item.payment_method_id}>
                    {item.payment_method_id}-{item.name}
                  </Select.Option>
                ))}
              </Select>
            </Flex>
          </div>
          <Flex vertical gap={4} className="h-full overflow-y-scroll">
            {proListByCategory.map((category) =>
              category.product.map((product, proIndex) => {
                return <ProductSummaryCard key={proIndex} product={product} />;
              })
            )}
          </Flex>
          <Divider style={{ margin: "5px 0" }} />
          <Flex vertical gap={8}>
            <Flex justify="space-between">
              <Typography.Text>Customer Tel</Typography.Text>
              <Input
                placeholder="010101231"
                size="small"
                style={{ width: "70%" }}
              ></Input>
            </Flex>
            <Flex justify="space-between">
              <Typography.Text>Coupon Code</Typography.Text>
              <Space.Compact style={{ width: "70%" }}>
                <Input placeholder="AA1611" size="small"></Input>
                <Button size="small" type="primary">
                  Apply
                </Button>
              </Space.Compact>
            </Flex>
            <Flex justify="space-between">
              <Typography.Text>Remark</Typography.Text>
              <TextArea
                rows={2}
                placeholder="Remark"
                style={{ width: "70%" }}
              ></TextArea>
            </Flex>
          </Flex>
          <Divider style={{ margin: "5px 0" }} />
          <Flex vertical gap={0} className="w-full">
            <Flex justify="space-between" className="w-full">
              <Typography.Text className="text-left">
                Sub Total:
              </Typography.Text>
              <Flex justify="space-between" className="w-3/12">
                <Typography.Text>$</Typography.Text>
                <Typography.Text className="text-end">100</Typography.Text>
              </Flex>
            </Flex>
            <Flex>
              <div className={styles.roleSummary}>
                <div className="txtMain">Total</div>
                <div className={styles.txtPrice}>${total.toFixed(2)}</div>
              </div>
            </Flex>
          </Flex>

          <Button block onClick={handleCheckout} type="primary">
            Checkout
          </Button>
        </Flex>
      </Col>
      {/* </MainPageDash> */}
    </Flex>
  );
};

export default POS;

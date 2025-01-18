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
} from "antd";
import MainPageDash from "../mainpage/MainPageDash";
import styles from "./styles.module.css";
import { request } from "../../utils/request";
import ProductCard from "./ProductCard";

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
    console.log(res.data.value);
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

      <Col className={styles.contain_grid2} span={6}>
        <div className={styles.txtMain}>Summary</div>
        <Space direction="vertical" className="mt-2">
          <Select
            value={customerId}
            onChange={(value) => setCustomerId(value)}
            placeholder="Select Customer"
            style={{ width: 200 }}
          >
            {customerList.map((item, index) => (
              <Select.Option key={index} value={item.customer_id}>
                {item.customer_id}-{item.firstname} {item.lastname}
              </Select.Option>
            ))}
          </Select>
          <Select
            value={paymentMethodId}
            onChange={(value) => setPaymentMethodId(value)}
            placeholder="Select Payment Method"
            style={{ width: 200 }}
          >
            {paymentMethodList.map((item, index) => (
              <Select.Option key={index} value={item.payment_method_id}>
                {item.payment_method_id}-{item.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            value={orderStatusId}
            onChange={(value) => setOrderStatusId(value)}
            placeholder="Select Order Status"
            style={{ width: 200 }}
          >
            {orderStatusList.map((item, index) => (
              <Select.Option key={index} value={item.order_status_id}>
                {item.order_status_id}-{item.name}
              </Select.Option>
            ))}
          </Select>
        </Space>
        <div className={styles.roleSummary}>
          <div className="txtMain">Sub Total</div>
          <div className={styles.txtPrice}>${subTotal.toFixed(2)}</div>
        </div>
        <div className={styles.roleSummary}>
          <div className="txtMain">Discount</div>
          <div>
            <InputNumber
              size="small"
              value={discount}
              onChange={(value) => setDiscount(value)}
            />
          </div>
        </div>
        <div className={styles.roleSummary}>
          <div className="txtMain">Tax</div>
          <div>
            <InputNumber
              size="small"
              value={tax}
              onChange={(value) => setTax(value)}
            />
          </div>
        </div>
        <Divider />
        <div className={styles.roleSummary}>
          <div className="txtMain">Total</div>
          <div className={styles.txtPrice}>${total.toFixed(2)}</div>
        </div>
        <Button block onClick={handleCheckout} type="primary">
          Checkout
        </Button>
      </Col>
      {/* </MainPageDash> */}
    </Flex>
  );
};

export default POS;

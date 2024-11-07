import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
} from "antd";
import MainPageDash from "../mainpage/MainPageDash";
import styles from "./styles.module.css";

const POS = () => {
  const [loading, setLoading] = useState(false);
  const [proList, setProList] = useState([]);
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

  useEffect(() => {
    // Add any necessary side effects here
  }, []);

  const handleCheckout = () => {
    // Implement the checkout logic here
  };

  return (
    <MainPageDash loading={loading}>
      <Row gutter={16}>
        <Col className={styles.contain_grid1} span={18}>
          <div className={styles.containInputSearch}>
            <Input.Search
              placeholder="Enter product ID"
              allowClear
              value={txtSearchId}
              onChange={(e) => setTxtSearchId(e.target.value)}
            />
          </div>

          {proList.map((item, index) => (
            <div className={styles.rowProduct} key={index}>
              <div>
                <div className={styles.txtID}>ID: {item.product_id}</div>
                <div className={styles.txtName}>Name: {item.name}</div>
                <div className={styles.txtDes}>
                  Description: {item.description}
                </div>
                <div className={styles.txtQty}>Stock: {item.quantity}</div>
              </div>
              <div>
                <div className={styles.txtPrice}>
                  Price: ${item.price.toFixed(2)}
                </div>
                <div className={styles.txtQty}>Qty: {item.qty}</div>
              </div>
            </div>
          ))}
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
      </Row>
    </MainPageDash>
  );
};

export default POS;

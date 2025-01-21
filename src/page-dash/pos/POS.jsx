import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Flex,
  Input,
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

  const [orderProducts, setOrderProducts] = useState();

  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [paymentMethodList, setPaymentMethodList] = useState([]);

  const [customerId, setCustomerId] = useState();
  const [paymentMethodId, setPaymentMethodId] = useState();

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

  const addOrderProduct = async (product, qty) => {
    if (orderProducts) {
      const existingProduct = orderProducts.find(
        (orderProduct) => orderProduct.product.id === product.id
      );

      if (existingProduct) {
        // Update the quantity of the existing product
        setOrderProducts(
          orderProducts.map((orderProduct) =>
            orderProduct.product.id === product.id
              ? {
                  ...orderProduct,
                  orderQuantity: orderProduct.orderQuantity + qty,
                }
              : orderProduct
          )
        );
      } else {
        setOrderProducts([
          ...orderProducts,
          { product: product, orderQuantity: qty },
        ]);
      }
      console.log(orderProducts);
      return;
    }

    console.log(orderProducts);

    // Add the product as a new entry
    setOrderProducts([{ product: product, orderQuantity: qty }]);
    return;
  };

  const minusOrderProduct = async (product, qty) => {
    if (!orderProducts) {
      return;
    }

    const existingProduct = orderProducts.find(
      (orderProduct) => orderProduct.product.id === product.id
    );

    if (existingProduct) {
      // Update the quantity of the existing product
      if (existingProduct.orderQuantity > 1) {
        setOrderProducts(
          orderProducts.map((orderProduct) =>
            orderProduct.product.id === product.id
              ? {
                  ...orderProduct,
                  orderQuantity: orderProduct.orderQuantity - qty,
                }
              : orderProduct
          )
        );
      } else {
        setOrderProducts(
          orderProducts.filter(
            (orderProduct) => orderProduct.product.id !== product.id
          )
        );
      }
    }
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
              <div style={{ paddingLeft: 0 }}>
                <div className={styles.containInputSearch}>
                  <Input.Search
                    placeholder="Enter product ID"
                    allowClear
                    value={txtSearchId}
                    onChange={(e) => setTxtSearchId(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 p-2">
                  {category.product.map((product, proIndex) => (
                    <Col key={proIndex}>
                      <ProductCard
                        product={product}
                        addProductQty={addOrderProduct}
                        minusProductQty={minusOrderProduct}
                        orderQuantity={
                          (orderProducts &&
                            orderProducts.find(
                              (orderProduct) =>
                                orderProduct.product.id === product.id
                            )?.orderQuantity) ||
                          0
                        }
                      />
                    </Col>
                  ))}
                </div>
              </div>
            ),
          }))}
        />
      </Col>

      <Col className="border p-2 border-gray-100 h-full" span={6}>
        <Flex vertical className="h-full" gap={16}>
          <Typography.Title level={3} style={{ marginBottom: "0px" }}>
            Summary
          </Typography.Title>
          <Flex vertical gap={4} className="h-full overflow-y-scroll">
            {orderProducts &&
              orderProducts.map((orderProduct, proIndex) => {
                return (
                  <ProductSummaryCard
                    key={proIndex}
                    orderProduct={orderProduct}
                  />
                );
              })}
          </Flex>
          <Divider style={{ margin: "5px 0" }} />
          <Flex vertical gap={8}>
            <Flex justify="space-between">
              <Typography.Text>Payment Method</Typography.Text>
              <Select
                value={paymentMethodId}
                onChange={(value) => setPaymentMethodId(value)}
                placeholder="Payment Method"
                size="small"
                style={{ width: "60%" }}
              >
                {paymentMethodList.map((item, index) => (
                  <Select.Option key={index} value={item.payment_method_id}>
                    {item.payment_method_id}-{item.name}
                  </Select.Option>
                ))}
              </Select>
            </Flex>
            <Flex justify="space-between">
              <Typography.Text>Customer Tel</Typography.Text>
              <Input
                placeholder="010101231"
                size="small"
                style={{ width: "60%" }}
              ></Input>
            </Flex>
            <Flex justify="space-between">
              <Typography.Text>Coupon Code</Typography.Text>
              <Space.Compact style={{ width: "60%" }}>
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
                style={{ width: "60%" }}
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
            <Flex justify="space-between" className="w-full">
              <Typography.Text className="text-left">Discount:</Typography.Text>
              <Flex justify="space-between" className="w-3/12">
                <Typography.Text>$</Typography.Text>
                <Typography.Text className="text-end">-100</Typography.Text>
              </Flex>
            </Flex>
            <Divider
              dashed
              style={{ margin: "0px" }}
              className="text-orange-400"
            />
            <Flex justify="space-between" className="w-full">
              <Typography.Text className="text-left text-lg font-bold text-orange-400">
                Total:
              </Typography.Text>
              <Flex justify="space-between" className="w-3/12">
                <Typography.Text className="text-lg font-bold">
                  $
                </Typography.Text>
                <Typography.Text className="text-end text-lg font-bold">
                  100
                </Typography.Text>
              </Flex>
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

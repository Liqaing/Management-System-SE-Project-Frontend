import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Image, Typography } from "antd";
import PropTypes from "prop-types";

const ProductSummaryCard = ({ orderProduct }) => {
  return (
    <div>
      <Flex className="p-0" gap={16}>
        <div>
          {orderProduct.product.productImage &&
          orderProduct.product.productImage.length > 0 ? (
            <Image
              src={orderProduct.product.productImage[0].imageUrl}
              alt={"Product Image"}
              loading="lazy"
              width={50}
              height={50}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAK..."
              className="rounded"
            />
          ) : (
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAK..."
              loading="lazy"
              width={50}
              height={50}
              className="rounded"
            />
          )}
        </div>
        <Flex vertical className="w-full">
          <Typography.Text strong className="mb-0">
            {orderProduct.product.productName}
          </Typography.Text>
          <Flex
            justify="space-between"
            align="center"
            className="h-fit w-full m-0"
          >
            <Typography.Text type="secondary" className="mb-0">
              $ {orderProduct.product.price}
            </Typography.Text>

            <Flex gap={2} className="rounded-2xl h-fit bg-gray-200 mr-4">
              <Button shape="circle" size="small">
                <MinusOutlined />
              </Button>
              <Button type="text" size="small">
                {orderProduct.orderQuantity}
              </Button>
              <Button shape="circle" size="small">
                <PlusOutlined />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Divider style={{ margin: "10px 0" }} />
    </div>
  );
};

ProductSummaryCard.propTypes = {
  orderProduct: PropTypes.object,
};

export default ProductSummaryCard;

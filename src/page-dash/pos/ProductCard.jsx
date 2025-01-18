import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Image, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  return (
    <Card size="small">
      <Flex vertical gap={8}>
        <Flex className="p-0" gap={16}>
          {product.productImage && product.productImage.length > 0 ? (
            // Corusel does not work properly in tabs
            // <Carousel
            //   arrows
            //   infinite={true}
            //   key={product.productImage.map((img) => img.id).join(",")}
            // >
            //   {product.productImage.map((image, index) => (
            //     <div
            //       key={index}
            //       className="!flex justify-center items-center content-center"
            //     >
            //       <Image
            //         src={image.imageUrl}
            //         alt={`Product Image ${index + 1}`}
            //         loading="lazy"
            //         width={70}
            //         height={70}
            //         fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAK..."
            //         className="rounded"
            //       />
            //     </div>
            //   ))}
            // </Carousel>
            <Image
              src={product.productImage[0].imageUrl}
              alt={"Product Image"}
              loading="lazy"
              width={70}
              height={70}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAK..."
              className="rounded"
            />
          ) : (
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAK..."
              loading="lazy"
              width={70}
              height={70}
              className="rounded"
            />
          )}
          <Flex vertical>
            <Typography.Title level={5}>{product.productName}</Typography.Title>
            <Paragraph ellipsis>{product.description}</Paragraph>
          </Flex>
        </Flex>

        <Flex justify="space-between" className="h-fit m-0">
          <p className="text-2xl mb-0">$ {product.price}</p>

          <Flex gap={8} className="rounded-2xl bg-gray-200">
            <Button shape="circle">
              <MinusOutlined />
            </Button>
            <Button type="text">0</Button>
            <Button shape="circle">
              <PlusOutlined />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;

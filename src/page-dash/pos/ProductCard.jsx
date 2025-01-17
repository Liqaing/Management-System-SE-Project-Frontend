import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Carousel, Flex, Image } from "antd";
import Meta from "antd/es/card/Meta";

const ProductCard = ({ product }) => {
  console.log(product.productImage);
  return (    
    <Card size="small">
      <Flex className="p-0">
        {product.productImage && product.productImage.length > 0 ? (
          <Carousel arrows infinite={true}>
            {product.productImage.map((image, index) => (
              <div
                key={index}
                className="!flex justify-center items-center content-center"
              >
                <Image
                  src={
                    image.imageUrl
                      ? image.imageUrl
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAK..."
                  }
                  alt={`Product Image ${index + 1}`}
                  loading="lazy"
                  fluid
                  width={65}
                  height={65}
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAK..."
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAK..."
            //   alt="No Image available"
            loading="lazy"
            fluid
            width={65}
            height={65}
          />
        )}

        <p>{product.productName}</p>
      </Flex>
    </Card>
  );
};

export default ProductCard;

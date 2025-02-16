import { Button, Typography } from "antd";
import PropTypes from "prop-types";

const OrderCard = ({ order }) => {
  return (
    <div className="w-full rounded-t-sm">
      <div className="bg-cyan-100 p-4 flex justify-between items-center rounded-t-lg">
        <div className="flex flex-col">
          <Typography.Text>Order #{order.id}</Typography.Text>
          <Typography.Text type="secondary" className="text-xs">
            {new Date(order.orderDate).toLocaleString()}
          </Typography.Text>
        </div>
        <Typography.Text>Status: {order.orderStatus}</Typography.Text>
      </div>
      <div className="bg-gray-100 p-4 rounded-b-lg">
        {order.orderDetail &&
          order.orderDetail.map((item, index) => {
            return (
              <div key={index} className="flex">
                <Typography.Text className="w-1/6">
                  {item.orderQuantity}x
                </Typography.Text>
                <Typography.Text className="font-semibold">
                  {item.productName}
                </Typography.Text>
              </div>
            );
          })}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col mt-4">
            <Typography.Text className="font-semibold">Remark</Typography.Text>
            <Typography.Text ellipsis={true}>{order.remark}</Typography.Text>
          </div>
          <Button size="middle" type="primary">
            Finish
          </Button>
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.object,
};

export default OrderCard;

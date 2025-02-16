import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { request } from "../../utils/request";

const Kds = () => {
  const [orders, setOrders] = useState(null);

  const getOrder = async () => {
    try {
      const res = await request("/api/kds", "GET", {}, {});
      if (res?.data?.value) {
        setOrders(res.data.value);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrder();
  }, [orders]);

  return (
    <div className="grid grid-cols-3 gap-3">
      {orders &&
        orders.map((order, index) => <OrderCard key={index} order={order} />)}
    </div>
  );
};

export default Kds;

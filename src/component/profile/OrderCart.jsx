import { Button, Card } from "@mui/material";
import React from "react";

const OrderCart = () => {
  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-ciKijY18I0-wpWNQzrNpz5gwr70q2DRH5HNlphkOcFdwqKq6ftyMEkE&s"
          alt=""
        />
        <div>
            <p>Biryani</p>
            <p>$399</p>
        </div>
      </div>
      <div>
        <Button className="cursor-not-allowed"> completed </Button>
      </div>
    </Card>
  );
};

export default OrderCart;

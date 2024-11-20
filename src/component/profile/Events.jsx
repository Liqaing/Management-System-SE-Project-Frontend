import React from "react";
import EventCart from "./EventCart";

const Events = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {[1, 1, 1, 1, 1, 1].map((item, index) => (
        <EventCart key={index} />
      ))}
    </div>
  );
};

export default Events;
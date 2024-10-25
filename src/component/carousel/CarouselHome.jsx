import React, { useState } from "react";
import { Carousel } from "antd";
import "./CarouselHome.css";
import logo from "../../assets/logo/logo.png";

const CarouselHome = () => {
  const [slideData, setSlideData] = useState([
    {
      title: "Pizza",
      image: logo,
    },
    {
      title: "Sushi",
      image: logo,
    },
    {
      title: "Burger",
      image: logo,
    },
    {
      title: "Tacos",
      image: logo,
    },
    {
      title: "Pasta",
      image: logo,
    },
    {
      title: "Salad",
      image: logo,
    },
  ]);

  return (
    <Carousel autoplay>
      {slideData.map((item, index) => (
        <div key={index}>
          <h3 className="bg-slate-300 h-full p-10 rounded-sm text-center">
            <img src={item.image} width={120} />
            <h1>{item.title}</h1>
          </h3>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselHome;

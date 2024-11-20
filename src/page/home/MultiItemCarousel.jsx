import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { topMeels } from "./TopFood";
import CarouselItem from "./CarouselItem";

const MultiItemCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  };

  return (
    <div>
      <Slider {...settings}>
        {topMeels.map((item, index) => (
          <div>
            <CarouselItem key={index} image={item.image} title={item.title} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MultiItemCarousel;

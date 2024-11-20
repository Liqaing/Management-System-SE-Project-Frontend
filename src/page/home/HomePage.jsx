import React from "react";
import "./HomePage.css";
import MultiItemCarousel from "./MultiItemCarousel";
import RestaurantCart from "../../component/restaurants/RestaurantCart";

const HomePage = () => {
  const restaurant = [1,1,1,1,1,1];

  return (
    <div className="pb-0">
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
           
          <p className=" pacifico-regular text-2xl lg:text-6xl font-bold z-10 py-5 text-gray-300">
         
          Angkor Restaurant
          </p>
          <p className="pacifico-regular z-10 text-gray-300 text-xl">
            Taste the Convenience: Food, Fast and Delivered.
          </p>
        </div>

        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>

      <section className="p-10 lg:py-10 lg:px-20 bg-slate-950">
        <p className="pacifico-regular text-2xl font-semibold text-gray-400 py-3 p-3 pb-10">
          Top Foods
        </p>
        <MultiItemCarousel />
      </section>

      <section className="px-5 lg:px-20 pt-10 bg-slate-950">
        <h1 className="pacifico-regular text-2xl font-semibold text-gray-400 py-3 pb-8">
          Order Food
        </h1>
        <div className="flex flex-wrap items-center justify-around gap-5">
          {
            restaurant.map((item,index) => {
              return(
               <div>
                 <RestaurantCart />
                
                </div>
              )
            })
          }
        </div>
      </section>
    </div>
  );
};

export default HomePage;

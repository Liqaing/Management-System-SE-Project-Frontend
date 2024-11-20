
import React from 'react'
import OrderCart from './OrderCart'
import RestaurantCart from '../restaurants/RestaurantCart'


const Favorites = () => {
  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>My Favorite</h1>
      <div className='flex flex-wrap justify-center'>
        {
          [1,1,1,1,1].map((item,index)=><RestaurantCart />)
        }

      </div>
    </div>
  )
}

export default Favorites